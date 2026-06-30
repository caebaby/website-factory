# Golden Components
## Tested primitives the build agent ASSEMBLES — never re-derives from prose

The Field cycle-word bug existed because the build agent **re-authored** a hard interactive element from a prose description ("a fixed-width slot so layout never jumps"). The plausible-but-wrong implementation (absolute-positioned words → 0-height collapse) reads as correct and ships the bug. The fix is structural: freeze the hard pieces as **tested code with a contract**, and have the agent paste + parameterize them.

> **The line (when is something a component vs. a prose guideline?):**
> **"Can a machine verify it's wrong?"** If yes — a collapsed height, a missing focus trap, an illegal variant, off-grid spacing — it is a **tested code component / token** with a constrained API. If only a human can judge it ("does this feel warm and premium?") it stays **prose** (LAYOUT_CRAFT / DESIGN.md). Verifiable structure must never live as prose, because prose gets re-interpreted and drifts.

Each primitive below ships with a one-line **CONTRACT** (the invariant it guarantees), is self-contained (inline `<style>`/`<script>`), degrades without JS, and respects `prefers-reduced-motion`. The agent's job is parameter substitution, not re-derivation.

---

## PRIMITIVE 1 — Cycling-word hero
**CONTRACT:** height never collapses; no layout shift on swap; first word visible with no JS; full phrase readable by screen readers.

The non-obvious correctness fact (the whole reason to freeze this): **stack the words in ONE CSS grid cell (`grid-area:1/1`), not with `position:absolute`.** Absolute children leave the flow → the slot gets 0 height → the word is clipped to nothing. Grid-stacked words stay in flow → the cell sizes to the tallest/widest word → height *cannot* collapse.

**PLACEMENT RULE (LED-006 — learned the hard way):** the grid-stack cell sizes to the *widest* word. If the cycling word sits MID-LINE with text after it (`Your [cycle] is a mess`), every shorter word leaves a visible dead gap before the following text — it reads broken. **Put the cycling word at a line END** (nothing follows it inline): give it its own line, or make it the last word of its line. Then the variable-width cell causes no gap and no shift. Bonus: a cycling word alone on its line wants to be the hero's focal moment — oversize it and color it the accent ("a single oversize word as a hero"). This is *taste*, which the deterministic gate cannot see — it's why the Tier-B critic exists.

```html
<h1 class="cyc">
  <span>Your product is great. Your</span>
  <span class="cyc__slot" aria-hidden="true">
    <span class="cyc__w is-on">story</span>
    <span class="cyc__w">pitch</span>
    <span class="cyc__w">website</span>
    <span class="cyc__w">brand</span>
  </span>
  <span>is a mess.</span>
  <span class="sr-only">Your product is great. Your story, pitch, website, and brand are a mess.</span>
</h1>
<style>
  .cyc__slot{ display:inline-grid; color:var(--accent); vertical-align:baseline; }
  .cyc__w{ grid-area:1/1; white-space:nowrap; }      /* all words → same cell, in flow */
  .cyc__w:not(.is-on){ opacity:0; }                   /* no-JS: first word only */
  .sr-only{ position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap; }
</style>
<script>
(function(){
  var slot=document.querySelector('.cyc__slot'); if(!slot) return;
  var words=slot.querySelectorAll('.cyc__w'); if(words.length<2) return;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;                                  // static first word
  var i=0;
  // GSAP version (if present): opacity + y crossfade, NO position:absolute, NO clip
  if(window.gsap){
    gsap.set(words,{yPercent:function(idx){return idx===0?0:36;},opacity:function(idx){return idx===0?1:0;}});
    var tl=gsap.timeline({repeat:-1,delay:1.6});
    words.forEach(function(){
      var cur=words[i], nx=words[(i+1)%words.length];
      (function(cur,nx){
        tl.to(cur,{yPercent:-36,opacity:0,duration:0.5,ease:'power3.in'},'+=1.05')
          .fromTo(nx,{yPercent:36,opacity:0},{yPercent:0,opacity:1,duration:0.55,ease:'power3.out'},'<0.05');
      })(cur,nx); i=(i+1)%words.length;
    });
  } else {                                            // vanilla fallback
    setInterval(function(){ words[i].classList.remove('is-on'); i=(i+1)%words.length; words[i].classList.add('is-on'); },2200);
  }
})();
</script>
```
**QA invariant:** `.cyc__slot` bounding-box height > 0 (visual-checks `collapsed-height`). Never `min-width` magic numbers — grid auto-sizes.

---

## PRIMITIVE 2 — Multi-step form (the MQL gate)
**CONTRACT:** submits natively with no JS (all steps visible); native validation per step; focus moves to each step's legend; screen-reader progress announced.

```html
<form class="wiz" action="[ENDPOINT]" method="post" novalidate>
  <p class="wiz__progress" aria-live="polite">Step <span data-current>1</span> of 4</p>
  <fieldset class="wiz__step" data-step="1">
    <legend>[Question 1]</legend>
    <!-- inputs with required / type / autocomplete -->
    <div class="wiz__nav"><button type="button" data-next>Continue</button></div>
  </fieldset>
  <!-- ...steps 2..N, each with data-prev + data-next; last step type="submit" -->
</form>
<style>
  .wiz__step{ display:block; }                 /* no-JS: every step visible, form submits */
  .js .wiz__step{ display:none; }
  .js .wiz__step.is-active{ display:block; }
</style>
<script>
(function(){
  var f=document.querySelector('.wiz'); if(!f) return;
  document.documentElement.classList.add('js');
  var steps=[].slice.call(f.querySelectorAll('.wiz__step')), cur=f.querySelector('[data-current]'), i=0;
  function show(n){ steps.forEach(function(s,k){ var a=k===n; s.classList.toggle('is-active',a); a?s.setAttribute('aria-current','step'):s.removeAttribute('aria-current'); });
    if(cur)cur.textContent=n+1; i=n; var lg=steps[n].querySelector('legend'); if(lg){lg.tabIndex=-1;lg.focus();} }
  function valid(s){ var fs=s.querySelectorAll('input,select,textarea'); for(var k=0;k<fs.length;k++){ if(!fs[k].checkValidity()){fs[k].reportValidity();return false;} } return true; }
  f.addEventListener('click',function(e){
    if(e.target.matches('[data-next]')){ if(valid(steps[i])) show(Math.min(i+1,steps.length-1)); }
    else if(e.target.matches('[data-prev]')){ show(Math.max(i-1,0)); }
  });
  show(0);
})();
</script>
```
Use native `required`/`type`/`reportValidity()` — never a custom regex validator. "Back" never validates. Label "Continue" not "Next".

---

## PRIMITIVE 3 — Scroll reveal
**CONTRACT:** content is NEVER stuck invisible — the hidden start state is added by JS only; no-JS/GSAP-fail shows everything; reduced-motion shows everything instantly.

```html
<style>
  .reveal{ opacity:1; }                                   /* visible by default — the safety baseline */
  @media (prefers-reduced-motion: no-preference){
    html.js .reveal{ opacity:0; transform:translateY(24px); transition:opacity .7s, transform .7s; }
    html.js .reveal.in{ opacity:1; transform:none; }
  }
</style>
<script>
  document.documentElement.classList.add('js');           // sync, in <head>, before paint
  // ...after libs load:
  if(!window.gsap){ document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');}); }
  else if(matchMedia('(prefers-reduced-motion: reduce)').matches){ document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in');}); }
  else {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(function(el){ ScrollTrigger.create({trigger:el,start:'top 84%',once:true,onEnter:function(){el.classList.add('in');}}); });
    requestAnimationFrame(function(){ document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ if(el.getBoundingClientRect().top<innerHeight*0.95) el.classList.add('in'); }); }); // backfill for mid-page loads
  }
</script>
```
**Hero exception:** never put `.reveal` on the hero copy/CTA — the CTA must not wait on scroll/JS/fonts. Animate the hero on LOAD with `gsap.from` (leaves elements visible at rest, so a JS failure can't hide them).

---

## PRIMITIVE 4 — Animated mesh-gradient hero background
**CONTRACT:** never blank (static composed mesh with no JS); `prefers-reduced-motion` → frozen static frame; layout/height unaffected (it's an absolutely-positioned sibling *behind* the content, clipped by `overflow:hidden`); brand-palette tints only (no rainbow/purple→blue slop); text above it stays legible.

Extracted from Stripe's WebGL `minigl` hero and Zoom's "work connects" hero (see `docs/REFERENCES.md` → Hero). The factory-fit implementation is **not** a WebGL shader — it's 4–6 soft `radial-gradient` blobs drifting on slow, *desynchronized* GSAP loops, so the field breathes instead of pulsing in unison. Richer and more premium than the single mouse-radial of MOTION_TIERS T3.1; it is the **T3 mesh upgrade**.

The non-obvious correctness facts (why this is frozen): (1) the blob layer and the hero copy are **siblings** — copy is never a child of the animated layer, so a transform/repaint on the mesh can never shift or hide the text. (2) Both `.hero` and `.mesh` are `overflow:hidden` so vw-sized blobs that bleed past the edges are *clipped*, never adding to `scrollWidth` (no `viewport-overflow`). (3) Blobs carry no text content, so they can't trip `collapsed-height`. (4) Drift is `xPercent/yPercent` only — never animating `background-position` or `width` (cheap GPU transform, no layout).

```html
<section class="hero" id="hero">
  <div class="mesh" aria-hidden="true">
    <span class="mesh__blob mesh__blob--1"></span>
    <span class="mesh__blob mesh__blob--2"></span>
    <span class="mesh__blob mesh__blob--3"></span>
    <span class="mesh__blob mesh__blob--4"></span>
  </div>
  <div class="hero__content"><!-- eyebrow / headline / sub / CTAs (Primitive 1 cycling word fits here) --></div>
</section>
<style>
  .hero{ position:relative; overflow:hidden; isolation:isolate; }
  .hero__content{ position:relative; z-index:1; }      /* sibling ABOVE the mesh, never a child */
  .mesh{ position:absolute; inset:0; z-index:0; overflow:hidden; background:var(--bg-base); }
  .mesh__blob{
    position:absolute; border-radius:50%;
    filter:blur(72px);                                 /* Stripe-soft: large blur, low detail */
    opacity:.55; will-change:transform;
    mix-blend-mode:multiply;                           /* LIGHT bg. On a dark hero use 'screen'/'lighten' + raise opacity */
  }
  /* 4 stops = tints of the BRAND palette ONLY (accent + an analogous/neutral companion).
     Define --accent-2-rgb in tokens for a second brand tint; falls back to accent. */
  .mesh__blob--1{ width:48vw;height:48vw; left:-6vw;  top:-12vw;  background:radial-gradient(circle, rgba(var(--accent-rgb),.42), transparent 66%); }
  .mesh__blob--2{ width:46vw;height:46vw; right:-12vw;top:2vw;    background:radial-gradient(circle, rgba(var(--accent-2-rgb,var(--accent-rgb)),.30), transparent 66%); }
  .mesh__blob--3{ width:54vw;height:54vw; left:10vw;  bottom:-30vw;background:radial-gradient(circle, rgba(var(--accent-rgb),.22), transparent 66%); }
  .mesh__blob--4{ width:42vw;height:42vw; right:8vw;  bottom:-20vw;background:radial-gradient(circle, rgba(var(--text-muted-rgb,160,160,160),.40), transparent 66%); }
  @media (prefers-reduced-motion: reduce){ .mesh__blob{ animation:none!important; } }
</style>
<script>
(function(){
  var mesh=document.querySelector('.mesh'); if(!mesh) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // static composed frame
  if(!window.gsap) return;                                             // no-JS/GSAP-fail → static
  mesh.querySelectorAll('.mesh__blob').forEach(function(b,i){
    gsap.to(b,{                                                        // desynchronized drift — no unison pulse
      xPercent:(i%2? -14:14), yPercent:(i%2? 12:-12), scale:1.12,
      duration:9 + i*2.4, ease:'sine.inOut', repeat:-1, yoyo:true
    });
  });
})();
</script>
```
**QA invariants:** `scrollWidth ≤ viewport` (blobs clipped — `viewport-overflow` must stay clean); hero text contrast ≥ 4.5:1 body / 3:1 large over the mesh (keep blob opacity modest or place copy on the calmer half); mesh stops are brand tints, never a 220–290° hue (PART 7 / PART 9.1).

---

## PRIMITIVE 5 — Video hero with directional scrim
**CONTRACT:** never blank (a `poster` always loads first and is shown if video is absent/slow/failed/blocked); legible (a *directional* gradient scrim guarantees text contrast on the copy side — never a uniform dark box over the whole frame); `prefers-reduced-motion` → no autoplay, poster only; lazy (no video bytes fetched until the hero is near the viewport).

Extracted from Zoom / Mercury / Linear product-video heroes (see `docs/REFERENCES.md` → Hero). Use **only when the client has a real video/footage asset** — never a CSS simulation (MOTION_TIERS T3.3). The make-or-break detail is the scrim: a `105deg` gradient anchored to the text side leaves the far side of the footage clean while still clearing contrast where the words are.

```html
<section class="vhero" id="hero">
  <div class="vhero__media" aria-hidden="true">
    <video class="vhero__video" poster="[POSTER.jpg]" muted loop playsinline preload="none">
      <source data-src="[HERO_LOOP.mp4]" type="video/mp4">
    </video>
    <div class="vhero__scrim"></div>
  </div>
  <div class="vhero__content"><!-- eyebrow / headline / sub / CTAs --></div>
</section>
<style>
  .vhero{ position:relative; min-height:clamp(620px,86svh,940px); display:flex; align-items:center; overflow:hidden; isolation:isolate; }
  .vhero__media{ position:absolute; inset:0; z-index:0; background:#0c0c0c; }   /* base so it's never white if poster is slow */
  .vhero__video{ width:100%; height:100%; object-fit:cover; display:block; }
  /* Directional scrim — anchored to the LEFT (text) side. NOT a uniform rectangle. */
  .vhero__scrim{ position:absolute; inset:0;
    background:linear-gradient(105deg, rgba(8,8,8,.80) 0%, rgba(8,8,8,.55) 34%, rgba(8,8,8,0) 70%); }
  .vhero__content{ position:relative; z-index:1; color:#fff; max-width:640px; }
  .vhero__content h1{ color:#fff; }
  .vhero__content p{ color:rgba(255,255,255,.84); }
  @media (max-width:768px){                                  /* narrow: footage busier → bottom-anchored scrim */
    .vhero__scrim{ background:linear-gradient(180deg, rgba(8,8,8,.42) 0%, rgba(8,8,8,.82) 100%); }
  }
</style>
<script>
(function(){
  var v=document.querySelector('.vhero__video'); if(!v) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;   // poster only, no motion
  var src=v.querySelector('source[data-src]'); if(!src) return;
  var io=new IntersectionObserver(function(entries,obs){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      src.src=src.dataset.src; v.load();                               // fetch only when in view
      var p=v.play(); if(p&&p.catch) p.catch(function(){});            // autoplay blocked → poster stays (still fine)
      obs.disconnect();
    });
  },{rootMargin:'200px'});
  io.observe(v);
})();
</script>
```
**QA invariants:** copy contrast ≥ 4.5:1 body / 3:1 large over the *lightest* pixel the scrim covers (scrim opacity is the lever); poster present (hero never empty); no `<source src>` set until in view (lazy); reduced-motion shows poster, never autoplays. **If there is no real asset, delete the `<video>` and ship the poster as a still hero** — do not fake it.

---

## PRIMITIVE 6 — Scroll-driven section color theming
**CONTRACT:** never blank, never unreadable (every section paints its OWN solid theme as the floor — readable with no JS and under reduced-motion); with JS + motion-OK, the whole page background + text color **crossfade smoothly** between section themes as you scroll; text/UI invert with the theme so contrast is always preserved; layout unaffected (the crossfading layer is `position:fixed; z-index:-1`).

Extracted from **instrument.com** (the page recolors as you scroll — see `docs/REFERENCES.md` → Color/Motion). The non-obvious correctness fact (why this is frozen): the smooth page-level crossfade is a JS *enhancement*, so the **floor must stand alone** — each `.tsec` carries its own `data-bg`/`data-fg` and paints them as a solid, readable block. JS then makes the sections transparent and reveals a single fixed background layer that transitions its color; without JS (or under reduced-motion) you simply get solid, correctly-colored, readable sections. Every theme is a *paired* `{bg, fg}` chosen for contrast — that pairing is the whole reason the inversion stays legible.

```html
<div class="theme-bg" aria-hidden="true"></div>
<main>
  <section class="tsec" data-bg="#0E0E0C" data-fg="#FAFAF8" data-accent="#DC3C20"><!-- dark theme --></section>
  <section class="tsec" data-bg="#FAFAF8" data-fg="#14140F" data-accent="#DC3C20"><!-- light theme --></section>
  <section class="tsec" data-bg="#103B2E" data-fg="#EAF3EE" data-accent="#E7A23C"><!-- jewel theme --></section>
</main>
<style>
  :root{ --theme-bg:#FAFAF8; --theme-fg:#14140F; --theme-accent:#DC3C20; }
  .theme-bg{ position:fixed; inset:0; z-index:-1; background:var(--theme-bg); transition:background-color .7s ease; }
  /* FLOOR (no-JS / reduced-motion): each section paints its own solid theme — always readable */
  .tsec{ background:var(--sec-bg); color:var(--sec-fg); }
  /* ENHANCED (JS + motion-OK): sections go transparent so the fixed layer shows through and crossfades */
  html.theme-js .tsec{ background:transparent; }
  html.theme-js body{ color:var(--theme-fg); transition:color .7s ease; }
  @media (prefers-reduced-motion:reduce){ .theme-bg, html.theme-js body{ transition:none; } }
</style>
<script>
(function(){
  var secs=[].slice.call(document.querySelectorAll('.tsec')); if(!secs.length) return;
  secs.forEach(function(s){ s.style.setProperty('--sec-bg',s.dataset.bg); s.style.setProperty('--sec-fg',s.dataset.fg); }); // floor
  if(matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return; // stay on the floor
  var r=document.documentElement; r.classList.add('theme-js');
  function apply(s){ r.style.setProperty('--theme-bg',s.dataset.bg); r.style.setProperty('--theme-fg',s.dataset.fg); if(s.dataset.accent) r.style.setProperty('--theme-accent',s.dataset.accent); }
  apply(secs[0]);
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting && e.intersectionRatio>=0.55) apply(e.target); }); },{threshold:[0.55]});
  secs.forEach(function(s){ io.observe(s); });
})();
</script>
```
**QA invariants:** each theme's `{data-bg, data-fg}` must clear ≥ 4.5:1 body / 3:1 large (the pairing is the contract — never set a light fg on a light bg theme); `.theme-bg` holds no content (won't trip `collapsed-height`); no `viewport-overflow` from the fixed layer. **Use sparingly** — 3–5 theme moves across a long page is a signature; recoloring every section is noise. The accent should also swap per theme (`--theme-accent`) so CTAs stay legible on each ground.

---

## RGB-triplet rule (also a frozen contract)
Every hex token that feeds a shadow/blur (`--accent`, `--primary`/`--text-primary`, `--bg-base`, `--bg-inverse`) MUST also define its `--*-rgb` triplet. Missing triplets silently break every `rgba(var(--x-rgb), …)` shadow. (See DESIGN_TOKENS.)

---

## How this compounds
Every page region that passes the visual-QA gate cleanly N times is a candidate to **promote into this file** as a blessed component with a pixel-diff baseline. Over builds, Agent 04's job shifts from "re-derive the hero (and re-break it)" to "assemble blessed components + vary tokens." Defect rate per build trends toward zero. See `FACTORY_LEARNING.md`.
