# BUILD BRIEF — verdant · hero (nav + hero + signature transformation-reveal) · vector v1

## 1. Output
`projects/verdant/build/index.html` — single self-contained HTML file, no build step, no npm.
**SCOPE FOR THIS BRIEF = the above-the-fold band only:** frosted nav + hero + the signature
transformation-reveal card. Sections below the hero are NOT in this scope — do not build them,
do not stub them, do not add a footer. End the `<main>` after the hero band. This is the
direction gate: Chris reacts to the hero before the next scope is briefed (delivery cadence,
token protection). Build this one band at full flagship quality.

## 2. Tokens (:root — paste verbatim)
Derived from the intake palette (forest #1D3B2A ground · cream #FAF3E3 · gold #C9A24B),
retinted to satisfy every AA rule. Every color has a token; never hardcode. Every `--*-rgb`
triplet is present for alpha-blend use.

```css
:root{
  /* ---- ground + surface (dark register) ---- */
  --ground:#16301F;                 --ground-rgb:22,48,31;      /* deepened from #1D3B2A for scrim headroom */
  --ground-2:#1D3B2A;               --ground-2-rgb:29,59,42;    /* intake forest — raised surface / card ground */
  --ground-3:#254934;               --ground-3-rgb:37,73,52;    /* hover / elevated surface */
  --hairline:rgba(250,243,227,.14); /* cream @14% — borders, dividers */
  --hairline-strong:rgba(250,243,227,.24);

  /* ---- ink (cream family on dark ground) ---- */
  --ink:#FAF3E3;                    --ink-rgb:250,243,227;      /* primary text — 10.7:1 on --ground */
  --ink-2:#E7DFC9;                  --ink-2-rgb:231,223,201;    /* secondary text — ≥7:1 on --ground */
  --ink-3:#B9B29C;                  --ink-3-rgb:185,178,156;    /* muted / eyebrow — ≥4.5:1 on --ground, verify large-only if used <16px */

  /* ---- gold accent ---- */
  --accent:#C9A24B;                --accent-rgb:201,162,75;    /* 5.1:1 on --ground — OK for large display + UI, NOT body */
  --accent-hi:#D9B968;             --accent-hi-rgb:217,185,104;/* hover / lighter gradient stop */
  --accent-ink:#16301F;            --accent-ink-rgb:22,48,31;  /* text ON gold fills — forest, 5.1:1 on --accent */

  /* ---- gradient lightest-stop rule: never let a gold gradient's lightest stop drop
         below AA against text painted on it. On dark ground, gold gradients are decorative
         (borders/glows), never carry body text. ---- */
  --accent-grad:linear-gradient(135deg,#B98F3C 0%,#C9A24B 46%,#D9B968 100%);

  /* ---- light inset (for the "template" side of the reveal — see §5) ---- */
  --paper:#FAF3E3;                 --paper-rgb:250,243,227;    /* cream paper */
  --paper-ink:#2A2A24;             --paper-ink-rgb:42,42,36;   /* near-black warm — 12:1 on --paper */
  --paper-muted:#6E6A5A;           --paper-muted-rgb:110,106,90;/* 4.6:1 on --paper */
  --paper-sage:#9FB39A;            --paper-sage-rgb:159,179,154;/* the CLICHÉ sage — used ONLY inside the template mock, deliberately flat */

  /* ---- type scale (fluid, clamp) ---- */
  --step-eyebrow:clamp(.72rem,.68rem + .2vw,.82rem);
  --step-body:clamp(1.02rem,.98rem + .3vw,1.18rem);
  --step-lead:clamp(1.18rem,1.05rem + .6vw,1.42rem);
  --h-hero:clamp(2.6rem,1.7rem + 4.4vw,5.4rem);   /* the wound headline */

  /* ---- space + radii ---- */
  --r-card:18px; --r-chip:999px; --r-inset:12px;
  --shadow-card:0 24px 60px -20px rgba(0,0,0,.55), 0 2px 0 rgba(250,243,227,.04) inset;
  --ease:cubic-bezier(.22,.61,.36,1);
}
```
**AA notes:** body text uses `--ink`/`--ink-2` only. `--accent` is display/large + UI chrome
only — never a paragraph, never a small label under 24px unless bold ≥19px. Inside the
transformation card, the LEFT ("template") pane uses `--paper` + `--paper-sage` intentionally to
render the cliché; the RIGHT ("Verdant") pane uses `--ground-2` + `--ink` + gold. Never let the
sage escape the mock.

## 3. Fonts
- **Display — DM Serif Display**, weight 400 (only weight it ships). Role: the hero wound
  headline + the "Verdant" wordmark in nav. High-contrast serif = the "proven, premium, not-a-
  template" register. Do NOT use it for body.
- **Body — Source Sans 3**, weights 300 / 400 / 600. Role: subhead (300 large), body (400),
  eyebrows + CTA label + UI (600). True 300 gives the airy editorial feel; 600 for CTA weight.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

## 4. Pattern per section (this scope)

### NAV — pattern C-nav-frosted (frosted floating bar)
INVARIANTS: fixed top; `backdrop-filter:blur(14px) saturate(1.2)`; background
`rgba(var(--ground-rgb),.72)`; bottom `1px solid var(--hairline)`; height 68–76px; wordmark left
(DM Serif Display, `--ink`, 1.35rem, letter-spacing -.01em), 3–4 anchor links center/right
(Source Sans 3 600, `--ink-2`, 15px, hover→`--ink`), primary CTA button right. Nav must be
legible on load with zero JS. Contrast of every nav item on the blurred ground ≥ 4.5:1.
EXECUTION LATITUDE: link ordering, whether links sit center or right-grouped, hairline vs. soft
shadow on scroll, a subtle gold underline-grow on link hover.
FORBIDDEN: no leaf/globe/seedling glyph in the wordmark. No hamburger on desktop. No solid
opaque green bar (kills the frosted craft). No logo emoji. Do not let the CTA button use gold
text on gold — label is `--accent-ink` on the gold fill.

### HERO — pattern C-hero-split-asymmetric (left-weighted editorial column + right signature stage)
INVARIANTS: two-column at ≥960px (LEFT ~46% copy column, RIGHT ~54% the signature card stage);
single stacked column below 960px (copy first, card second). LEFT column, top-to-bottom:
eyebrow chip → hero H1 (`--h-hero`, DM Serif Display, `--ink`, line-height 1.02, tracking -.02em,
**measure 15–24ch — size it with LAYOUT_CRAFT PART 1; never set container max-width in em**) →
lead subhead (`--step-lead`, Source Sans 3 300, `--ink-2`, measure 42–60ch) → CTA row (primary
gold button + secondary text-link). Vertical rhythm off an 8px base. Hero copy + primary CTA
must paint and be usable with JS disabled and before fonts load (CTA never waits on JS/fonts).
EXECUTION LATITUDE: exact column split within 44–48/56–52, eyebrow chip styling (hairline pill vs.
gold-dot + label), whether a faint botanical *shadow* texture (real cast shadow, not clip-art)
sits behind the RIGHT stage, the CTA secondary-link treatment.
FORBIDDEN: no centered hero (this ICP reads centered-hero-with-gradient-blob as template slop —
LED slop tell). No stock leaf/globe/hands-holding-seedling imagery anywhere. No kraft-paper
texture on Verdant's own surfaces. No sage-green as a Verdant brand color (it appears ONLY inside
the "template" mock in the card). No generic "gradient mesh" background. No emoji. Headline must
NOT be all-caps. Do not fabricate a stat in the eyebrow.

## 5. Signature moment — THE TRANSFORMATION REVEAL
**Intent:** The hero's right stage holds a single interactive comparison card that renders the
same fictional sustainable brand ("EVERGROVE," a placeholder CPG label) in two states: the
**template state** (left/before — flat sage green, a generic leaf mark, kraft-paper cliché,
Canva-tier lockup) and the **Verdant state** (right/after — the retinted forest+gold identity,
real material shadow, confident type). The user drags a **vertical divider handle** (or on
touch, swipes; with reduced-motion, a segmented toggle) across the card and the two states wipe
between each other in place — the *same* product, re-proven. This is the headline
("Your product is more sustainable than your brand looks.") made literal and physical.

**Why it's bespoke, not decorative:** it IS Verdant's mechanism — proof through design, not
costume. The card doesn't illustrate the value prop; it performs it. Derived from the client's
real signature seed (Mahdin's hero comparison card).

**AMBITION FLOOR (spec the full interaction — $50K flagship, not "one subtle detail"):**
- Two fully-composed mini brand mocks, not two color swatches. Each side has: a product
  silhouette (a simple CSS-drawn jar/tube/carton — no external image, no stock photo), a
  wordmark, a tagline lockup, and a shelf/context ground. The LEFT is deliberately, *credibly*
  mediocre (real cliché, not a strawman); the RIGHT is genuinely premium.
- A draggable divider with a gold handle (grip affordance: two hairlines + a subtle glow).
  Divider position drives a CSS `clip-path`/`--pos` variable so the wipe is buttery at 60fps.
- Handle rest state animates to ~55% on load (GSAP, respects reduced-motion), inviting the drag —
  a "peek" that shows both states exist. Snappy spring on release toward whichever side is nearer,
  but it never fully hides the Verdant side (min 18% Verdant always visible — the after-state is
  the persuasive one; the mechanism resolves toward conversion).
- **CONVERSION LAW — the interaction resolves toward the conversion event:** when the user drags
  fully to the Verdant side (or on reduced-motion, selects "Verdant"), the after-state settles and
  a small inline affordance appears anchored to the card — a gold "Book your Brand Assessment →"
  chip that deep-links to `#assessment` (the same target as the nav/hero primary CTA). The last
  frame of the signature IS a conversion affordance. The before-state never offers a CTA; only the
  resolved after-state does.
- A tiny caption under the card, `--ink-3`, 13px: "Illustrative — 'Evergrove' is a placeholder
  brand." (Honesty rule: the mock is clearly labeled, never presented as a real client.)

**Placement:** hero right stage on desktop; directly under the CTA row on mobile (stacked),
full-width, min-height ~ 62vh so the drag has room.

**No-JS / reduced-motion:** with JS off, the card renders **static, showing the Verdant (after)
state at ~65% with the template edge peeking** and a caption "Drag to compare (interactive)."
It must never render blank and must never trap the user in the before-state. With
`prefers-reduced-motion`, replace drag with a two-button segmented control (Template | Verdant)
that cross-fades (≤200ms) — no spring, no auto-peek.

## 6. Copy (verbatim slots — build these exact strings)
- **Nav wordmark:** `Verdant` (DM Serif Display) — optionally a hairline `·` + `Studio` in
  Source Sans 3 600 `--ink-3`.
- **Nav links:** `Work` · `Process` · `Fit` · (primary CTA button) `Book Assessment`
  *(anchors resolve to ids defined in later scopes: #work, #process, #fit, #assessment — for
  THIS scope only #assessment must exist as a stub anchor target on the hero CTA; the other
  three may point to `#work`/`#process`/`#fit` even though those sections arrive in a later
  scope — do not build those sections now.)*
- **Hero eyebrow:** `Brand studio for sustainable CPG & DTC`
- **Hero H1 (recommended headline):** `Your product is more sustainable than your brand looks.`
- **Hero subhead:** `Verdant is a brand studio working exclusively with sustainable CPG and DTC
  founders. We design identity systems that make genuine sustainability visible — so conscious
  consumers trust you at first glance, premium pricing becomes possible, and you never have to
  choose between a studio that gets climate and one that gets conversion.`
- **Primary CTA (button, → #assessment):** `Book Your Brand Assessment`
- **Secondary CTA (text link, → #work):** `See the transformation ↓`
- **Signature card labels:** left tab `Template` · right tab `Verdant` · placeholder brand
  wordmark `EVERGROVE` · placeholder tagline (template side) `Clean. Green. Sustainable.`
  (deliberately the kill-list cliché) · (Verdant side) `Regenerative skincare, proven on the
  shelf.` · resolved-state chip `Book your Brand Assessment →`
- **Card caption [VERIFY]:** `Illustrative — "Evergrove" is a placeholder brand, not a real
  Verdant client.`
- **[VERIFY] flags:** no numeric stats appear in this scope. If the builder wants a trust chip
  in the eyebrow, it must be a capability claim (`Sustainable brands only`), never a fabricated
  count like "40+ brands."

## 7. Motion budget (this scope)
Allowed moments, nothing more:
1. Nav: hairline/shadow state-change on scroll past 12px (opacity/translate only).
2. Hero load: staggered reveal of eyebrow → H1 → subhead → CTA (GSAP, y+opacity, ≤ 520ms total,
   ease `--ease`). Must be no-JS-safe: elements are visible by default in CSS; GSAP only adds the
   entrance from a `.js-on` gate — if JS never runs, content is already shown (LED-011 guard).
3. Signature card: the load "peek" to ~55% + drag interaction + release spring + resolved-state
   chip fade-in. GSAP + a `--pos` custom property driving `clip-path`. 60fps; transform/clip only,
   no layout thrash (LED-012 guard — no animating width/left; animate `--pos` and clip-path).
Respect `prefers-reduced-motion` everywhere (segmented toggle, no springs, no auto-peek).
NOTHING else animates. No parallax, no marquee, no scroll-jacking in this scope.

## 8. Gauntlet checklist (verify before returning)
- [ ] `:root` token block pasted verbatim; no hardcoded hex anywhere a token exists.
- [ ] Every `--*-rgb` triplet present and used for any rgba() alpha.
- [ ] Geometry: nav 68–76px; hero two-col ≥960px, single-col <960px; card min-height ~62vh mobile.
- [ ] AA (with alpha-blend math on the frosted nav): `--ink` ≥10:1, `--ink-2` ≥7:1, `--ink-3`
      ≥4.5:1 on `--ground`; `--accent` used only large/UI (≥4.5:1 confirmed); gold-button label
      `--accent-ink` on `--accent` ≥4.5:1; paper-side tokens AA on `--paper`.
- [ ] No sage-green (`--paper-sage`) anywhere outside the template mock.
- [ ] Reduced-motion path present (segmented toggle, cross-fade ≤200ms, no springs).
- [ ] No-JS path: hero copy + CTA visible and clickable; card renders in Verdant-forward static
      state with a "Drag to compare" caption, never blank, never trapped in before-state.
- [ ] Console clean (no errors/warnings) at 390 / 768 / 1280.
- [ ] Conversion law satisfied: resolved after-state exposes the `#assessment` chip; before-state
      offers no CTA; nav + hero + card CTAs all resolve to the same `#assessment` target.
- [ ] Team-built signals: draggable divider is buttery (transform/clip only), gold handle has a
      real grip affordance, both brand mocks are fully composed (silhouette + wordmark + lockup +
      ground), the "template" side is credibly mediocre (not a strawman), caption labels the mock
      as illustrative.
- [ ] No stock leaf/globe/seedling/kraft imagery; no emoji; no centered-gradient-blob hero;
      headline not all-caps; no fabricated stat.

## 9. Verification duty by tier
Sonnet+ = open the file in a browser (or headless via `node qa/run-checks.js build/index.html
'#C9A24B'`) and confirm the gauntlet before returning; drag the divider, toggle reduced-motion,
disable JS, check all three breakpoints. Haiku = return unverified and REQUIRE the external QA
repair loop (Agent 05) before this is shown to Chris. Regardless of tier: this hero scope is a
direction gate — after build, cut a frozen review snapshot from the last clean commit
(`git show <sha>:projects/verdant/build/index.html > index-review.html`) for Chris to react to;
the executor keeps working the live file.
