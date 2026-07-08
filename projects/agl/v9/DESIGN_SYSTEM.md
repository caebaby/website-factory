# AGL Design Standards — the Rulebook

**What this is:** the codified design taste of Advisor Growth Lab. Model-agnostic — written to be
pasted into any LLM (Claude, GLM, Fugu, whatever comes next) as ground truth. Every rule has an ID
so a critic can cite violations and a human can veto or amend by ID.

**How it grows:** every human correction becomes a rule (see PROTOCOL.md). Never delete a rule —
supersede it and note the date. Rules beat model taste; user words beat rules.

---

## 0. Which design language applies

AGL currently has TWO design languages. Do not mix them.

- **AGL Web (v9 system)** — the website and anything web-interactive. Defined in §1–§6 below.
  Reference build: `docs/agl-site/v9-claude/agl-site.html`.
- **AGL Collateral (Brand Packet v1.0, Jan 2026)** — PDFs, decks, one-pagers, print.
  Navy #0F1C3F / Navy Light #1A2A52 / Gold #D4A853 / Orange #E85A1B (CTAs ONLY, never text or
  backgrounds) / Off-White #F8F9FC / Slate #64748B. Font: Inter (headlines 700–900, tight
  tracking −0.02 to −0.04em; labels all-caps +0.05 to +0.1em). Dark sections: navy gradient
  (135deg #0F1C3F→#1A2A52) with subtle gold radial glow.
  Source: `~/Downloads/Archive/AGL-Brand-Guidelines.pdf`.
- Client-facing dossier documents (Axiom) have their own system: Spectral + Archivo, per
  `docs/clients/axiom/` Topic-7 template.
- **Open item:** the packet predates the v9 web direction; shared DNA is slate body text, tight
  headline tracking, dark "premium" bands with a warm glow. Packet likely gets a v2 to align.
  Until then: web work follows §1–§6, print/collateral follows the packet.

## 1. Anti-slop (the autopsy — why 6 iterations failed)

The AI look is generic STRUCTURE + placeholder CONTENT + stock ICONS — not color.

- **R1** No 3-icon-card grids for "features/benefits." Use editorial layouts: asymmetric two-column,
  ruled rows, running text with strong typography.
- **R2** No generic line icons ever. Icons are custom duotone: tinted fill (~16% accent) + accent
  stroke, drawn for the specific concept.
- **R3** No pill buttons on web. Sharp ~10px radius. No purple-on-white gradient heroes, no
  emoji as section markers, no everything-centered layouts.
- **R4** Real content always. No lorem, no "[placeholder]" copy in deliverables (explicit
  photo/name placeholders for pending assets are fine when labeled).
- **R5** Real photography over illustration. Cinematic quality (Mercury.com bar). One hero image
  used with intent beats a scatter of stock.
- **R6** Numbered markers (01/02/03), eyebrows, dividers only when they encode true structure
  (a real sequence, a real taxonomy) — never as decoration.

## 2. AGL Web — color

- **R7** Accent: indigo `#4338CA` (hover `#3730A3`). One accent, used sparingly — buttons, links,
  eyebrows, data emphasis. No multi-color gradients as identity.
- **R8** Neutrals are chosen, not defaulted: ink `#0F172A`, body slate `#334155`, muted `#69768C`,
  greys `#F1F4F9`/`#E4E9F1`. Pure mid-grey (#888/#999) reads unconsidered.
- **R9** Section rhythm: white / light-grey alternating, plus ONE dark band per page
  (deep indigo-navy `#0B0F28→#171E48` with glow) for the authority moment. Dark band text:
  `#E9ECF9` on-deep, periwinkle `#A5B4FC` accents.
- **R10** Warm gold `#F2C782` is the "human/dawn" counterpoint — tiny doses: ticker dot,
  constellation pulses, event chips. Never large fills.

## 3. AGL Web — typography

- **R11** Schibsted Grotesk (variable 400–900) for headlines AND body. Newsreader italic 400 for
  1–3 accent words per headline, colored (indigo on light, periwinkle on dark).
- **R12** Headlines: weight ~650, tracking −0.03em, line-height ≤1.08, `text-wrap:balance`.
  Confident sizes: hero clamp(44px→74px), sections clamp(30px→44px).
- **R13** Body ≤65ch, 1.5–1.6 line-height. Labels/eyebrows: 11–12px, 600+, all-caps,
  +0.12em tracking. Digits that align: `font-variant-numeric: tabular-nums`.

## 4. AGL Web — surfaces & glass

- **R14** Glass elements (chips, secondary buttons, toggles over photography): translucent white
  8–14%, `backdrop-filter: blur(12–14px) saturate(1.3)`, 1px white/25 border, inset top edge-light.
  Glass must feel physical — edge light + hover sheen sweep, not just transparency.
- **R15** Cards: 16px radius, 1px line borders (`rgba(15,23,42,.10)`), layered soft shadows.
  Buttons: 10px radius (R3).
- **R16** Hero: full-bleed cinematic photo, layered scrims (darker top/bottom, lighter middle),
  fine grain overlay, warm light glow. Text over photo gets subtle text-shadow for legibility.

## 5. AGL Web — motion

- **R17** Every animation has a purpose: feedback, orientation, or continuity. No looping
  attention-seekers (pulsing CTAs, breathing dots). Ambient cinematic hero layers (Ken Burns,
  light drift, sun glow) are the sanctioned exception.
- **R18** One easing token everywhere: `cubic-bezier(.21,.86,.36,1)` (or equivalent spring feel).
  Never bare `ease`/`ease-in-out`/`linear` for UI.
- **R19** Enter = opacity + translateY(14–22px) + slight blur, staggered ~90–130ms between
  siblings. Exits subtler than enters. One orchestrated hero load-in beats scattered effects.
- **R20** Animate `transform`/`opacity`/`filter` only. Scroll effects via IntersectionObserver
  (threshold ~0.2, fire once) and rAF-throttled parallax.
- **R21** `prefers-reduced-motion` path for EVERY animation: keyframes gated in the media query,
  JS behind matchMedia, counters/gauges jump to final values, canvas renders one static frame.
- **R22** Data animates as authority: counters tick up (easeOutCubic ~1.5s), bars scale from
  origin with stagger, lines draw via dash-offset, gauges sweep. Charts get axis labels,
  tabular numerals, and a source/illustrative note.
- **R23** Generative graphics (constellation motif) on `<canvas>`: DPR-aware, paused offscreen,
  elegant not busy (node/link alpha ≤ ~0.2; sparse warm pulses).

## 6. AGL Web — copy & compliance

- **R24** Copy arc for advisors: their pain (recruiter noise, opaque decision) → our authority
  (whole-board data) → the safe private path (assessment/guide) → the call. Peer-to-peer voice;
  specific beats clever; short confident sentences.
- **R25** Every number is either public-filings-backed (the ~725K universe) or labeled
  illustrative. Deal economics ONLY as illustrative ranges + "not an offer, estimate, or
  guarantee." No income promises (FINRA/SEC/FTC).
- **R26** Axiom relationship disclosed in plain language on any advisor-facing property.
- **R27** Sample/demo data is fictional and labeled as such wherever it appears.

## 7. Accessibility & build quality

- **R28** Visible `:focus-visible` states, aria labels on interactive/decorative elements,
  charts get role="img" + aria-label. Contrast ≥ 4.5:1 for body text.
- **R29** No horizontal page scroll ever; wide content scrolls in its own container. Mobile
  breakpoints actually designed (~900px, ~620px), not just stacked.
- **R30** Self-contained deliverables: fonts/images inlined, no external requests, no silent
  font fallbacks (declare @font-face with real files).

---

## Amendment log

- 2026-07-08 — v1 seeded from: v8→v9 slop autopsy (Chris), v9 build system (Fable), Brand
  Packet v1.0, motion-craft standards. Author: Claude Fable 5, approved pending Chris review.

## 8. Amendments from model-bench round 1 (2026-07-08)

- **R31** Reveal timing budget: scroll-reveal transitions ≤0.9s with ≤0.5s stagger delay; any
  section fully settled <1.5s after entering the viewport. Sections that sit ghosted for
  seconds read as broken (bench: sonnet build took 2–4s to land).
- **R32** Compliance language is reader-facing, never dev-facing. Say "Illustrative — from
  public filings." NEVER "replace with live query before launch," "must be wired to…," or any
  copy describing the page as a demo/screen/experience. The single sanctioned self-reference
  is the fictional-sample labeling on the report.
- **R33** Minimum information content for charts: every chart encodes at least one comparative,
  labeled fact (illustrative-footed as needed); range charts show numeric endpoints. A chart
  that honestly contains one word of information must be a sentence instead.
- **R34** Interaction wiring is part of "done": every CTA resolves to a real, different target;
  every screen is reachable through visible UI (not only URL hashes); every entry path fires
  the same animations/counters; view switches reset scroll. Content must survive
  animations-never-running (no forward-fill-dependent visibility — the gold build's own
  bench finding).

Amendment log: 2026-07-08 — R31–R34 added from model-bench round 1 (sonnet + fugu-ultra runs).
