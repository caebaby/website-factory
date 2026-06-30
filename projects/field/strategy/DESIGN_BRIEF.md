# Design Brief — Field (brand & narrative studio)
**Date:** 2026-06-29
**Selected by:** Agent 02.5

Field is a brand & narrative studio for founders whose product is great but whose story is a mess. ICP: seed–Series B founders who are brilliant and invisible — their pitch, site, and story don't match the quality of what they've built. The site must feel like a top design studio's own site: stark, confident, gallery-like, type-led. This is the deliberate third style — not wealth advisory, not restrained. Bold, creative, typographic.

## TOKEN CONFIGURATION

DIALS:
- Tone:             light (stark gallery white)
- Layout Density:   editorial
- Motion Intensity: cinematic
- Type Personality: modernist-sans (Satoshi)
- Visual Language:  typographic (type IS the image — NO diagrams, NO stock photos)

CSS OVERRIDES (copy into :root):
--bg-base:          #FAFAF8
--bg-base-rgb:      250,250,248
--bg-surface:       #FFFFFF
--bg-elevated:      #F2F1EC
--bg-inverse:       #0E0E0C
--text-primary:     #14140F
--primary-rgb:      20,20,15
--text-secondary:   #555149
--text-muted:       #9A968C
--border:           rgba(20,20,15,.12)
--accent:           #DC3C20
--accent-rgb:       220,60,32
--accent-muted:     #B53219
--font-display:     'Satoshi','General Sans',sans-serif
--font-body:        'Satoshi','General Sans',sans-serif
--size-display:     clamp(64px,9vw,180px)   /* type IS the image — go huge */
--weight-display:   500
--leading-display:  0.92
--tracking-display: -0.04em
--section-pad:      136px
--col-gap:          48px
--radius:           0px                      /* sharp edges = gallery */
--motion-base:      0.95s
--motion-ease:      cubic-bezier(0.16,1,0.3,1)
--motion-stagger:   40ms

FONT LOADING: Fontshare — `<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=general-sans@400,500&display=swap" rel="stylesheet">`

SHADOW SYSTEM (light-surface, soft 3-layer — NEVER single box-shadow):
--shadow-card: 0 1px 2px rgba(20,20,15,.04), 0 6px 18px rgba(20,20,15,.06), 0 18px 44px rgba(20,20,15,.06);
--shadow-card-hover: 0 2px 6px rgba(20,20,15,.06), 0 12px 30px rgba(20,20,15,.10), 0 30px 64px rgba(20,20,15,.10);

SECTION PATTERN SELECTIONS:
- Hero:             1B The Statement (full-width, headline 120–180px dominates; type IS the visual; NO diagram. A cinematic word-cycle in the headline is the signature moment.)
- Pain Validation:  2B The Editorial Stack (large numbered full-width rows, slow staggered reveal)
- Trust:            T3 The Quiet Mark (restrained centered band — logos of fields they've worked in / a one-line standard)
- ICP Self-Sort:    3B The Direct Question (pure typography, "Does this sound like you?" + statements, no cards)
- Fit Assessment:   4C The CTA Gate (persuasive headline → one button opens the multi-step assessment inline)
- Services:         5A The Numbered Editorial (large numbers + service name + outcome, editorial rows)
- Process:          6A The Timeline (4 steps, SVG line draw)
- Proof:            7C The Anchor Testimonial (one dominant testimonial + 3 supporting stat blocks)
- Final CTA:        8C The Immersive Close (full-viewport DARK section — tone flip to #0E0E0C — single huge statement + one CTA)
- Footer:           9C Minimal

MOTION TIER ACTIVE: cinematic (Tier 1 + Tier 2 + Tier 3)
- Tier 3 signature: hero headline word-cycle (a key word swaps through 3–4 words on a timeline), mouse-reactive subtle vermillion light, scroll-scrubbed reveal on the pain stack.
- Keep it tasteful: cinematic ≠ busy. One or two big moments, not constant motion.

ACCENT USAGE MAP (vermillion in exactly 3 places):
- Place 1: logo mark
- Place 2: primary CTA fill
- Place 3: the cycling word in the hero headline + the pain row numbers

## Dial Reasoning
- Tone light/stark: a brand studio must look like a gallery — confidence through emptiness, not darkness.
- Type modernist-sans (Satoshi) at brutal scale: the headline is the portfolio piece. Type carries everything.
- Visual typographic: this studio sells words and story — the type must BE the proof. Diagrams would undercut it.
- Motion cinematic: a creative studio's motion is its flex; restraint here would read as a less-good studio.
- Accent vermillion: a single hot color on stark white = editorial-bold, unmistakably not a finance site.

## Signature Moment
**What:** The hero headline holds a fixed frame with one cycling word in vermillion — e.g., "Your product is great. Your [story / pitch / site / brand] is a mess." The bracketed word swaps on a GSAP timeline with a mask/curtain reveal, ~1.6s per word, looping.
**Placement:** Hero.
**Why:** It demonstrates the studio's craft (narrative + motion) in the first three seconds, in their own medium — words.
**Build:** Use a fixed-width slot for the cycling word so layout doesn't jump; clip-path/y-mask reveal each new word; pause on reduced-motion (show the first word static).

## Cross-Site Context
- Previous builds on this template: Larkspur (dark/modernist/copper/graphic-system) and Larkspur Light (light/editorial-serif/claret/graphic-system).
- Field's Tone+Type+Visual: light + modernist-sans + **typographic** — differs from both (neither used typographic; neither used vermillion; neither used cinematic). Maximum range demonstration.
