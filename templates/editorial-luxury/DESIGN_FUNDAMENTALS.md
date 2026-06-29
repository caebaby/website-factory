# Design Fundamentals
## LLM-Agnostic Reference — editorial-luxury template

Every build agent reads this before writing any CSS, choosing any layout, or sizing any type. These are not preferences — they are constraints derived from what separates premium from cheap at the implementation level.

**Research basis:** 6-agent parallel study of visual hierarchy, typography systems, color theory, spatial rhythm, accessibility standards, and inner page architecture. Cross-referenced against Stripe, Linear, Pictet, Hoare's Bank, Two Sigma, Stash Wealth, Aspiriant, Bridgewater, Abacus Wealth, Facet, Apple, Vercel, Notion, and McKinsey.

---

## PART 1 — Visual Hierarchy & Gestalt

### The One Rule Above All Others

**Every page section has exactly one dominant element.** If you can't name the single dominant element before writing the section, stop and define it. If two elements compete equally, one is wrong.

### Size Is the Strongest Hierarchy Signal

| Level | Minimum Ratio to Next Level | Example at 1.333 Scale |
|-------|---------------------------|------------------------|
| Body → H3 | 1.25× minimum | 16px → 20px |
| H3 → H2 | 1.25× minimum | 20px → 28px |
| H2 → H1 | 1.25× minimum | 28px → 40px |
| H1 → Hero | 1.5× minimum | 40px → 64px |

Premium sites use 4:1–6:1 ratio between hero headline and body (72–96px vs 16–18px). When all headings are within 4–8px of each other, the page has no entry point.

### Three-Level Hierarchy Per Section (Non-Negotiable)

Every section has exactly three visual levels:
1. **Dominant** — the one thing that must register first
2. **Supporting** — context that qualifies the dominant element
3. **Tertiary** — details for committed readers

Never use size AND weight AND color simultaneously to enforce one level. Pick two levers maximum per element.

### 60/30/10 Color Rule

- **60%** — dominant neutral (off-white, charcoal, near-black)
- **30%** — supporting tone (light grey, warm stone, deep navy)
- **10%** — accent (CTAs and critical focal points ONLY)

If the accent color appears anywhere beyond CTAs and one hero element per section, it has been diluted.

### Z-Pattern Layout for Landing Pages

Top-left → brand/logo  
Top-right → primary nav CTA (high contrast)  
Diagonal midpoint → hero claim  
Bottom-right → hero CTA  

Below the fold: alternate left-aligned claims with right-aligned proof elements (or vice versa) per section pair.

### Gestalt Proximity Rules

- Elements within **8–16px** of each other = perceived as grouped
- Elements separated by **48px+** = perceived as distinct sections
- Headline + subhead + CTA = one unit — cluster within 24–32px
- CTA must never drift more than 48px from the claim it follows

### Gestalt Similarity Rules

Repeating elements serving the same function must look identical: same border-radius, same padding, same type treatment. Elements serving different functions must look different. No exceptions.

### Contrast Ratios

| Element | Minimum Ratio | Premium Target |
|---------|--------------|----------------|
| Body text (≥16px) | 4.5:1 (WCAG AA) | 7:1–12:1 |
| Headlines | 7:1 | 12:1+ |
| Primary CTA text on fill | 4.5:1 | — |
| UI chrome (borders, icons) | 3:1 | — |

Use **#1A1A1A** (not #000000) for dark text on white — pure black reads as harsh. Use **#111111** at minimum for body text on light backgrounds. Never use medium grey (#555555) for body — it fails WCAG at 16px.

### Whitespace Is Structure

Section padding communicates importance:
- Hero: 160px top/bottom — "this moment matters"
- Content sections: 96px — "continue reading"
- CTA sections: 120px — "decision point"
- Same padding on every section = no hierarchy

The cheapest spacing tell: section padding under 48px on desktop. Premium minimum is 80px. Under 80px, add documentation justifying why.

---

## PART 2 — Typography System

### Scale Selection

**Default for premium service sites: 1.333 (Perfect Fourth) ratio, 16px base.**

Valid sizes (rounded to nearest 4px):
```
12px  — captions, labels (XS)
16px  — body copy
20px  — lead / intro text
32px  — H3 / section subheads
48px  — H2 / page-level headings
72px  — Display / hero statement
```

Maximum 6 distinct type sizes. If you need a 7th size, use weight or color — not a new size. The more sizes on a page, the cheaper it reads.

### Line-Height by Size

| Size Range | Line-Height | Rationale |
|-----------|-------------|-----------|
| 12px labels | 1.2–1.3 | Functional, not read |
| 16px body | 1.5–1.6 | Screen readability |
| 20px lead | 1.4–1.5 | Large body, readable |
| 32px subheads | 1.25–1.35 | Heading territory |
| 48px section heads | 1.1–1.2 | Display scale |
| 72px display | **0.95–1.05** | Optically correct — NOT 1.5 |

Always use unitless multipliers in CSS (`line-height: 1.5`), never px. At 72px+, if line-height exceeds 1.1, the gap between lines looks architectural — wrong.

### Letter-Spacing by Size

| Size | Letter-Spacing |
|------|---------------|
| 12px all-caps labels | +0.08em to +0.12em |
| 16px body | 0 |
| 20px lead | 0 to -0.01em |
| 32px subheads | -0.02em |
| 48px section heads | -0.025em |
| 72px display | **-0.03em to -0.04em** |

Applying 0 letter-spacing at display sizes looks open and sloppy. Applying positive tracking to all-caps at body sizes makes text illegible. These are separate errors; both are common.

### Line Length (Max-Width)

| Level | Constraint | Unit |
|-------|-----------|------|
| Hero/display | 12em | em (scales with type) |
| Section headings | 16em | em |
| Lead/intro text | 65ch | ch (character count) |
| Body text | **65ch** | ch — 66ch is optimal |
| Captions | 55ch | ch |

Never use percentage widths for type containers. `65ch` and `12em` respond to the typeface; `60%` responds to the viewport and produces unreadable lines on wide monitors.

### Weight Rules

- Use **size** to signal level changes (different hierarchy levels)
- Use **weight** to signal importance within the same level
- Never increase both size AND weight simultaneously — pick one
- **Exception:** Display type can be large AND heavy, but only for one isolated statement
- Light weights (300) are acceptable at 40px+ only — below 24px, minimum 400

**Stripe's weight-300 display** is deliberate counter-convention. Most premium advisory sites use weight 400–500 at display. Weight 700–900 at display = aggressive, not authoritative.

### Font Pairing Logic

**Sans-only (modern, safest):** One variable-weight sans, minimum 300–700 range.
- Options: Inter, DM Sans, IBM Plex Sans, Neue Haas Grotesk
- Weights: 400 body, 500–600 subheads, 400 or 700 display

**Serif + sans (editorial luxury):** Serif for display (40px+) only, sans for all body and UI.
- Display options: EB Garamond, Canela, GT Alpina, Freight Display, Domaine
- Never use a serif below 32px in a paired system

**What makes pairings clash:** two display-personality faces, two faces with similar x-heights but different personality, superfamilies presented as a pairing.

### Mobile Type Scale

Step down every size one level at mobile (≤768px):
- 72px hero → 48px
- 48px section head → 32px
- 32px subhead → 24px
- Body stays 16px

Use `clamp()` for fluid scaling: `font-size: clamp(48px, 8vw, 72px)`.

---

## PART 3 — Color System

### Total Colors: 6–7 Maximum

1. Neutral scale — 5 stops (dark to light)
2. Brand color — 1 hue, used on interactive elements only
3. Accent — 1 warm/earth tone, 5–10% screen coverage maximum

Everything else is a surface or border drawn from the neutral scale.

### Neutral Scale

**Light mode:**
```
#0D0D0D — true dark (text, primary)
#1A1A1A — dark surface
#F7F4EF — warm cream base (NOT pure white)
#FFFFFF — reserved for cards on cream base
```

**Dark mode — use HSL lightness steps, never invert:**
```
L: 8–10%  — base background
L: 13–15% — surface
L: 18–20% — elevated (cards, modals)
L: 24–26% — overlay
L: 30–32% — tooltip
```
Maximum 6% jump between adjacent stops. More than 6% = visible banding.

**Dark mode text opacity:**
```
rgba(255,255,255,0.87)  — primary text
rgba(255,255,255,0.60)  — secondary text
rgba(255,255,255,0.38)  — disabled
```
Pure white body text on dark = harsh. This is the dark mode version of the pure-black body error.

### Brand Color Rules

- Choose from a hue **NOT between 200–280 degrees** (that range is indigo/teal/sky/purple — the AI default zone)
- Saturate to 45–60% HSL maximum (above 65% reads as startup, not premium)
- Use exclusively on: primary CTA buttons, active/selected states, body copy links, one brand accent element per page

**Recommended starting hues for financial services:**
- 25–45° — amber/gold
- 140–165° — forest green
- 350–15° — deep burgundy/brick

**Common presets:**
```css
--accent: #C9A84C;  /* warm gold */
--accent: #B87333;  /* copper */
--accent: #3D6B4F;  /* forest */
--accent: #7D2D3A;  /* deep burgundy */
--accent: #4A7FA5;  /* cool slate */
```

### The AI Fingerprint Test (Run Before Shipping)

1. Is any color between 200–280° on the color wheel? Replace it.
2. Is the background pure white (#FFFFFF) or pure black (#000000)? Replace it.
3. Are there more than 3 non-neutral colors defined? Reduce to 2 maximum.
4. Does any gradient span more than 15° of hue shift? Flatten it.

### Token Naming Convention

Name by role, never by color value:
```css
--color-bg-base
--color-bg-surface
--color-bg-elevated
--color-bg-overlay
--color-text-primary
--color-text-secondary
--color-text-disabled
--color-action-primary
--color-action-primary-hover
--color-accent
--color-status-error
--color-status-success
--color-status-warning
```
18 tokens maximum. This enables dark/light switching at the token level without touching components.

### Color Anti-Patterns

| Pattern | Problem |
|---------|---------|
| Tailwind defaults (indigo-500, gray-100, white) | Statistical average of AI-generated interfaces |
| Gradient > 2 stops in hero background | Immediate AI tell |
| All colors 60–70% saturated | Looks like a toy |
| Alternating section backgrounds | Template-site rhythm signal |
| Pure #000000 + #FFFFFF together | Default browser styling appearance |
| More than 2 accent colors | Decoration problem misdiagnosed as hierarchy |
| Oversaturated status colors (red S:100%) | Panic design, not premium |
| Perfectly neutral grey backgrounds | Cold and clinical — add 2–5° warm bias |

---

## PART 4 — Spacing System

### Base Unit: 8px (Non-Negotiable)

```css
--space-1:  4px;   /* sub-grid: icon-text gaps, tight component internals */
--space-2:  8px;   /* tight inline spacing */
--space-3:  12px;  /* dense component internals */
--space-4:  16px;  /* button padding, form field internals, card minimum */
--space-6:  24px;  /* standard card padding, nav item spacing */
--space-8:  32px;  /* grouped content blocks, between form sections */
--space-12: 48px;  /* subsection breaks, desktop heading margins */
--space-16: 64px;  /* between major content areas */
--space-20: 80px;  /* minimum section padding on desktop */
--space-24: 96px;  /* standard content section padding */
--space-32: 128px; /* hero section area */
--space-40: 160px; /* hero section padding on desktop */
```

Any spacing value not in this list requires a named exception token. `13px`, `17px`, `22px`, `27px` are errors — not design decisions.

### Section Padding by Type

| Section Type | Desktop | Tablet | Mobile |
|-------------|---------|--------|--------|
| Hero | 160px | 96px | 64px |
| Content | 96px | 64px | 48px |
| CTA | 120px | 80px | 48px |
| Footer entry | 80px | 64px | 48px |

Equal padding on all sections = no page hierarchy. The variation between 160px (hero), 96px (content), and 120px (CTA) IS doing the hierarchy work.

### Grid Specs

| Viewport | Columns | Gutters | Page Margins | Content Width |
|----------|---------|---------|-------------|--------------|
| 1440px+ | 12 | 24px | 80px | 1120px |
| 1280px | 12 | 24px | 80px | 960px |
| 768–1024px | 8 | 16px | 32px | — |
| 320–767px | 4 | 16px | 16–24px | — |

Max-width: 1280px. Never changes.

### Component Specs

**Cards:**
```
padding:           24px (standard) or 32px (premium)
title → body gap:  8px
body → CTA gap:    16px
between cards:     24–32px
```

**Buttons (primary):**
```
desktop:    padding 16px 32px, min-height 48px
mobile:     padding 14px 28px, min-height 44px
icon + label gap: 8px
margin-top from preceding content: 24–32px
```

**Forms:**
```
label → input gap:  8px
input height:       48px desktop, 44px mobile
input padding:      12px 16px
between fields:     24px
between field groups: 40px
submit button margin-top: 32px
```

### Internal ≤ External Rule

Card internal padding must never exceed the gap between cards. If card has 32px padding but only 16px between cards, the cards appear to float away from each other. Internal padding ≤ external gap, always.

### Breathing Room Floors

| Gap Type | Minimum |
|----------|---------|
| Between any two distinct elements | 16px |
| Between content groups within a section | 32px |
| Between major page sections | 64px |

Below these thresholds: document the exception or change it to the floor value.

### Responsive Scaling Ratios

- Desktop → Tablet: reduce section padding ~40%
- Tablet → Mobile: reduce ~35%
- Component padding (cards, buttons): fixed breakpoint steps, NOT fluid scaling
- Page margins: fixed steps, not percentage

```css
/* Fluid section padding with clamp: */
hero:    padding: clamp(64px, 11.1vw, 160px) 0;
content: padding: clamp(48px, 6.7vw, 96px) 0;
```

---

## PART 5 — Accessibility & Performance Standards

### WCAG Targets

- **Floor:** WCAG AA everywhere
- **Target:** WCAG AAA for premium builds
- The gap between AA and AAA is small to implement, large in quality signal

### Focus States

Never `outline: none` without a replacement. Browser defaults are inconsistent. Use this custom ring:

```css
/* Universal premium focus ring */
:focus-visible {
  outline: 3px solid var(--color-action-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 2px white; /* inner ring for visibility on any bg */
}

/* Black/white universal fallback (works on any background) */
:focus-visible {
  outline: 3px solid black;
  box-shadow: 0 0 0 6px white;
}
```

Use `:focus-visible`, NOT `:focus` — this prevents focus rings on mouse clicks while preserving them for keyboard navigation.

### Touch Targets

- WCAG 2.2 AA minimum: 24×24px, or 24px spacing from adjacent targets
- WCAG 2.2 AAA (recommended): **44×44px minimum** for all interactive elements
- The implementation gap between AA and AAA is negligible

### Motion (prefers-reduced-motion)

**Write CSS without animation first. Add animation inside the `no-preference` query:**

```css
/* CORRECT: no-motion-first */
@media (prefers-reduced-motion: no-preference) {
  .animated { animation: slideIn 0.3s ease; }
}

/* WRONG: reduction as afterthought */
@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; }
}
```

Remove under reduced-motion: parallax, large translate/scale, auto-playing carousels, scroll-triggered motion, zoom effects.

Keep under reduced-motion: opacity fades, color transitions, short state-change micro-interactions.

Use `transition-duration: 0.01ms` (not `0`) to preserve `transitionend` events for JS logic.

### Font Loading

Self-host fonts. Google Fonts CDN adds median +180ms to LCP.

```html
<!-- Preload max 2 critical fonts -->
<link rel="preload" as="font" href="/fonts/display.woff2" type="font/woff2" crossorigin>
```

`crossorigin` is required even for same-origin — without it, the browser downloads the font twice.

```css
@font-face {
  font-family: 'DisplayFont';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;        /* for heading/brand fonts */
}
/* Use font-display: optional for body text */
```

**Metric-matched fallback (eliminates CLS on font swap):**
```css
@font-face {
  font-family: 'DisplayFontFallback';
  src: local('Georgia');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 20%;
}
```

Variable fonts: switch from N static files to 1 file. Subset to Latin/Latin Extended — shipping unused character sets wastes hundreds of KB.

### Image Loading

LCP hero image (CRITICAL — never lazy load the LCP):
```html
<img src="hero.avif" fetchpriority="high" loading="eager"
     width="1200" height="600" alt="..." decoding="async">
```

Below-fold images: `loading="lazy"`.

Format priority: AVIF (~50% smaller than JPEG) > WebP (~30% smaller) > JPEG. Always set explicit width and height — prevents CLS.

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|--------|------|------------------|------|
| LCP | ≤2.5s | 2.5–4s | >4s |
| INP | ≤200ms | 200–500ms | >500ms |
| CLS | ≤0.1 | 0.1–0.25 | >0.25 |

All three must pass simultaneously. Measured at 75th percentile of real users on mobile and desktop. LCP is the hardest (only 68.3% of origins pass as of Jan 2026).

### Forms (Accessibility)

```html
<!-- Every input needs a VISIBLE label with matching for/id -->
<label for="email">Email address</label>
<input id="email" type="email" autocomplete="email" aria-required="true">

<!-- Error state -->
<input aria-invalid="true" aria-describedby="email-error">
<span id="email-error">Enter a valid email address.</span>
```

Placeholder text is not a label. Input borders need 3:1 contrast against surrounding background. Required fields: use text or `aria-required`, never color alone.

### Keyboard Navigation

- All interactive elements reachable by Tab in logical (DOM) order
- Focus never trapped except inside modals (where it must be trapped until closed)
- Skip-to-main-content link as the first focusable element:
  ```html
  <a href="#main" class="skip-link">Skip to main content</a>
  ```
- Focus must not be obscured by sticky headers (WCAG 2.2 SC 2.4.11)

### Alt Text Rules

| Image Type | Alt Text |
|-----------|---------|
| Meaningful/informational | Descriptive text |
| Decorative | `alt=""` (empty string, NOT omitted) |
| Image containing text | Alt must include that text |
| Icon button with no visible text | `aria-label` on the button |

---

## Agent Build Checklist

Run this before marking any build complete.

### Typography
- [ ] Maximum 6 distinct font sizes on the page
- [ ] No body or lead text wider than 70 characters (65ch container)
- [ ] Hero headline letter-spacing is negative (−0.03em or tighter)
- [ ] No all-caps text without positive letter-spacing (+0.08em minimum)
- [ ] No light weight (300) text below 24px
- [ ] All vertical spacing values on the 8px grid

### Color
- [ ] Background is NOT pure #000000 or pure #FFFFFF
- [ ] Accent color appears in ≤3 locations total
- [ ] No gradient text (gradient on text = immediate AI tell)
- [ ] Dark mode uses lighter backgrounds for elevation, NOT drop shadows
- [ ] All hues cleared the AI fingerprint test (no 200–280° range)

### Spacing
- [ ] Section padding follows the type table (hero/content/CTA/footer-entry)
- [ ] No spacing values off the 8px scale without a named exception token
- [ ] Internal card padding ≤ gap between cards
- [ ] All buttons meet minimum 44×44px touch targets

### Hierarchy
- [ ] Every section has exactly one dominant element (named before coding)
- [ ] Three-level hierarchy enforced per section (dominant/supporting/tertiary)
- [ ] Only one primary CTA per viewport section
- [ ] Accent color on primary CTAs only (not section headers, icons, borders)
- [ ] Sections alternate visual weight (no two adjacent at same density)

### Performance & Accessibility
- [ ] LCP image has `fetchpriority="high"` and NOT `loading="lazy"`
- [ ] All meaningful images have descriptive alt text; decorative images have `alt=""`
- [ ] All form inputs have visible `<label>` elements (not just placeholders)
- [ ] `prefers-reduced-motion: no-preference` pattern used (not reduce)
- [ ] Custom focus rings on all interactive elements (not `outline: none`)
- [ ] Fonts are self-hosted with `font-display: swap` and metric-matched fallbacks
- [ ] Skip-to-main-content link is first focusable element
