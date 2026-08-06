#!/usr/bin/env node
/*
 * factory.js — the foreman. One command runs intake → research → strategy →
 * direction → copy → copy-gate → build → gauntlet, pausing at the two human
 * gates. Every stage is a fresh subprocess spawn of whatever CLI the config
 * assigns to that role — claude, hermes, codex, anything. Zero dependencies.
 *
 *   node factory.js print <client>            run/resume the pipeline
 *   node factory.js print <client> --dry-run  show the plan, spawn nothing
 *   node factory.js approve <client> <gate>   approve a gate, auto-continue
 *   node factory.js status <client>           where is this client?
 *
 * Model routing lives in factory.config.json. Roles with io:"stdout" get
 * their inputs embedded in the prompt and their stdout written to the output
 * file (works with ANY model CLI). Roles with io:"tools" are told the paths
 * and write files themselves (needs a tool-capable CLI: claude/hermes/codex).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(REPO, 'factory.config.json'), 'utf8'));

function log(msg) { console.log('[factory ' + new Date().toISOString().slice(11, 19) + '] ' + msg); }
function die(msg) { console.error('FATAL: ' + msg); process.exit(1); }

/* ---------------- stage graph ---------------- */
/* inputs marked ? are optional. gateBefore pauses BEFORE the stage runs. */
const STAGES = [
  { name: 'research', role: 'research', agent: 'agents/01_research.md',
    inputs: ['INTAKE.md', '?research/INTERVIEW_TRANSCRIPT.md', '?research/BLACK_BOOK.md'],
    output: 'research/ICP_BRIEF.md' },
  { name: 'strategy', role: 'strategy', agent: 'agents/02_strategy.md',
    inputs: ['INTAKE.md', 'research/ICP_BRIEF.md', '?research/BLACK_BOOK.md', '?research/INTERVIEW_TRANSCRIPT.md'],
    output: 'strategy/COPY_STRATEGY.md' },
  { name: 'direction', role: 'director', agent: 'agents/00_director.md',
    inputs: ['INTAKE.md', 'research/ICP_BRIEF.md', 'strategy/COPY_STRATEGY.md'],
    output: 'briefs/BUILD_BRIEF.md' },
  { name: 'copy', role: 'copy', agent: 'agents/03_copy.md', gateBefore: 'direction',
    inputs: ['strategy/COPY_STRATEGY.md', 'research/ICP_BRIEF.md', 'INTAKE.md', '?research/BLACK_BOOK.md'],
    output: 'copy/COPY_ALL.md' },
  { name: 'copygate', role: 'copygate', agent: 'agents/03.5_copy_gate.md',
    inputs: ['copy/COPY_ALL.md', 'strategy/COPY_STRATEGY.md', 'research/ICP_BRIEF.md', '?research/BLACK_BOOK.md'],
    output: 'copy/COPY_GATE.md', blockOn: 'VERDICT: REPAIR' },
  { name: 'build', role: 'build', agent: 'agents/04_build.md',
    inputs: ['briefs/BUILD_BRIEF.md', 'copy/COPY_ALL.md'],
    output: 'build/index.html' },
  { name: 'gauntlet', role: null, agent: null, inputs: ['build/index.html'], output: 'qa/QA_REPORT.md' },
  { name: 'ship', role: null, agent: null, gateBefore: 'ship', inputs: [], output: null },
];

/* ---------------- state ---------------- */
function statePath(proj) { return path.join(proj, '.factory-state.json'); }
function loadState(proj) {
  try { return JSON.parse(fs.readFileSync(statePath(proj), 'utf8')); }
  catch (e) { return { done: [], gates: {}, log: [] }; }
}
function saveState(proj, st) { fs.writeFileSync(statePath(proj), JSON.stringify(st, null, 2)); }

/* ---------------- spawning ---------------- */
function resolveRC(name) {
  return (CONFIG.roles && CONFIG.roles[name]) ||
         (CONFIG.alternates && CONFIG.alternates[name]) || null;
}

/* Strip the "review diff" wrapper that GLM/DeepSeek emit via Hermes headless.
 * Recognized format (with \r\n line endings):
 *   ┊ **review diff**\r\n
 *   a/path → b/path\r\n
 *   @@ -0,0 +1,N @@\r\n
 *   +actual content line\r\n
 *   +actual content line\r\n
 *   ...
 *   <trailing meta: "File created and committed...">
 * Strategy: if the @@ hunks are present, extract only '+' lines (strip leading +).
 * If there are no diff markers but the text starts with a model meta-preamble,
 * leave it alone (the prompt-level guard handles that). */
function stripDiffWrapper(text) {
  if (!text) return text;
  /* Only process if we see the diff hunk header */
  const hasHunk = /^┊\s*\*{0,2}\s*review diff|@@ -\d+/m.test(text);
  if (!hasHunk) return text;
  const lines = text.split(/\r?\n/);
  const contentLines = [];
  let inHunk = false;
  let sawContent = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    /* skip diff headers: review-diff banner, a/path→b/path, hunk markers */
    if (/^┊/.test(line)) continue;
    if (/^[ab]\//.test(line) && line.includes('→')) continue;
    if (/^@@/.test(line)) { inHunk = true; continue; }
    if (inHunk || sawContent) {
      /* content lines in a unified diff start with + */
      if (/^\+/.test(line)) {
        contentLines.push(line.slice(1));
        sawContent = true;
      } else if (/^-/.test(line)) {
        /* removed lines — skip */
      } else if (sawContent && line.trim() === '') {
        /* blank line inside content — keep as paragraph break */
        contentLines.push(line);
      } else if (sawContent && !/^(┊|[ab]\/|@@)/.test(line)) {
        /* non-diff content after hunk started — likely trailing meta or continued content */
        /* stop at meta-commentary patterns */
        if (/^(Written to|File created|File written|Done\.|Ready for|I've created|Committing|Committed)/i.test(line.trim())) {
          break;
        }
        /* Also catch "FILENAME.md created/committed for..." style meta that comes
         * on the same line as content without a newline break */
        if (/\w+\.md\s+(created|written|committed)\b/i.test(line.trim())) {
          break;
        }
        contentLines.push(line);
      }
    }
  }
  if (contentLines.length === 0) return text; /* safety: don't return empty */
  return contentLines.join('\n').replace(/\n{3,}/g, '\n\n\n').trim() + '\n';
}

/* Errors that are likely transient (network/auth/rate) — worth retrying the
 * same model before falling through to the next candidate. */
function isTransient(err) {
  return /401|403|429|timeout|ETIMEDOUT|ECONNRESET|ECONNREFUSED|EOF|temporar|retry|overloaded|5\d\d/i.test(err);
}

function tryOne(label, rc, prompt) {
  const args = rc.args.map(a => a === '{PROMPT}' ? prompt : a);
  log(label + ' → ' + rc.cmd + ' (' + (rc.label || rc.args.join(' ').slice(0, 60)) + ')');
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) log(label + ' retry ' + attempt + '/' + maxAttempts + ' (transient error)');
    const r = spawnSync(rc.cmd, args, {
      encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
      timeout: (rc.timeoutMin || 25) * 60000, cwd: REPO,
    });
    /* Check for spawn / exit failures that may be transient (401, 429, timeout, etc).
     * Retry the same model before falling through to the next in the fallback chain. */
    if (r.error) {
      const e = 'spawn failed: ' + r.error.message;
      if (isTransient(e) && attempt < maxAttempts) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000 * attempt); continue; }
      return { err: e };
    }
    if (r.status !== 0 && !r.stdout) {
      const e = 'exited ' + r.status + ': ' + (r.stderr || '').slice(-400);
      if (isTransient(e) && attempt < maxAttempts) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000 * attempt); continue; }
      return { err: e };
    }
    /* --- output validation (same model as before) --- */
    if (rc.parse === 'claude-json') {
      let env;
      try { env = JSON.parse(r.stdout); } catch (e) { return { err: 'output unparseable: ' + (r.stdout || '').slice(-300) }; }
      if (env.is_error) {
        const e = 'agent errored: ' + String(env.result).slice(0, 400);
        if (isTransient(e) && attempt < maxAttempts) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000 * attempt); continue; }
        return { err: e };
      }
      return { text: String(env.result || ''), costUsd: env.total_cost_usd || 0 };
    }
    if (!r.stdout || r.stdout.trim().length < 20) return { err: 'empty/near-empty stdout' };
    let text = r.stdout;
    /* Catch provider/API errors that come back as short stdout strings (e.g. the
     * "HTTP 401: Missing Authentication header" that once became a 40-byte copy file). */
    if (text.trim().length < 500) {
      const s = text.trim();
      if (/^(HTTP \d{3}|Error\b|Unauthorized|Forbidden|Missing Authentication|401|403|500 Internal)/i.test(s)) {
        if (isTransient(s) && attempt < maxAttempts) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 3000 * attempt); continue; }
        return { err: 'provider error in stdout (' + s.length + ' bytes): ' + s.slice(0, 200) };
      }
      /* Catch meta-summary pattern: model describes what it "wrote" instead of
       * outputting the content (e.g. "Written to file. Key points:...") */
      if (/^(Written to|File created|File written|I've created|I have created|Here (is|are) the)/i.test(s))
        return { err: 'meta-summary instead of content (' + s.length + ' bytes): ' + s.slice(0, 200) };
    }
    /* Strip "review diff" wrapper that GLM/DeepSeek emit via Hermes headless. */
    text = stripDiffWrapper(text);
    if (text.trim().length < 20) return { err: 'output empty after diff-stripping (was pure diff header / no content)' };
    return { text, costUsd: 0 };
  }
  return { err: 'exhausted retries' };
}

/* Primary first, then each named fallback (from roles/alternates) in order.
 * The fallback chain is the runtime auto-selector: quality is protected by the
 * gates, so a fallback model failing to SPAWN is recoverable, and a fallback
 * model producing weak work gets caught downstream like anyone else's. */
function spawnRole(role, prompt) {
  const rc = CONFIG.roles[role];
  if (!rc) die('no role "' + role + '" in factory.config.json');
  const chain = [{ name: role, rc }].concat(
    (rc.fallbacks || []).map(n => ({ name: n, rc: resolveRC(n) })).filter(c => c.rc));
  const errs = [];
  for (const c of chain) {
    const res = tryOne(role + (c.name === role ? '' : ' [fallback: ' + c.name + ']'), c.rc, prompt);
    if (!res.err) { if (c.name !== role) log('NOTE: ' + role + ' served by fallback "' + c.name + '"'); return res; }
    errs.push(c.name + ': ' + res.err);
    log(role + ' candidate "' + c.name + '" failed — ' + res.err.slice(0, 120));
  }
  die(role + ' failed on every candidate:\n  ' + errs.join('\n  '));
}

/* ---------------- prompt assembly ---------------- */
function readIf(p) { try { return fs.readFileSync(p, 'utf8'); } catch (e) { return null; } }

function buildPrompt(stage, proj, client) {
  const agentDoc = fs.readFileSync(path.join(REPO, stage.agent), 'utf8');
  const rc = CONFIG.roles[stage.role];
  const outAbs = path.join(proj, stage.output);
  const resolved = stage.inputs.map(i => {
    const opt = i.startsWith('?'); const rel = opt ? i.slice(1) : i;
    const abs = path.join(proj, rel);
    const content = readIf(abs);
    if (!content && !opt) die('stage "' + stage.name + '" missing required input: ' + abs);
    return content ? { rel, abs, content } : null;
  }).filter(Boolean);

  if (rc.io === 'tools') {
    return agentDoc + '\n\n---\nCLIENT: ' + client +
      '\nPROJECT FOLDER: ' + proj +
      '\nINPUT FILES (read all of them first):\n' + resolved.map(f => '- ' + f.abs).join('\n') +
      '\nWrite your complete output to: ' + outAbs +
      '\nCreate parent folders if needed. Write the file, then reply DONE.';
  }
  /* stdout mode — embed inputs, capture stdout as the output file */
  return agentDoc + '\n\n---\nCLIENT: ' + client + '\n' +
    resolved.map(f => '\n=== INPUT: ' + f.rel + ' ===\n' + f.content).join('\n') +
    '\n\n---\nReturn ONLY the complete contents of ' + stage.output +
    ' — no preamble, no commentary, no code fences, no review diff, no meta-summary.\n' +
    'Output the file content directly as your entire response. Do not describe what you wrote.\n' +
    'Do not wrap in diff format. Do not add lines like "File created" or "Written to".\n' +
    'Do not summarize or explain. The ENTIRE response must be the file contents.';
}

/* ---------------- gates ---------------- */
function gateFile(proj, gate) { return path.join(proj, 'GATE_' + gate + '.md'); }
function requestGate(proj, client, gate, st) {
  const notes = {
    direction: 'Review the Build Brief (briefs/BUILD_BRIEF.md) and hero preview(s). ' +
      'Wrong direction costs one section, not a site — this is the moment to redirect.',
    ship: 'Review the gauntlet-clean build on the review link. ' +
      'Approval here ships it. Every correction you make must land as a rule/check/pattern (LEDGER).',
  };
  fs.writeFileSync(gateFile(proj, gate),
    '# HUMAN GATE: ' + gate + ' — ' + client + '\n\n' + (notes[gate] || '') +
    '\n\nApprove with:\n\n    node factory.js approve ' + client + ' ' + gate + '\n');
  notifySlack('🚪 Factory gate "' + gate + '" ready for review — client: ' + client +
    '. Approve: node factory.js approve ' + client + ' ' + gate);
  log('PAUSED at gate "' + gate + '". Wrote ' + gateFile(proj, gate));
  log('Approve from anywhere: node factory.js approve ' + client + ' ' + gate);
}
function notifySlack(text) {
  const url = process.env.FACTORY_SLACK_WEBHOOK;
  if (!url) return;
  try {
    const r = spawnSync('curl', ['-s', '-X', 'POST', '-H', 'Content-type: application/json',
      '--data', JSON.stringify({ text }), url], { encoding: 'utf8', timeout: 15000 });
    if (r.status !== 0) log('slack notify failed (non-fatal)');
  } catch (e) { /* non-fatal */ }
}

/* ---------------- registry ---------------- */
function logRegistry(client, line) {
  const reg = path.join(REPO, 'docs', 'BUILD_REGISTRY.md');
  try { fs.appendFileSync(reg, '\n- **' + new Date().toISOString().slice(0, 10) + ' ' + client + ' (factory.js):** ' + line); }
  catch (e) { /* non-fatal */ }
}

/* ---------------- the run ---------------- */
function print(client, dryRun) {
  const proj = path.join(REPO, 'projects', client);
  if (!fs.existsSync(path.join(proj, 'INTAKE.md'))) die('no INTAKE.md at ' + proj + ' — intake is the only human-authored input; start there.');
  const st = loadState(proj);
  let totalCost = 0;

  /* Stage 0b — deep research chain (Perplexity search + GLM reasoning + Gemini
   * verify, per its own .env). Auto-runs when no Black Book exists yet, so the
   * factory always consumes verified deep research rather than silently
   * skipping it. A FAILED verification is honored: no Black Book is produced
   * and the print continues on intake-only research, loudly. */
  const rc = CONFIG.researchChain;
  const bb = path.join(proj, 'research', 'BLACK_BOOK.md');
  if (rc && rc.enabled && !fs.existsSync(bb) && !st.done.includes('deepresearch')) {
    if (dryRun) { log('(dry) stage 0b deep-research chain → research/BLACK_BOOK.md (runner: ' + rc.runner + ')'); }
    else {
      log('deep-research chain starting (Perplexity→GLM→Gemini; 10-20 min)…');
      const r = spawnSync(rc.cmd || 'python3', [rc.runner, path.join(proj, 'INTAKE.md'), '--outdir', path.join(proj, 'research')],
        { encoding: 'utf8', stdio: 'inherit', timeout: (rc.timeoutMin || 45) * 60000, cwd: path.dirname(rc.runner) });
      const book = path.join(proj, 'research', '05-black-book.md');
      if (r.status === 0 && fs.existsSync(book)) {
        fs.copyFileSync(book, bb);
        log('deep research VERIFIED → research/BLACK_BOOK.md');
      } else {
        log('⚠ deep research did not pass verification (exit ' + r.status + ') — continuing WITHOUT a Black Book. See research/06-verification-*.md.');
      }
      st.done.push('deepresearch'); saveState(proj, st);
    }
  }

  for (const stage of STAGES) {
    if (st.done.includes(stage.name)) continue;

    if (stage.gateBefore && !st.gates[stage.gateBefore]) {
      if (dryRun) { log('(dry) ⏸ would pause at human gate: ' + stage.gateBefore); }
      else {
        requestGate(proj, client, stage.gateBefore, st);
        saveState(proj, st);
        return;
      }
    }

    if (dryRun) {
      const rc = stage.role ? CONFIG.roles[stage.role] : null;
      log('(dry) stage ' + stage.name + ' → ' + (rc ? rc.cmd + ' [' + (rc.label || '') + ']' : 'internal') +
        ' → ' + (stage.output || '-'));
      continue;
    }

    if (stage.name === 'gauntlet') {
      const build = path.join(proj, 'build', 'index.html');
      const accent = (CONFIG.projects && CONFIG.projects[client] && CONFIG.projects[client].accent) || '';
      log('gauntlet: node qa/run-pipeline.js ' + build + (accent ? ' --accent ' + accent : ''));
      const args = [path.join(REPO, 'qa', 'run-pipeline.js'), build];
      if (accent) args.push('--accent', accent);
      const r = spawnSync('node', args, { encoding: 'utf8', stdio: 'inherit', timeout: 3600000, cwd: REPO });
      if (r.status !== 0) {
        logRegistry(client, 'gauntlet ESCALATED — human review needed before ship gate.');
        die('gauntlet did not PASS — see its output above. Fix/escalate, then re-run print.');
      }
      st.done.push('gauntlet'); saveState(proj, st);
      continue;
    }

    if (stage.name === 'ship') {
      log('SHIP approved. Deploy per docs/CLIENT-OPS.md, register the vector in BUILD_REGISTRY, then HARVEST (patterns → catalog, defects → LEDGER, episode → FACTORY_LEARNING).');
      logRegistry(client, 'shipped via factory.js print. Total stage cost this run: $' + totalCost.toFixed(2));
      st.done.push('ship'); saveState(proj, st);
      return;
    }

    const prompt = buildPrompt(stage, proj, client);
    const t0 = Date.now();
    const res = spawnRole(stage.role, prompt);
    totalCost += res.costUsd;

    const outAbs = path.join(proj, stage.output);
    if (CONFIG.roles[stage.role].io !== 'tools') {
      fs.mkdirSync(path.dirname(outAbs), { recursive: true });
      fs.writeFileSync(outAbs, res.text.trim() + '\n');
    }
    if (!fs.existsSync(outAbs) || fs.statSync(outAbs).size < 200) {
      die('stage "' + stage.name + '" produced no usable output at ' + outAbs);
    }
    if (stage.blockOn) {
      const out = fs.readFileSync(outAbs, 'utf8');
      if (out.includes(stage.blockOn)) {
        notifySlack('🛑 Copy gate returned REPAIR for ' + client + ' — see copy/COPY_GATE.md');
        die('copy gate verdict: REPAIR. Fix copy per copy/COPY_GATE.md (re-run stage by deleting "copygate"+"copy" from .factory-state.json done list), then re-run print.');
      }
    }
    st.done.push(stage.name);
    st.log.push({ stage: stage.name, role: stage.role, costUsd: res.costUsd, ms: Date.now() - t0, at: new Date().toISOString() });
    saveState(proj, st);
    log('stage ' + stage.name + ' done → ' + stage.output + (res.costUsd ? ' ($' + res.costUsd.toFixed(3) + ')' : ''));

    /* Budget guardrail: pause if cumulative cost exceeds per-client budget.
       Config: factory.config.json → projects.<client>.budgetUsd (default: no cap).
       On breach: log, notify, and exit — re-run after investigating or raising the cap. */
    const budget = CONFIG.projects && CONFIG.projects[client] && CONFIG.projects[client].budgetUsd;
    if (budget && totalCost >= budget) {
      notifySlack('⚠️ Budget guardrail hit for ' + client + ': $' + totalCost.toFixed(2) + ' ≥ $' + budget + ' cap. Pipeline paused.');
      die('BUDGET GUARDRAIL: cumulative cost $' + totalCost.toFixed(2) + ' reached the $' + budget +
          ' cap for ' + client + '.\n  Investigate the last stage, or raise the budget in factory.config.json → projects.' + client + '.budgetUsd.\n  To resume after raising: node factory.js print ' + client);
    }
  }
  log('pipeline complete for ' + client + '.');
}

/* ---------------- audition: run any candidate through the model-bench ---------------- */
function audition(name) {
  const rc = resolveRC(name);
  if (!rc) die('no role or alternate named "' + name + '" in factory.config.json');
  const packet = path.join(REPO, 'benchmarks', 'model-bench', 'packet.txt');
  if (!fs.existsSync(packet)) die('bench packet missing: ' + packet);
  const prompt = fs.readFileSync(packet, 'utf8');
  log('audition "' + name + '" — one-shot on the bench packet (' + Math.round(prompt.length / 1024) + 'KB)…');
  const res = tryOne('audition:' + name, rc, prompt);
  if (res.err) die('audition failed: ' + res.err);
  let html = res.text.trim();
  const fence = html.match(/```(?:html)?\s*([\s\S]*?)```\s*$/);
  if (fence && fence[1].trim().toLowerCase().startsWith('<!doctype')) html = fence[1].trim();
  /* Reject non-builds: provider errors, refusals, and truncated stubs must never
   * become "candidates" (a 40-byte HTTP 401 once trivially passed the gate). */
  const lower = html.toLowerCase();
  if (html.length < 5000 || (!lower.includes('<!doctype') && !lower.includes('<html'))) {
    die('audition output is not a plausible build (' + html.length + ' bytes). First 200 chars:\n' + html.slice(0, 200));
  }
  const out = path.join(REPO, 'benchmarks', 'model-bench', 'runs', 'candidate-' + name + '.html');
  fs.writeFileSync(out, html + '\n');
  log('one-shot saved → ' + out + (res.costUsd ? ' ($' + res.costUsd.toFixed(3) + ')' : ''));
  log('Score it (gauntlet, same as every candidate):');
  log('  node qa/run-pipeline.js ' + out);
  log('Then log the verdict in benchmarks/model-bench/README.md + BUILD_REGISTRY — the leaderboard is the hiring authority.');
}

/* ---------------- init: scaffold a new client project ---------------- */
function initClient(client) {
  if (!client || !/^[a-z0-9-]+$/.test(client))
    die('client slug must be lowercase kebab-case (e.g. jesse-holman, anchor-wealth)');

  const proj = path.join(REPO, 'projects', client);
  if (fs.existsSync(proj))
    die('project already exists: ' + proj + '\n  To restart, delete the folder first.');

  // Create the folder structure
  const dirs = ['', 'research', 'strategy', 'copy', 'build', 'qa', 'briefs', 'assets'];
  dirs.forEach(d => fs.mkdirSync(path.join(proj, d), { recursive: true }));

  // Copy INTAKE template
  const intakeTpl = readIf(path.join(REPO, 'templates', '_base', 'INTAKE.md'));
  const intakePath = path.join(proj, 'INTAKE.md');
  if (intakeTpl) {
    fs.writeFileSync(intakePath, intakeTpl.replace('# Client Intake — Website Brief',
      '# Client Intake — ' + client));
  } else {
    fs.writeFileSync(intakePath, '# INTAKE — ' + client + '\n\n(Fill this out before running the pipeline)\n');
  }

  // Create a .gitkeep in assets so the folder is tracked
  fs.writeFileSync(path.join(proj, 'assets', '.gitkeep'), '');

  // Initialize empty factory state
  saveState(proj, { done: [], gates: {}, log: [] });

  // Add accent to factory.config.json if we can guess one (default gold)
  if (CONFIG.projects && !CONFIG.projects[client]) {
    CONFIG.projects[client] = { accent: '#C9A227' };
    fs.writeFileSync(path.join(REPO, 'factory.config.json'), JSON.stringify(CONFIG, null, 2));
  }

  // Create a branch for this client
  const branch = spawnSync('git', ['checkout', '-b', 'client/' + client],
    { encoding: 'utf8', cwd: REPO });
  const onBranch = branch.status === 0;

  log('scaffolded ' + client + ' → projects/' + client + '/');
  log('  folders: research/ strategy/ copy/ build/ qa/ briefs/ assets/');
  log('  intake:  INTAKE.md (from template — fill this out)');
  log('  state:   .factory-state.json (empty, ready)');
  if (onBranch) {
    log('  branch:  client/' + client + ' (created + checked out)');
  } else {
    log('  branch:  could not create client/' + client + ' (create manually: git checkout -b client/' + client + ')');
  }
  log('');
  log('Next steps:');
  log('  1. Fill in projects/' + client + '/INTAKE.md');
  log('  2. Drop any raw transcripts → projects/' + client + '/research/INTERVIEW_TRANSCRIPT.md');
  log('  3. Drop brand assets (logos, photos) → projects/' + client + '/assets/');
  log('  4. Run: node factory.js print ' + client + ' --dry-run   (preview)');
  log('  5. Run: node factory.js print ' + client + '              (build)');
}

/* ---------------- CLI ---------------- */
const [, , cmd, client, arg3] = process.argv;
const dryRun = process.argv.includes('--dry-run');
if (cmd === 'init' && client) {
  initClient(client);
} else if (cmd === 'print' && client) {
  print(client, dryRun);
} else if (cmd === 'audition' && client) {
  audition(client);
} else if (cmd === 'approve' && client && arg3) {
  const proj = path.join(REPO, 'projects', client);
  const st = loadState(proj);
  st.gates[arg3] = new Date().toISOString();
  saveState(proj, st);
  try { fs.unlinkSync(gateFile(proj, arg3)); } catch (e) { /* ok */ }
  log('gate "' + arg3 + '" approved — continuing.');
  print(client, false);
} else if (cmd === 'status' && client) {
  const st = loadState(path.join(REPO, 'projects', client));
  console.log(JSON.stringify(st, null, 2));
} else if (cmd === 'list') {
  const projDir = path.join(REPO, 'projects');
  if (fs.existsSync(projDir)) {
    const clients = fs.readdirSync(projDir).filter(d =>
      fs.statSync(path.join(projDir, d)).isDirectory() &&
      fs.existsSync(path.join(projDir, d, 'INTAKE.md')));
    clients.forEach(c => {
      const st = loadState(c);
      const stages = st.done ? st.done.length : 0;
      const gateInfo = st.gates && Object.keys(st.gates).length > 0
        ? ' | gates: ' + Object.keys(st.gates).join(', ')
        : '';
      console.log('  ' + c + ' — ' + stages + ' stages done' + gateInfo);
    });
  }
} else {
  console.log('usage:\n' +
    '  node factory.js init <client>                    scaffold a new project (folders + intake + branch)\n' +
    '  node factory.js list                             show all clients + pipeline status\n' +
    '  node factory.js print <client> [--dry-run]       run the pipeline (resumes from last stage)\n' +
    '  node factory.js approve <client> <gate>          approve a human gate + auto-continue\n' +
    '  node factory.js status <client>                  show detailed state for a client\n' +
    '  node factory.js audition <role-or-alternate>     run a model through the bench packet');
  process.exit(1);
}
