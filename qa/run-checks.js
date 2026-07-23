#!/usr/bin/env node
/* ============================================================================
   qa/run-checks.js — zero-dependency headless visual-QA runner
   ----------------------------------------------------------------------------
   Lets a FRESH, INDEPENDENT QA agent verify a build under the established rules
   without the main-thread preview tool. Drives the system Chrome via the
   DevTools Protocol using only Node built-ins (native WebSocket — Node 22+,
   native fetch, child_process). No npm, no puppeteer.

   USAGE:
     node qa/run-checks.js <path-to-build.html> [accentHex]
   e.g.
     node qa/run-checks.js projects/field/build/index-rebuild.html '#DC3C20'

   WHAT RUNS (in order — later steps mutate the page, order is load-bearing):
     Main load:  freeze animations to end-state → __visualChecks (geometry +
                 slop + LED-016 build-note phrases) → __ctaAudit (LED-014
                 static: self-anchor / missing-target / declared-pending) →
                 __counterCensus (LED-015: scroll-exercise + settle, visible
                 counters) → __opacityCensus (LED-013 — destructive, last).
     Entry states: every hash the page can be entered at (DOM anchors with
                 hidden targets + `hash === '#x'` comparisons in script) gets
                 its own fresh load — audit + counter census re-run there,
                 because a hidden view's counters/CTAs are only judgeable when
                 the view is open (LED-015: "wired to one entry path").
     Click probes: each ambiguous CTA (bare "#", hidden target) gets a REAL
                 dispatched click on an isolated fresh load — DOM mutation /
                 visible hash move / real scroll / focus move = alive; nothing
                 = P0 cta-dead-anchor (LED-014 behavioral leg).
     Source scan: counters whose INITIAL markup is 0/empty (value exists only
                 if the animation runs — LED-011/015 class) = P1
                 counter-anim-dependent, same severity split as LED-013.

   Exits 0 if there are 0 P0 blockers, else 1. That exit code is the ship gate.
   Override Chrome with CHROME_BIN=/path/to/chrome.
   ============================================================================ */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const fileArg = process.argv[2];
const accent = process.argv[3] || null;
if (!fileArg) { console.error('usage: node qa/run-checks.js <file.html> [accentHex]'); process.exit(2); }

const filePath = path.resolve(fileArg);
const fileUrl = 'file://' + filePath;
const sourceHtml = fs.readFileSync(filePath, 'utf8');
const checkerSrc = fs.readFileSync(path.join(__dirname, 'visual-checks.js'), 'utf8');
const port = 9000 + Math.floor(Math.random() * 1000);
const userDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-chrome-'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--hide-scrollbars', '--remote-debugging-port=' + port,
  '--user-data-dir=' + userDir, '--window-size=1280,900', 'about:blank'
], { stdio: 'ignore' });

async function getWsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + port + '/json');
      const list = await r.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) { /* not up yet */ }
    await sleep(200);
  }
  throw new Error('Chrome DevTools endpoint not reachable on port ' + port);
}

function cdpSender(ws) {
  let id = 0; const pending = new Map();
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  return (method, params = {}) => new Promise((res, rej) => {
    const myId = ++id;
    pending.set(myId, m => m.error ? rej(new Error(m.error.message)) : res(m.result));
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
}

/* Freeze the page to end-state: CDN scripts + fonts done, CSS animations
   zeroed, GSAP fast-forwarded, .reveal forced. Same recipe as always. */
const PREP = `(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  var s = document.createElement('style');
  s.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}';
  document.head.appendChild(s);
  if (window.gsap) { try { window.gsap.globalTimeline.getChildren(true,true,false).forEach(function(t){ try{t.progress(1)}catch(e){} }); } catch(e){} }
  document.querySelectorAll('.reveal').forEach(function(e){ e.classList.add('in'); });
  await new Promise(function(r){ requestAnimationFrame(function(){ requestAnimationFrame(r); }); });
  return 'ready';
})()`;

/* ---- source-scan leg 1: P1 counter-anim-dependent (LED-015 base-rule class).
   By the time the DOM census runs, JS has overwritten the markup — the
   INITIAL text only exists in source. A counter shipping "0" shows 0 to any
   reader whose entry path / rAF never runs the count-up; the robust pattern
   ships the final value in markup and lets JS animate on top (exactly the
   LED-013 base-visible rule, applied to numbers). ---- */
function scanCounterMarkup(html) {
  const defects = [];
  const re = /<([a-zA-Z][\w-]*)([^<>]*?\bdata-(?:count-to|to|target|count|count-up)\s*=\s*"([\d,.\s]+)"[^<>]*)>\s*([^<]*?)\s*</g;
  let m;
  while ((m = re.exec(html))) {
    const target = parseFloat(m[3].replace(/[,\s]/g, ''));
    if (!target) continue;
    const text = m[4].trim();
    const digits = text.replace(/[,\s]/g, '').match(/\d+(\.\d+)?/);
    const shown = digits ? parseFloat(digits[0]) : NaN;
    if (!digits || shown === 0) {
      const idm = m[2].match(/\bid\s*=\s*"([^"]+)"/);
      const clm = m[2].match(/\bclass\s*=\s*"([^"]+)"/);
      const selector = idm ? '#' + idm[1] : m[1] + (clm ? '.' + clm[1].split(/\s+/)[0] : '');
      defects.push({ severity: 'P1', code: 'counter-anim-dependent', selector,
        message: 'Counter targets ' + target.toLocaleString('en-US') + ' but its INITIAL markup is "' + (text || '(empty)') + '" — the value exists only if the count-up animation actually runs (LED-011/LED-015 class). Ship the final value in the markup; let JS zero it and animate on top.',
        data: { target, initialText: text } });
    }
  }
  return defects;
}

/* ---- source-scan leg 2: hash entry states referenced only in script
   (e.g. `if (location.hash === '#report') showReport()` where the link that
   sets the hash is built by JS and never in the initial DOM). ---- */
function scanHashStates(html) {
  const out = new Set();
  const re = /hash\s*===?\s*['"]#([\w-]+)['"]/g;
  let m;
  while ((m = re.exec(html))) out.add(m[1]);
  return Array.from(out);
}

(async () => {
  let ws;
  try {
    const wsUrl = await getWsUrl();
    ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    const send = cdpSender(ws);
    await send('Runtime.enable');
    await send('Page.enable');

    const evalJson = async (expr, timeoutMs) => {
      const r = await send('Runtime.evaluate', {
        expression: 'Promise.resolve(' + expr + ').then(function(v){ return JSON.stringify(v); })',
        awaitPromise: true, returnByValue: true, timeout: timeoutMs || 30000
      });
      if (r.exceptionDetails) throw new Error('page eval failed: ' + (r.exceptionDetails.text || '') + ' ' + ((r.exceptionDetails.exception || {}).description || '').slice(0, 300));
      return JSON.parse(r.result.value);
    };
    const load = async (url) => {
      await send('Page.navigate', { url: 'about:blank' });
      await sleep(150);
      await send('Page.navigate', { url });
      await sleep(3000); // CDN scripts (GSAP/Lenis), fonts, entrance animations
      await send('Runtime.evaluate', { expression: PREP, awaitPromise: true });
      await send('Runtime.evaluate', { expression: checkerSrc });
    };

    const allDefects = [];
    const dedupe = new Set();
    const push = (d, state) => {
      const disc = d.data ? (d.data.target || d.data.href || d.data.matched || '') : '';
      const key = d.code + '|' + d.selector + '|' + disc;
      if (dedupe.has(key)) return;
      dedupe.add(key);
      if (state && state !== 'default') d.entryState = '#' + state;
      allDefects.push(d);
    };

    /* ============ MAIN LOAD ============ */
    await load(fileUrl);
    const accentArg = accent ? "{accent:'" + accent + "'}" : "{}";
    const report = await evalJson('window.__visualChecks(' + accentArg + ')');
    report.defects.forEach(d => push(d, 'default'));

    const mainAudit = await evalJson('window.__ctaAudit()');
    mainAudit.defects.forEach(d => push(d, 'default'));
    const probes = mainAudit.candidates.map(c => ({ state: null, ...c }));

    const domStates = await evalJson('window.__hashStates()');
    const census = await evalJson('window.__counterCensus()', 45000);
    census.defects.forEach(d => push(d, 'default'));

    // LED-013 census — LAST on this load (it mutates: kills animations, forces .in)
    const opacity = await evalJson('window.__opacityCensus()');
    opacity.defects.forEach(d => push(d, 'default'));

    /* ============ ENTRY STATES (fresh load per hash) ============ */
    const states = Array.from(new Set([...domStates, ...scanHashStates(sourceHtml)])).slice(0, 4);
    for (const state of states) {
      await load(fileUrl + '#' + state);
      const audit = await evalJson('window.__ctaAudit()');
      audit.defects.forEach(d => push(d, state));
      audit.candidates.forEach(c => {
        if (!probes.some(p => p.state === state && p.idx === c.idx) &&
            !probes.some(p => p.selector === c.selector)) probes.push({ state, ...c });
      });
      const c2 = await evalJson('window.__counterCensus()', 45000);
      c2.defects.forEach(d => push(d, state));
    }

    /* ============ BEHAVIORAL CLICK PROBES (isolated load each) ============ */
    for (const p of probes) {
      await load(fileUrl + (p.state ? '#' + p.state : ''));
      const r = await evalJson('window.__ctaClickProbe(' + p.idx + ')', 20000);
      if (r && !r.skipped && r.dead) {
        const why = {
          'self-anchor': 'its href is the section it already sits in, and the click did no real work (no DOM change, no focus move) — the reader is scrolled to where they already are',
          'missing-target': 'its href points at an id that does not exist and no script handled the click',
          'hidden-target': 'its anchor target is display:none, and no script revealed it on click',
          'bare-hash': 'href="#" with no script wiring — the click did nothing at all',
        }[r.reason] || 'the click produced no observable response';
        push({ severity: 'P0', code: 'cta-dead-anchor', selector: r.selector,
          message: 'CTA "' + r.label + '" (' + r.href + ') was really clicked and is DEAD: ' + why + '. Dead conversion path (LED-014 behavioral probe).',
          data: { href: r.href, reason: r.reason, evidence: r.evidence } }, p.state || 'default');
      }
    }

    /* ============ SOURCE SCAN ============ */
    scanCounterMarkup(sourceHtml).forEach(d => push(d, 'default'));

    /* ============ MERGE + VERDICT ============ */
    const blockers = allDefects.filter(d => d.severity === 'P0').length;
    const warnings = allDefects.filter(d => d.severity === 'P1').length;
    const polish = allDefects.filter(d => d.severity === 'P2').length;
    const final = {
      pass: blockers === 0,
      blockers, warnings, polish,
      entryStatesChecked: ['default', ...states.map(s => '#' + s)],
      ctaProbesRun: probes.length,
      countersExercised: census.counted,
      summary: blockers === 0
        ? ('No blockers. ' + warnings + ' warnings, ' + polish + ' polish.')
        : (blockers + ' BLOCKER(S) — do not ship.'),
      defects: allDefects,
    };

    console.log(JSON.stringify(final, null, 2));
    ws.close(); chrome.kill();
    process.exit(blockers === 0 ? 0 : 1);
  } catch (e) {
    console.error('run-checks error:', e.message);
    try { if (ws) ws.close(); } catch (_) {}
    chrome.kill();
    process.exit(2);
  } finally {
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch (e) {}
  }
})();
