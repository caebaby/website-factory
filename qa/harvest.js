#!/usr/bin/env node
/* ============================================================================
   qa/harvest.js — mechanized reference-site component harvester
   ----------------------------------------------------------------------------
   Visits a live URL in headless Chrome (same zero-dep CDP plumbing as
   run-checks.js) and dumps the site's COMPONENT INVENTORY as JSON:
   type census, button variants, card patterns, section-by-section flow
   (ground / padding / layout skeleton / media), color census, motion norms.

   This is how the library grows without burning tokens: the machine measures,
   the design-director curates.

   USAGE:  node qa/harvest.js <url> <slug>
           → writes docs/harvest/<slug>.json
   ============================================================================ */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = process.env.CHROME_BIN ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2];
const slug = process.argv[3];
if (!url || !slug) { console.error('usage: node qa/harvest.js <url> <slug>'); process.exit(2); }

const outDir = path.join(__dirname, '..', 'docs', 'harvest');
fs.mkdirSync(outDir, { recursive: true });
const port = 9000 + Math.floor(Math.random() * 1000);
const userDir = fs.mkdtempSync(path.join(os.tmpdir(), 'harvest-chrome-'));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--hide-scrollbars', '--remote-debugging-port=' + port,
  '--user-data-dir=' + userDir, '--window-size=1440,900', url
], { stdio: 'ignore' });

async function getWsUrl() {
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + port + '/json');
      const list = await r.json();
      const page = list.find(t => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch (e) {}
    await sleep(200);
  }
  throw new Error('DevTools endpoint not reachable');
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

/* The measurement payload — runs in the page. Everything computed-style, nothing guessed. */
const PAYLOAD = `(function(){
  function pick(el,props){var s=getComputedStyle(el),o={};props.forEach(function(p){o[p]=s[p];});return o;}
  function sig(el){ // layout skeleton signature of a section
    var kids=[].slice.call(el.children).filter(function(k){return k.offsetHeight>40;});
    var s=getComputedStyle(el);
    var inner=el.querySelector(':scope > div, :scope > section');
    var grid='block';
    var probe=inner||el;
    for(var i=0;i<3&&probe;i++){
      var ps=getComputedStyle(probe);
      if(ps.display==='grid'){grid='grid('+ps.gridTemplateColumns.split(' ').length+'col)';break;}
      if(ps.display==='flex'){grid='flex('+ps.flexDirection+')';break;}
      probe=probe.children[0];
    }
    return grid+' kids:'+kids.length;
  }
  var out={url:location.href,title:document.title,measured:new Date().toISOString(),viewport:innerWidth+'x'+innerHeight};

  // 1. TYPE CENSUS
  var sizes={};
  ['h1','h2','h3','h4','h5','p','a','li','span','blockquote'].forEach(function(tag){
    [].slice.call(document.querySelectorAll(tag)).slice(0,80).forEach(function(el){
      if(el.offsetHeight<8||!el.textContent.trim())return;
      var s=getComputedStyle(el);
      var key=tag+'|'+s.fontSize+'|'+s.fontWeight+'|'+s.fontFamily.split(',')[0].replace(/"/g,'').slice(0,24)+'|lh:'+s.lineHeight+'|tr:'+s.letterSpacing+'|tt:'+s.textTransform;
      sizes[key]=(sizes[key]||0)+1;
    });
  });
  out.typeCensus=Object.entries(sizes).sort(function(a,b){return b[1]-a[1];}).slice(0,24);

  // 2. BUTTON VARIANTS (dedup by style signature)
  var btnSigs={};
  [].slice.call(document.querySelectorAll('a,button')).slice(0,300).forEach(function(b){
    var s=getComputedStyle(b);
    if(b.offsetHeight<26||b.offsetHeight>90)return;
    var t=b.textContent.trim(); if(t.length<2||t.length>48)return;
    if(s.backgroundColor==='rgba(0, 0, 0, 0)'&&s.borderWidth==='0px')return;
    var key=[s.backgroundColor,s.color,s.borderRadius,s.padding,s.fontSize,s.fontWeight,s.textTransform,s.letterSpacing,s.border.slice(0,34),s.boxShadow.slice(0,30)].join(' | ');
    if(!btnSigs[key])btnSigs[key]={count:0,example:t.slice(0,30),transition:s.transition.slice(0,80)};
    btnSigs[key].count++;
  });
  out.buttons=Object.entries(btnSigs).sort(function(a,b){return b[1].count-a[1].count;}).slice(0,8);

  // 3. CARD PATTERNS (radius>0 or bordered/filled boxes of card scale)
  var cardSigs={};
  [].slice.call(document.querySelectorAll('div,article,a,li,section')).slice(0,1200).forEach(function(d){
    var s=getComputedStyle(d);
    if(d.offsetHeight<120||d.offsetHeight>820||d.offsetWidth<180||d.offsetWidth>860)return;
    var hasFill=s.backgroundColor!=='rgba(0, 0, 0, 0)';
    var hasBorder=parseFloat(s.borderWidth)>0;
    var hasShadow=s.boxShadow!=='none';
    if(!hasFill&&!hasBorder&&!hasShadow)return;
    if(d.querySelectorAll('h1,h2,h3,h4,p,img').length<1)return;
    var key=['bg:'+s.backgroundColor,'r:'+s.borderRadius,'bd:'+(hasBorder?s.border.slice(0,30):'none'),'sh:'+(hasShadow?s.boxShadow.slice(0,44):'none'),'pad:'+s.padding].join(' | ');
    if(!cardSigs[key])cardSigs[key]={count:0,w:d.offsetWidth,h:d.offsetHeight,hasImg:!!d.querySelector('img,video'),sample:(d.querySelector('h1,h2,h3,h4')||{textContent:''}).textContent.trim().slice(0,40)};
    cardSigs[key].count++;
  });
  out.cards=Object.entries(cardSigs).sort(function(a,b){return b[1].count-a[1].count;}).slice(0,10);

  // 4. SECTION FLOW (the composition skeleton, top to bottom)
  var sections=[].slice.call(document.querySelectorAll('section, main > div, body > div > section'))
    .filter(function(s){return s.offsetHeight>140&&s.offsetWidth>innerWidth*.7;})
    .filter(function(s,i,arr){return !arr.some(function(o){return o!==s&&o.contains(s)&&o.offsetHeight<s.offsetHeight*3;});})
    .slice(0,20);
  out.sectionFlow=sections.map(function(s,i){
    var c=getComputedStyle(s);
    var h2=s.querySelector('h1,h2,h3');
    return {i:i,h:Math.round(s.offsetHeight),bg:c.backgroundColor,pad:c.paddingTop+'/'+c.paddingBottom,
      skeleton:sig(s),
      media:{imgs:s.querySelectorAll('img').length,videos:s.querySelectorAll('video,iframe[src*=vimeo],iframe[src*=youtube],iframe[src*=wistia]').length},
      head:h2?h2.textContent.trim().replace(/\\s+/g,' ').slice(0,52):null};
  });

  // 5. COLOR CENSUS
  var bgs={},accents={};
  [].slice.call(document.querySelectorAll('*')).slice(0,1600).forEach(function(el){
    if(el.offsetHeight<12)return;
    var s=getComputedStyle(el);
    if(s.backgroundColor!=='rgba(0, 0, 0, 0)'&&el.offsetHeight>60)bgs[s.backgroundColor]=(bgs[s.backgroundColor]||0)+1;
    [s.color,s.backgroundColor].forEach(function(c){
      var m=c.match(/\\d+/g);if(!m)return;var r=+m[0],g=+m[1],b2=+m[2];
      if(Math.max(r,g,b2)-Math.min(r,g,b2)>50)accents[c]=(accents[c]||0)+1;
    });
  });
  out.grounds=Object.entries(bgs).sort(function(a,b){return b[1]-a[1];}).slice(0,8);
  out.accents=Object.entries(accents).sort(function(a,b){return b[1]-a[1];}).slice(0,8);

  // 6. MOTION NORMS
  var trans={};
  [].slice.call(document.querySelectorAll('a,button,[class*=card],[class*=btn]')).slice(0,200).forEach(function(el){
    var t=getComputedStyle(el).transition;
    if(t&&t!=='all 0s ease 0s')trans[t.slice(0,70)]=(trans[t.slice(0,70)]||0)+1;
  });
  out.transitions=Object.entries(trans).sort(function(a,b){return b[1]-a[1];}).slice(0,6);
  out.animationsRunning=document.getAnimations?document.getAnimations().length:'n/a';

  return JSON.stringify(out);
})()`;

(async () => {
  let ws;
  try {
    const wsUrl = await getWsUrl();
    ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => { ws.addEventListener('open', res); ws.addEventListener('error', rej); });
    const send = cdpSender(ws);
    await send('Runtime.enable');
    await sleep(6000); // let the live site settle (fonts, lazy content, consent layers)
    // best-effort: scroll through the page so lazy sections mount, then return to top
    await send('Runtime.evaluate', { expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}scrollTo(0,0);return 1;})()`, awaitPromise: true });
    await sleep(1200);
    const run = await send('Runtime.evaluate', { expression: PAYLOAD, returnByValue: true });
    const data = JSON.parse(run.result.value);
    const outPath = path.join(outDir, slug + '.json');
    fs.writeFileSync(outPath, JSON.stringify(data, null, 1));
    console.log('harvested → docs/harvest/' + slug + '.json  (' +
      data.sectionFlow.length + ' sections, ' + data.buttons.length + ' button variants, ' +
      data.cards.length + ' card patterns, ' + data.typeCensus.length + ' type rows)');
    ws.close(); chrome.kill(); process.exit(0);
  } catch (e) {
    console.error('harvest error:', e.message);
    try { if (ws) ws.close(); } catch (_) {}
    chrome.kill(); process.exit(1);
  } finally {
    try { fs.rmSync(userDir, { recursive: true, force: true }); } catch (e) {}
  }
})();
