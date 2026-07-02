# BUILD EXECUTOR TASK — Anchor Wealth Planning homepage (cold build, confident-b2b language)

You are a build executor for a website factory. Everything you need is IN THIS MESSAGE:
(1) this task spec, (2) a Design Language Pack (the measured design system), (3) a client brief
(brand tokens + copy). You have NO other context and should invent none. You have no access to any
prior build of this client — do not try to imagine one; execute THIS pack's language fully.

## Your job
Build the COMPLETE Anchor Wealth Planning homepage as ONE self-contained HTML file: the Pack's
measured language retinted to the brief's brand tokens, the brief's copy dropped into the Pack's
composition map. The Pack governs every number (type scales, spacing, radii, contrast floors,
motion guards, section rhythm). The brief governs brand + copy only.

## Hard rules
- The PACK's numbers are law. Do not improvise values the Pack specifies. Where the Pack gives a
  recipe, ASSEMBLE it — do not re-derive from a description.
- Single file: inline CSS + JS. External requests allowed ONLY for Google Fonts `<link>` and the
  brief's listed image URLs.
- Never fabricate stats, credentials, or testimonials. The brief marks unverifiable claims
  `[VERIFY]` — keep those markers visible. NEVER animate a placeholder number (no count-up on
  anything marked [VERIFY]).
- Reveal-system law: base-hidden rules live under a JS-detection class (e.g. `html.js`); every
  end-state (opacity:1 + its animation) must be gated under the `.in` class added on scroll
  intersection. A `backwards`-fill animation ungated from `.in` permanently hides content — forbidden.
- Accessibility floors: WCAG AA with proper alpha-blend math (a semi-transparent color's real
  contrast is its composite over the background, not its raw value). `prefers-reduced-motion`
  respected. Page fully readable with JS disabled (multi-step form needs a no-JS fallback).
- Mobile-first; clean at 390 / 768 / 1280 px. No horizontal overflow at any width. In any
  horizontal card scroller, EVERY card class gets an explicit flex basis.
- Interactive elements resolve toward the conversion event (the fit-check form) — nothing
  interactive is purely decorative.

## The bar
Your output runs through a deterministic headless gate (geometry, contrast, overflow, banned
patterns, an animation-neutralized opacity census) and an independent design judge. Blockers fail
the test. The target: "a $25–50K design team built this." The Pack encodes how — commit to its
register (the serif display scale, the pill system, the measured rhythm), don't water it down.

## Return format (exactly this, nothing else)
1. ONE fenced code block containing the complete HTML file.
2. A short "AMBIGUITY NOTES" list: anything the Pack/brief under-specified + the call you made.

---

# Client Brief — Anchor Wealth Planning (GLM cold build · confident-b2b language)

> Build the Anchor homepage from `confident-b2b.pack.md` ONLY — retint the measured language to the
> brand tokens below, drop in this copy. The PACK governs composition, numbers, systems. This brief
> supplies brand + copy. Where they conflict, the pack wins.

## Brand
- **Name:** Anchor Wealth Planning · Houston, TX. Advisor: Alex Miller (10+ yrs Merrill Lynch [VERIFY]).
- **Who:** coordinated wealth planning for **oil & gas executives, business owners, and high-net-worth
  families** in Houston. Mechanism: coordinates investments, taxes, estate WITH the client's own CPA
  and attorney into **one living plan**.
- **Adjectives:** confident, institutional-grade, warm-premium, insider. **Anti:** salesy, generic-
  fintech, cold, stock-corporate.

## Brand tokens (into Pack §2 ROLES — metrics stay fixed; verify every AA rule in §1/§6)
```
--ground:#F5F0E6;   --ground-dip:#EDE7D9;  --card-pale:#ffffff;
--ink-strong:#142840;  /* deep navy = display ink + primary pill fill */
--ink:#1b2a3c;      --ink-body:#4b5b6e;
--on-dark:#F7F3EB;
--accent:#c9a24b;   --accent-ink:#7d5f26;  /* 5.23:1 on ground — verified */
--accent-rgb:201,162,75;
--scrim:rgba(14,26,42,.5);
--border:rgba(20,40,64,.14);
```
Fonts: pack roles as-is (`--serif-display` Fraunces · `--sans` Schibsted Grotesk) — deliberate: this
build tests the pack's own type direction. Load via Google Fonts `<link>`.

## Copy per section (pack §4 composition; copy verbatim; [VERIFY] markers stay visible)

**HERO** (typographic, `--ground` — no photo) — eyebrow `For Houston Executives, Owners & Families`.
H1 with the cycling-word slot at the line end: `One living plan for your` + slot words
`investments. / taxes. / estate. / equity comp. / exit.` (slot in `--accent`). Sub: `Anchor
coordinates the whole picture with your CPA and attorney — so you can stop being the glue between
three professionals who never talk.` CTAs: `Schedule a 30-Minute Conversation →` (primary pill) +
`Take the 4-Question Fit Check` (secondary).

**CRED BAR** — tracked-caps line: `10+ YEARS AT MERRILL LYNCH [VERIFY] · HOUSTON, TX · COORDINATED
PLANNING FOR EXECUTIVES, OWNERS & FAMILIES`.

**PAIN** (split-narrative; sticky left serif heading) — heading: `You've become the project manager
of your own wealth.` 4 numbered pain rows:
1 "My CPA, my advisor, and my attorney never talk to each other. I'm the one playing phone tag between all of them." / Three excellent professionals, none aware of the others — and you're paying for the gaps in between.
2 "My RSUs vest, I take a tax hit I didn't plan for, and the window to act closes before I do." / Vesting, deferred comp, and blackout periods create a tax-timing problem generalists don't understand.
3 "We have a trust from years ago. I'm honestly not sure it's funded right, or that it still fits what we own." / Your net worth has grown. Your estate documents haven't.
4 "I know my business inside and out — but I don't know what I'd actually walk away with after taxes if I sold." / If an offer arrived tomorrow, you wouldn't have a team ready.

**WHY / OUTCOME METRICS** (quantified-proof card row) — head `One advisor who sees the whole
picture.` Cards: `10+` yrs institutional training (Merrill Lynch) [VERIFY] · `3→1` your CPA,
attorney & advisor working from one document · `1` living plan, updated quarterly · `Quarterly`
proactive reviews, not annual check-ins. NO count-up on [VERIFY] numbers. NO fiduciary/fee/
regulatory claims anywhere.

**ICP SELF-SORT** (3 wide rows, hairline dividers) —
- OIL & GAS EXECUTIVES / *RSUs, NQDC, blackout windows, 10b5-1 — timed, not reacted to.*
- BUSINESS OWNERS / *Exit-ready years before the LOI, not after it arrives.*
- HIGH-NET-WORTH FAMILIES / *Trusts funded right. Beneficiaries current. Nothing drifting.*

**FIT / CAPTURE** (photo-band mini-hero; photo [VERIFY]:
https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop) —
head `Are we the right fit for you?` sub `Four questions. Two minutes. We'll tell you honestly
whether we can help — and if we can't, we'll point you to someone who can.` Wizard steps:
situation (O&G exec w/ equity comp / owner considering transition / coordinating across
professionals / something else) → investable assets ($500K–$2M / $2M–$5M / $5M–$10M / $10M+) →
biggest concern (tax coordination / equity comp / estate & legacy / business transition) → email,
submit `Get My Fit Assessment →`, micro `No spam. No sales pitch. Just an honest answer about
whether we're a match.` Convergence diagram labels: YOUR CPA · YOUR ATTORNEY · YOUR PORTFOLIO →
ONE LIVING PLAN.

**SERVICES** — head `One plan. Your CPA and attorney both work from it.` 6 cards in the pack's
card language (3×2; Coordinated Planning = the accent-fill card): Coordinated Planning ·
Investment Management · Tax Strategy & Coordination · Equity Compensation · Estate & Legacy ·
Business Owner Planning. One pain-line each (translator between professionals / vesting-aware
portfolio / CPA before year-end, not after / 10b5-1 windows planned / trusts funded right /
exit-ready 3–5 years before the LOI).

**PROCESS** (numbered stepper) — 01 Discovery (30 min · no obligation) · 02 Assessment (written
either way · 1–2 weeks) · 03 The Plan (you keep this document) · 04 Partnership (proactive, not
reactive).

**PROOF** (full-bleed photo + white stat blocks; photo [VERIFY]:
https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1600&auto=format&fit=crop) —
quote (illustrative, mark it): "For the first time, my CPA and my advisor are actually talking to
each other — I finally feel like someone sees the whole picture." Stats: `10+` yrs [VERIFY, NO
count-up] · `3→1` professionals · `1` living document · count-up allowed ONLY on real numbers.

**FINAL CTA** — `You've been the project manager long enough.` sub `Thirty minutes. No pitch.
An honest answer about whether we're a fit.` Dual pills.

**INSIGHTS** (featured split) — featured: `The RSU Tax-Timing Trap` (article) + `What "one living
plan" actually means` (podcast) + `The Exit Conversation You're Avoiding` (article). Mark topics
illustrative.

**FOOTER** (`--ink-strong` ground) — brand + tagline `"Charting the course toward your financial
legacy."` · Explore / Specialties / Contact columns ([VERIFY] phone/email) · entity + disclosures
placeholder [VERIFY] · educational-only disclaimer · © 2026 Anchor Wealth Planning.


---

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

## 5.5 VIDEO CONTENT SYSTEM (this register is BUILT for it)

Sites ship with real video (Chris, 2026-07-01). **Only real footage — no asset yet = poster-still
variant + `[VERIFY]` slot.** Budget: max 3 video moments (ambient hero loop · 1 proof story ·
1 featured insight). Autoplay = hero loop only, muted; everything else click-to-play.

- **Hero video:** the full-viewport hero runs footage behind the serif display (poster-first,
  IO lazy-load, reduced-motion = poster, bottom/soft scrim — this is the measured BetterUp/Zoom
  move). A failed video IS the still hero.
- **Proof story video (replaces/augments the photo-stat band):** the full-bleed band's photo may be
  FOOTAGE (ambient, muted) with the white 75/300 stat blocks overlaid — or a **click-to-play story
  card**: 16:9 media, radius 16, accent PILL play button (74px circle, `--accent`, white glyph),
  duration chip in a small pill (`rgba(0,0,0,.55)`, white 12px), caption "Watch the story · [M:SS]"
  in 13px tracked caps. Native controls after click; zero bytes before click; poster never blank.
- **Featured insight = video episode:** 16:9 poster top, 56px play pill, tag "VIDEO · [M:SS]",
  serif title below. One per Insights.

## 6. Ship gate

- [ ] Geometry: no collapse/overflow/em-trap at 390/768/1280; hero CTA above the fold.
- [ ] Register: serif display ≥52px w/ cycling-word accent slot; pill buttons r32 pad 10×20; warm
      off-white ground; quantified proof cards w/ 75/300 numerals; ONE photo-stat band; ONE accent moment.
- [ ] Rhythm: no two adjacent sections share a layout skeleton; logo/cred bar directly after hero.
- [ ] Contrast (alpha-blend math, LED-012): white ≥4.5:1 on scrimmed photo (verify at the LIGHTEST
      visible point); `--accent-ink` ≥4.5:1 on `--ground`; white ≥4.5:1 on `--accent` if used as fill.
- [ ] Motion: sweep hover works; stagger; count-up guard; reduced-motion + no-JS static-visible.
- [ ] Numbers intact: pill 32/10×20/15px; section 112; type ratios per §2. Colors retinted only.
