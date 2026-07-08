#!/usr/bin/env node
/* ============================================================================
   qa/screenshot.js — headless full-page captures for the taste critic
   ----------------------------------------------------------------------------
   Renders the build in headless Chrome (same zero-dependency CDP pattern as
   run-checks.js), freezes animations to end-state, and writes full-page JPEGs
   at desktop (1280) and mobile (390). These are the critic's frozen evidence —
   never screenshot a live animating page (LED-004/011: a frozen-rAF capture
   lies).

   USAGE: node qa/screenshot.js <file.html> <out-prefix> [hash]
   → <out-prefix>-1280.jpg, <out-prefix>-390.jpg
   ============================================================================ */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const fileArg = process.argv[2];
const outPrefix = process.argv[3];
const hash = process.argv[4] || '';
if (!fileArg || !outPrefix) { console.error('usage: node qa/screenshot.js <file.html> <out-prefix> [hash]'); process.exit(2); }

const fileUrl = 'file://' + path.resolve(fileArg) + (hash ? '#' + hash : '');
const port = 9000 + Math.floor(Math.random() * 1000);
const userDir = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-chrome-'));
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
  throw new Error('Chrome DevTools endpoint not reachable');
}

const PREP = `(async () => {
  try { if (document.fonts && document.fonts.ready) await document.fonts.ready; } catch (e) {}
  var s = document.createElement('style');
  s.textContent = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}';
  document.head.appendChild(s);
  if (window.gsap) { try { window.gsap.globalTimeline.getChildren(true,true,false).forEach(function(t){ try{t.progress(1)}catch(e){} }); } catch(e){} }
  document.querySelectorAll('.reveal,.io,[data-anim]').forEach(function(e){ e.classList.add('in'); });
  window.scrollTo(0, 0);
  await new Promise(function(r){ requestAnimationFrame(function(){ requestAnimationFrame(r); }); });
  return 'ready';
})()`;

(async () => {
  let ws;
  try {
    ws = new WebSocket(await getWsUrl());
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    let id = 0; const pending = new Map();
    ws.addEventListener('message', ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    });
    const send = (method, params = {}) => new Promise((res, rej) => {
      const myId = ++id;
      pending.set(myId, m => m.error ? rej(new Error(m.error.message)) : res(m.result));
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
    await send('Runtime.enable');
    await send('Page.enable');
    await sleep(3000);

    for (const [width, mobile] of [[1280, false], [390, true]]) {
      await send('Emulation.setDeviceMetricsOverride',
        { width, height: 900, deviceScaleFactor: 1, mobile });
      await sleep(400);
      await send('Runtime.evaluate', { expression: PREP, awaitPromise: true });
      const metrics = await send('Page.getLayoutMetrics');
      const height = Math.min(Math.ceil(metrics.cssContentSize.height), 14000);
      const shot = await send('Page.captureScreenshot', {
        format: 'jpeg', quality: 72, captureBeyondViewport: true,
        clip: { x: 0, y: 0, width, height, scale: 1 }
      });
      const out = outPrefix + '-' + width + '.jpg';
      fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
      console.log(out + ' (' + width + 'x' + height + ')');
    }
    ws.close(); chrome.kill(); process.exit(0);
  } catch (e) {
    console.error('screenshot error:', e.message);
    try { if (ws) ws.close(); } catch (_) {}
    chrome.kill(); process.exit(2);
  } finally {
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch (e) {}
  }
})();
