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
**THE ARTIFACT IS A DOCUMENT CAROUSEL (v2.1 — Chris's direction; this is the page's signature
interaction and it must read like a $50K team's flagship, not a subtle detail):**
- FOUR documents cycle inside the floating frame, same document design language, different content:
  1. **"Anchor Living Plan — Q3 Review"** — the coordination overview (5 rows, status chips — as v2).
  2. **"Tax Coordination — CPA Sync"** — detail doc: quarterly estimates line, RSU vesting window
     note, "reviewed with your CPA — Oct 14" footer. Generic role content, zero fabricated numbers.
  3. **"Estate — Attorney Review"** — trust update status, beneficiary check, document dates current.
  4. **CONVERSION DOC — "Where does your plan stand?"** — styled EXACTLY like the other documents
     (same header/rows language) but its rows are the visitor's questions ("Does your CPA see your
     portfolio? · Is your trust funded correctly? · Who coordinates it all?") and its footer is a
     REAL gold CTA button inside the document: `Take the 4-Question Fit Check →` (same .btn styles,
     btn-sm scale). The carousel's endpoint IS the conversion.
- **Behavior (v2.2 — Chris):** transition = a physical SHUFFLE, not a crossfade: the top document
  slides off (x+rotate, ~.55s ease-soft) while the card behind scales/rises forward to become the
  new top; the back-card peek is always the NEXT document (never a blank page — every visible
  surface is real content). Auto-advance every ~4.5s; doc 4 holds ~7s, then loops. **Hover over
  the artifact = pause** + reveal a tab/dot rail (4 affordances, accent for active); click = jump.
  Progress indication always subtly visible. Reduced-motion: no shuffle, simple swap.
- **Guards:** JS interval + class swaps only (no rAF-gated visibility — LED-011); no-JS = doc 1
  visible, others `hidden`, no rail; reduced-motion = no auto-advance, rail visible + clickable,
  crossfade only. Console clean.
**EXECUTION LATITUDE (yours):** each document's internal typography/rows within the token fonts;
chip design (AA-checked); the tab-rail design; frame angle (straight or ≤1.5° tilt); the back-card
peek; timing polish within the stated ranges.
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
  (buttons SIDE BY SIDE with 12px gap at desktop, wrap on mobile — not stacked)
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
