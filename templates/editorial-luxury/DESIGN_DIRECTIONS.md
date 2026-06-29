> # ⚠️ DEPRECATED — DO NOT USE
> This 4-archetype variation system has been **replaced by the 5-dial token system**.
> Use instead: `DESIGN_TOKENS.md` (dials + CSS values) + `SECTION_PATTERNS.md` (per-section layouts) + `MOTION_TIERS.md` (animation). Agents 02.5, 04, and 05 no longer read this file. Kept only for historical reference; will be deleted once Direction 01 validates the new system.

---

# DESIGN_DIRECTIONS.md — Editorial Luxury Variation System (ARCHIVED)
**Template:** `editorial-luxury`
**Purpose:** Plugs into the existing DESIGN.md. Defines HOW each site interprets the fixed conversion architecture differently. The quality bar never changes. The visual interpretation does.

> Read this AFTER DESIGN.md, BEFORE building. Every site picks ONE archetype. The archetype governs layout patterns, section rhythm, interaction style, and the "signature moment" — the one thing that makes this site memorable.

---

## The Two-Layer Model

```
┌─────────────────────────────────────────┐
│  FIXED LAYER (DESIGN.md)                │
│  Never changes. The quality bar.        │
│                                         │
│  • 3-layer shadow stacks                │
│  • Radial gradient depth on sections    │
│  • Anti-slop rules (banned patterns)    │
│  • Color token architecture             │
│  • Typography scale & font rules        │
│  • Conversion section sequence          │
│  • Grain overlay, shimmer, etc.         │
└──────────────────┬──────────────────────┘
                   │ (constrains)
                   ▼
┌─────────────────────────────────────────┐
│  VARIABLE LAYER (this file)             │
│  Changes per client. The personality.   │
│                                         │
│  • Archetype (4 options)                │
│  • Layout interpretation per section    │
│  • Section rhythm & density             │
│  • Signature interaction (1 per site)   │
│  • Micro-personality cues               │
└─────────────────────────────────────────┘
```

The conversion architecture (positioning → pain → proof → CTA) is IDENTICAL across all archetypes. What changes is how those sections *look and feel*.

---

## The Four Archetypes

Every advisor site falls into one of four brand personalities. The intake determines which. Each archetype has its own layout patterns, interaction style, and signature moment.

### Archetype A — The Institution
**The feel:** A private bank's annual report. Authority through restraint. Symmetry, precision, gravitas.
**Best for:** Advisors serving ultra-high-net-worth families, multi-generational wealth, trust/estate specialists, former wirehouse teams.
**Visual personality:**
- Symmetric layouts, centered compositions
- Generous whitespace — sections breathe
- Serif-dominant typography (serifs in subheads too, not just headlines)
- Minimal motion — subtle, slow fades only
- Gold used as hairline rules and small accents, never large fills
- Photography style: architectural, geometric, abstract
**Section rhythm:** Slow. 120px+ section padding. Content is sparse on screen — one idea per viewport.
**Signature moment options:**
1. Full-bleed hero with a single headline, no image, massive serif — pure typographic confidence
2. A horizontal "legacy timeline" showing generational wealth transfer stages
3. A quiet, centered pull quote section with gold hairline frame — no other content

### Archetype B — The Editor
**The feel:** The Atlantic meets a boutique advisory. Content-led, magazine-grade hierarchy. Editorial typography that commands attention.
**Best for:** Advisors with strong content/thought leadership, advisors targeting sophisticated professionals (tech, medicine, finance), advisors who differentiate through expertise.
**Visual personality:**
- Asymmetric layouts — 7/5 and 5/7 splits, offset content
- Large pull quotes, drop caps, editorial figures
- Serif display + sans body (clear contrast between voices)
- Mixed column widths within a single section
- Section transitions feel like turning a magazine page
- Photography style: documentary, human, environmental
**Section rhythm:** Dynamic. Alternates dense editorial sections with breathing-room sections. Varied heights — some sections are tall and immersive, others are compact.
**Signature moment options:**
1. A full-width editorial feature — pain point as a long-form magazine-style section with drop cap, pull quote, and figure
2. An asymmetric hero — headline and subhead left-aligned in a 7-column grid, right side is negative space with a single gold accent mark
3. A "field notes" style process section — handwritten-feel annotations, margin notes, numbered steps with editorial captions

### Archetype C — The Modernist
**The feel:** A Silicon Valley advisory firm that happens to serve traditional clients. Precise, geometric, confident. Clean but warm — never sterile.
**Best for:** Younger advisors, advisors serving tech professionals or entrepreneurs, fee-only RIAs differentiating from wirehouses, advisors with a "we do things differently" message.
**Visual personality:**
- Precise grid systems — content aligned to a visible structure
- Sans-dominant typography with serif accents (serif only in hero headline)
- Geometric icon systems (custom SVG, never stock)
- Micro-interactions are precise and snappy (0.2s, cubic-bezier)
- Gold used in small geometric accents — dots, lines, corner marks
- Photography style: clean, bright, minimal, architectural
**Section rhythm:** Tight and efficient. 80-90px section padding. Content-dense but well-organized. Every pixel earns its place.
**Signature moment options:**
1. A split-screen hero — left side is navy with the headline, right side is cream with a precise grid of differentiators or proof points
2. An interactive "fit matrix" — a 2D grid where users hover their situation to see if it's a match
3. A bento-free (but structured) approach to services — a precise 12-column grid with services aligned to different column spans

### Archetype D — The Heritage
**The feel:** An established family firm with deep roots. Warm, textured, human. Traditional values communicated through craft, not stuffiness.
**Best for:** Second-generation advisors, advisors in smaller markets, advisors serving family businesses, advisors whose brand story is about relationships and longevity.
**Visual personality:**
- Warm, textured backgrounds (subtle paper texture, soft gradients)
- Serif-dominant with warm body font (humanist sans, not geometric)
- Rounded edges (6-8px radius — warmer than 4px but not pill-shaped)
- Motion is gentle and organic (longer durations, softer easing curves)
- Gold used warmly — more saturated, appears in borders, backgrounds (wash), not just hairlines
- Photography style: lifestyle, relationships, natural light, authentic
**Section rhythm:** Warm and inviting. 100-110px padding. Sections feel like rooms you walk into — each has its own atmosphere.
**Signature moment options:**
1. A "family meeting" hero — warm photography placeholder, handwritten-style tagline overlay, personal and inviting
2. A relationship-focused about section — not a bio card, but a story-driven layout with milestone markers
3. A "porch conversation" CTA — the final CTA feels personal, warm, and direct (not corporate "book a consultation")

---

## How to Pick the Archetype

Add these questions to the INTAKE.md. The answers determine the archetype:

```markdown
## Archetype Selection (Answer these to determine visual direction)

**1. What best describes the advisor's brand personality?**
☐ Traditional and authoritative — "the institution"
☐ Intellectual and content-driven — "the expert voice"
☐ Modern and precise — "the new standard"
☐ Warm and relationship-focused — "the family firm"

**2. Who is the ideal client's mindset?**
☐ "I want the most established, credible option"
☐ "I want someone who actually understands my complexity"
☐ "I want someone who does things differently than the old guard"
☐ "I want someone I can trust like family"

**3. What's the advisor's competitive position?**
☐ Legacy / heritage / size / scale
☐ Specialization / expertise / niche authority
☐ Innovation / transparency / modern approach
☐ Relationships / longevity / personal service

**4. How formal is the advisor's communication style?**
☐ Very formal (suits, formal language, traditional)
☐ Professional but intellectual (writes articles, speaks at events)
☐ Professional but modern (direct, clear, no jargon)
☐ Professional but warm (conversational, personal, relatable)
```

**Scoring:** The dominant letter (A/B/C/D) determines the archetype. If two are tied, the answer to Q1 breaks the tie.

---

## Layout Variation Patterns

Within each archetype, the conversion sections stay the same — but their visual treatment varies. Here's the variation menu. The build agent selects ONE pattern per section, guided by the archetype.

### Hero (always dark navy — but the layout changes)

| Pattern | Institution (A) | Editor (B) | Modernist (C) | Heritage (D) |
|--------|-----------------|------------|---------------|--------------|
| **Centered** | ✅ Default | | | |
| **Left-aligned 7/5** | | ✅ Default | | |
| **Split-screen** | | | ✅ Default | |
| **Image overlay** | | | | ✅ Default |

All four hero patterns maintain: dark navy background, radial gradient depth, eyebrow + H1 + subhead + dual CTA, proof strip. What changes is the composition.

### Pain Section

| Pattern | Description | Best archetype |
|---------|-------------|----------------|
| **2×2 card grid** | Four pain cards in a grid | A, D |
| **Editorial stack** | Pain points as full-width alternating bands — quote left, context right, alternating sides | B |
| **Numbered list** | Pain points as a vertical numbered sequence with gold numerals | C |
| **Marquee + expansion** | Scrolling ticker of pain phrases, clicking expands to full quote | B, C |

### Services / What We Do

| Pattern | Description | Best archetype |
|---------|-------------|----------------|
| **2×2 numbered grid** | Four services with large ghost numerals | A, D |
| **Editorial feature list** | Services as a magazine-style list with descriptions — single column, wide, generous type | B |
| **12-column span grid** | Services aligned to a 12-col grid with varying spans (e.g., 5+7, 4+8) | C |
| **Accordion expansion** | Services as expandable rows — click to reveal details | C, D |

### Process / How It Works

| Pattern | Description | Best archetype |
|---------|-------------|----------------|
| **Horizontal 4-step** | Steps connected by a gold line, numbers in circles | A |
| **Vertical narrative** | Steps as a story — each step is a short paragraph with a margin note | B, D |
| **Precise grid** | Steps in a 4-column grid with geometric connectors | C |
| **Stepped timeline** | Steps as a vertical timeline with milestone markers | D |

### Proof / Trust

| Pattern | Description | Best archetype |
|---------|-------------|----------------|
| **Stats strip (dark)** | 4 stats, count-up animation | A, C |
| **Editorial proof** | Testimonial as a full-width magazine feature with pull quote | B |
| **Bento-free proof grid** | Mixed-format proof cards in a structured but varied grid | C |
| **Relationship strip** | Warm testimonials with client descriptors, no stats | D |

### Final CTA

| Pattern | Description | Best archetype |
|---------|-------------|----------------|
| **Centered, symmetrical** | Single column, centered, formal | A |
| **Editorial close** | Long-form closing paragraph with inline CTA link | B |
| **Split-screen** | Left: CTA text. Right: Fit assessment or booking preview | C |
| **Personal invitation** | Warm, personal copy — "Let's have a conversation" feel | D |

---

## The Signature Moment

Every site gets ONE signature moment — a distinctive section or interaction that makes it memorable. This is the thing a visitor would describe to a friend. Pick ONE, based on the archetype.

### Institution (A) signatures:
1. **The Legacy Timeline** — A horizontal scrolling timeline showing generational wealth stages (accumulation → protection → transfer → legacy). Gold milestone markers on a navy band.
2. **The Coordinated Plan Diagram** — An interactive SVG showing how investments, taxes, estate, and insurance connect. Subtle hover reveals each connection.
3. **The Empty Room** — A hero with nothing but a single centered headline and one line of subtext. Maximum whitespace. Pure confidence.

### Editor (B) signatures:
1. **The Editorial Feature** — One pain point expanded into a full-width magazine-style essay section with drop cap, pull quote, and editorial figure. The rest of the pain points are compressed cards — this one gets the feature treatment.
2. **The Margin Notes Process** — Process section styled like a marked-up manuscript — handwritten-style annotations, arrows, cross-references. Feels like peeking inside the advisor's thinking.
3. **The Asymmetric Quote Wall** — Testimonials laid out in an asymmetric editorial grid — one large pull quote, two smaller quotes offset, varying column widths.

### Modernist (C) signatures:
1. **The Fit Matrix** — A 2D interactive grid: "Your situation" (rows) × "What you need" (columns). Hover/click reveals whether AWP serves that intersection. Gold checkmarks, precise geometry.
2. **The Split-Screen Services** — Left side: a sticky nav of service categories. Right side: details that update as you scroll/click. Efficient, app-like.
3. **The Coordination Map** — A clean, geometric SVG diagram showing how financial professionals (CPA, attorney, advisor, insurance) connect — with AWP at the center.

### Heritage (D) signatures:
1. **The Family Meeting Hero** — A warm photography placeholder (lifestyle, not stock) with a personal tagline overlay. Feels like an invitation, not a pitch.
2. **The Milestone Map** — Process section as a life-milestone map — career growth, business exit, retirement, legacy — with how AWP helps at each stage.
3. **The Porch Conversation CTA** — Final CTA styled as a personal letter from the advisor. Handwritten-style signature. Warm, direct, human.

**Rule:** Only ONE signature moment per site. It should appear at the emotional peak of the page — typically between the pain/ICP sections and the proof sections, or as the hero itself.

---

## Section Rhythm by Archetype

How the page *breathes* changes the entire feel. Same content, different rhythm.

| Archetype | Padding | Density | Variation |
|-----------|---------|---------|-----------|
| Institution (A) | 120px+ | Sparse — one idea per viewport | Consistent rhythm, slow pace |
| Editor (B) | Variable 80-120px | Mixed — some dense, some sparse | Dynamic rhythm, deliberate variation |
| Modernist (C) | 80-90px | Dense but organized | Tight, efficient, consistent |
| Heritage (D) | 100-110px | Moderate, warm | Gentle variation, comfortable pace |

---

## Interaction Style by Archetype

Motion personality. Same IntersectionObserver tech, different feel.

| Archetype | Duration | Easing | Hover lift | Stagger |
|-----------|----------|--------|------------|---------|
| Institution (A) | 0.5-0.7s | `ease` / `ease-out` | Subtle (2px) | Minimal — one fade per group |
| Editor (B) | 0.4-0.6s | `cubic-bezier(.16,1,.3,1)` | Moderate (4px) | Yes — staggered reveals, editorial pacing |
| Modernist (C) | 0.2-0.3s | `cubic-bezier(.34,1.56,.64,1)` | Snappy (5px) | Yes — rapid, precise stagger |
| Heritage (D) | 0.5-0.8s | `cubic-bezier(.22,1,.36,1)` | Gentle (3px) | Yes — slow, warm stagger |

---

## How This Plugs Into Your Existing Pipeline

### Current pipeline:
```
INTAKE → Agent 01 (Research) → Agent 02 (Strategy) → Agent 03 (Copy) → Agent 04 (Build) → Agent 05 (QA)
```

### Updated pipeline:
```
INTAKE → Archetype Selection → Agent 01 (Research) → Agent 02 (Strategy) → Agent 02.5 (Design Direction) → Agent 03 (Copy) → Agent 04 (Build) → Agent 05 (QA)
```

### What Agent 02.5 does:
Agent 02.5 (Design Direction) reads:
- INTAKE.md (archetype answers)
- research/ICP_BRIEF.md
- strategy/COPY_STRATEGY.md
- DESIGN.md (the template)
- DESIGN_DIRECTIONS.md (this file)

And produces `strategy/DESIGN_BRIEF.md` — a one-page document that tells Agent 04:
- Which archetype was selected and why
- Which layout pattern to use for each section
- Which signature moment to build
- The interaction style (durations, easing, stagger)
- The section rhythm
- Any archetype-specific micro-copy or visual decisions

**Agent 04 reads DESIGN_BRIEF.md BEFORE the BUILD_PROMPT.** It governs layout decisions. The BUILD_PROMPT still governs content and conversion structure.

---

## Build Agent Instructions (add to Agent 04)

```markdown
## Reading Order (UPDATED)

1. templates/[template]/DESIGN.md — visual constitution (quality bar)
2. templates/[template]/DESIGN_DIRECTIONS.md — variation system (THIS FILE)
3. strategy/DESIGN_BRIEF.md — which archetype + patterns to use (from Agent 02.5)
4. projects/[slug]/DESIGN.md — client color tokens, fonts, logo
5. projects/[slug]/SITEMAP.md — pages and section order
6. copy/COPY_ALL.md — all page content

The archetype and layout patterns in DESIGN_BRIEF.md OVERRIDE the default layouts
in the BUILD_PROMPT. The BUILD_PROMPT defines WHAT sections exist and WHAT content
they contain. The DESIGN_BRIEF defines HOW those sections look and behave.

If DESIGN_BRIEF.md says "Archetype B (Editor) — asymmetric hero, editorial pain
stack, magazine-style services list" — you build those patterns, not the default
2×2 grids from the BUILD_PROMPT.

The quality rules in DESIGN.md ALWAYS apply regardless of archetype:
- 3-layer shadow stacks on all cards
- Radial gradient depth on every section
- No banned fonts, no AI tells
- Shimmer on CTAs, grain overlay, etc.
```

---

## QA Additions (add to Agent 05)

```markdown
### Variation Compliance (NEW)

- [ ] Site matches the archetype assigned in DESIGN_BRIEF.md
- [ ] Layout patterns used match the assigned patterns (not default grids)
- [ ] Signature moment is present and distinctive
- [ ] Section rhythm matches the archetype (padding, density)
- [ ] Interaction style matches the archetype (durations, easing)
- [ ] This site does NOT look like other sites on the same template
     (compare against build/ folders of other projects — if layout is
      identical, flag as "ARCHETYPE DRIFT — site does not differentiate")

### Cross-Site Uniqueness Check (NEW)

- [ ] No two consecutive client sites use the same archetype
- [ ] No two consecutive client sites use the same signature moment
- [ ] Hero layout differs from the last 2 sites built
- [ ] Pain section layout differs from the last site built
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-25 | Initial DESIGN_DIRECTIONS.md — 4 archetypes, layout variation patterns, signature moments, interaction styles |
