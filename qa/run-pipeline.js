#!/usr/bin/env node
/* ============================================================================
   qa/run-pipeline.js — THE PRINT BUTTON's gauntlet: one command that takes a
   flawed build and drives it to shippable with zero humans in the loop.
   ----------------------------------------------------------------------------
   RENDER → INSPECT (deterministic gate) → CRITIQUE (fresh LLM critic on frozen
   screenshots) → scoped REPAIR (fresh LLM builder) → RE-VERIFY, looping.

   The load-bearing rule (FACTORY_LEARNING): independence. Every repair and
   every critique is a FRESH `claude -p` spawn — the builder never grades its
   own work, and no agent's self-report is ship evidence. The deterministic
   gate (run-checks.js) is re-run from scratch after every repair.

   Stopping rules (reflection research: errors compound past ~3):
     - hard cap 3 repair iterations
     - STALL  (defect score not strictly decreasing)      → escalate
     - REGRESSION (a repair introduced a NEW P0)          → escalate
     - critic says escalate                                → escalate

   PASS bar (stricter than the raw gate): 0 P0, 0 unwaived P1, critic "ship".
     - `cta-pending-endpoint` P1s don't block: they are DECLARED client
       deliverables ([VERIFY] discipline) — reported as client TODOs.
     - The critic may WAIVE a P1 only as a checker false-positive or an
       accepted tension (LEDGER precedent) — never a repairable defect.

   METRICS (Cherny audit: instrument from day one): every run appends a row to
   docs/BUILD_REGISTRY.md — verdicts, repair iterations, tokens, cost,
   wall-clock, human touches (always 0 here; human edits happen OUTSIDE this
   command and must be counted by the session that makes them).

   USAGE:
     node qa/run-pipeline.js <build.html> [--accent '#C9A24B'] [--slug name]
       [--critic-model opus] [--repair-model sonnet] [--critic-doc path.md]
       [--max-iter 3] [--no-critic] [--registry docs/BUILD_REGISTRY.md]

   Output: <build>.pipeline.html (repaired work file; original untouched),
   <build>.pipeline-shots/ (frozen screenshots), verdict JSON on stdout.
   Exit 0 = PASS, 1 = ESCALATE/FAIL, 2 = harness error.
   ============================================================================ */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/* ---------------- args ---------------- */
const argv = process.argv.slice(2);
const fileArg = argv.find(a => !a.startsWith('--'));
const flag = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : dflt;
};
const has = name => argv.includes('--' + name);
if (!fileArg) { console.error('usage: node qa/run-pipeline.js <build.html> [--accent HEX] [--slug name] ...'); process.exit(2); }

const ACCENT = flag('accent', null);
const MAX_ITER = parseInt(flag('max-iter', '3'), 10);
const CRITIC_MODEL = flag('critic-model', 'opus');
const REPAIR_MODEL = flag('repair-model', 'sonnet');
const CRITIC_DOC = flag('critic-doc', null);
const NO_CRITIC = has('no-critic');
const REPO = path.resolve(__dirname, '..');
const REGISTRY = path.resolve(REPO, flag('registry', 'docs/BUILD_REGISTRY.md'));
const SLUG = flag('slug', path.basename(fileArg).replace(/\.html?$/, ''));

const t0 = Date.now();
const metrics = { agents: [], tokensIn: 0, tokensOut: 0, costUsd: 0 };
const log = m => console.error('[run-pipeline] ' + m);

/* ---------------- helpers ---------------- */
function node(script, args, timeoutMs) {
  return spawnSync('node', [path.join(__dirname, script), ...args],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: timeoutMs || 600000 });
}

function runGate(file) {
  const r = node('run-checks.js', ACCENT ? [file, ACCENT] : [file], 900000);
  if (r.status === 2 || r.error) throw new Error('gate harness error: ' + (r.error || r.stderr || '').toString().slice(0, 400));
  let report;
  try { report = JSON.parse(r.stdout); }
  catch (e) { throw new Error('gate output unparseable: ' + r.stdout.slice(-400)); }
  return report;
}

function takeShots(file, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const prefix = path.join(dir, 'shot');
  const r = node('screenshot.js', [file, prefix], 300000);
  if (r.status !== 0) throw new Error('screenshot failed: ' + (r.stderr || '').slice(0, 300));
  return [prefix + '-1280.jpg', prefix + '-390.jpg'];
}

/* Fresh agent per call — this is the independence rule made mechanical. */
function claudeAgent(role, prompt, { model, tools }) {
  log(role + ' agent (' + model + ') spawning…');
  const args = ['-p', prompt, '--output-format', 'json', '--model', model];
  if (tools) { args.push('--allowedTools', tools, '--permission-mode', 'acceptEdits'); }
  const r = spawnSync('claude', args,
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 1500000, cwd: REPO });
  if (r.error) throw new Error(role + ' agent spawn failed: ' + r.error.message);
  let env;
  try { env = JSON.parse(r.stdout); }
  catch (e) { throw new Error(role + ' agent output unparseable: ' + (r.stdout || r.stderr || '').slice(-400)); }
  if (env.is_error) throw new Error(role + ' agent errored: ' + String(env.result).slice(0, 400));
  const u = env.usage || {};
  const tin = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
  metrics.tokensIn += tin; metrics.tokensOut += (u.output_tokens || 0);
  metrics.costUsd += (env.total_cost_usd || 0);
  metrics.agents.push({ role, model, turns: env.num_turns, tokensIn: tin, tokensOut: u.output_tokens || 0, costUsd: env.total_cost_usd || 0, ms: env.duration_ms || 0 });
  log(role + ' done (' + env.num_turns + ' turns, $' + (env.total_cost_usd || 0).toFixed(3) + ')');
  return String(env.result || '');
}

function parseJsonBlock(text, fallback) {
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence ? fence[1] : text;
  const start = raw.indexOf('{');
  if (start === -1) return fallback;
  for (let end = raw.length; end > start; end--) {
    try { return JSON.parse(raw.slice(start, end)); } catch (e) { /* trim trailing junk */ }
  }
  return fallback;
}

/* PASS math: P0s block; P1s block unless declared-pending or critic-waived. */
function score(report, waived) {
  const isWaived = d => waived.some(w => w.code === d.code &&
    (w.selector === d.selector || w.selector === '*'));
  const p0 = report.defects.filter(d => d.severity === 'P0');
  const p1 = report.defects.filter(d => d.severity === 'P1' &&
    d.code !== 'cta-pending-endpoint' && !isWaived(d));
  const pending = report.defects.filter(d => d.code === 'cta-pending-endpoint');
  return { p0, p1, pending, blocking: [...p0, ...p1], value: p0.length * 10 + p1.length };
}

/* ---------------- agent prompts ---------------- */
function criticPrompt(work, shots, report, blocking, priorRounds) {
  const history = priorRounds.length ? `

CONVERGENCE CONTRACT — read carefully. This build has been through ${priorRounds.length} critique round(s) already. Previous round's MAJOR findings and the repairs claimed against them:
${JSON.stringify(priorRounds[priorRounds.length - 1], null, 1)}

You are a FRESH critic, but you are NOT allowed to move the goalposts: if the previous MAJORs are visibly addressed and no NEW rule-violating defect has appeared, your verdict is ship — remaining improvement ideas go in findings as MINOR. Raising brand-new MAJORs at this stage requires them to be things a paying client would reject the page over, with the rule citation to prove it.` : '';
  return `You are the factory's independent taste critic (Agent 05, CRITIQUE step). You did NOT build this page; judge it cold.

Evidence (use the Read tool on each):
- Desktop screenshot (1280px, animations frozen to end-state): ${shots[0]}
- Mobile screenshot (390px): ${shots[1]}
${CRITIC_DOC ? '- Judging rulebook: ' + path.resolve(CRITIC_DOC) : ''}
- Deterministic gate findings (already machine-verified, do not re-litigate): ${JSON.stringify(report.defects.map(d => ({ severity: d.severity, code: d.code, selector: d.selector })), null, 1)}

Judge FIVE dimensions, each 0–1 (anchored: 0.85+ = a $25–50K agency would ship it): hierarchy, typographic craft (rag/measure/spacing), brand fidelity & distinctiveness, composition balance across sections, copy-visual fit. Also flag anything a skeptical client would catch (fabricated-looking numbers, empty charts, dev-note register in copy, generic AI-slop tells).

FINDING DISCIPLINE (factory law — unanchored taste is how repair loops thrash):
- A MAJOR finding MUST cite the rule it violates${CRITIC_DOC ? ' (an R-id or section from the judging rulebook above)' : ' (name the concrete craft principle)'} in its "rule" field. No citation → it is a MINOR.
- A MAJOR must be something a paying client would reject the page over — not a preference.
- NEVER instruct hiding or removing a FUNCTIONAL element (toggles, forms, navigation) as a fix; if one harms the design, escalate for a human decision instead.
- MINORs never block ship; list them for the harvest.
${history}
Waivers: you may waive a P1 gate finding ONLY if it is a checker false-positive or a documented accepted tension (e.g. a measured pack font tripping banned-font). NEVER waive a genuinely repairable defect.

Reply with ONLY this JSON (no prose):
{"verdict":"ship"|"repair"|"escalate","overall":0.0,"scores":{"hierarchy":0,"craft":0,"brand":0,"composition":0,"copyfit":0},"findings":[{"severity":"MAJOR"|"MINOR","rule":"<citation or empty>","where":"<selector/section>","summary":"<one sentence>","fix":"<scoped, concrete instruction>"}],"waived":[{"code":"","selector":"","why":""}]}

verdict=ship only if overall ≥ 0.85 AND no MAJOR findings${blocking.length ? ' (note: ' + blocking.length + ' gate defects are still open — verdict cannot be ship)' : ''}. verdict=escalate only for defects that need a human decision (brand direction, missing client facts).`;
}

function repairPrompt(work, defects, criticFindings, iter) {
  return `You are a FRESH repair agent (Agent 04 in repair mode, iteration ${iter}). Another agent built ${work}; the independent gate found defects. Fix EXACTLY these and nothing else. You do NOT verify your own work — a separate gate re-runs after you.

THE DEFECTS (machine-verified, each message explains the failure and the expected pattern):
${JSON.stringify(defects, null, 1)}
${criticFindings.length ? '\nCRITIC FINDINGS (judgment layer — apply the "fix" instruction, scoped):\n' + JSON.stringify(criticFindings, null, 1) : ''}

HARD RULES (factory law, learned the expensive way — qa/LEDGER.md):
1. SCOPED repairs only: patch the failing selectors/copy; prefer additive corrective CSS; never rewrite working sections, never restructure the reveal-gating system (LED-013: base state visible, animation gated under \`.in\`).
2. cta-dead-anchor: wire the CTA to a REAL in-page destination or handler. If the true endpoint is an unknown client detail (booking URL, email), do NOT invent one — mark the anchor \`href="#" data-verify="<what is needed>"\` so it lands on the client [VERIFY] list.
3. counter-anim-dependent / counter-stuck-at-zero: ship the FINAL value in the markup (formatted, e.g. 725,000); let the existing JS zero it and animate on top. Never fabricate a number that is not already in the page.
4. build-note-phrase: rewrite as READER-FACING words (R32) — "Illustrative — from public filings", "Sample data" — or delete. Never leave instructions-to-developers in copy.
5. No fabrication of any kind: no invented stats, testimonials, URLs, or endpoints.
6. Edit ${work} in place using the Edit tool. Keep the file a single self-contained HTML document.

When done, reply with ONLY this JSON: {"repaired":[{"code":"","selector":"","what":"<one line>"}],"skipped":[{"code":"","selector":"","why":""}]}`;
}

/* ---------------- registry ---------------- */
function appendRegistry(row) {
  let md = fs.existsSync(REGISTRY) ? fs.readFileSync(REGISTRY, 'utf8') : '# BUILD REGISTRY\n';
  const header = '## Pipeline runs (Cherny-audit instrumentation — append-only)';
  if (!md.includes(header)) {
    md += '\n\n' + header + '\n' +
      '*Every `run-pipeline` invocation logs itself. Human touches are 0 by construction here; count\nhuman edits in the session that makes them.*\n\n' +
      '| Date | Build | Entry | Exit | Iter | Agents | Tokens in/out | Cost | Wall-clock | Human touches |\n' +
      '|---|---|---|---|---|---|---|---|---|---|\n';
  }
  fs.writeFileSync(REGISTRY, md.trimEnd() + '\n' + row + '\n');
}

/* ---------------- main ---------------- */
(async () => {
  try {
    let src = path.resolve(fileArg);

    /* RENDER prep: token-contract builds get their assets injected first
       (bench lesson: a stale token-raw file once got reviewed by mistake). */
    if (/\[\[[A-Z_]+\]\]/.test(fs.readFileSync(src, 'utf8'))) {
      const dir = path.dirname(src);
      const buildPy = [path.join(dir, 'build.py'), path.join(dir, '..', 'build.py')].find(fs.existsSync);
      if (!buildPy) throw new Error('file has [[TOKENS]] but no build.py found beside it');
      log('injecting assets via ' + buildPy);
      const r = spawnSync('python3', [buildPy, src], { cwd: path.dirname(buildPy), encoding: 'utf8' });
      if (r.status !== 0) throw new Error('build.py failed: ' + (r.stderr || '').slice(0, 300));
      src = src.replace(/\.html?$/, '-final.html');
      if (!fs.existsSync(src)) throw new Error('build.py did not produce ' + src);
    }

    const work = src.replace(/(-final)?\.html?$/, '') + '.pipeline.html';
    fs.copyFileSync(src, work);
    const shotsDir = work.replace(/\.html$/, '-shots');
    log('work file: ' + work);

    let waived = [];
    let entry = null, criticVerdict = null, exit = 'ESCALATE', reason = '';
    let prevValue = Infinity, baselineP0 = null;
    let iter = 0, tasteRounds = 0;
    const MAX_TASTE_ROUNDS = 2; // gate repairs converge deterministically; taste rounds don't — budget them separately
    const priorRounds = [];     // previous critic MAJORs + repairs claimed, fed forward (anti-goalpost-moving)
    const episode = { build: SLUG, work, started: new Date().toISOString(), iterations: [] };
    const saveEpisode = () => fs.writeFileSync(work.replace(/\.html$/, '.episode.json'), JSON.stringify(episode, null, 2));

    for (; ;) {
      /* INSPECT (always a from-scratch deterministic re-render) */
      log('gate: inspecting ' + path.basename(work) + ' …');
      const report = runGate(work);
      let s = score(report, waived);
      log('gate: ' + s.p0.length + ' P0, ' + s.p1.length + ' blocking P1, ' + s.pending.length + ' pending-endpoint');
      if (entry === null) {
        entry = s.blocking.length ? 'FIX(' + s.p0.length + 'P0/' + s.p1.length + 'P1)' : 'CLEAN';
        baselineP0 = new Set(s.p0.map(d => d.code + '|' + d.selector));
      } else {
        const newP0 = s.p0.filter(d => !baselineP0.has(d.code + '|' + d.selector));
        if (newP0.length) { exit = 'ESCALATE'; reason = 'REGRESSION: repair introduced new P0 ' + newP0[0].code + ' ' + newP0[0].selector; break; }
        if (s.value >= prevValue && s.value > 0) { exit = 'ESCALATE'; reason = 'STALL: defect score ' + s.value + ' did not decrease'; break; }
      }
      prevValue = s.value;

      /* CRITIQUE — a fresh critic adjudicates once the gate is clean (and can
         still send the build back with judgment-layer findings) */
      let criticFindings = [];
      const epIter = { gate: { p0: s.p0.length, p1: s.p1.length, pending: s.pending.length, defects: report.defects } };
      episode.iterations.push(epIter); saveEpisode();
      if (!s.blocking.length) {
        if (NO_CRITIC) { criticVerdict = 'skipped'; exit = 'PASS'; reason = 'gate clean (critic disabled)'; break; }
        log('critique: gate clean — spawning fresh critic on frozen screenshots');
        const shots = takeShots(work, shotsDir);
        const out = claudeAgent('critic', criticPrompt(work, shots, report, s.blocking, priorRounds), { model: CRITIC_MODEL, tools: 'Read' });
        const v = parseJsonBlock(out, null);
        if (!v) { exit = 'ESCALATE'; reason = 'critic output unparseable'; break; }
        // finding discipline is enforced mechanically too: an uncited MAJOR is a MINOR
        (v.findings || []).forEach(f => { if (f.severity === 'MAJOR' && !(f.rule || '').trim()) f.severity = 'MINOR'; });
        epIter.critic = v; saveEpisode();
        criticVerdict = v.verdict + ' (' + (v.overall != null ? v.overall.toFixed(2) : '?') + ')';
        (v.waived || []).forEach(w => { if (w.code) waived.push(w); });
        s = score(report, waived); // waivers may clear remaining P1s
        criticFindings = (v.findings || []).filter(f => f.severity === 'MAJOR');
        if (v.verdict === 'ship' && !s.blocking.length) { exit = 'PASS'; reason = 'gate clean + critic ship'; break; }
        if (v.verdict === 'escalate') { exit = 'ESCALATE'; reason = 'critic escalated: ' + JSON.stringify((v.findings || [])[0] || {}); break; }
        if (!criticFindings.length && !s.blocking.length) { exit = 'PASS'; reason = 'gate clean, no rule-cited MAJOR findings'; break; }
        if (tasteRounds >= MAX_TASTE_ROUNDS) { exit = 'ESCALATE'; reason = 'taste-round cap (' + MAX_TASTE_ROUNDS + '): critic still has rule-cited MAJORs after ' + tasteRounds + ' repair rounds — needs a human eye'; break; }
        tasteRounds++;
      }

      /* REPAIR (fresh agent, scoped) */
      if (iter >= MAX_ITER) { exit = 'ESCALATE'; reason = 'iteration cap (' + MAX_ITER + ') hit with open defects'; break; }
      iter++;
      log('repair: iteration ' + iter + ' — ' + s.blocking.length + ' gate defects, ' + criticFindings.length + ' critic MAJORs');
      const repairOut = claudeAgent('repair#' + iter, repairPrompt(work, s.blocking, criticFindings, iter), { model: REPAIR_MODEL, tools: 'Read,Edit,Write' });
      epIter.repair = parseJsonBlock(repairOut, { raw: repairOut.slice(0, 500) }); saveEpisode();
      if (criticFindings.length) priorRounds.push({ criticMajors: criticFindings, repairsClaimed: epIter.repair });
      /* RE-VERIFY happens at the top of the loop — from scratch, fresh gate. */
    }
    episode.finished = new Date().toISOString(); saveEpisode();

    /* ---------------- verdict + metrics ---------------- */
    const wall = Math.round((Date.now() - t0) / 1000);
    const result = {
      verdict: exit, reason, entry, criticVerdict,
      repairIterations: iter, workFile: work,
      humanTouches: 0,
      metrics: { wallClockSec: wall, tokensIn: metrics.tokensIn, tokensOut: metrics.tokensOut, costUsd: +metrics.costUsd.toFixed(4), agents: metrics.agents },
    };
    const row = '| ' + [new Date().toISOString().slice(0, 10), SLUG, entry, exit + (criticVerdict ? ' · critic ' + criticVerdict : ''),
      iter, metrics.agents.map(a => a.role + ':' + a.model).join(' ') || '—',
      (metrics.tokensIn / 1000).toFixed(0) + 'k/' + (metrics.tokensOut / 1000).toFixed(1) + 'k',
      '$' + metrics.costUsd.toFixed(2), wall + 's', '0'].join(' | ') + ' |';
    appendRegistry(row);
    log('registry row appended to ' + path.relative(REPO, REGISTRY));
    console.log(JSON.stringify(result, null, 2));
    process.exit(exit === 'PASS' ? 0 : 1);
  } catch (e) {
    console.error('run-pipeline error:', e.message);
    process.exit(2);
  }
})();
