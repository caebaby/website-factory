# Design Brief — Larkspur Private Wealth
**Date:** 2026-06-29
**Selected by:** Agent 02.5 (Direction 01 — proof of concept)

Larkspur is the deliberate inverse of the AWP build: where AWP is light / editorial-serif / navy-gold / photography, Larkspur is dark / modernist-sans / copper / graphic-system. Same rules engine, no visual resemblance. ICP: founders & senior operators who just hit a liquidity event ($5M–$50M newly liquid) — sophisticated, skeptical of "old advisor" branding, terrified of an irreversible mistake in the window right after the money lands.

## TOKEN CONFIGURATION

DIALS:
- Tone:             dark
- Layout Density:   balanced
- Motion Intensity: expressive
- Type Personality: modernist-sans
- Visual Language:  graphic-system

CSS OVERRIDES (copy into :root):
--bg-base:          #0D0D0D
--bg-base-rgb:      13,13,13
--bg-surface:       #141414
--bg-elevated:      #1C1C1C
--bg-inverse:       #F5F3F0
--text-primary:     #E8E6E3
--primary-rgb:      232,230,227
--text-secondary:   #A7A39D
--text-muted:       rgba(255,255,255,0.38)
--border:           rgba(255,255,255,0.08)
--accent:           #C17F49
--accent-rgb:       193,127,73
--accent-muted:     #8A5A34
--font-display:     'Cabinet Grotesk','General Sans',sans-serif
--font-body:        'Switzer','General Sans',sans-serif
--size-display:     clamp(48px,6vw,92px)
--weight-display:   300
--leading-display:  0.94
--tracking-display: -0.035em
--section-pad:      100px
--col-gap:          40px
--radius:           4px
--motion-base:      0.7s
--motion-ease:      cubic-bezier(0.16,1,0.3,1)
--motion-stagger:   50ms

SECTION PATTERN SELECTIONS:
- Hero:             1A The Split (copy left, animated coordination SVG right)
- Pain Validation:  2A Ticker + Cards
- Trust:            T1 Authority Strip (tone-flip to elevated surface)
- ICP Self-Sort:    3A Profile Cards
- Fit Assessment:   4A Multi-Step (4 questions + email)
- Services:         5B Outcome Cards (verb-first)
- Process:          6A Timeline (SVG draw connector)
- Proof:            7A Stats Row (blur counters) + Testimonial Cards
- Final CTA:        8A Centered Close
- Footer:           9B Rich

MOTION TIER ACTIVE: expressive (Tier 1 + Tier 2)

ACCENT USAGE MAP:
- Place 1: logo mark (the larkspur stem)
- Place 2: primary CTA button fill
- Place 3: hero eyebrow rule + active node in the coordination SVG

## Dial Reasoning
- Tone: dark — this ICP distrusts the navy/gold "legacy advisor" look; a precise dark world reads modern and confidential, like the tools they already use.
- Density: balanced — enough room to feel premium, enough information to satisfy analytical operators.
- Motion: expressive — signals competence and modernity without tipping into showy cinematic (which would read as style-over-substance to a skeptical buyer).
- Type: modernist-sans — Cabinet Grotesk's light-weight display at scale reads precise and contemporary; serif would pull toward the legacy look we're avoiding.
- Visual: graphic-system — the firm has no brand photography and the value prop is *coordination of complexity*, which a custom node diagram conveys better than any stock image.

## Pattern Reasoning
- Hero 1A: the coordination SVG IS the proof — shows the chaos→order promise beside the claim.
- Pain 2A: the ticker stops the skeptical scroller with their own words before they commit to reading.
- Trust T1: a tone-flipped fiduciary strip buys permission immediately after the pain, no pitch.
- ICP 3A: four liquidity archetypes let the right founder self-select in one glance.
- Fit 4A: one question at a time maximizes completion — this is the MQL event.
- Services 5B: verb-first outcome cards ("Shelter / Structure / Diversify / Plan") beat feature lists for outcome-driven operators.
- Process 6A: a drawn timeline removes fear of the unknown 90-day window.
- Proof 7A: blur-to-sharp counters + named testimonials = scale then relationship.
- Final CTA 8A: a clean dark close — the page has done the arguing.
- Footer 9B: rich footer carries the RIA compliance load.

## Signature Moment
**What:** The hero "coordination graph" — a custom SVG where the liquidity event sits at center and five decision nodes (Tax, Concentration, Estate, Timing, Diversification) draw in around it, connected by copper lines, resolving from scatter into an ordered ring.
**Placement:** Hero right panel (Split pattern).
**Why:** It states the entire value proposition — *we bring order to the chaos of sudden wealth* — without a word, and it's the thing a founder screenshots.
**Build instructions:**
- Center node = "Liquidity Event" (copper-ringed). Five satellite nodes on a ring.
- On load: center scales in, then DrawSVG draws each connector copper-line outward with 0.12s stagger, then satellite labels fade up.
- Subtle continuous float on each node (GSAP, 6s yoyo, tiny amplitude) — alive, not busy.
- Respect prefers-reduced-motion: render final state, no draw/float.

## Cross-Site Context
- **Last site on this template:** Anchor Wealth Planning (AWP)
- **Their Tone+Type+Visual:** light + editorial-serif + photography
- **Variation check:** Larkspur is dark + modernist-sans + graphic-system — differs on all three axes and shares zero patterns with AWP. Maximum differentiation; proves the system produces unrelated sites.
