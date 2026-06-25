# DESIGN.md — Anchor Wealth Planning (Client Overrides)
**Template:** `editorial-luxury`  
**Client:** Alex Miller / Anchor Wealth Planning  
**Location:** Houston, TX  
**Last updated:** 2026-06-25

> This file overrides the template DESIGN.md with AWP-specific values.
> Build agent reads the template DESIGN.md first, then applies these overrides.

---

## Color Tokens → AWP Values

```css
:root {
  /* Primary — Midnight navy */
  --primary:         #1e395a;
  --primary-light:   #2d5474;
  --primary-deep:    #0f2038;
  --primary-rgb:     30, 57, 90;

  /* Accent — Burnished Gold */
  --accent:          #b18f4d;
  --accent-dark:     #9a7a3e;
  --accent-glow:     rgba(177,143,77,.35);
  --accent-wash:     rgba(177,143,77,.06);
  --accent-rgb:      177, 143, 77;

  /* Secondary — Steel blue */
  --secondary:       #3d5a75;
  --secondary-rgb:   61, 90, 117;

  /* Neutrals */
  --pigeon:          #748ba0;
  --pigeon-rgb:      116, 139, 160;
  --robin:           #c0d8e9;
  --robin-rgb:       192, 216, 233;

  /* Backgrounds */
  --bg-base:         #F5F0E6;   /* Warm cream/parchment */
  --bg-base-rgb:     245, 240, 230;
  --bg-mid:          #EDE8DA;   /* Deeper cream */
  --bg-card:         #FFFFFF;

  /* Text */
  --text-primary:    #1e395a;
  --text-body:       #3d5a75;
  --text-muted:      #748ba0;
  --text-light:      #FFFFFF;
  --text-light-muted: rgba(255,255,255,.66);

  /* Borders */
  --border-light:    rgba(30,57,90,.12);
  --border-gold:     rgba(177,143,77,.30);
  --border-dark:     rgba(192,216,233,.22);
}
```

---

## Typography — AWP

**Display (paid):** Adobe Garamond Pro  
**Body (paid):** Proxima Nova  
**Web substitutes (Phase 1):** EB Garamond + Nunito Sans

```html
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Nunito+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

```css
--font-display: 'EB Garamond', Georgia, serif;
--font-body:    'Nunito Sans', 'Helvetica Neue', sans-serif;
```

**Phase 2 note:** Swap to Adobe Garamond Pro + Proxima Nova when Alex provides licensed font files.

---

## Brand Identity

**Practice name:** Anchor Wealth Planning  
**Short name:** AWP  
**Advisor:** Alex Miller  
**Tagline:** "Charting the course towards your financial legacy."  
**Location:** Houston, TX  
**Background:** Merrill Lynch, 10+ years

**Logo system:**
- Mark: Gold square (#b18f4d) + white anchor silhouette + pigeon wave at bottom
- Wordmark: "Anchor" in display serif (Midnight on light, white on dark) + "WEALTH PLANNING" in micro-spaced caps below
- Phase 1: SVG recreation (see logo SVG spec in Agent 04 build notes)
- Phase 2: Swap for supplied logo files from Alex

**Voice:** Authoritative but approachable. Maritime metaphors used sparingly. Never corporate-speak.

---

## AWP-Specific Design Notes

**Water/ocean photography:** The brand guide cover uses deep water photography. Hero section should evoke this — deep navy gradient with subtle wave patterns. When real photography is provided (Phase 2), it goes here as a background with a midnight overlay (~55% opacity).

**Gold treatment:** Gold is used as a "precious metal" — sparingly and precisely. CTAs, eyebrows, accent lines, hover reveals. Never as a background fill. Never on body text.

**Cream sections:** AWP's cream is warm parchment, not cool white. Radial gold glow depth reinforces the warmth.

**Section sequence on homepage:** NAV → Hero → Ticker → Trust Bar → Pain → ICP Self-Sort → Fit Assessment → Services → Process → About Alex → Testimonials → Final CTA → Footer

---

## ICP Reference

**Primary ICPs (three):**
1. Oil & Gas Executives — equity comp, deferred income, commodity exposure, Permian Basin context
2. Business Owners — exit planning, closely-held business, liquidity event planning
3. High-Net-Worth Families — multi-generational, estate/trust complexity, coordinated advisory team

**Pain points (real language for copy + ticker):**
- Tax coordination: "My CPA and my advisor never talk"
- Advisor fit: "I don't think my advisor specializes in situations like mine"
- Equity complexity: "My RSUs and bonus feel like a tax trap every year"
- Legacy gap: "I have real wealth but no plan for what comes after me"
- Coordination: "No one is looking at my full picture"
