#!/usr/bin/env node
/* ============================================================================
   qa/replay.js — the anti-regression replay corpus (FACTORY_LEARNING layer 2,
   Cherny audit: "bench as regression suite")
   ----------------------------------------------------------------------------
   Re-runs the deterministic gate over a pinned corpus of known-good and
   known-bad builds and fails on ANY drift:
     - the GOLD build's scores may never get worse (new P0/P1/P2 = a check
       change or doc change just lowered the golden build — rejected),
     - every fixture and bench candidate must still FIRE the defects it
       exists to prove (a check edit that stops catching a known defect is
       a silent regression — rejected),
     - known-good cases must stay silent on the codes they pin.

   Run it after ANY change to qa/*.js, agent prompts, template docs, or the
   gold build. The pre-commit hook (.githooks/pre-commit) does this
   automatically — install once with:  git config core.hooksPath .githooks

   To CONSCIOUSLY re-pin (a new check legitimately found something new):
   fix the build or update qa/replay-manifest.json in the same commit, with
   a LEDGER entry saying why.

   USAGE: node qa/replay.js [--only <substring>]
   Exit 0 = corpus intact. 1 = drift. 2 = harness error.
   ============================================================================ */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'replay-manifest.json'), 'utf8'));
const only = (() => { const i = process.argv.indexOf('--only'); return i !== -1 ? process.argv[i + 1] : null; })();

let failures = 0;
const say = m => console.log(m);

for (const c of manifest.cases) {
  if (only && !c.file.includes(only) && !(c.name || '').includes(only)) continue;
  const file = path.join(REPO, c.file);
  if (!fs.existsSync(file)) { say('✗ ' + c.file + ' — MISSING FILE'); failures++; continue; }
  const args = [path.join(__dirname, 'run-checks.js'), file];
  if (c.accent) args.push(c.accent);
  const r = spawnSync('node', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 900000 });
  let rep;
  try { rep = JSON.parse(r.stdout); }
  catch (e) { say('✗ ' + c.file + ' — gate output unparseable: ' + (r.stderr || '').slice(0, 200)); failures++; continue; }

  const fired = new Set();
  rep.defects.forEach(d => {
    fired.add(d.code);
    if (d.data && d.data.reason) fired.add(d.code + ':' + d.data.reason);
  });
  const e = c.expect || {};
  const problems = [];
  if (e.exactP0 != null && rep.blockers !== e.exactP0) problems.push('P0=' + rep.blockers + ' (pinned ' + e.exactP0 + ')');
  if (e.maxP0 != null && rep.blockers > e.maxP0) problems.push('P0=' + rep.blockers + ' (max ' + e.maxP0 + ')');
  if (e.minP0 != null && rep.blockers < e.minP0) problems.push('P0=' + rep.blockers + ' (min ' + e.minP0 + ' — a known defect stopped firing)');
  if (e.maxP1 != null && rep.warnings > e.maxP1) problems.push('P1=' + rep.warnings + ' (max ' + e.maxP1 + ')');
  if (e.maxP2 != null && rep.polish > e.maxP2) problems.push('P2=' + rep.polish + ' (max ' + e.maxP2 + ')');
  (e.mustFire || []).forEach(code => { if (!fired.has(code)) problems.push('MUST-FIRE ' + code + ' did not fire'); });
  (e.mustNotFire || []).forEach(code => { if (fired.has(code)) problems.push('MUST-NOT-FIRE ' + code + ' fired'); });

  if (problems.length) {
    failures++;
    say('✗ ' + (c.name || c.file) + ' — DRIFT: ' + problems.join(' · '));
  } else {
    say('✓ ' + (c.name || c.file) + ' (' + rep.blockers + ' P0 / ' + rep.warnings + ' P1 / ' + rep.polish + ' P2)');
  }
}

if (failures) {
  say('\nREPLAY CORPUS BROKEN: ' + failures + ' case(s) drifted. A doc/check/build change lowered a pinned score or silenced a known defect. Fix it, or consciously re-pin qa/replay-manifest.json in the same commit with a LEDGER entry.');
  process.exit(1);
}
say('\nCorpus intact.');
process.exit(0);
