# Design Language Pack — `dark-confident` · v1.0

> **Provenance:** measured live from **stashwealth.com** (computed styles, 2026-07-01, Chrome) — the
> proof that full-dark converts in wealth advisory ("Get Your Financial Sh*t Together"). Chris-approved
> reference (docs/REFERENCES.md ⭐). Numbers measured unless `[ADAPTED]`.
>
> **Register in one line:** condensed-sans display at confident scale, true-dark ground that
> ALTERNATES with warm-light sections, square zero-radius buttons in one warm neutral, uppercase
> tracked labels, fast snappy transitions. Assumes a smart reader; no hand-holding.
>
> **Measured from Stashwealth (2026-07-01):**
> - H1: Oswald (condensed sans) **67.84px / 400 / lh 1.056 / -1.36px tracking**, centered, white
> - H2: Oswald **40.19px / 400 / -0.8px tracking** — white on dark sections, black on light sections
> - Buttons: **radius 0 (square)**, warm greige `#E0D7CE` fill, black text, **Poppins 600 UPPERCASE**;
>   sizes scale: 11.85px/pad 17.8×23.7 (small) · 13.9px/pad 20.9×27.9 (mid) · 19.2px/pad 28.8×38.4 (large);
>   tracking ~0.95–1.5px; transition **opacity .1s linear** (snappy)
> - Ground: near-black page; **sections alternate dark ↔ warm-light** (their own antidote to
>   monotone-dark — encode as LAW, this is what killed our Dark Precision build)
> - Accent: the warm greige neutral IS the accent (`#E0D7CE` family) — one committed neutral, not a color
>
> **The "too dark" antidote (Chris, 4 rounds of Dark Precision — now hard law):** dark-confident is
> an ALTERNATION language, not a black page. Strict tonal sequence in §4. Never more than two dark
> sections in a row; the Fit conversion moment sits on a LIGHT section.
>
> **How to use:** paste §3, retint §2, build §4 in order. RETINT THE COLORS, KEEP THE NUMBERS.
> v1.2 conversion standards (fit mini-hero, attention cues, stagger, LED-011/012 guards) expressed
> in this language in §4/§5.

---

## 1. Register invariants

1. **Display = a CONDENSED sans** (Oswald-class), weight 400, tight lh (~1.06), negative tracking
   (-0.02em), at `clamp(40px,4.7vw,68px)`. Confident, not shouty — scale + condensation carry it.
2. **Buttons are SQUARE (radius 0)** in the warm neutral, black text, Poppins-class 600 UPPERCASE
   with ~0.95px tracking. Three measured sizes (§2). Hover = fast (≤.15s) opacity/inversion. No pills,
   no rounded corners anywhere on interactive elements — the squareness is the register.
3. **One committed warm NEUTRAL accent** (`--greige`), not a saturated color. It owns buttons, key
   numerals, and exactly one drenched section. A second (saturated) accent is allowed ONLY as a
   ≤3-place micro-accent if the brand demands it.
4. **THE ALTERNATION LAW:** the page alternates dark ↔ warm-light sections (§4 sequence). Max two
   consecutive dark sections. Dark = `#0C0C0C` page-black with `#161616` elevation (premium-dark
   rules: elevation via lighter fills, never drop shadows). Light = warm paper (`--paper`).
5. **Labels/eyebrows: uppercase, tracked, small** (11–13px/600). Body text on dark is `rgba(255,255,255,.78)`-class,
   never pure white walls.
6. **Motion is FAST and matter-of-fact:** .1–.2s linear/ease-out state changes; staggered reveals
   (90ms); one signature moment (Fit diagram); count-ups. No float, no drift, no glow.

## 2. `:root` — roles (retint) + metrics (fixed)

```css
:root{
  /* ── ROLES — RETINT ── */
  --black:#0C0C0C;           /* page dark (tinted near-black, never #000) */
  --black-2:#161616;         /* dark elevation step */
  --paper:#F2EDE5;           /* the warm-light alternation ground */
  --paper-2:#E8E1D4;         /* light elevation step */
  --card-pale:#ffffff;
  --greige:#E0D7CE;          /* THE committed neutral — buttons, numerals, one drench */
  --greige-deep:#8f8377;     /* AA-mid greige for small text on paper (retint ≥4.5:1) [ADAPTED] */
  --ink:#111111;             /* heading ink on light */
  --ink-body:#3d3a36;        /* body on light */
  --on-dark:#F5F1EA;
  --on-dark-mute:rgba(245,241,234,.78);
  --greige-rgb:224,215,206;
  --border-dark:rgba(245,241,234,.16);
  --border-light:rgba(17,17,17,.16);

  /* ── METRICS — FIXED (measured) ── */
  --maxw:1400px;             /* [ADAPTED] */
  --gutter:clamp(20px,4vw,72px);
  --radius:0px;              /* SQUARE. everywhere. */
  --btn-pad-sm:17.8px 23.7px; --btn-fs-sm:11.9px; --btn-track-sm:.95px;
  --btn-pad-md:20.9px 27.9px; --btn-fs-md:13.9px; --btn-track-md:.7px;
  --btn-pad-lg:28.8px 38.4px; --btn-fs-lg:19.2px; --btn-track-lg:1.5px;
  --dur:.12s; --ease:linear;              /* measured .1s linear — snappy */
  --dur-soft:.5s; --ease-soft:cubic-bezier(.16,1,.3,1);  /* reveals only */

  /* ── FONTS — roles ──
     --display = condensed sans w/ 400 (Oswald default; alternatives: Archivo Condensed, Barlow Condensed).
     --label = geometric sans w/ 600 for uppercase UI (Poppins default). Body can share --label family at 400. */
  --display:'Oswald','Arial Narrow',sans-serif;
  --label:'Poppins','Helvetica Neue',sans-serif;
}
```

**Measured type scale:**

| Role | Font | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| Hero H1 | display | `clamp(40px,4.7vw,68px)` | 400 | 1.06 | -0.02em |
| Section H2 | display | `clamp(28px,2.8vw,40px)` | 400 | 1.12 | -0.02em |
| Card H3 | display | 24px | 400 | 1.2 | -0.01em |
| Big numeral | display | `clamp(44px,4.8vw,64px)` | 400 | 1.0 | -0.02em |
| Body | label | 15–17px | 400 | 1.6 | 0 |
| Eyebrow/label | label | 12px | 600 | 1.3 | 1px, UPPERCASE |
| Buttons | label | §2 sizes | 600 | 1.2 | §2, UPPERCASE |

## 3. Global CSS (paste verbatim)

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-size:16px;scroll-behavior:smooth;}
body{font-family:var(--label);background:var(--black);color:var(--on-dark-mute);-webkit-font-smoothing:antialiased;overflow-x:hidden;line-height:1.6;}
a{color:inherit;text-decoration:none;} img{display:block;max-width:100%;}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--gutter);}
section{position:relative;}
.pad{padding:clamp(76px,8.5vw,116px) 0;} .pad-sm{padding:clamp(52px,6vw,84px) 0;}

/* THE ALTERNATION grounds */
.bg-black{background:var(--black);color:var(--on-dark-mute);}
.bg-paper{background:var(--paper);color:var(--ink-body);}
.bg-paper-2{background:var(--paper-2);color:var(--ink-body);}
.bg-greige{background:var(--greige);color:var(--ink);}   /* the one drench */

.eyebrow{display:inline-flex;align-items:center;gap:10px;font:600 12px/1.3 var(--label);letter-spacing:1px;text-transform:uppercase;color:var(--greige);}
.bg-paper .eyebrow,.bg-paper-2 .eyebrow{color:var(--greige-deep);}
.bg-greige .eyebrow{color:var(--ink);}

/* SQUARE buttons — measured Stash values; hover = instant inversion */
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:0;font:600 var(--btn-fs-md)/1.2 var(--label);letter-spacing:var(--btn-track-md);text-transform:uppercase;padding:var(--btn-pad-md);cursor:pointer;border:1px solid var(--greige);transition:background-color var(--dur) var(--ease),color var(--dur) var(--ease),opacity var(--dur) var(--ease);}
.btn-fill{background:var(--greige);color:var(--ink);}
.btn-fill:hover{background:transparent;color:var(--greige);}
.bg-paper .btn-fill{border-color:var(--ink);background:var(--ink);color:var(--paper);}
.bg-paper .btn-fill:hover{background:transparent;color:var(--ink);}
.btn-ghost{background:transparent;color:var(--greige);}
.btn-ghost:hover{background:var(--greige);color:var(--ink);}
.bg-paper .btn-ghost{border-color:var(--ink);color:var(--ink);}
.bg-paper .btn-ghost:hover{background:var(--ink);color:var(--paper);}
.btn-lg{font-size:var(--btn-fs-lg);letter-spacing:var(--btn-track-lg);padding:var(--btn-pad-lg);}
.btn-sm{font-size:var(--btn-fs-sm);letter-spacing:var(--btn-track-sm);padding:var(--btn-pad-sm);}

.sec-head{max-width:780px;margin-bottom:clamp(40px,5vw,60px);}
.sec-head h2{font:400 clamp(28px,2.8vw,40px)/1.12 var(--display);letter-spacing:-.02em;color:var(--on-dark);}
.bg-paper .sec-head h2,.bg-paper-2 .sec-head h2{color:var(--ink);}
.bg-greige .sec-head h2{color:var(--ink);}
.sec-head .eyebrow{margin-bottom:18px;}

/* dark elevation: lighter fill, NEVER drop shadow */
.card-dark{background:var(--black-2);border:1px solid var(--border-dark);}
.card-light{background:var(--card-pale);border:1px solid var(--border-light);}

/* reveals — same .rise/.stagger system (v1.2 standard) */
.rise{opacity:1;}
@media (prefers-reduced-motion:no-preference){
  html.js .rise{opacity:0;transform:translateY(22px);}
  html.js .rise.in{opacity:1;transform:none;transition:opacity .6s var(--ease-soft),transform .6s var(--ease-soft);}
  html.js .stagger>*{opacity:0;}
  html.js .stagger.in>*{opacity:1;animation:riseIn .6s var(--ease-soft) backwards;}
  html.js .stagger.in>*:nth-child(2){animation-delay:.09s;} html.js .stagger.in>*:nth-child(3){animation-delay:.18s;}
  html.js .stagger.in>*:nth-child(4){animation-delay:.27s;} html.js .stagger.in>*:nth-child(5){animation-delay:.36s;}
  html.js .stagger.in>*:nth-child(6){animation-delay:.45s;} html.js .stagger.in>*:nth-child(7){animation-delay:.54s;}
  html.js .stagger.in>*:nth-child(8){animation-delay:.63s;}
}
@keyframes riseIn{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:none;}}
```

## 4. Composition map + THE TONAL SEQUENCE (law)

**Sequence:** dark HERO → dark PAIN (the allowed dark pair) → **paper** WHY → dark ICP →
**paper FIT (the mini-hero — conversion happens on LIGHT)** → dark SERVICES → **paper-2** PROCESS →
**greige DRENCH** PROOF → dark FINAL-CTA → **paper** INSIGHTS → dark FOOTER.
Max two consecutive darks; the drench is the climax; Fit is light.

- **HERO** (`bg-black`) — centered (measured): condensed H1 white, uppercase eyebrow above in greige,
  sub 16–17px `--on-dark-mute` max 52ch, dual square buttons (fill + ghost), `min-height:clamp(600px,86svh,880px)`.
  Ground = flat black or a barely-there radial greige tint (≤.06 alpha). NO photo required — this
  language can carry a typographic hero. NO overlay graphics (v1.2 law).
- ⚑ **PAIN** (`bg-black`) — 2-col rows with hairline top-borders (`--border-dark`), greige numeral
  (display, 44–64/400), white quote line (display 24px), muted caption. Row hover: bg `--black-2`.
- **WHY** (`bg-paper`) — 4 `--card-pale` square cards (radius 0, border, NO shadow), line icons
  (warm-premium §8.3 icon spec, `--greige-deep` on light), display H3, body.
- ⚑ **ICP SELF-SORT** (`bg-black`) — 3 photo cards, radius 0, duotone/dark-graded photos, bottom
  scrim, white display H3, greige link. Card bg `--black-2` fallback.
- ⚑ **FIT — the mini-hero, on PAPER (the conversion moment is LIGHT in this language):** full-width
  `--card-pale` panel (radius 0, 1px `--ink` border — the panel's squareness + border IS the moment),
  2-col: copy left (ink display H2, reassurance row), form card right (`--paper` fill, square option
  buttons in the §2 small-button spec, greige-deep step numeral + 4 square segments). Signature
  convergence diagram in ink/greige strokes under the copy. 2-cycle ring pulse (greige) on reveal.
- **SERVICES** (`bg-black`) — 6-cell bento, radius 0: `--black-2` cells + exactly one `--greige` cell
  (flagship) + full-width closer hosting the section CTA (greige fill button on black — strongest pop).
- **PROCESS** (`bg-paper-2`) — 4-col stepper, greige-deep numerals + ink heads, hairlines.
- **PROOF** (`bg-greige` — THE drench) — ink display heading, one `--card-pale` testimonial card
  (square), ink stat numerals w/ count-up (LED-011 guard). All-ink text on greige: verify ≥4.5:1.
- **FINAL CTA** (`bg-black`) — centered display line + btn-lg pair. Barely-there greige radial.
- **INSIGHTS** (`bg-paper`) — featured split (v1.2 standard), square cards.
- **FOOTER** (`bg-black`) — columns, greige heads, hairline top.

## 5. Conversion-motion standards (cross-pack, in this language)

- **Button attention cue:** a periodic 1px border-flash + fill-blink is off-register; instead the
  primary CTA gets a **slow greige underline-crawl** beneath it OR the hero CTA pair sits directly
  under the sub with generous isolation (whitespace = the cue). Idle sheen is allowed ONLY on the
  Services closer button (one place).
- **Fit mini-hero** carries the convergence diagram (ink strokes, greige node) + 2-cycle ring pulse.
- Staggered reveals; stat count-ups w/ LED-011 guard; reduced-motion + no-JS = static-visible;
  no-JS form fallback per warm-premium §8.1.

## 6. Ship gate

- [ ] Geometry: no collapse/overflow/em-trap at 390/768/1280; CTA above fold.
- [ ] Register: condensed-sans display; SQUARE everything (0 radius sitewide); uppercase tracked
      buttons at the three measured sizes; greige = the one committed neutral.
- [ ] **ALTERNATION LAW:** max two consecutive dark sections; Fit on light; exactly one greige drench;
      page is NOT monotone dark (count: ≥4 light-ground sections).
- [ ] Contrast (alpha-blend math): `--on-dark-mute` ≥4.5:1 on `--black` AND `--black-2`; ink ≥4.5:1 on
      `--greige`; `--greige-deep` ≥4.5:1 on `--paper`; greige button text ≥4.5:1.
- [ ] Dark elevation via lighter fills only — zero box-shadows on dark.
- [ ] Motion: ≤.15s state changes; stagger; count-up guard; reduced-motion/no-JS static-visible.
- [ ] Numbers intact: button pads/sizes/tracking per §2; only colors retinted.
