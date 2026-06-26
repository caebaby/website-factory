# Design Brief — Anchor Wealth Planning
**Date:** 2026-06-26
**Archetype:** B — The Editor
**Selected by:** Agent 02.5

---

## Archetype Selection

**Archetype:** B — The Editor

**Reasoning:** AWP's positioning is fundamentally about *expertise expressed through content-grade precision* — the coordinated-planning differentiator is an intellectual argument, not an emotional one, and the Editor archetype is built for advisors who differentiate through expertise. The three ICPs (oil & gas executives, business owners, HNW families) are sophisticated professionals who respond to magazine-grade hierarchy and editorial authority, not glossy corporate symmetry. Alex's Merrill Lynch → independent arc is a *story*, and the Editor treats story as structure.

The Institution archetype (A) was the runner-up given Alex's wirehouse background and HNW clientele, but Institution's symmetric, sparse, slow-moving aesthetic would under-serve the coordinated-planning message, which needs editorial density to land — the mechanism of coordination is best shown through asymmetric layouts that visually demonstrate "left hand / right hand working together."

[INFERRED — confirm with client] — INTAKE.md does not yet contain the Archetype Selection questions. Inference based on: wirehouse veteran (leans A), but niche specialist with a strong intellectual differentiator (leans B), fee-only RIA differentiating from wirehouses (leans C but overridden by the editorial nature of the coordination argument). Q1 (brand personality) is the primary signal; "authoritative but approachable, sophisticated" maps most strongly to B.

---

## Layout Patterns

### Hero
**Pattern:** Left-aligned 7/5 — headline and subhead left-aligned in a 7-column grid, right side is negative space with a single gold accent mark (subtle anchor SVG at low opacity)
**Why:** The Editor's asymmetric hero creates immediate visual distinction from symmetric wirehouse sites. The 7/5 split gives the headline room to breathe while the negative space on the right feels confident, not empty — it's the "we don't need to fill every pixel" signal that separates $25k work from templates.

### Pain Section
**Pattern:** Marquee + expansion — scrolling ticker of pain phrases between Hero and Trust; then the 4 pain cards rendered as an editorial stack (alternating full-width bands — quote left, context right, alternating sides)
**Why:** The marquee creates the rapid "that's me" recognition moment. The editorial stack expansion gives each pain room to land with the emotional weight the ICP research demands — alternating sides creates a rhythm that keeps the reader scrolling through difficult content. This is the Editor's signature treatment of the Problem section.

### ICP Self-Sort / Who We Serve
**Pattern:** 3-column with custom geometric icons (oil rig silhouette, business/building, family/hearth — all custom SVG, gold stroke)
**Why:** Three clean columns let the prospect self-sort instantly. Custom SVG icons (never emoji, never stock) signal craft. The geometric icon style aligns with the Editor's precise-but-warm aesthetic.

### Services
**Pattern:** Editorial feature list — services as a magazine-style single-column list with generous type, large ghost numerals, and descriptions that lead with the client pain
**Why:** The coordinated-planning argument is best made in editorial form — wide, readable, one idea at a time. The 2×2 grid would reduce services to a feature menu; the editorial list treats each service as a short essay, which matches the "we think differently" positioning.

### Process
**Pattern:** Vertical narrative — steps as a story, each step a short paragraph with a margin note (handwritten-feel annotation in gold italic)
**Why:** The Editor's "field notes" process style removes the corporate feel of numbered circles and timelines. Margin notes feel like peeking inside Alex's thinking — exactly the transparency that counters the "black box" fear from the research.

### Proof / Trust
**Pattern:** Stats strip (dark navy band) + editorial proof (testimonials as full-width magazine features with pull quotes)
**Why:** The dark stats strip provides quantified authority and visual rhythm contrast (dark band between cream sections). The editorial testimonial treatment elevates client voices from "card grid" to "magazine feature" — more credible, more memorable.

### Final CTA
**Pattern:** Editorial close — long-form closing paragraph with inline CTA link, dark navy, centered but not symmetric
**Why:** The Editor's closing reads like a personal letter, not a sales banner. The inline CTA link (not a giant button wall) matches the prospect's readiness level at this point in the page — they've been convinced, now they need a quiet invitation, not a shout.

---

## Signature Moment

**Selected:** The Margin Notes Process (Editor signature #2)
**Placement:** Between Services (Section 7) and About — the process section itself becomes the signature
**Why:** The coordinated-planning differentiator is fundamentally about *how Alex thinks* — the margin notes process section makes the advisor's thinking visible. Handwritten-feel annotations, arrows, cross-references between steps create the sense of "peeking inside the plan." No competitor does this. It's the thing a visitor would describe to a friend: "the process section looks like a marked-up manuscript."

### Build instructions for the signature:
- Process section styled as a manuscript page — cream-mid background with a subtle paper-texture feel (radial gradient + low-opacity grain)
- Each of the 4 steps (Discovery → Assessment → Plan → Partnership) rendered as an editorial paragraph in serif, left-aligned, max-width 680px
- Gold italic "margin notes" in the right margin (or below on mobile) — handwritten-feel annotations like "← this is where we pull in your CPA" or "usually 2 weeks" or "you keep this document"
- A thin gold vertical line connecting the 4 steps (like a manuscript margin rule)
- Annotations use a slightly different font treatment (italic, accent color, smaller size) to distinguish from body copy
- On scroll reveal, the margin notes stagger in after the main paragraph (0.4s delay) — feels like annotations being added in real time
- NO numbered circles, NO horizontal connector lines, NO timeline markers — this is prose, not an infographic

---

## Interaction Style

**Base:** Editor archetype defaults — duration 0.4–0.6s, `cubic-bezier(.16,1,.3,1)` easing, moderate 4px hover lift, staggered reveals with editorial pacing

**Client-specific adjustments:**
- Stats count-up is slower than typical — 1.8s duration to feel deliberate and authoritative (oil & gas exec audience reads fast numbers as gimmicky)
- Card hovers are subtler — 3px lift instead of 4px, reflecting AWP's restrained "authoritative not flashy" brand voice
- Pain ticker scrolls at a slower rate (30s loop vs typical 20s) — the pain phrases need to be readable, not a blur
- Margin note reveal delay is 0.4s after the parent paragraph — creates the "annotation being added" effect

**Transition tokens (specify exact values for the build):**
```css
--t-reveal: 0.5s cubic-bezier(.16,1,.3,1);
--t-hover: 0.22s cubic-bezier(.34,1.2,.64,1);
--t-stagger: 0.08s;
--hover-lift: 3px;
--ticker-duration: 30s;
--countup-duration: 1800ms;
```

---

## Section Rhythm

**Padding:** Variable 80–120px — editorial sections (Pain stack, Services list, Process) get 120px to breathe; compact sections (Trust bar, Stats strip) get 80px

**Density:** Dynamic — editorial sections are intentionally dense (long-form copy, generous type), while breathing sections (ICP self-sort, Final CTA) are sparse. This alternation creates the "turning a magazine page" rhythm that defines the Editor archetype.

**Special sections:**
- **Hero:** Taller than default — 120px top padding, full viewport height feel. The asymmetric 7/5 split needs vertical space to land.
- **Pain editorial stack:** Tallest section on the page — 4 alternating bands at 120px each. This is where the emotional weight lives.
- **Process (signature):** Taller — 120px padding, generous internal spacing between steps (64px). The margin notes need room.
- **Stats strip:** Shorter — 80px, single dark band, compact. Visual punctuation between sections.
- **Trust Establishment:** Compact — 80px. This is a credibility floor, not a feature section.

---

## Notes for Agent 04

1. **Maritime restraint:** The AWP brand has a maritime identity (anchor logo, "charting the course" tagline). Use it SPARINGLY — the logo mark in the nav, the tagline in the hero/footer, and ONE subtle wave SVG in the hero background gradient. Do NOT scatter anchors, ships, compasses, or nautical patterns across the site. The Editor archetype is intellectual, not thematic.

2. **Hero accent mark:** The right-side negative space (5-column area) gets a single gold anchor SVG at ~8% opacity, large (300px), positioned bottom-right. This is the only decorative element in the hero. It whispers the brand, doesn't shout it.

3. **Oil & gas visual cues:** In the Who We Serve ICP section, the oil & gas card uses a subtle pump-jack or derrick silhouette as a background watermark (gold, 4% opacity). Not obvious — visible only on close inspection. Business owner card: building/skyline silhouette. HNW family card: estate/home silhouette. All custom SVG.

4. **Margin note font:** Use EB Garamond italic for the margin notes (already loaded). The handwritten "feel" comes from the italic treatment + gold color + smaller size, not from a novelty handwriting font (which would violate the anti-slop rules).

5. **Color rhythm:** Homepage section background sequence: Dark (Hero) → Cream (Pain ticker/marquee is on the hero's lower edge or a thin cream band) → Cream-mid (Pain editorial stack) → Cream (Trust) → Cream-mid (ICP) → Cream (Fit Assessment — elevated white card on cream) → Cream-mid (Services) → Cream (Process/signature) → Cream-mid (About) → Dark (Stats strip) → Cream (Testimonials) → Dark (Final CTA) → Cream-mid (Footer). Never two consecutive same-bg sections.

6. **The fit assessment card** is the conversion centerpiece — it must feel like a premium tool, not a web form. Level 3 shadow (highest elevation), white card on cream background, gold accent top-border. 4 questions as clean radio/select inputs with the email field as the final step.

---

## Cross-Site Context

- **Last site built on this template:** N/A — AWP is the first site built on the editorial-luxury template with the full 3-pillar system (SECTION_MANIFEST + DESIGN.md + DESIGN_DIRECTIONS). The existing `build/index.html` is a pre-system prototype — this build replaces it.
- **Their archetype:** B (Editor) — first use of this archetype on this template.
- **Variation check:** N/A (first site). Future sites on this template should NOT use archetype B or the Margin Notes Process signature to maintain cross-site uniqueness per the QA rules.
