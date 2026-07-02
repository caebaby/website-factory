# Design Language Pack — `confident-b2b` · v1.0

> **Provenance:** measured live from **betterup.com** (computed styles, 2026-07-01, Chrome). Chris's
> "next level" reference: "quality, layout, hero, content blocks, sections all next level." Every
> number below is measured unless marked `[ADAPTED]`. Orthogonal to the conversion skeleton.
>
> **Register in one line:** oversized editorial-serif display on a warm off-white ground, pill
> buttons, quantified proof everywhere, section rhythm where NO two adjacent sections share a layout.
> Premium B2B — sells to buyers who read numbers.
>
> **Measured from BetterUp (2026-07-01):**
> - H1 display: IvarDisplay serif **110px / 400 / lh 1.05** / normal tracking / near-black
> - H2: grotesk sans **50px**; H3 26px; big stat numerals **75px / 300** white over photo
> - Buttons: **PILL radius 32px**, padding 10×20, 15px/400; primary = solid black, white text;
>   accent = magenta `#CE0058`; hover = `background-position 0.6s cubic-bezier(0,.55,.45,1)`
>   (a gradient SWEEP under the fill) + `background-color 0.3s`
> - Ground: warm off-white **`#F4F3E9`** dominant; photo-stat sections use dark scrims
>   `rgba(0,0,0,.3–.7)`; stats overlaid in white
> - Section rhythm: **112px top/bottom** standard; hero **100svh**; logo-bar band directly after hero
> - Hero: full-viewport rotator — **word-substitution headline** ("Better ___ across the board"
>   cycling performance/productivity/innovation/retention/revenue/agility…) over rotating imagery
> - Section flow (the real steal): hero → logo bar → split-narrative + pinned scrolling screenshots →
>   feature band → **full-bleed photo with overlaid white stat blocks** → 4-card grid → CTA.
>   *No two adjacent sections share a layout.*
>
> **How to use:** paste §3 verbatim, retint §2 roles, build §4 in order. RETINT THE COLORS, KEEP THE
> NUMBERS. The v1.2 conversion standards from `warm-premium` (fit mini-hero, button attention cue,
> staggered reveals, LED-011/012 guards) are cross-pack REQUIREMENTS — §4/§5 express them in THIS language.

---

## 1. Register invariants (non-negotiable)

1. **Display = an editorial SERIF at oversized scale** (ref 110px → `clamp(52px,7.6vw,110px)`),
   weight 400, lh ~1.05, near-black ink. The serif at this scale IS the brand voice. Body/UI = a
   clean grotesk. (Inverse of warm-premium: serif display / sans support.)
2. **Buttons are PILLS** (radius 32px, pad 10×20, 15px). Primary = solid `--ink-strong` (near-black),
   white text. ONE accent color exists for emphasis moments — never as the default button.
3. **Quantified proof is a register feature:** every proof/outcome card carries a NUMBER (75px/300
   numerals). Vague claims are off-register. `[VERIFY]` anything unverified — never invent.
4. **One warm off-white ground everywhere** (`#F4F3E9`-class); contrast comes from full-bleed photo
   bands with dark scrims + white stat text, not from dark UI sections. Exactly ONE photo-stat band
   and ONE accent moment per page.
5. **Section rhythm law: no two adjacent sections share a layout skeleton.** 112px standard padding,
   varied by density (the logo bar runs ~40px; the photo band runs 0 with internal composition).
6. **Motion:** hover sweep on buttons (0.6s `cubic-bezier(0,.55,.45,1)` background-position), 0.3s
   color transitions, staggered 90ms grid reveals, stat count-ups (LED-011 guard). Photography static.

## 2. `:root` — roles (retint) + metrics (fixed)

```css
:root{
  /* ── ROLES — RETINT ── */
  --ground:#F4F3E9;          /* the warm off-white — dominant, whole page */
  --ground-dip:#ECEAD9;      /* one shade deeper for banded sections [ADAPTED] */
  --card-pale:#ffffff;
  --ink-strong:#0B0B0B;      /* display ink + primary button fill (near-black) */
  --ink:#1c1c1a;             /* heading ink */
  --ink-body:#4a4a44;        /* body */
  --on-dark:#ffffff;         /* text over photo scrims */
  --accent:#CE0058;          /* THE emphasis color — retint to client. Small doses. */
  --accent-ink:#9c0043;      /* AA-dark accent for small text on ground (retint until ≥4.5:1) */
  --accent-rgb:206,0,88;
  --scrim:rgba(0,0,0,.45);   /* photo-band scrim center value (.3–.7 range) */
  --border:rgba(11,11,11,.14);

  /* ── METRICS — FIXED (measured) ── */
  --maxw:1440px;             /* [ADAPTED: BetterUp is fluid w/ ~3% px] */
  --gutter:clamp(20px,3vw,56px);
  --radius-pill:32px;        /* button pill */
  --radius-card:16px;        /* [ADAPTED from screenshot carousel corners] */
  --pad-section:112px;       /* measured standard */
  --dur:.3s; --dur-sweep:.6s;
  --ease-sweep:cubic-bezier(0,.55,.45,1);
  --ease-soft:cubic-bezier(.16,1,.3,1);

  /* ── FONTS — roles ──
     --serif-display MUST have a true display cut (Ivar sub: Fraunces 72pt opsz, or Instrument Serif).
     --sans = clean grotesk (Söhne sub: Schibsted Grotesk / Switzer / General Sans). */
  --serif-display:'Fraunces',Georgia,serif;
  --sans:'Schibsted Grotesk','Helvetica Neue',Arial,sans-serif;
}
```

**Measured type scale:**

| Role | Font | Size | Weight | LH | Notes |
|---|---|---|---|---|---|
| Hero H1 | serif-display | `clamp(52px,7.6vw,110px)` | 400 | 1.05 | word-substitution slot in accent |
| Section H2 | sans | `clamp(30px,3.6vw,50px)` | 400–500 | 1.1 | |
| H3 / card head | sans | 26px | 500 | 1.2 | |
| Stat numeral | sans | `clamp(44px,5.2vw,75px)` | **300** | 1.0 | white on photo, ink on ground |
| Body | sans | 16–18px | 400 | 1.55 | |
| Eyebrow | sans | 13px | 600 | 1.3 | +1px tracking, caps |
| Button | sans | 15px | 500 | 1.2 | pill |

## 3. Global CSS (paste verbatim)

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-size:16px;scroll-behavior:smooth;}
body{font-family:var(--sans);background:var(--ground);color:var(--ink-body);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.55;}
a{color:inherit;text-decoration:none;} img{display:block;max-width:100%;}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
section{position:relative;}
.pad{padding:var(--pad-section) 0;} .pad-sm{padding:calc(var(--pad-section)*.55) 0;}
.bg-ground{background:var(--ground);} .bg-dip{background:var(--ground-dip);}

.eyebrow{display:inline-flex;align-items:center;gap:10px;font:600 13px/1.3 var(--sans);letter-spacing:1px;text-transform:uppercase;color:var(--accent-ink);}

/* pill buttons — measured: r32, pad 10x20, 15px; hover = gradient SWEEP (bg-position) */
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:var(--radius-pill);font:500 15px/1.2 var(--sans);padding:10px 20px;cursor:pointer;border:1px solid transparent;
  background-size:200% 100%;background-position:0% 0;
  transition:background-color var(--dur),color var(--dur),border-color var(--dur),background-position var(--dur-sweep) var(--ease-sweep);}
.btn-primary{color:#fff;background-image:linear-gradient(100deg,var(--ink-strong) 0 50%,var(--accent) 50% 100%);}
.btn-primary:hover{background-position:100% 0;}      /* the measured sweep: black -> accent */
.btn-outline{border-color:var(--ink-strong);color:var(--ink-strong);background-image:linear-gradient(100deg,transparent 0 50%,var(--ink-strong) 50% 100%);}
.btn-outline:hover{background-position:100% 0;color:#fff;}

.sec-head{max-width:820px;margin-bottom:clamp(40px,5vw,64px);}
.sec-head h2{font:400 clamp(30px,3.6vw,50px)/1.1 var(--sans);letter-spacing:-.015em;color:var(--ink);}
.sec-head .eyebrow{margin-bottom:18px;}

/* reveals — same .rise/.stagger system as warm-premium v1.2 (90ms, backwards-fill) */
.rise{opacity:1;}
@media (prefers-reduced-motion:no-preference){
  html.js .rise{opacity:0;transform:translateY(22px);}
  html.js .rise.in{opacity:1;transform:none;transition:opacity .7s var(--ease-soft),transform .7s var(--ease-soft);}
  html.js .stagger>*{opacity:0;}
  html.js .stagger.in>*{opacity:1;animation:riseIn .7s var(--ease-soft) backwards;}
  html.js .stagger.in>*:nth-child(2){animation-delay:.09s;} html.js .stagger.in>*:nth-child(3){animation-delay:.18s;}
  html.js .stagger.in>*:nth-child(4){animation-delay:.27s;} html.js .stagger.in>*:nth-child(5){animation-delay:.36s;}
  html.js .stagger.in>*:nth-child(6){animation-delay:.45s;} html.js .stagger.in>*:nth-child(7){animation-delay:.54s;}
  html.js .stagger.in>*:nth-child(8){animation-delay:.63s;}
}
@keyframes riseIn{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}
```

## 4. Composition map (conversion skeleton in this language)

- **HERO** — near-full viewport (`min-height:clamp(640px,92svh,940px)`), **centered** serif display
  headline with the **cycling-word slot** (COMPONENTS Primitive 1, grid-stack — the slot word in
  `--accent`, at a line END). Ground = `--ground` (typographic hero) OR rotating full-bleed imagery
  with a soft bottom scrim. Sub 18–20px, dual pill CTAs. NO overlay graphics (v1.2 law).
- **LOGO/CRED BAR** (directly after hero, ~40px pad) — a quiet single-row band: client logos or
  tracked-caps credibility line. This is the measured BetterUp move — proof before pitch.
- ⚑ **PAIN** — split-narrative: sticky left heading (serif, ~50px) + right column of pain rows, each
  with a 75px/300 numeral. NOT a card grid (Services owns cards — rhythm law).
- **WHY / OUTCOME METRICS** — the **quantified-proof card row**: 3 white cards (radius 16), each =
  logo-or-tag + **big numeral (75/300, `--ink-strong`)** + one-line outcome + "Read more →" in accent-ink.
  Numbers `[VERIFY]` unless real.
- ⚑ **ICP SELF-SORT** — horizontal band of 3 wide rows (not cards): each row = tracked-caps segment
  label + serif one-liner + arrow link; hairline dividers. Hover: row background dips to `--ground-dip`.
- ⚑ **FIT / CAPTURE — the mini-hero (cross-pack v1.2 standard), in THIS language:** full-width
  **photo band** with the measured dark scrim (`--scrim`), white display text left, **white pill-form
  card** right (the wizard, restyled: pill progress dots, 15px pill option buttons). The convergence
  diagram renders in WHITE strokes + accent node over the scrim. 2-cycle ring pulse on the card.
- **SERVICES** — 4-card grid (the "One platform, four ways in" move): white cards radius 16, sans H3
  26px, body, arrow link. One card may use `--accent` as its fill (the accent moment) with white text.
- **PROCESS** — numbered horizontal stepper: 75/300 numerals in `--accent-ink`, hairline connector.
- **PROOF** — **full-bleed photo with overlaid white stat blocks** (the measured signature): dark
  scrim, 2–3 stats in white 75/300 + captions, one testimonial quote in serif italic white. Count-up
  on reveal w/ LED-011 guard.
- **FINAL CTA** — centered serif display line + dual pills on `--ground`; soft accent radial behind.
- **INSIGHTS** — featured split (v1.2 standard): 1 lead + 2 compact, white cards radius 16.
- **FOOTER** — `--ink-strong` ground, white text, accent column heads.

**Rhythm check:** centered-hero → band → split-narrative → card-row → row-list → photo-band →
card-grid → stepper → photo-stats → centered → featured-split → dark footer. No two adjacent alike.

## 5. Conversion-motion standards (cross-pack, expressed here)

- **Button attention cue** = the measured gradient SWEEP on hover + an idle micro-sweep every ~6s
  (same keyframe animating `background-position` 0%→8%→0%). Quiet; no shimmer overlay needed — the
  sweep IS this language's cue.
- **Fit mini-hero** carries the signature convergence diagram (labels retinted to client silos),
  white-stroke variant. Ring pulse ×2 on the form card.
- Staggered reveals (§3), stat count-ups with LED-011 `setTimeout` guard, `prefers-reduced-motion`
  collapses everything to static-visible. No-JS form fallback per warm-premium §8.1 (identical recipe).

## 6. Ship gate

- [ ] Geometry: no collapse/overflow/em-trap at 390/768/1280; hero CTA above the fold.
- [ ] Register: serif display ≥52px w/ cycling-word accent slot; pill buttons r32 pad 10×20; warm
      off-white ground; quantified proof cards w/ 75/300 numerals; ONE photo-stat band; ONE accent moment.
- [ ] Rhythm: no two adjacent sections share a layout skeleton; logo/cred bar directly after hero.
- [ ] Contrast (alpha-blend math, LED-012): white ≥4.5:1 on scrimmed photo (verify at the LIGHTEST
      visible point); `--accent-ink` ≥4.5:1 on `--ground`; white ≥4.5:1 on `--accent` if used as fill.
- [ ] Motion: sweep hover works; stagger; count-up guard; reduced-motion + no-JS static-visible.
- [ ] Numbers intact: pill 32/10×20/15px; section 112; type ratios per §2. Colors retinted only.
