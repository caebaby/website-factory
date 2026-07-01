# Design Language Pack — `warm-premium`

> **Provenance:** measured live from **mavenclinic.com** (computed styles, 2026-07-01) and proven in
> `projects/awp/build/maven-home.html` (the gold-standard exemplar). Every number below is a
> *measured* value, not an approximation. **This is the "how it looks" layer.** It is orthogonal to
> the conversion skeleton (the "what it says" layer).
>
> **How to use this Pack (read this or you will get it wrong):**
> 1. Paste §3 (the global CSS system) verbatim. Set the §2 `:root` **color roles** to the client's brand.
> 2. **RETINT THE COLORS. KEEP THE NUMBERS.** Radii, spacing, type scale, tracking, timing are FIXED —
>    they are what make this "the same language." Only the color roles change per client.
> 3. Build each section's markup+CSS from §4 (the composition map) — reuse the components, hit the
>    measured numbers. Do **not** improvise your own layout or invent numbers.
> 4. Obey §1 (the register invariants) as hard constraints. Verify against §7 before shipping.
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
   (dots, the wave motif), and exactly one saturated section (Proof). Everywhere else it is restraint.
4. **Mostly-light tonal map; darks are accents, not the default.** Vary the darks (a DEEP and a MID step),
   don't run one flat dark. Exactly one saturated-accent moment. (This is the antidote to "too dark.")
5. **Generous geometry:** 1512px max container, 96px side gutters, 80–120px section rhythm that *varies*
   (density alternation), tight display line-height (~1.0–1.05), slightly negative tracking.
6. **Motion is quiet:** 0.4s ease transitions; a single signature motion moment (drifting wave lines),
   photography stays static. No particles, no bounce, no glow-everywhere.

---

## 2. `:root` — color ROLES (retint these) + metrics (do NOT touch)

```css
:root{
  /* ── COLOR ROLES — RETINT PER CLIENT ─────────────────────────────
     Defaults shown are the AWP retint. Replace the hex with the client's brand,
     keeping each role's JOB. Verify contrast (see §7) after retinting. */
  --ground:#F5F0E6;        /* primary light section bg (warmest neutral) */
  --ground-alt:#EDE7D9;    /* secondary light bg — a real tonal step darker than --ground */
  --card-pale:#ffffff;     /* pale card fill on light (white or palest brand tint) */
  --dark:#142840;          /* primary DARK ground + display ink on light (brand's darkest) */
  --dark-2:#1e395a;        /* secondary dark — one step LIGHTER (dark-card elevation) */
  --ink:#1b2a3c;           /* display heading ink on light */
  --ink-body:#4b5b6e;      /* body text on light */
  --on-dark:#F7F3EB;       /* text on dark grounds */
  --on-dark-mute:rgba(247,243,235,.74);
  --accent:#c9a24b;        /* THE one committed color — button fill, dots, waves, proof ground */
  --accent-soft:#dcc07e;   /* lighter accent — eyebrows/links/icons ON DARK */
  --accent-ink:#7d5f26;    /* AA-safe DEEP accent for small text ON LIGHT.
                              RETINT RULE: darken --accent until it clears 4.5:1 on --ground & --ground-alt */
  --accent-rgb:201,162,75;
  --border:rgba(20,40,64,.14);

  /* ── METRICS — FIXED. DO NOT RETINT. (measured from Maven) ──────── */
  --maxw:1512px;                     /* Maven container max */
  --gutter:clamp(24px,5vw,96px);     /* Maven 96px gutter */
  --radius-btn:4px;                  /* Maven .25rem */
  --radius-card:8px;                 /* Maven 8px */
  --radius-media:12px;               /* Maven 12px large-media */
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
| Big numeral (pain/process/stat) | sans | `clamp(44px,4.6vw,62px)` | **300** | 1.0 | -0.03em |
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
.bg-accent{background:var(--accent);color:var(--dark);}   /* the one saturated moment */

/* eyebrow: 12/600/1px-tracking/uppercase. accent-ink on light, accent-soft on dark. */
.eyebrow{display:inline-flex;align-items:center;gap:10px;font:600 12px/1.3 var(--sans);letter-spacing:1px;text-transform:uppercase;color:var(--accent-ink);}
.eyebrow::before{content:"";width:22px;height:1.5px;background:currentColor;flex:none;}
.bg-dark .eyebrow,.bg-dark-2 .eyebrow{color:var(--accent-soft);}
.bg-accent .eyebrow{color:var(--dark);}

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
.bg-dark .sec-head h2,.bg-dark-2 .sec-head h2{color:#fff;}
.bg-dark .sec-head p:not(.eyebrow),.bg-dark-2 .sec-head p:not(.eyebrow){color:var(--on-dark-mute);}
.bg-accent .sec-head h2{color:var(--dark);} .bg-accent .sec-head p:not(.eyebrow){color:color-mix(in srgb,var(--dark) 82%,transparent);}

/* card DNA: flat fill, radius 8, NO shadow, overflow hidden */
.card{border-radius:var(--radius-card);overflow:hidden;position:relative;}

/* reveal (no-JS safe; never gsap.from-gated) */
.rise{opacity:1;}
@media (prefers-reduced-motion:no-preference){
  html.js .rise{opacity:0;transform:translateY(22px);}
  html.js .rise.in{opacity:1;transform:none;transition:opacity .7s var(--ease-soft),transform .7s var(--ease-soft);}
}
```

Reveal + nav JS (paste): add `html.js`; IntersectionObserver adds `.in` to `.rise`; hero `.rise` fire on load via `setTimeout` (NOT gsap.from — see §6); `nav.scrolled` on `scrollY>40`.

---

## 4. Composition map — per section (ground · layout · measured spec · component)

The conversion skeleton is constant (Hero, Pain, ICP self-sort, Fit/Capture, Services, Process, Proof,
Final CTA, Footer, + Insights). Below is HOW each is built in this language. Reference had no analog for
Pain / ICP-self-sort / Fit-form — those recipes are marked ⚑ (build in-language, never generic).

- **HERO** — full-bleed photo, `min-height:clamp(660px,93svh,960px)`, content vertically centered, 96px gutter.
  **Subtle LEFT scrim only** (deliberately light — a left→right dark gradient that clears at ~80% so the photo
  stays visible; do NOT darken the whole image). H1 = display-sans 300 with the **last phrase in serif-italic**.
  Sub 24/400/1.5. Eyebrow = ICP-named tracked caps. Primary(fill)+outline buttons, 12px gap.
  **Signature:** 3 desync sine-wave SVG paths bottom-left in accent/accent-soft/on-dark w/ dot terminals,
  drifting on 13/17/21s alternating loops (see §5). Small tracked-caps image label bottom-right. Photo static.
- ⚑ **PAIN** (`bg-ground`) — 2-col grid of **flat `--ground-alt` cards**, radius 8, **no shadow**, pad ~32px,
  accent dot 10px top-right, big light-weight `--accent-ink` numeral (`clamp(40px,4.4vw,58px)/300`), serif-italic
  quote (`--ink`), sans caption (`--ink-body`). Section head H2 with serif-italic accent.
- **WHY / CREDIBILITY** (`bg-dark`) — 2-col **flat `--dark-2` cards** (elevation via the lighter fill), radius 8,
  no shadow, pad ~38px, accent-soft line-icon 34px, sans-600 white h3, on-dark-mute body.
- ⚑ **ICP SELF-SORT** (`bg-ground`) — 3-col **full-bleed PHOTO cards**, radius 8, `overflow:hidden`,
  `min-height:clamp(400px,42vw,480px)`, photo `object-fit:cover` + a bottom→up dark gradient scrim so overlaid
  text reads, accent dot badge 14px top-left with a soft ring, white sans-600 h3 + caption + accent-soft link,
  content bottom-anchored. Card bg `--dark` so a failed image degrades to a readable card.
- ⚑ **FIT / CAPTURE** (`bg-ground-alt`) — 2-col (copy left, card right). **Pale `--card-pale` card**, radius 8,
  thin border, no shadow. Multi-step form: flat option buttons radius 4 / border 1.5 / hover accent-tint,
  accent progress bar, sans-300 legend. **Reuse the tested multi-step mechanism — restyle only.**
- **SERVICES** (`bg-ground`) — **mixed-size BENTO** on a 6-col grid: two `span 3` cards, three `span 2`,
  one `span 6` full-width closer. Flat cards radius 8 no shadow; **mix in 1–2 `--dark` cards** among the light
  ones for rhythm. Each: accent-ink tag + sans-600 h3 + serif-italic pain-line + body.
- **PROCESS** (`bg-ground-alt`) — 4-col flow. Big light-weight `--accent-ink` numeral (`clamp(44px,4.6vw,60px)/300`),
  1.5px hairline top-border per step, sans-600 h3, body, serif-italic "when" note.
- **PROOF** (`bg-accent` — THE one saturated moment) — centered display heading (sans-300 + serif-italic accent),
  a **pale `--card-pale` testimonial card** (radius 8, big quote glyph, serif-italic quote, note), then a row of
  big light-weight numeral stats (`300` weight) with captions. **Dark text on accent — verify AA (§7).**
- **FINAL CTA** (`bg-ground` — a LIGHT close, not dark) — centered, a **soft radial accent glow** behind the
  heading (`radial-gradient` of `--accent` at low alpha), sans-300 heading + serif-italic accent, dual buttons.
- **INSIGHTS** (`bg-ground-alt`) — 3-col flat `--card-pale` cards, radius 8 no shadow, accent-ink tag +
  serif-italic h3 + body.
- **FOOTER** (`bg-dark`) — multi-column links, big serif wordmark, accent-soft column heads, legal/disclaimer.

**Tonal sequence (follow this rhythm):** photo → light → dark → light → light-alt → light → light-alt →
**accent** → light → light-alt → dark. Mostly light; two dark steps (use DEEP and MID); one accent moment.

---

## 5. Signature moment — drifting sine-waves (SVG, bottom-left of hero)

3 `<path>` sine curves (`fill:none;stroke-linecap:round`) in `--accent` / `--accent-soft` /
`rgba(on-dark,.55)`, stroke-width 1.6/1.4/1.2, each ending in a small dot `<circle>`. Wrap each in a `<g>`
animated `transform:translateX` on **desynchronized** loops (`13s`/`17s`/`21s`, alternate + alternate-reverse),
`@keyframes{from{translateX(-14px)}to{translateX(16px)}}`. `aria-hidden`, decorative, degrades to static under
reduced-motion. `width:min(620px,58vw)`, `overflow:visible`, `opacity:.9`.

## 6. Motion + timing

- All hover/state transitions `0.4s ease` (buttons animate border-color/color/background-color).
- Reveals via the `.rise` CSS-class system (IntersectionObserver adds `.in`). Hero `.rise` fire on load via
  `setTimeout` stagger. **Never gate visibility with `gsap.from()`** (rAF-starvation can strand it invisible —
  LED-011). Any must-not-hide GSAP tween needs a `setTimeout` force-complete fallback.
- One signature motion moment only (the waves). Photography static. `prefers-reduced-motion` respected.

## 7. Ship gate (verify before done)

- [ ] **Geometry:** no collapsed/overflowing/`em`-trapped elements; no horizontal scroll at 390/768/1280.
- [ ] **Register:** display is light-SANS-300 + serif-italic accent (NOT serif-everywhere); cards are flat
      **no-shadow** radius-8; exactly ONE saturated accent section; tonal map mostly light.
- [ ] **Contrast (AA):** `--accent-ink` ≥4.5:1 on `--ground` AND `--ground-alt`; dark text ≥4.5:1 on `--accent`
      (proof); on-dark text ≥4.5:1 on `--dark`/`--dark-2`. (Retint until these pass.)
- [ ] **Numbers intact:** radii 4/8/12, gutter 96, section rhythm 80–120px varying, button pad 10×24,
      type scale ratios from §2 — all as measured, only colors retinted.
- [ ] **CTA above the fold** at 1280; multi-step form advances/back; console clean.
