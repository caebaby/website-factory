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

   It loads the file, waits for CDN scripts + fonts, FREEZES animations to
   end-state (so a frozen-rAF capture can't fool the gate), runs
   qa/visual-checks.js on the rendered DOM, prints the defect JSON, and exits
   0 if there are 0 P0 blockers, else 1. That exit code is the ship gate.

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

const fileUrl = 'file://' + path.resolve(fileArg);
const checkerSrc = fs.readFileSync(path.join(__dirname, 'visual-checks.js'), 'utf8');
const port = 9000 + Math.floor(Math.random() * 1000);
const userDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-chrome-'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--hide-scrollbars', '--remote-debugging-port=' + port,
  '--user-data-dir=' + userDir, '--window-size=1280,900', fileUrl
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

(async () => {
  let ws;
  try {
    const wsUrl = await getWsUrl();
    ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    const send = cdpSender(ws);
    await send('Runtime.enable');
    await send('Page.enable');

    // Let CDN scripts (GSAP/Lenis), fonts, and entrance animations run, then stabilize.
    await sleep(3000);
    const prep = `(async () => {
      try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
      var s = document.createElement('style');
      s.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}';
      document.head.appendChild(s);
      if (window.gsap) { try { window.gsap.globalTimeline.getChildren(true,true,false).forEach(function(t){ try{t.progress(1)}catch(e){} }); } catch(e){} }
      document.querySelectorAll('.reveal').forEach(function(e){ e.classList.add('in'); });
      await new Promise(function(r){ requestAnimationFrame(function(){ requestAnimationFrame(r); }); });
      return 'ready';
    })()`;
    await send('Runtime.evaluate', { expression: prep, awaitPromise: true });

    await send('Runtime.evaluate', { expression: checkerSrc });
    const accentArg = accent ? "{accent:'" + accent + "'}" : "{}";
    const run = await send('Runtime.evaluate', {
      expression: "JSON.stringify(window.__visualChecks(" + accentArg + "))",
      returnByValue: true
    });
    const report = JSON.parse(run.result.value);
    console.log(JSON.stringify(report, null, 2));
    ws.close(); chrome.kill();
    process.exit(report.blockers === 0 ? 0 : 1);
  } catch (e) {
    console.error('run-checks error:', e.message);
    try { if (ws) ws.close(); } catch (_) {}
    chrome.kill();
    process.exit(2);
  } finally {
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch (e) {}
  }
})();
