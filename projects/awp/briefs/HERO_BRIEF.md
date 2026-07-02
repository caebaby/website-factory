# BUILD BRIEF — Anchor Wealth Planning · HERO (scope: nav + hero + cred bar) · vector v2
*Emitted by the Director 2026-07-02. Self-contained: build from THIS FILE ONLY — do not read any
other file in the repository. Fresh execution inside the invariants below; not a copy of any prior build.*

## 1. Output
`projects/awp/previews/hero-vector2.html` — one self-contained HTML file. Scope: fixed nav, hero,
credibility bar. Nothing else.

## 2. Tokens (`:root` — paste verbatim)
```css
:root{
  --ground:#F5F0E6;--ground-alt:#EDE7D9;--card:#ffffff;
  --dark:#142840;--dark-2:#1e395a;--ink:#1b2a3c;--ink-body:#4b5b6e;
  --on-dark:#F7F3EB;--on-dark-mute:rgba(247,243,235,.76);
  --accent:#c9a24b;--accent-soft:#dcc07e;--accent-ink:#7d5f26;--accent-rgb:201,162,75;
  --border:rgba(20,40,64,.14);
  --maxw:1512px;--gutter:clamp(24px,5vw,96px);
  --radius-btn:4px;--radius-card:8px;--radius-media:12px;
  --dur:.4s;--ease:ease;--ease-soft:cubic-bezier(.16,1,.3,1);
  --sans:'Nunito Sans','Helvetica Neue',Arial,sans-serif;
  --serif:'EB Garamond',Georgia,serif;
}
```
AA notes (already solved — do not change): `--accent-ink` on `--ground`/`--ground-alt` = 5.2/4.7:1 ✓;
`--ink` on `--ground` ✓; dark text on `--accent` buttons 4.5:1 ✓. If you introduce ANY new color
pairing, compute WCAG with alpha-blending (composite rgba over its background first) and keep ≥4.5:1
body / ≥3:1 large.

## 3. Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,400;1,500&family=Nunito+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```
Roles: Nunito Sans = display (at weight **300**) + all UI/body. EB Garamond = ITALIC accent
phrases only, never body.

## 4. Patterns for this scope

### NAV
64px fixed bar, transparent over the hero ground, solid `rgba(20,40,64,.92)` + blur on scroll>40.
Brand: "Anchor" serif-500 23px white-on-dark / ink-on-light per state + tracked-caps
"WEALTH PLANNING" 10px under it. Links 16/600. CTA = the flat button (below) in `btn-sm`.
On a LIGHT hero ground the resting nav text is `--ink` (not white) — check both states.

### HERO — pattern: PRODUCT-VISUAL SPLIT (provenance Mercury/Linear; harvested)
The hero shows THE DELIVERABLE, not a photo: copy left, a rendered "living plan" document artifact right.
**INVARIANTS (fixed):**
- Ground: `--ground` (light). min-height `clamp(640px,90svh,920px)`, content vertically centered,
  2-col grid ~`1fr 1.1fr`, gap `clamp(28px,4vw,56px)`; stacks at ≤860px (artifact below copy).
- Display: sans **300** `clamp(38px,4.8vw,68px)` lh 1.03 tracking -0.02em `--ink`; the accent
  phrase in serif-italic 1.08em ON ITS OWN LINE (`<br>` before the `<em>`), with a 3px `--accent`
  underline that draws in (scaleX 0→1, .9s, ~.8s after reveal).
- Sub: 17–20px/1.5 `--ink-body`, max 47ch. Eyebrow: 12/600 caps 1px tracking `--accent-ink` with
  a 22px dash before it.
- Buttons: flat radius-4, pad 10×24, 18/600, `--accent` fill + `--dark` text; hover→white fill;
  idle sheen sweep every 5.5s (::after skewed gradient, reduced-motion off). Outline twin:
  transparent, 1.5px `--accent-ink` border, `--accent-ink` text.
- The artifact frame: `--card` fill, radius 12, 1px `--border`, and the ONE allowed shadow class:
  a soft floating-frame shadow `0 24px 60px rgba(20,40,64,.10)`. Everything else on the page stays
  shadowless.
- Motion budget: staggered rise-in on load for eyebrow/H1/sub/CTAs (CSS class transitions on a
  120ms cadence — NEVER rAF/JS-gated visibility; content must be visible with JS disabled), the
  underline draw, the button sheen, plus ONE quiet artifact moment (see EXECUTION LATITUDE).
  `prefers-reduced-motion` collapses everything to static-visible.
**EXECUTION LATITUDE (yours):** the artifact's internal design — a one-page "Anchor Living Plan"
document: its header, row structure, status chips, typography (use the token fonts; chips in
accent tints with AA-checked text), how many rows (4–6), and one subtle living detail (e.g. one
status chip transitions "In review → Done" once, 2s after load, or a thin progress hairline that
fills — pick ONE). Angle/offset of the frame (straight, or ≤1.5° tilt), whether a second smaller
card peeks behind it, margins within invariants.
**FORBIDDEN:** photography anywhere in this hero; decorative overlay graphics (waves/strands over
media — banned register-wide); lorem or fake client names in the artifact (use role labels:
"Tax coordination — CPA sync"); gradient text; icon-chip rows; any drop shadow beyond the one
floating frame; pure #000; Inter/Arial as display. Do NOT reproduce the prior Anchor hero
(full-bleed photo + left scrim) — this vector exists to be different from it.

### CREDIBILITY BAR (directly under the hero)
~44px band on `--ground-alt`: tracked-caps 12/600 items separated by generous gaps:
"10+ YEARS AT MERRILL LYNCH [VERIFY]" · "HOUSTON, TX" · "COORDINATED PLANNING FOR EXECUTIVES,
OWNERS & FAMILIES". Render [VERIFY] as a small visible chip (9px caps, accent-ink border).
Items wrap at ≤640px; no horizontal overflow at 390.

## 5. Signature intent (this scope)
The living-plan artifact IS Anchor's mechanism on screen: three professionals' work visible in one
document. Its rows must read as real coordination (CPA / attorney / portfolio touchpoints).

## 6. Copy (verbatim — do not rewrite)
- Eyebrow: `For Houston Executives, Owners & Families`
- H1: `You've become the project manager of` + (own line, serif-italic) `your own wealth.`
- Sub: `Anchor coordinates your investments, taxes, and estate with your CPA and attorney into one living plan — so you can stop being the glue.`
- Primary: `Schedule a 30-Minute Conversation →`  · Outline: `Take the 4-Question Fit Check`
- Artifact header: `Anchor Living Plan — Q3 Review` + small `Prepared with your CPA & estate attorney`
- Nav links: `Who We Serve · Services · Process · Fit Check` · Nav CTA: `Book a Call`

## 7. Gauntlet checklist (self-verify BEFORE returning — you are Sonnet-tier: browser-verify)
- [ ] No horizontal overflow at 390 / 768 / 1280 (check `scrollWidth` vs `clientWidth`).
- [ ] Hero CTAs above the fold at 1280×800.
- [ ] All AA pairs pass with alpha-blend math (report the numbers you computed).
- [ ] JS disabled → everything visible; reduced-motion → static; console clean.
- [ ] The artifact contains zero fabricated client data; [VERIFY] chips visible.
- [ ] Stamp check: composition is NOT a full-bleed-photo-scrim hero.
Report: file path + gauntlet results + the 3 execution-latitude choices you made.
