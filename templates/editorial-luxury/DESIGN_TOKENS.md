# Design Token System
## editorial-luxury template

This document replaces DESIGN_DIRECTIONS.md. Instead of 4 named archetypes, Agent 02.5 sets 5 independent dials per client. The dial values populate the CSS token overrides in the Design Brief. Different dial combinations produce genuinely different visual worlds — not template variations.

---

## The 5 Dials

Agent 02.5 sets each dial based on client intake: ICP, brand voice, competitive positioning, and aesthetic references.

### Dial 1 — Tone
Controls the base color environment.

| Value | When to Use | Base Feel |
|-------|-------------|-----------|
| `light` | Trust-first, broad ICP, photography-forward, traditional positioning | Cream/white dominant, ink text, gold accent |
| `mixed` | Sophisticated but approachable, alternating section weights | Light base with dark hero and dark pull-quote sections |
| `dark` | Precision-focused, tech-adjacent, younger HNW ICP, differentiation play | Near-black dominant, muted body text, warm metal accent |

### Dial 2 — Layout Density
Controls spacing rhythm and information architecture.

| Value | When to Use | Base Feel |
|-------|-------------|-----------|
| `editorial` | High-end brand, long-form relationship clients, photography available | 140px section padding, wide margins, generous type leading |
| `balanced` | Most clients — enough whitespace to breathe, enough density to inform | 100px section padding, standard column gaps |
| `dense` | Data-forward, quantitative proof heavy, advisor with many services | 80px section padding, tighter grids, more content per screen |

### Dial 3 — Motion Intensity
Controls which animation tier is active. See MOTION_TIERS.md for exact specs.

| Value | When to Use | Base Feel |
|-------|-------------|-----------|
| `restrained` | Traditional positioning, older ICP, trust-first brands, law/compliance heavy | Opacity + subtle Y reveals only. No magnetic buttons. No parallax. |
| `expressive` | Default for most builds. Modern, premium, differentiated. | Full Tier 1 + Tier 2: split text, magnetic buttons, 3D tilt, SVG draws, parallax. |
| `cinematic` | Differentiation play, tech-adjacent, media-forward clients with strong photography/video | Full Tier 1 + Tier 2 + Tier 3: canvas, video, scroll-scrubbed immersive. |

### Dial 4 — Type Personality
Controls font selection and headline treatment.

| Value | When to Use | Base Feel |
|-------|-------------|-----------|
| `editorial-serif` | Heritage, HNW, relationship-first, premium advisory | EB Garamond or Canela (display 80–120px, weight 400) + Nunito Sans (body 18px) |
| `hybrid` | Modern advisors who want credibility + accessibility | EB Garamond (display 60–80px) + Inter (body 17px) |
| `modernist-sans` | Tech-forward, quant-adjacent, precision-first positioning | DM Sans or IBM Plex Sans (display 72–96px, weight 300–400) + same family (body 17px) |

### Dial 5 — Visual Language
Controls what fills the non-text visual real estate.

| Value | When to Use | Base Feel |
|-------|-------------|-----------|
| `photography` | Client has strong brand photography. People, spaces, lifestyle. | Full-bleed images, photographer credit in footer, image-led sections |
| `graphic-system` | No strong photography. Design carries the visual weight. | Coordination diagrams, geometric shapes, SVG illustration, data visualization |
| `typographic` | Confident minimalism. Type IS the image. | Oversized display text, extreme scale contrast, typography-only sections |

---

## CSS Token Definitions

These are the exact custom properties Agent 04 uses. Agent 02.5 outputs the values in the Design Brief.

### Color Tokens

```css
/* ── TONE: LIGHT ───────────────────────────────────────────────── */
--bg-base:       #FAFAF8;   /* page background */
--bg-surface:    #FFFFFF;   /* card / elevated surface */
--bg-elevated:   #F5F3F0;   /* section alternation */
--bg-inverse:    #0e2340;   /* dark sections within a light site */
--text-primary:  #0e2340;   /* headlines, bold copy */
--text-secondary:#3d5066;   /* body copy */
--text-muted:    #7a8fa0;   /* captions, labels, secondary UI */
--border:        rgba(14,35,64,0.08);

/* ── TONE: DARK ────────────────────────────────────────────────── */
--bg-base:       #0D0D0D;   /* NEVER pure #000000 */
--bg-surface:    #141414;   /* one step lighter */
--bg-elevated:   #1C1C1C;   /* two steps lighter — cards, modals */
--bg-inverse:    #F5F3F0;   /* light sections within a dark site */
--text-primary:  #E8E6E3;   /* headlines — NOT pure white */
--text-secondary:#AAAAAA;   /* body copy */
--text-muted:    rgba(255,255,255,0.35); /* captions, labels */
--border:        rgba(255,255,255,0.07);

/* ── TONE: MIXED ───────────────────────────────────────────────── */
/* Use light values as base. Override specific sections: */
/* Hero section: use dark bg-base + dark text tokens */
/* Pull-quote sections: use dark bg-base + dark text tokens */
/* All other sections: light tokens */
```

### Accent System

One accent. Used in exactly 3 places: logo mark, primary CTA button, and one hero element (eyebrow line or divider). Never more.

```css
--accent:       [client hex];                        /* primary accent */
--accent-muted: [client hex at 60% opacity or -20% lightness]; /* secondary uses */
--accent-glow:  [client hex at 12% opacity];         /* ambient background uses */

/* Common presets: */
/* Gold advisory:  --accent: #C9A84C */
/* Cool slate:     --accent: #4A7FA5 */
/* Warm copper:    --accent: #B87333 */
/* Forest:         --accent: #3D6B4F */
/* Deep burgundy:  --accent: #7D2D3A */
```

### Typography Tokens

```css
/* ── TYPE: EDITORIAL-SERIF ─────────────────────────────────────── */
--font-display:  'EB Garamond', Georgia, serif;
--font-body:     'Nunito Sans', system-ui, sans-serif;
--size-display:  clamp(64px, 7vw, 112px);
--size-hero-sub: clamp(18px, 1.8vw, 22px);
--size-h2:       clamp(40px, 4vw, 64px);
--size-h3:       clamp(22px, 2.2vw, 32px);
--size-body:     18px;
--size-small:    14px;
--weight-display: 400;        /* serif at medium weight reads more premium */
--leading-display: 0.95;
--leading-body:  1.72;
--tracking-display: -0.03em;

/* ── TYPE: HYBRID ───────────────────────────────────────────────── */
--font-display:  'EB Garamond', Georgia, serif;
--font-body:     'Inter', system-ui, sans-serif;
--size-display:  clamp(52px, 5.5vw, 88px);
--weight-display: 400;
--leading-display: 1.0;
--tracking-display: -0.025em;

/* ── TYPE: MODERNIST-SANS ───────────────────────────────────────── */
--font-display:  'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;
--font-body:     'DM Sans', system-ui, sans-serif;
--size-display:  clamp(56px, 6vw, 96px);
--weight-display: 300;        /* light weight at large scale reads premium */
--leading-display: 0.92;
--tracking-display: -0.04em;
```

### Spacing Tokens

```css
/* ── DENSITY: EDITORIAL ─────────────────────────────────────────── */
--section-pad:   140px;
--col-gap:       80px;
--card-pad:      48px 44px;
--grid-max:      1280px;      /* never changes */
--radius:        0px;          /* sharp = editorial premium */

/* ── DENSITY: BALANCED ──────────────────────────────────────────── */
--section-pad:   100px;
--col-gap:       40px;
--card-pad:      40px 36px;
--grid-max:      1280px;
--radius:        4px;

/* ── DENSITY: DENSE ─────────────────────────────────────────────── */
--section-pad:   80px;
--col-gap:       24px;
--card-pad:      28px 24px;
--grid-max:      1280px;
--radius:        6px;
```

### Shadow System

3-layer shadows always. Never single box-shadow.

```css
/* ── LIGHT SURFACE CARDS ─────────────────────────────────────────── */
--shadow-card:
  0 1px 3px rgba(14,35,64,0.06),
  0 4px 16px rgba(14,35,64,0.05),
  0 12px 40px rgba(14,35,64,0.04);

--shadow-card-hover:
  0 2px 8px rgba(14,35,64,0.08),
  0 8px 32px rgba(14,35,64,0.07),
  0 24px 64px rgba(14,35,64,0.06);

/* ── DARK SURFACE CARDS ─────────────────────────────────────────── */
--shadow-card:
  inset 0 1px 0 rgba(255,255,255,0.06),  /* inner top glow — the premium tell */
  0 1px 0 rgba(0,0,0,0.4),
  0 4px 16px rgba(0,0,0,0.3);

--shadow-card-hover:
  inset 0 1px 0 rgba(255,255,255,0.10),
  0 2px 0 rgba(0,0,0,0.5),
  0 8px 32px rgba(0,0,0,0.4);
```

### Motion Tokens

```css
/* ── MOTION: RESTRAINED ──────────────────────────────────────────── */
--motion-base:    0.45s;
--motion-ease:    cubic-bezier(0.25, 0.1, 0.25, 1);
--motion-stagger: 80ms;
--motion-enter-y: 16px;        /* small Y travel on reveals */

/* ── MOTION: EXPRESSIVE ──────────────────────────────────────────── */
--motion-base:    0.7s;
--motion-ease:    cubic-bezier(0.16, 1, 0.3, 1);  /* expo out */
--motion-stagger: 50ms;
--motion-enter-y: 24px;

/* ── MOTION: CINEMATIC ───────────────────────────────────────────── */
--motion-base:    0.95s;
--motion-ease:    cubic-bezier(0.16, 1, 0.3, 1);
--motion-stagger: 40ms;
--motion-enter-y: 32px;
```

---

## Design Brief Template

Agent 02.5 outputs this block at the end of `strategy/DESIGN_BRIEF.md`. Agent 04 reads this before writing any CSS.

```
## TOKEN CONFIGURATION

DIALS:
- Tone:             [light | mixed | dark]
- Layout Density:   [editorial | balanced | dense]
- Motion Intensity: [restrained | expressive | cinematic]
- Type Personality: [editorial-serif | hybrid | modernist-sans]
- Visual Language:  [photography | graphic-system | typographic]

CSS OVERRIDES (copy these directly into :root):
--bg-base:          [value]
--bg-surface:       [value]
--bg-elevated:      [value]
--bg-inverse:       [value]
--text-primary:     [value]
--text-secondary:   [value]
--text-muted:       [value]
--border:           [value]
--accent:           [value]
--accent-muted:     [value]
--font-display:     [value]
--font-body:        [value]
--size-display:     [value]
--weight-display:   [value]
--leading-display:  [value]
--tracking-display: [value]
--section-pad:      [value]
--col-gap:          [value]
--radius:           [value]
--motion-base:      [value]
--motion-ease:      [value]
--motion-stagger:   [value]

SECTION PATTERN SELECTIONS:
(see SECTION_PATTERNS.md for pattern options)
- Hero:             [pattern letter + name]
- Pain Validation:  [pattern letter + name]
- ICP Self-Sort:    [pattern letter + name]
- Fit Assessment:   [pattern letter + name]
- Services:         [pattern letter + name]
- Process:          [pattern letter + name]
- Proof:            [pattern letter + name]
- Final CTA:        [pattern letter + name]
- Footer:           [pattern letter + name]

MOTION TIER ACTIVE: [restrained | expressive | cinematic]
(Agent 04 reads MOTION_TIERS.md and implements all animations for this tier)

ACCENT USAGE MAP:
- Place 1: [e.g., logo mark]
- Place 2: [e.g., primary CTA button fill]
- Place 3: [e.g., hero eyebrow line]
```

---

## Dial Combination Examples

These are example configurations — not named archetypes. Real client briefs will land somewhere between these.

**Configuration: "Precision Institution"**
```
Tone: light | Density: editorial | Motion: restrained | Type: editorial-serif | Visual: photography
Feel: Hoare's Bank meets Pictet. Old money. Restraint as signal.
```

**Configuration: "Modern Advisory"**
```
Tone: mixed | Density: balanced | Motion: expressive | Type: hybrid | Visual: graphic-system
Feel: Mercury meets Stash Wealth. Credible but not stuffy. Most advisors live here.
```

**Configuration: "Dark Precision"**
```
Tone: dark | Density: dense | Motion: expressive | Type: modernist-sans | Visual: graphic-system
Feel: Two Sigma meets Stash Wealth. Bloomberg terminal made beautiful. Differentiation play.
```

**Configuration: "Cinematic Authority"**
```
Tone: mixed | Density: balanced | Motion: cinematic | Type: editorial-serif | Visual: photography
Feel: A documentary film about wealth management. Visual storytelling with conversion spine.
```

**Configuration: "Editorial Statement"**
```
Tone: light | Density: editorial | Motion: expressive | Type: editorial-serif | Visual: typographic
Feel: Type IS the image. Luxury magazine aesthetic. For advisors who are also authors/thought leaders.
```
