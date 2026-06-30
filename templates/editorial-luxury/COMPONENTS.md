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

## RGB-triplet rule (also a frozen contract)
Every hex token that feeds a shadow/blur (`--accent`, `--primary`/`--text-primary`, `--bg-base`, `--bg-inverse`) MUST also define its `--*-rgb` triplet. Missing triplets silently break every `rgba(var(--x-rgb), …)` shadow. (See DESIGN_TOKENS.)

---

## How this compounds
Every page region that passes the visual-QA gate cleanly N times is a candidate to **promote into this file** as a blessed component with a pixel-diff baseline. Over builds, Agent 04's job shifts from "re-derive the hero (and re-break it)" to "assemble blessed components + vary tokens." Defect rate per build trends toward zero. See `FACTORY_LEARNING.md`.
