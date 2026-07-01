# Design Language Pack — `warm-premium` · v1.1

> **Provenance:** measured live from **mavenclinic.com** (computed styles, 2026-07-01) and proven in
> `projects/awp/build/maven-home.html` (the gold-standard exemplar). Every number below is a
> *measured* value, not an approximation. **This is the "how it looks" layer.** It is orthogonal to
> the conversion skeleton (the "what it says" layer).
>
> **v1.1 (2026-07-01) — hardened against the Kindred cold-build review (Chris):**
> 1. Signature motif: abstract sine-waves → the **CONVERGENCE MARK** (three strands → one node =
>    "one living plan"). The waves are retired; do not build them.
> 2. **Fit/Capture promoted to a MINI-HERO** — a full-width dark panel moment, one consistent type
>    scale. It is the #1 conversion event; it must not read as a sidebar box.
> 3. **Proof ground = `--accent-deep` (new role) with LIGHT text.** Never dark-ink-on-raw-accent
>    (the "green on gold" defect; it also only cleared 4.51:1).
> 4. **Insights = featured split** (one lead item + compact stack), not 3 equal cards.
> 5. Baked in: imagery direction (§6), no-JS multi-step fallback (§8.1), bento dark-card placement
>    (§8.2), the icon set (§8.3).
>
> **How to use this Pack (read this or you will get it wrong):**
> 1. Paste §3 (the global CSS system) verbatim. Set the §2 `:root` **color roles** to the client's brand.
> 2. **RETINT THE COLORS. KEEP THE NUMBERS.** Radii, spacing, type scale, tracking, timing are FIXED —
>    they are what make this "the same language." Only the color roles change per client.
> 3. Build each section's markup+CSS from §4 (the composition map) — reuse the components, hit the
>    measured numbers. Do **not** improvise your own layout or invent numbers.
> 4. Obey §1 (the register invariants) as hard constraints. Verify against §9 before shipping.
> 5. Where the client's skeleton has a section the reference had no analog for, §4 gives the recipe —
>    build it in *this* language, never fall back to generic defaults.

---

## 1. Register invariants (non-negotiable — this is what makes it "warm-premium")

1. **Display type = a light-weight SANS (weight 300) + a serif-italic ACCENT phrase.** The base
   headline is a clean neo-grotesque at weight 300; ONE phrase (usually the last) is set in a serif
   italic, same color. The font-shift carries the emphasis — **not** color. NEVER set headings in
   serif-everywhere (that is a different language).
2. **Cards are FLAT color-fill with NO box-shadow.** Elevation comes from fill contrast + `border-radius:8px`
   + `overflow:hidden`, never from drop shadows. A shadowed white card is the wrong language.
3. **Exactly ONE committed accent color, ~10% coverage.** Accent owns the primary button, small marks
   (dots, the convergence mark), and exactly one saturated accent-family section — **Proof, on
   `--accent-deep` with LIGHT text** (§4). Everywhere else it is restraint.
4. **Mostly-light tonal map; darks are accents, not the default.** Vary the darks (a DEEP and a MID step),
   don't run one flat dark. One full-dark section (Why) + one contained dark panel (the Fit mini-hero)
   + the dark footer. (This is the antidote to "too dark.")
5. **Generous geometry:** 1512px max container, 96px side gutters, 80–120px section rhythm that *varies*
   (density alternation), tight display line-height (~1.0–1.05), slightly negative tracking.
6. **Motion is quiet and MEANS something:** 0.4s ease transitions; ONE signature motion moment — the
   convergence mark's flow-dots drifting into the node (§5). Photography stays static. No particles,
   no bounce, no glow-everywhere.
7. **Imagery is warm-documentary-human** (§6). Never clinical, never boardroom-stock, never empty
   real-estate photography.

---

## 2. `:root` — color ROLES (retint these) + metrics (do NOT touch)

```css
:root{
  /* ── COLOR ROLES — RETINT PER CLIENT ─────────────────────────────
     Defaults shown are the AWP retint. Replace the hex with the client's brand,
     keeping each role's JOB. Verify contrast (see §9) after retinting. */
  --ground:#F5F0E6;        /* primary light section bg (warmest neutral) */
  --ground-alt:#EDE7D9;    /* secondary light bg — a real tonal step darker than --ground */
  --card-pale:#ffffff;     /* pale card fill on light (white or palest brand tint) */
  --dark:#142840;          /* primary DARK ground + display ink on light (brand's darkest) */
  --dark-2:#1e395a;        /* secondary dark — one step LIGHTER (dark-card elevation) */
  --ink:#1b2a3c;           /* display heading ink on light */
  --ink-body:#4b5b6e;      /* body text on light */
  --on-dark:#F7F3EB;       /* text on dark grounds */
  --on-dark-mute:rgba(247,243,235,.74);
  --accent:#c9a24b;        /* THE one committed color — button fill, dots, the mark */
  --accent-soft:#dcc07e;   /* lighter accent — eyebrows/links/icons ON DARK */
  --accent-ink:#7d5f26;    /* AA-safe DEEP accent for small text ON LIGHT.
                              RETINT RULE: darken --accent until it clears 4.5:1 on --ground & --ground-alt */
  --accent-deep:#6d5122;   /* the PROOF ground (v1.1). RETINT RULE: darken --accent (keep its hue)
                              until --on-dark clears ≥5:1 on it. Carries LIGHT text, never dark ink. */
  --accent-rgb:201,162,75;
  --border:rgba(20,40,64,.14);

  /* ── METRICS — FIXED. DO NOT RETINT. (measured from Maven) ──────── */
  --maxw:1512px;                     /* Maven container max */
  --gutter:clamp(24px,5vw,96px);     /* Maven 96px gutter */
  --radius-btn:4px;                  /* Maven .25rem */
  --radius-card:8px;                 /* Maven 8px */
  --radius-media:12px;               /* Maven 12px large-media + full-width panels */
  --btn-border:1.5px;                /* Maven .094rem */
  --dur:.4s;                         /* Maven --transition-duration-1 (400ms) */
  --ease:ease;                       /* Maven button ease */
  --ease-soft:cubic-bezier(.16,1,.3,1);

  /* ── FONTS — pick brand fonts that FIT THE ROLES ────────────────
     --sans MUST have a 300 weight (light display is the signature).
     --serif MUST have an italic (the accent phrase). */
  --sans:'Nunito Sans','Helvetica Neue',Arial,sans-serif;   /* light-grotesque display + body */
  --serif:'EB Garamond',Georgia,serif;                       /* serif-italic accent only */
}
```

**Measured type scale (Maven — these px/weights are the language; scale via clamp, keep the ratios):**

| Role | Font | Size (ref) | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Hero H1 | sans | 76px → `clamp(40px,5.2vw,76px)` | **300** | 1.02 | -0.02em |
| Accent phrase | serif **italic** | ~1.08× the H1 | 400 | 1.0 | -0.005em |
| Section H2 | sans | 62px → `clamp(30px,4.4vw,60px)` | **300** | 1.05 | -0.025em |
| Sub / lead | sans | 24px → `clamp(17px,1.45vw,24px)` | 400 | 1.5 | -0.02em |
| Body | sans | 15–18px | 400 | 1.5–1.6 | -0.01em |
| Eyebrow / label | sans | 12px | 600 | 1.3 | 1px, UPPERCASE |
| Big numeral (pain/process/stat/wizard) | sans | `clamp(44px,4.6vw,62px)` | **300** | 1.0 | -0.03em |
| Wizard legend (fit form) | sans | `clamp(21px,2.2vw,28px)` | **300** | 1.1 | -0.02em |
| Nav link | sans | 16px | 600 | — | — |

---

## 3. Global CSS system (paste verbatim — token-driven, retints automatically)

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-size:16px;scroll-behavior:smooth;}
body{font-family:var(--sans);background:var(--ground);color:var(--ink-body);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.5;letter-spacing:-.01em;}
a{color:inherit;text-decoration:none;} img{display:block;max-width:100%;}
::selection{background:var(--accent);color:var(--dark);}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
section{position:relative;}
.pad{padding:clamp(80px,9vw,120px) 0;} .pad-sm{padding:clamp(56px,7vw,88px) 0;}

/* grounds */
.bg-ground{background:var(--ground);} .bg-ground-alt{background:var(--ground-alt);}
.bg-dark{background:var(--dark);color:var(--on-dark);}
.bg-dark-2{background:var(--dark-2);color:var(--on-dark);}
/* the ONE saturated moment (Proof): DEEP accent, LIGHT text (v1.1 — never dark ink on raw accent) */
.bg-accent-deep{background:linear-gradient(155deg,
  color-mix(in srgb,var(--accent-deep) 78%,var(--accent)) 0%,
  var(--accent-deep) 52%,
  color-mix(in srgb,var(--accent-deep) 82%,#000) 100%);color:var(--on-dark);}

/* eyebrow: 12/600/1px-tracking/uppercase. accent-ink on light, accent-soft on dark.
   On the DEEP-ACCENT ground it must be solid --on-dark (accent-soft fails AA on the gradient's
   light stop — measured 3.3:1 in the Kindred hardening pass). */
.eyebrow{display:inline-flex;align-items:center;gap:10px;font:600 12px/1.3 var(--sans);letter-spacing:1px;text-transform:uppercase;color:var(--accent-ink);}
.eyebrow::before{content:"";width:22px;height:1.5px;background:currentColor;flex:none;}
.bg-dark .eyebrow,.bg-dark-2 .eyebrow,.hero .eyebrow{color:var(--accent-soft);}  /* hero sits on a dark-scrimmed photo — accent-ink is invisible there (v1.1 fix) */
.bg-accent-deep .eyebrow{color:var(--on-dark);}

/* buttons — Maven .n4-btn_main_wrap: radius 4, pad 10x24, border 1.5, hover fill->pale, 0.4s ease */
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:var(--radius-btn);font:600 18px/1.2 var(--sans);letter-spacing:-.36px;padding:10px 24px;border:var(--btn-border) solid transparent;cursor:pointer;transition:background-color var(--dur) var(--ease),border-color var(--dur) var(--ease),color var(--dur) var(--ease),transform var(--dur) var(--ease-soft);}
.btn .arw{transition:transform var(--dur) var(--ease-soft);} .btn:hover .arw{transform:translateX(4px);}
.btn-primary{background:var(--accent);border-color:var(--accent);color:var(--dark);}
.btn-primary:hover{background:var(--card-pale);border-color:var(--card-pale);color:var(--dark);}
.btn-outline{background:transparent;border-color:var(--accent);color:var(--accent);}
.btn-outline:hover{background:var(--accent);border-color:var(--accent);color:var(--dark);}
.btn-sm{font-size:15px;padding:8px 20px;}

/* nav — 64px, transparent over hero, solid on scroll */
nav{position:fixed;inset:0 0 auto;z-index:60;height:64px;display:flex;align-items:center;transition:background var(--dur),box-shadow var(--dur);}
nav.scrolled{background:color-mix(in srgb,var(--dark) 92%,transparent);backdrop-filter:blur(16px) saturate(1.3);-webkit-backdrop-filter:blur(16px) saturate(1.3);}
.nav-in{width:100%;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.nav-links{display:flex;gap:34px;align-items:center;}
.nav-links a{font:600 16px var(--sans);color:var(--on-dark);opacity:.92;transition:opacity .2s,color .2s;}
.nav-links a:hover{opacity:1;color:var(--accent-soft);}
@media(max-width:940px){.nav-links{display:none;}}

/* section head — display H2 = light SANS 300 + serif-italic <em> accent */
.sec-head{max-width:760px;margin-bottom:clamp(44px,5vw,68px);}
.sec-head.center{margin-inline:auto;text-align:center;}
.sec-head .eyebrow{margin-bottom:22px;} .sec-head.center .eyebrow{justify-content:center;}
.sec-head h2{font:300 clamp(30px,4.4vw,60px)/1.05 var(--sans);letter-spacing:-.025em;color:var(--ink);}
.sec-head h2 em{font-family:var(--serif);font-style:italic;font-weight:400;font-size:1.05em;letter-spacing:-.01em;}
.sec-head p:not(.eyebrow){margin-top:20px;font-size:clamp(17px,1.4vw,20px);line-height:1.55;color:var(--ink-body);max-width:60ch;}
.sec-head.center p:not(.eyebrow){margin-inline:auto;}
.bg-dark .sec-head h2,.bg-dark-2 .sec-head h2,.bg-accent-deep .sec-head h2{color:#fff;}
.bg-dark .sec-head p:not(.eyebrow),.bg-dark-2 .sec-head p:not(.eyebrow){color:var(--on-dark-mute);}
/* .74-alpha mute fails AA on the deep-accent light stop (LED-012 class) — go solid there */
.bg-accent-deep .sec-head p:not(.eyebrow){color:var(--on-dark);}

/* card DNA: flat fill, radius 8, NO shadow, overflow hidden */
.card{border-radius:var(--radius-card);overflow:hidden;position:relative;}

/* reveal (no-JS safe; never gsap.from-gated) */
.rise{opacity:1;}
@media (prefers-reduced-motion:no-preference){
  html.js .rise{opacity:0;transform:translateY(22px);}
  html.js .rise.in{opacity:1;transform:none;transition:opacity .7s var(--ease-soft),transform .7s var(--ease-soft);}
}
```

Reveal + nav JS (paste): `<html class="no-js">`; JS swaps to `html.js`; IntersectionObserver adds `.in`
to `.rise`; hero `.rise` fire on load via `setTimeout` (NOT gsap.from — LED-011); `nav.scrolled` on
`scrollY>40`. The `no-js` class also drives the form fallback (§8.1).

---

## 4. Composition map — per section (ground · layout · measured spec · component)

The conversion skeleton is constant (Hero, Pain, ICP self-sort, Fit/Capture, Services, Process, Proof,
Final CTA, Footer, + Insights). Below is HOW each is built in this language. Reference had no analog for
Pain / ICP-self-sort / Fit-form — those recipes are marked ⚑ (build in-language, never generic).

- **HERO** — full-bleed photo (§6 imagery rules), `min-height:clamp(660px,93svh,960px)`, content
  vertically centered, 96px gutter. **Subtle LEFT scrim only** (a left→right dark gradient that clears at
  ~80% so the photo stays visible; do NOT darken the whole image). H1 = display-sans 300 with the
  **last phrase in serif-italic**. Sub 24/400/1.5. Eyebrow = ICP-named tracked caps. Primary(fill)+outline
  buttons, 12px gap. **Signature:** the CONVERGENCE MARK bottom-left (§5). Small tracked-caps image
  label bottom-right, echoing the mark's meaning (e.g. "One living plan"). Photo static.
- ⚑ **PAIN** (`bg-ground`) — 2-col grid of **flat `--ground-alt` cards**, radius 8, **no shadow**, pad ~32px,
  accent dot 10px top-right, big light-weight `--accent-ink` numeral (`clamp(40px,4.4vw,58px)/300`), serif-italic
  quote (`--ink`), sans caption (`--ink-body`). Section head H2 with serif-italic accent.
- **WHY / CREDIBILITY** (`bg-dark`) — 2-col **flat `--dark-2` cards** (elevation via the lighter fill), radius 8,
  no shadow, pad ~38px, line-icon 34px from the icon set (§8.3) in `--accent-soft`, sans-600 white h3,
  on-dark-mute body.
- ⚑ **ICP SELF-SORT** (`bg-ground`) — 3-col **full-bleed PHOTO cards** (§6 imagery rules), radius 8,
  `overflow:hidden`, `min-height:clamp(400px,42vw,480px)`, photo `object-fit:cover` + a bottom→up dark
  gradient scrim so overlaid text reads, accent dot badge 14px top-left with a soft ring, white sans-600 h3 +
  caption + accent-soft link, content bottom-anchored. Card bg `--dark` so a failed image degrades to a
  readable card.
- ⚑ **FIT / CAPTURE — THE MINI-HERO (v1.1).** This is the #1 conversion event on the page; it gets a
  full-width dark PANEL moment, not a sidebar box.
  - Section ground: `bg-ground` (light). Inside `.wrap`: one full-width **panel** — `background:var(--dark)`,
    `border-radius:var(--radius-media)` (12px), `overflow:hidden`, padding `clamp(40px,5.5vw,84px)`.
    A soft radial accent glow sits top-right INSIDE the panel
    (`radial-gradient(circle at 82% 0%, rgba(var(--accent-rgb),.16), transparent 55%)`) and a faint
    convergence-mark echo bottom-left (§5 echo variant, opacity ~.35). The tonal map stays mostly light —
    the darkness is *contained*, which is exactly what makes the moment pop.
  - Panel grid: 2-col `.9fr 1.1fr`, gap `clamp(36px,5vw,72px)`, items centered. LEFT = on-dark copy:
    accent-soft eyebrow → display H2 (sec-head scale, white + serif-italic em) → sub (on-dark-mute) →
    a 3-item reassurance row (small icon-set checks + short phrases: time cost / no pitch / honest answer).
  - RIGHT = the form card: `--card-pale`, radius 8, no shadow, padding `clamp(30px,3.4vw,46px)`.
    **One consistent type scale inside the card (this was the cold-build miss):**
    step NUMERAL `01–04` sans-**300** `clamp(34px,3vw,44px)` in `--accent-ink` + a 4-segment progress row
    (4 equal bars, 3px tall, radius 3px, `--ground-alt` base, filled segments `--accent`) · legend
    sans-300 `clamp(21px,2.2vw,28px)` in `--ink` · option buttons 15.5px/600 flat `--ground` fills,
    border 1.5px `--border`, radius 4, hover → accent-tint bg + accent border · email input same box spec ·
    micro-reassurance line 12.5px `--ink-body`. **Reuse the tested multi-step mechanism — restyle only.**
    No-JS fallback per §8.1.
- **SERVICES** (`bg-ground`) — **mixed-size BENTO** on a 6-col grid: two `span 3` cards, three `span 2`,
  one `span 6` full-width closer. Flat cards radius 8 no shadow. Dark-card placement per §8.2.
  Each: accent-ink tag + sans-600 h3 + serif-italic pain-line + body.
- **PROCESS** (`bg-ground-alt`) — 4-col flow. Big light-weight `--accent-ink` numeral (`clamp(44px,4.6vw,60px)/300`),
  1.5px hairline top-border per step, sans-600 h3, body, serif-italic "when" note.
- **PROOF** (`bg-accent-deep` — THE one saturated moment, v1.1) — centered display heading (sans-300 white +
  serif-italic accent), a **pale `--card-pale` testimonial card** (radius 8, big accent quote glyph,
  serif-italic quote in `--dark`, note), then a row of big light-weight numeral stats — numerals in
  `--on-dark` (300 weight), captions `rgba(on-dark, .9)` (NOT the .74 mute — it fails AA on the
  gradient's light stop), above a `rgba(on-dark,.25)` hairline.
  **LIGHT text on the deep ground — never dark ink on raw accent** ("green on gold"). On this ground
  every text color is `--on-dark` at ≥.9 alpha. Verify §9.
- **FINAL CTA** (`bg-ground` — a LIGHT close, not dark) — centered, a **soft radial accent glow** behind the
  heading (`radial-gradient` of `--accent` at low alpha), sans-300 heading + serif-italic accent, dual buttons.
- **INSIGHTS** (`bg-ground-alt`) — **featured split (v1.1), not 3 equal cards.** Grid `1.55fr 1fr`,
  gap 24px. LEFT = the featured item: flat `--card-pale` card, radius 8, padding `clamp(32px,3.4vw,48px)`,
  "Featured" + type tag → serif-italic h3 at `clamp(24px,2.4vw,32px)` → 2-sentence excerpt → accent-ink link;
  a 3px `--accent` bar across the card's top edge marks it as the lead. RIGHT = 2 compact stacked cards
  (equal height, standard tag + serif-italic h3 ~20px + 1-line excerpt + link). On mobile everything stacks,
  featured first.
- **FOOTER** (`bg-dark`) — multi-column links, big serif wordmark, accent-soft column heads, legal/disclaimer.

**Tonal sequence (follow this rhythm):** photo → light → dark → light → light-with-dark-PANEL →
light → light-alt → **accent-deep** → light → light-alt → dark. Mostly light; one full dark section,
one contained dark panel, one deep-accent moment.

**Section-padding rhythm (explicit — don't run one padding everywhere):** Pain/Why/ICP/Services/
Process/Proof/Final-CTA = `.pad` (80–120px); **Fit = `.pad-sm`** (the panel carries its own internal
mass) and **Insights = `.pad-sm`** (a lighter coda). Uniform padding on all sections trips the
`section-rhythm-monotony` gate check.

---

## 5. Signature moment — the CONVERGENCE MARK (v1.1; replaces the waves)

**Meaning:** three strands (your CPA · your attorney · your portfolio — the client's siloed pieces)
converge into ONE node: *one living plan*. It literalizes the mechanism instead of decorating. Keep the
strand aesthetic thin and quiet — this is the waves' craft with a reason to exist.

Hero placement: bottom-left, `width:min(620px,58vw)`, `opacity:.9`, `aria-hidden`, `pointer-events:none`.

```html
<svg class="mark" viewBox="0 0 640 200" aria-hidden="true" preserveAspectRatio="xMinYMid meet">
  <path class="s1" d="M-20,30 C 160,10 340,60 556,100"/>
  <path class="s2" d="M-20,106 C 180,96 380,104 556,100"/>
  <path class="s3" d="M-20,178 C 160,196 340,142 556,100"/>
  <circle class="f1" r="3.2"><animateMotion dur="9s"  repeatCount="indefinite" path="M-20,30 C 160,10 340,60 556,100"/></circle>
  <circle class="f2" r="2.8"><animateMotion dur="12s" repeatCount="indefinite" path="M-20,106 C 180,96 380,104 556,100"/></circle>
  <circle class="f3" r="2.4"><animateMotion dur="15s" repeatCount="indefinite" path="M-20,178 C 160,196 340,142 556,100"/></circle>
  <circle class="node" cx="556" cy="100" r="5.5"/>
  <circle class="ring" cx="556" cy="100" r="13"/>
</svg>
```
```css
.mark path{fill:none;stroke-linecap:round;}
.mark .s1{stroke:var(--accent);stroke-width:1.6;}
.mark .s2{stroke:var(--accent-soft);stroke-width:1.4;}
.mark .s3{stroke:rgba(247,243,235,.5);stroke-width:1.2;}   /* retint: rgba(on-dark, .5) */
.mark .f1{fill:var(--accent);} .mark .f2{fill:var(--accent-soft);} .mark .f3{fill:rgba(247,243,235,.75);}
.mark .node{fill:var(--accent);}
.mark .ring{fill:none;stroke:var(--accent-soft);stroke-width:1.2;transform-box:fill-box;transform-origin:center;}
@media (prefers-reduced-motion:no-preference){
  .mark .ring{animation:ringpulse 4.5s ease-in-out infinite;}
}
@keyframes ringpulse{0%,100%{transform:scale(1);opacity:.55;}50%{transform:scale(1.4);opacity:.12;}}
@media (prefers-reduced-motion:reduce){.mark .f1,.mark .f2,.mark .f3{display:none;}.mark .ring{opacity:.4;}}
```
- Flow-dots ride `<animateMotion>` (native SMIL — no JS, can't strand content invisible) on
  desynchronized 9/12/15s loops, always TOWARD the node. The ring breathes once per ~4.5s. That is the
  page's single signature motion.
- **Echo variant** (allowed ONLY inside the Fit mini-hero panel): same SVG minus the flow-dots,
  `width:min(420px,46%)`, `opacity:.35`, absolute bottom-left of the panel, clipped by the panel's
  `overflow:hidden`. Nowhere else — twice is a system, three times is wallpaper.

## 6. Imagery direction (bake this into image selection — v1.1)

- **Warm documentary-human:** real people in the ICP's actual world, candid not posed, warm natural
  light, shallow-depth environmental context. (Maven's register: lifestyle photography that feels
  found, not staged.)
- **Hero photo:** ONE person (or one human moment) in their world, with visual quiet on the copy side —
  choose images whose subject sits right-of-center so the left scrim + copy have room.
- **NEVER:** clinical/exam-room settings, white-coat-with-clipboard stock, boardroom-handshake stock,
  gray-haired-couple-on-beach, empty offices/skylines with no human presence, obviously-composited
  smiling-at-camera groups.
- ICP cards: each photo depicts THAT segment's world (not three crops of the same register). Faces or
  human traces in all three; warm grade consistent across the set.
- All placeholder imagery is marked `[VERIFY]` for licensed replacement before launch.

## 7. Motion + timing

- All hover/state transitions `0.4s ease` (buttons animate border-color/color/background-color).
- Reveals via the `.rise` CSS-class system (IntersectionObserver adds `.in`). Hero `.rise` fire on load via
  `setTimeout` stagger. **Never gate visibility with `gsap.from()`** (rAF-starvation can strand it invisible —
  LED-011). Any must-not-hide GSAP tween needs a `setTimeout` force-complete fallback.
- One signature motion moment only (the convergence mark). Photography static. `prefers-reduced-motion`
  respected everywhere (mark rules in §5).

## 8. Tested recipes (v1.1 — assemble, don't re-derive)

### 8.1 No-JS multi-step form fallback (proven in the Kindred cold build)
`<html class="no-js">` in markup; JS swaps to `.js`. Steps are `<fieldset data-step="N" hidden>` (step 1
not hidden). Then:
```css
.no-js .wiz-prog{display:none;}                          /* progress UI needs JS to mean anything */
.no-js .fit-form fieldset[hidden]{display:block;}        /* all steps visible = one long form */
.no-js .fit-form .wiz-nav{display:none;}                 /* hide step nav */
.no-js .fit-form fieldset:last-of-type .wiz-nav{display:flex;}  /* keep the submit */
.no-js .fit-form fieldset:last-of-type .wiz-back{display:none;}
```
Result: without JS the form degrades to a normal single-page form that still submits. The JS wizard is
progressive enhancement, never a gate.

### 8.2 Bento dark-card placement
- **1–2 dark (`--dark`) cards per bento, never more.** One = the flagship offer, in the FIRST `span 3`
  slot (top-left). Two = add one at the diagonally opposite corner (e.g. a later `span 2`, or the
  full-width closer). **Never two dark cards orthogonally adjacent** (side-by-side or stacked touching).
- Dark cards: tags/links flip to `--accent-soft`, h3 to `#fff`, body to `--on-dark-mute`. Hover fill
  steps toward `--dark-2`.

### 8.3 Icon set (the Pack's icons — don't pull a random library)
Single-weight line icons, drawn to one spec: `viewBox="0 0 24 24"`, `fill="none"`,
`stroke="currentColor"`, `stroke-width="1.6"`, `stroke-linecap="round"`, `stroke-linejoin="round"`.
Rendered 34px in cards; color = `--accent-soft` on dark, `--accent-ink` on light. Never filled icons,
never emoji, never 2010s flat-icon packs. Base set (reuse; add new icons only in this spec):
```html
<!-- coordinate --> <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>
<!-- shield    --> <svg viewBox="0 0 24 24"><path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7z"/><path d="M9 12l2 2 4-4"/></svg>
<!-- chart     --> <svg viewBox="0 0 24 24"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>
<!-- person    --> <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
<!-- building  --> <svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5"/></svg>
<!-- pin       --> <svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>
<!-- document  --> <svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 13h6M9 17h6"/></svg>
<!-- check     --> <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.4 2.4 4.6-5"/></svg>
```

## 9. Ship gate (verify before done)

- [ ] **Geometry:** no collapsed/overflowing/`em`-trapped elements; no horizontal scroll at 390/768/1280.
- [ ] **Register:** display is light-SANS-300 + serif-italic accent (NOT serif-everywhere); cards are flat
      **no-shadow** radius-8; exactly ONE deep-accent section; tonal map mostly light (one dark section +
      one dark panel).
- [ ] **Contrast (AA — alpha-blend before computing, LED-012: composite `rgba` over its real bg first):**
      `--accent-ink` ≥4.5:1 on `--ground` AND `--ground-alt`; `--on-dark` ≥4.5:1 on the **lightest stop**
      of the `bg-accent-deep` gradient AND on `--dark`/`--dark-2`; `--on-dark-mute` ≥4.5:1 (blended) on
      `--dark` and on the panel; dark text ≥4.5:1 on `--accent` (buttons). (Retint until these pass.)
- [ ] **Mini-hero:** the Fit panel reads as a designed moment (dark panel, radius 12, glow + mark echo);
      form card uses ONE type scale (numeral 300 / legend 300 / options 600 per §4); no-JS fallback works
      (§8.1); wizard advances + backs.
- [ ] **Proof:** LIGHT text on `--accent-deep` — no dark ink on raw accent anywhere as a ground.
- [ ] **Signature:** convergence mark present in hero (+ optional panel echo only); flow-dots hidden under
      reduced-motion; NO wave motif anywhere.
- [ ] **Insights:** featured split (lead item + 2 compact), not equal cards.
- [ ] **Numbers intact:** radii 4/8/12, gutter 96, section rhythm 80–120px varying, button pad 10×24,
      type scale ratios from §2 — all as measured, only colors retinted.
- [ ] **CTA above the fold** at 1280; console clean.
