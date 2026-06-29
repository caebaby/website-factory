# DESIGN.md — Editorial Luxury Template
**Template:** `editorial-luxury`  
**Use for:** Financial advisory, wealth management, law, professional services  
**Aesthetic:** Maritime editorial luxury — the precision of Stripe, the depth of The Atlantic, the authority of a private bank

> This document is the **universal quality floor** for every site built on this template — the craft standard that never changes regardless of tone. The build agent reads this before writing a single line of CSS.
>
> **Tone, color, type, spacing, and motion VALUES come from `DESIGN_TOKENS.md`, not this file.** This template ships in three tones (light / mixed / dark) set by the Tone dial. The cream-navy-gold examples below illustrate the *light* tone — read them as the depth/shadow/anti-slop *principles*, applied with whatever palette the Design Brief specifies. A dark build uses the same 3-layer shadow architecture, shimmer, grain, and anti-slop discipline — just with the dark-surface token values from DESIGN_TOKENS (inner-top-glow shadows, lighter-dark elevation, muted body text).

---

## 1. Visual Theme

**Core identity (light tone example):** Light cream foundation + deep authority navy + single precious accent. The *principle* — one neutral foundation + one authority color + a single restrained accent — holds for every tone. Dark builds invert the foundation (near-black, never pure #000) but keep the single-accent discipline. Never glassmorphism. Never purple gradients. Never more than one accent.

**The feel:** A premium wealth firm's printed annual report — brought to life with restraint, real depth, and editorial precision. Timeless, not trendy. (Light tone evokes a private-bank letterhead; dark tone evokes a Bloomberg terminal made beautiful — same craft, different room.)

**Three reference anchors (steal the principle, not the style):**
- **Stripe** — precision in spacing, surgical shadow stacks, zero wasted pixels
- **The Atlantic** — editorial hierarchy, serif headlines that command attention, white space as a design tool
- **A private bank letterhead** — gold as a "precious metal" accent, not a decorative color

**What this template is NOT:**
- Not SaaS minimal (pure white, Inter, purple CTA)
- Not Bootstrap financial (blue, table layouts, form fields)
- Not AI default (glassmorphism, bento grids, gradient orbs)
- Not cheap-dark (pure #000, neon accents, glow-everywhere) — dark tone is allowed and premium when it follows the dark-surface token rules in DESIGN_TOKENS

---

## 2. Color System

### Token Architecture
Client's `INTAKE.md` provides the actual hex values. Map them to these tokens.

```css
:root {
  /* Primary — the authority color (deep navy, midnight, forest, etc.) */
  --primary:       [client primary hex];
  --primary-light: [client primary +15% lightness];
  --primary-deep:  [client primary -15% lightness];

  /* Accent — the "precious metal" (gold, copper, bronze, etc.) */
  --accent:        [client accent hex];
  --accent-dark:   [client accent ~10% darker — hover state];
  --accent-glow:   [client accent at 35% opacity — shadow tint];
  --accent-wash:   [client accent at 6% opacity — tinted backgrounds];

  /* Secondary — supporting navy/blue (lighter than primary) */
  --secondary:     [client secondary hex];

  /* Neutrals */
  --pigeon:        [client pigeon/muted text hex];
  --robin:         [client light accent/sky hex];

  /* Backgrounds — ALWAYS warm or neutral, never pure white only */
  --bg-base:       [client cream/off-white hex];       /* Primary page background */
  --bg-mid:        [client cream-mid hex];             /* Alternating sections, ~4% darker than base */
  --bg-card:       #FFFFFF;                            /* Card surfaces */

  /* Text */
  --text-primary:  var(--primary);                     /* Headlines */
  --text-body:     var(--secondary);                   /* Body copy */
  --text-muted:    var(--pigeon);                      /* Captions, meta */
  --text-light:    #FFFFFF;                            /* On dark backgrounds */
  --text-light-muted: rgba(255,255,255,.66);           /* On dark, secondary */

  /* Borders */
  --border-light:  rgba([primary-rgb], .12);
  --border-gold:   rgba([accent-rgb], .30);
  --border-dark:   rgba([robin-rgb], .22);             /* On dark backgrounds */
}
```

### Section Background Rules
- **Cream sections:** `background: var(--bg-base)` — always add radial depth (see Section 6)
- **Cream-mid sections:** `background: var(--bg-mid)` — alternates with cream for visual rhythm
- **White sections:** `background: var(--bg-card)` — for high-contrast card-heavy sections
- **Dark sections:** `background: var(--primary)` — hero, authority strips, final CTA — always add radial depth

**Rule:** Never use a flat solid color on any section. Every background gets at least one radial gradient for depth.

---

## 3. Typography

### Font Stack
```css
/* Display / Headline */
font-family: '[Client Display Font]', 'EB Garamond', Georgia, serif;

/* Body / UI */
font-family: '[Client Body Font]', 'Nunito Sans', 'Helvetica Neue', sans-serif;
```

**Default web substitutes (when client has no paid fonts):**
- Display: EB Garamond (Google Fonts) — close to Adobe Garamond Pro
- Body: Nunito Sans (Google Fonts) — close to Proxima Nova

**BANNED fonts:** Inter, Roboto, Arial, system-ui (default), Open Sans, Lato, Poppins, DM Sans

**APPROVED fonts (set per build by the Type dial in DESIGN_TOKENS):** EB Garamond, Canela (display serif) · Nunito Sans, General Sans (humanist body) · Cabinet Grotesk (modernist display) · Switzer (modernist body) · Satoshi, Zodiak (alternates). All free via Google Fonts or Fontshare. The Type dial picks the pairing; this file only enforces that the banned list never appears.

### Type Scale
```css
/* Fluid scale — clamp(min, vw-based, max) */
--t-display: clamp(46px, 6vw, 78px);      /* Hero headline */
--t-h1:      clamp(40px, 5.2vw, 66px);    /* Page h1 */
--t-h2:      clamp(34px, 4.4vw, 50px);    /* Section headlines */
--t-h3:      clamp(22px, 2.4vw, 28px);    /* Card/subsection heads */
--t-h4:      clamp(18px, 1.8vw, 21px);    /* Small heads */
--t-body:    clamp(16px, 1.6vw, 18px);    /* Body paragraphs */
--t-small:   14px;                         /* Captions, meta */
--t-micro:   11px;                         /* Eyebrows, labels */
```

### Weight Usage
- **Display/H1:** 400 (regular) — serifs are beautiful at normal weight
- **H2/H3:** 500 (medium)
- **Body:** 400, key phrases 600
- **Eyebrows/labels:** 700
- **CTAs:** 700

### Eyebrow Pattern
Every section has an eyebrow label above the headline:
```html
<div class="eyebrow">Section Label</div>
```
```css
.eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: .18em;
  text-transform: uppercase; color: var(--accent);
  display: inline-flex; align-items: center; gap: 14px;
}
.eyebrow::after {
  content: ""; display: block; height: 1px; width: 46px;
  background: var(--accent);
  transform: scaleX(0); transform-origin: left;
  transition: transform .6s ease .15s;
}
.reveal.visible .eyebrow::after { transform: scaleX(1); }
```

**Eyebrow rule limit:** Max 1 per section. Never on cards. Never floating without a headline below it.

---

## 4. Component Library

### Cards — The Depth Standard

Every card gets a **3-layer shadow stack**. Single `box-shadow` is the #1 AI tell. It will not be used.

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 6px;
  padding: 34px 32px;
  position: relative;
  overflow: hidden;

  /* ✅ 3-layer shadow stack */
  box-shadow:
    0 1px 2px rgba(var(--primary-rgb), .04),
    0 4px 14px rgba(var(--primary-rgb), .08),
    0 18px 40px rgba(var(--primary-rgb), .09),
    inset 0 1px 0 rgba(255,255,255,.75);

  transition: transform .35s cubic-bezier(.34,1.2,.64,1),
              box-shadow .35s ease;
}

/* Gold shimmer sweep on hover */
.card::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(var(--accent-rgb),.05) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform .55s ease;
  pointer-events: none;
}

/* Gold bottom-edge reveal on hover */
.card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  transform: scaleX(0);
  transition: transform .4s ease;
}

.card:hover {
  transform: translateY(-5px) scale(1.004);
  box-shadow:
    0 2px 4px rgba(var(--primary-rgb), .04),
    0 8px 28px rgba(var(--primary-rgb), .13),
    0 28px 56px rgba(var(--primary-rgb), .11),
    inset 0 1px 0 rgba(255,255,255,.85);
}
.card:hover::before { transform: translateX(100%); }
.card:hover::after  { transform: scaleX(1); }
```

**Card accent variants:**
- `.card-top-accent` — `border-top: 3px solid var(--accent)`
- `.card-left-accent` — `border-left: 3px solid var(--accent)`

### Buttons — Never Just Darken

```css
/* Primary CTA */
.btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 32px; background: var(--accent); color: #fff;
  font-size: 14px; font-weight: 700; letter-spacing: .04em;
  border-radius: 5px; border: none; cursor: pointer;
  position: relative; overflow: hidden;

  box-shadow:
    0 1px 2px rgba(var(--accent-rgb), .15),
    0 4px 16px rgba(var(--accent-rgb), .28);

  transition: transform .22s ease, box-shadow .22s ease;
}

/* Shimmer sweep across button on hover */
.btn-primary::before {
  content: '';
  position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transition: left .42s ease;
  pointer-events: none;
}
.btn-primary:hover::before { left: 100%; }

/* Arrow slides right on hover */
.btn-primary .arrow { transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
.btn-primary:hover .arrow { transform: translateX(5px); }

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(var(--accent-rgb), .18),
    0 8px 32px rgba(var(--accent-rgb), .40);
}

/* Ghost button — dark bg context */
.btn-ghost-dark {
  background: transparent; color: #fff;
  border: 2px solid rgba(255,255,255,.35);
  transition: border-color .22s ease, background .22s ease;
}
.btn-ghost-dark:hover { border-color: #fff; background: rgba(255,255,255,.07); }

/* Ghost button — light bg context */
.btn-ghost-light {
  background: transparent; color: var(--primary);
  border: 2px solid rgba(var(--primary-rgb), .3);
  transition: border-color .22s ease, color .22s ease;
}
.btn-ghost-light:hover { border-color: var(--accent); color: var(--accent); }
```

### Navigation — Frosted Glass on Scroll

```css
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  height: 76px; display: flex; align-items: center;
  background: transparent; border-bottom: 1px solid transparent;
  transition: background .22s ease, box-shadow .22s ease, border-color .22s ease;
}
.nav.scrolled {
  background: rgba(var(--bg-base-rgb), .92);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border-bottom-color: var(--border-light);
  box-shadow:
    0 1px 0 rgba(255,255,255,.8) inset,
    0 4px 24px rgba(var(--primary-rgb), .08);
}

/* Nav links — animated underline from left */
.nav-link {
  position: relative; font-size: 14px; font-weight: 600;
  color: var(--secondary); transition: color .22s ease;
}
.nav-link::after {
  content: ''; position: absolute; left: 0; bottom: -6px;
  height: 1.5px; width: 0; background: var(--accent);
  transition: width .22s ease;
}
.nav-link:hover { color: var(--accent); }
.nav-link:hover::after { width: 100%; }
```

### Input Fields — Inset Depth

```css
input, textarea, select {
  background: rgba(255,255,255,.9);
  border: 1.5px solid var(--border-light);
  box-shadow: inset 0 2px 4px rgba(var(--primary-rgb), .06),
              0 1px 0 rgba(255,255,255,.8);
  transition: box-shadow .22s ease, border-color .22s ease;
}
input:focus, textarea:focus {
  border-color: var(--accent);
  box-shadow: inset 0 2px 4px rgba(var(--primary-rgb), .04),
              0 0 0 3px rgba(var(--accent-rgb), .14),
              0 1px 0 rgba(255,255,255,.8);
  outline: none;
}
```

---

## 5. Layout Principles

```css
/* Layout system */
--maxw:       1180px;   /* Max content width */
--readable:   680px;    /* Max readable text width */
--section-v:  104px;    /* Section vertical padding */
--section-sm: 72px;     /* Compact section vertical padding */
--gap:        26px;     /* Standard grid gap */
--gap-lg:     48px;     /* Large grid gap */
```

**Grid system:**
```css
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--gap); }
```

**Spacing scale (use these, not arbitrary px values):**
- `4px` — micro (icon gaps)
- `8px` — tight (inline elements)
- `14px` — compact (within components)
- `20px` — base (paragraph margins)
- `26px` — standard (grid gaps)
- `40px` — relaxed (between sections' internal blocks)
- `64px` — section internal top/bottom breathing room
- `104px` — section padding (top + bottom)

**Rule:** Sections alternate between `--bg-base` and `--bg-mid`. Never two consecutive sections with the same background.

---

## 6. Depth & Elevation System

This is the section that separates $25k work from AI slop. Every rule here is mandatory.

### Shadow Levels

```css
/* Level 0 — Flat (use ONLY for disabled states) */
box-shadow: none;

/* Level 1 — Raised (interactive elements at rest) */
box-shadow:
  0 1px 2px rgba(var(--primary-rgb), .04),
  0 4px 14px rgba(var(--primary-rgb), .08),
  0 18px 40px rgba(var(--primary-rgb), .09),
  inset 0 1px 0 rgba(255,255,255,.75);

/* Level 2 — Floating (hover states, dropdowns) */
box-shadow:
  0 2px 4px rgba(var(--primary-rgb), .04),
  0 8px 28px rgba(var(--primary-rgb), .13),
  0 28px 56px rgba(var(--primary-rgb), .11),
  inset 0 1px 0 rgba(255,255,255,.85);

/* Level 3 — Elevated (modals, popovers) */
box-shadow:
  0 4px 8px rgba(var(--primary-rgb), .06),
  0 16px 48px rgba(var(--primary-rgb), .16),
  0 48px 80px rgba(var(--primary-rgb), .14),
  inset 0 1px 0 rgba(255,255,255,.9);
```

### Background Depth by Section Type

**Cream section:**
```css
background:
  radial-gradient(ellipse at 15% 85%, rgba(var(--accent-rgb), .04) 0%, transparent 55%),
  radial-gradient(ellipse at 85% 15%, rgba(var(--primary-rgb), .03) 0%, transparent 50%),
  var(--bg-base);
```

**Cream-mid section:**
```css
background:
  radial-gradient(ellipse at 80% 70%, rgba(var(--accent-rgb), .03) 0%, transparent 50%),
  var(--bg-mid);
```

**Dark/Primary section:**
```css
background:
  radial-gradient(ellipse at 20% 50%, rgba(var(--secondary-rgb), .4) 0%, transparent 55%),
  radial-gradient(ellipse at 80% 20%, rgba(var(--accent-rgb), .08) 0%, transparent 40%),
  var(--primary);
```

**Hero section:**
```css
background:
  radial-gradient(ellipse at 25% 60%, rgba(var(--secondary-rgb), .5) 0%, transparent 55%),
  radial-gradient(ellipse at 75% 25%, rgba(var(--pigeon-rgb), .25) 0%, transparent 50%),
  linear-gradient(165deg, var(--primary) 0%, var(--primary-light) 35%, var(--primary) 65%, var(--primary-deep) 100%);
```

### Accent (Gold/Precious Metal) Glow

Apply to all accent-colored buttons and key interactive elements:
```css
/* At rest */
box-shadow:
  0 1px 2px rgba(var(--accent-rgb), .15),
  0 4px 16px rgba(var(--accent-rgb), .28);

/* On hover */
box-shadow:
  0 2px 4px rgba(var(--accent-rgb), .18),
  0 8px 32px rgba(var(--accent-rgb), .40);
```

### Typography Shadows (Dark Backgrounds)

```css
/* Hero/dark section headlines */
.on-dark h1, .on-dark h2 {
  text-shadow: 0 2px 12px rgba(0,0,0,.25);
}

/* Accent-colored eyebrow on dark */
.on-dark .eyebrow {
  text-shadow: 0 0 20px rgba(var(--accent-rgb), .35);
}
```

---

## 7. Do's & Don'ts (Anti-Slop Rules)

### BANNED — Immediate disqualifiers (0 tolerance)

| Pattern | Why banned |
|---------|-----------|
| `font-family: Inter, Arial, Roboto, system-ui` | Default AI fonts. Obvious immediately. |
| Purple gradients on white | #1 AI tell across all models |
| Glassmorphism (`backdrop-filter` on feature cards) | 2022 trend, now a tell |
| Bento grid layouts | AI default for "modern" layouts |
| Eyebrow pills (`border-radius: 20px` badge above headline) | Over-used AI pattern |
| `box-shadow: 0 4px 6px rgba(0,0,0,.1)` — single flat shadow | The AI default shadow |
| Gradient orbs / blob backgrounds as decorative elements | AI default "creative" background |
| Generic icon-in-circle feature cards (3-column, center-aligned) | Default SaaS AI layout |
| `transition: all .3s ease` | Lazy catch-all — always name specific properties |
| Emojis used as UI icons | Never |
| `border-radius: 12px` on everything | Vary it: cards 6px, buttons 5px, pills 20px |
| Purple `#6366f1` or similar as accent color | The default AI accent |

### COUNT LIMITS per page (from looks-expensive research)

| Element | Max allowed |
|---------|------------|
| Eyebrow pill subheadings (rounded badge) | 1 — target: 0 |
| Bullet lists | ≤ 5 total per page |
| Identical card chrome sections | ≤ 2 |
| Bento grids | 0 |
| Gradient orb backgrounds | 0 |

### REQUIRED on every site

- [ ] 3-layer shadow stack on every elevated card (never single shadow)
- [ ] Shimmer sweep pseudo-element on primary CTA button
- [ ] Background radial gradient depth on every section (never flat color)
- [ ] Arrow icon animated on button hover (translateX spring)
- [ ] Nav blur/glass effect on scroll
- [ ] Gold accent line animation on eyebrows (scaleX reveal)
- [ ] Grain overlay at low opacity for analog texture
- [ ] Custom text-selection color (`::selection`)
- [ ] Hover states that use `transform` + shadow, not just color change

---

## 8. Responsive Behavior

```css
/* Breakpoints */
--bp-mobile:  480px;
--bp-tablet:  768px;
--bp-laptop:  1024px;
--bp-desktop: 1280px;

@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  --section-v: 80px;
}

@media (max-width: 768px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
  .grid-4 { grid-template-columns: 1fr; }
  --section-v: 64px;
  /* Nav collapses to hamburger → full-screen overlay menu */
  /* Process steps stack vertically (remove horizontal connector) */
  /* About split stacks (photo above bio) */
  /* Stats strip: 1 column */
}

@media (max-width: 480px) {
  --section-v: 52px;
  .btn-primary { width: 100%; justify-content: center; }
}
```

**Mobile-first rules:**
- Touch targets: minimum 44×44px
- Body text: minimum 16px on mobile (never smaller)
- No horizontal scroll at any breakpoint
- Test at 375px (iPhone SE), 390px (iPhone 15), 768px (iPad), 1440px (desktop)

---

## 9. Agent Prompt Guidance

### For Agent 04 (Build)

**Read this document for the quality floor; read DESIGN_TOKENS + the brief for the values.** Your job is to execute both precisely.

**Startup sequence:**
1. Read this DESIGN.md completely (universal quality floor)
2. Read `SECTION_MANIFEST.md` (which sections exist + order)
3. Read `DESIGN_TOKENS.md` (tone/color/type/spacing/motion token definitions)
4. Read `SECTION_PATTERNS.md` (the layout chosen per section)
5. Read `MOTION_TIERS.md` (the animation tier to implement)
6. Read `DESIGN_FUNDAMENTALS.md` (hierarchy/type/color/spacing/a11y physics)
7. Read `PAGE_SYSTEM.md` (inner-page architecture, for non-homepage pages)
8. Read `strategy/DESIGN_BRIEF.md` — the dial values + pattern picks + motion tier + signature moment for THIS client
9. Read `projects/[slug]/DESIGN.md` for client-specific overrides (colors, fonts, logo)
10. Read `copy/COPY_ALL.md` for all page content, `projects/[slug]/SITEMAP.md` for page list

**Libraries (single-file builds, CDN allowed):** GSAP 3.13.0 + ScrollTrigger are the motion engine — load via CDN `<script>`. SplitText, DrawSVG, ScrollSmoother are now free. Lenis 1.3.25 for smooth scroll. These are the ONLY permitted external scripts; everything else is hand-written. (This supersedes any "vanilla JS only" language — IntersectionObserver is fine for simple reveals but the MOTION_TIERS animations require GSAP.) Implement exactly the tier named in the brief: Tier 1 always, Tier 2 if `expressive`, Tier 3 if `cinematic`. All motion must respect `prefers-reduced-motion`.

**The non-negotiables:**
- 3-layer shadow stacks on ALL cards. No exceptions.
- Shimmer pseudo-element on the primary CTA button on EVERY page
- Background radial gradient on EVERY section background
- Frosted glass nav on scroll
- Grain overlay on every page (`position: fixed; inset: 0; z-index: 9999; opacity: .035`)

**Self-check before output (run through this list):**
- [ ] Does any card use a single `box-shadow`? Fix it.
- [ ] Does any button hover just change background color? Fix it.
- [ ] Does any section have a flat solid background? Add radial depth.
- [ ] Are any banned fonts (Inter, Arial, Roboto) present? Replace them.
- [ ] Are there any eyebrow pills? Remove them.
- [ ] Is there a bento grid? Remove it.
- [ ] Does the nav blur/glass on scroll? It must.
- [ ] Does the primary CTA shimmer on hover? It must.
- [ ] Is grain overlay present? It must be.

**For placeholder content:**
- Every `[PLACEHOLDER: ...]` text gets a `<!-- PLACEHOLDER -->` HTML comment AND a visible yellow/amber `<mark>` or notice box so placeholders are impossible to miss during review
- Never invent stats, credentials, testimonials, or specific claims
- Mark compliance disclaimers as `<!-- COMPLIANCE: Required before launch -->`

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-25 | Initial template DESIGN.md — built from AWP Phase 1 learnings + anti-slop research |
