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

function tryOne(label, rc, prompt) {
  const args = rc.args.map(a => a === '{PROMPT}' ? prompt : a);
  log(label + ' → ' + rc.cmd + ' (' + (rc.label || rc.args.join(' ').slice(0, 60)) + ')');
  const r = spawnSync(rc.cmd, args, {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
    timeout: (rc.timeoutMin || 25) * 60000, cwd: REPO,
  });
  if (r.error) return { err: 'spawn failed: ' + r.error.message };
  if (r.status !== 0 && !r.stdout) return { err: 'exited ' + r.status + ': ' + (r.stderr || '').slice(-400) };
  if (rc.parse === 'claude-json') {
    let env;
    try { env = JSON.parse(r.stdout); } catch (e) { return { err: 'output unparseable: ' + (r.stdout || '').slice(-300) }; }
    if (env.is_error) return { err: 'agent errored: ' + String(env.result).slice(0, 400) };
    return { text: String(env.result || ''), costUsd: env.total_cost_usd || 0 };
  }
  if (!r.stdout || r.stdout.trim().length < 20) return { err: 'empty/near-empty stdout' };
  return { text: r.stdout, costUsd: 0 };
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
    ' — no preamble, no commentary, no code fences.';
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

/* ---------------- CLI ---------------- */
const [, , cmd, client, arg3] = process.argv;
const dryRun = process.argv.includes('--dry-run');
if (cmd === 'print' && client) {
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
} else {
  console.log('usage:\n  node factory.js print <client> [--dry-run]\n  node factory.js approve <client> <gate>\n  node factory.js status <client>\n  node factory.js audition <role-or-alternate>   run a candidate through the model-bench packet');
  process.exit(1);
}
