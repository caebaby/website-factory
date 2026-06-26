# AWP Homepage Build Prompt
**Self-contained — paste directly into any model to build the homepage.**  
**Client:** Anchor Wealth Planning (Alex Miller, Houston TX)  
**Last updated:** 2026-06-25

---

Build a single-file HTML homepage for Anchor Wealth Planning (AWP), 
a fiduciary wealth management firm in Houston, TX founded by 
Alex Miller (formerly Merrill Lynch, 10+ years).

---

## BRAND

**Colors (use CSS custom properties — never hardcode hex):**
```
--primary: #1e395a       (midnight navy)
--primary-light: #2d5474
--primary-deep: #0f2038
--accent: #b18f4d        (burnished gold)
--accent-dark: #9a7a3e
--secondary: #3d5a75     (steel blue)
--pigeon: #748ba0        (muted text)
--robin: #c0d8e9         (light sky)
--bg-base: #F5F0E6       (warm cream/parchment)
--bg-mid: #EDE8DA        (slightly deeper cream)
--bg-card: #FFFFFF

RGB variants for rgba() usage:
--primary-rgb: 30, 57, 90
--accent-rgb: 177, 143, 77
--secondary-rgb: 61, 90, 117
```

**Fonts:**
Google Fonts import: EB Garamond (display/headlines, weights 400 500 600 700, 
include italic) + Nunito Sans (body/UI, weights 300 400 500 600 700 800)

```
--font-display: 'EB Garamond', Georgia, serif
--font-body: 'Nunito Sans', 'Helvetica Neue', sans-serif
```

**Logo:** Text-based for now. Gold square mark (#b18f4d) containing a white 
anchor SVG icon. Wordmark: "Anchor" in EB Garamond next to mark, 
"WEALTH PLANNING" in micro-spaced caps below.

**Tagline:** "Charting the course towards your financial legacy."

---

## VISUAL QUALITY REQUIREMENTS (non-negotiable)

### Shadow System — 3 layers on every card
Never use a single flat box-shadow. Always use this stack:

Rest state:
```css
box-shadow:
  0 1px 2px rgba(var(--primary-rgb), .04),
  0 4px 14px rgba(var(--primary-rgb), .08),
  0 18px 40px rgba(var(--primary-rgb), .09),
  inset 0 1px 0 rgba(255,255,255,.75);
```

Hover state:
```css
box-shadow:
  0 2px 4px rgba(var(--primary-rgb), .04),
  0 8px 28px rgba(var(--primary-rgb), .13),
  0 28px 56px rgba(var(--primary-rgb), .11),
  inset 0 1px 0 rgba(255,255,255,.85);
```

### Button — shimmer sweep on hover
Primary CTA button must have a ::before pseudo-element that sweeps a white 
light gradient across the button left-to-right on hover:

```css
.btn-primary::before {
  content: '';
  position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
  transition: left .42s ease;
}
.btn-primary:hover::before { left: 100%; }
```

Arrow icon inside button must translateX(5px) on hover with spring easing:
`transition: transform .25s cubic-bezier(.34,1.56,.64,1)`

### Section Backgrounds — never flat color
Every section must have at least one radial gradient for depth:

```css
/* Cream sections */
background:
  radial-gradient(ellipse at 15% 85%, rgba(177,143,77,.04) 0%, transparent 55%),
  radial-gradient(ellipse at 85% 15%, rgba(30,57,90,.03) 0%, transparent 50%),
  #F5F0E6;

/* Cream-mid sections */
background:
  radial-gradient(ellipse at 80% 70%, rgba(177,143,77,.03) 0%, transparent 50%),
  #EDE8DA;

/* Dark/navy sections */
background:
  radial-gradient(ellipse at 20% 50%, rgba(61,90,117,.4) 0%, transparent 55%),
  radial-gradient(ellipse at 80% 20%, rgba(177,143,77,.08) 0%, transparent 40%),
  #1e395a;

/* Hero */
background:
  radial-gradient(ellipse at 25% 60%, rgba(61,90,117,.5) 0%, transparent 55%),
  radial-gradient(ellipse at 75% 25%, rgba(116,139,160,.25) 0%, transparent 50%),
  linear-gradient(165deg, #1e395a 0%, #2d5474 35%, #1e395a 65%, #0f2038 100%);
```

### Navigation — frosted glass on scroll
Nav starts transparent. On scroll > 48px:
```css
background: rgba(245,240,230,.93);
backdrop-filter: blur(16px) saturate(1.4);
box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 4px 24px rgba(30,57,90,.08);
```

### Grain Overlay
`body::before` fixed position, z-index 9999, opacity .035, mix-blend-mode multiply,
SVG noise texture via data URI, pointer-events none.

### Card Hover
Cards must use `transform: translateY(-5px) scale(1.004)` on hover — NOT just 
color change. Also add a gold bottom-edge reveal via ::after:
position absolute, bottom 0, full width, height 2px, 
`linear-gradient(90deg, transparent, var(--accent), transparent)`,
scaleX(0) at rest → scaleX(1) on hover.

### Card shimmer on hover
Cards must also have a ::before that sweeps a gold shimmer 
`(rgba(177,143,77,.05))` diagonally across on hover.

### Eyebrow labels
Every section has a small uppercase label above the headline:
font-size: 11px, letter-spacing: .18em, color: var(--accent)
Eyebrow has a ::after line (width 46px, height 1px, background: accent) that 
animates scaleX(0→1) when section enters viewport.

### Scroll reveal
All sections and cards use IntersectionObserver: opacity 0 → 1, 
translateY(22px → 0), with staggered transition-delays for grid children.

### Animated count-up stats
Numbers in the dark stats strip count up from 0 when the section 
enters the viewport.

### ::selection
```css
::selection { background: rgba(177,143,77,.22); color: var(--primary); }
```

### Diagonal section cuts
Use clip-path on sections to create angled transitions between sections:
`clip-path: polygon(0 0, 100% 0, 100% 94%, 0 100%)` on sections that 
should angle downward at the bottom.

---

## ANTI-SLOP — ZERO TOLERANCE

Never use:
- `font-family: Inter, Arial, Roboto, system-ui, Open Sans, Poppins`
- Purple gradients or purple accent colors
- Glassmorphism (backdrop-filter on feature cards)
- Bento grid layouts
- Eyebrow pills (rounded badge/chip above headlines)
- Single flat box-shadow on any card
- Gradient orbs as decorative background elements
- Generic icon-in-circle 3-column feature cards
- `transition: all` (always name specific properties)
- Emojis as icons (use inline SVG)
- `border-radius: 12px` on everything (vary it: cards 6px, buttons 5px)

---

## HOMEPAGE STRUCTURE

Build all 14 sections in order:

### 1. NAV (fixed)
Logo left. Links: About / Services / Who We Serve / Process / Contact.
Gold "Book a Call →" CTA button right. Mobile: hamburger → full-screen overlay.

### 2. HERO (dark navy, full viewport height)
Eyebrow: "Houston, TX · Fiduciary Wealth Management"

H1 (EB Garamond, ~72px, white):
"How do successful Houston professionals turn a high income into 
lasting financial security?"
Make "lasting financial security?" italic and gold (#b18f4d).

Subhead (white, 70% opacity):
"Alex Miller and Anchor Wealth Planning specialize in the complex 
financial lives of oil & gas executives, business owners, and 
high-net-worth families — bringing your investments, taxes, and 
estate into one coordinated plan."

Two CTAs:
- Primary gold: "Schedule a Conversation →"
- Ghost outline white: "Take the Fit Assessment"

Proof strip below (separated by thin white border):
4 items: [VERIFY: years] Years in wealth management | Fiduciary | 
Fee-Only | Houston TX

### 3. PAIN TICKER (dark strip, auto-scrolling)
Continuous horizontal scroll of client pain quotes.
Pause on hover. Duplicate items for seamless loop.

Items:
- "My CPA and my advisor never talk to each other."
- "My RSUs and bonus feel like a tax trap every year."
- "I don't think my advisor specializes in situations like mine."
- "I have real wealth but no plan for what comes after me."
- "No one is looking at my full financial picture."
- "I'm high income — but I still feel behind on where I should be."

### 4. TRUST BAR (cream, subtle)
5 items with SVG icons in accent gold:
Fiduciary Standard | FINRA / SEC Registered | 10+ Years at Merrill Lynch | 
Based in Houston, TX | Fee-Only · No Commissions

### 5. PAIN CARDS (cream-mid, 2×2 grid)
Eyebrow: "The Problem"
H2: "Does this sound familiar?"

4 cards with gold top border (3px), italic serif quote + plain context text:

**Card 1:** "My CPA handles taxes. My advisor handles investments. 
Neither one talks to the other — and I'm the one paying the price."
Context: The siloed advisory problem — common among executives managing 
complex accounts, RSUs, and deferred comp across professionals who never coordinate.

**Card 2:** "Every bonus season I feel like I'm leaving money on the table. 
By the time I think about it, the tax window has already closed."
Context: Equity comp timing requires coordination months in advance — 
not last-minute decisions on April 14th.

**Card 3:** "I've built real wealth, but I don't have a plan for what happens 
to it after me. My estate documents are from 2014."
Context: Legacy planning is the most commonly deferred item among 
high-net-worth families. Most discover gaps during a life event — not before.

**Card 4:** "I'm making more than I ever have — and somehow I still feel behind. 
I'm not sure my advisor specializes in situations like mine."
Context: Generalist advisors serve a wide range of clients. Executives with 
equity comp, deferred income, and estate complexity need a specialist.

### 6. ICP SELF-SORT (cream, 3-column)
Eyebrow: "Who We Serve"
H2: "We specialize. Generalists are everywhere."

3 cards, each with a small SVG icon in a gold circle:

**Oil & Gas Executives**
RSUs, deferred comp, commodity exposure, and the unique tax complexity 
of the Permian Basin world. We understand your equity cycle.
Link: "See how we work with you →"

**Business Owners**
Exit planning, business valuation, and separating personal wealth from 
business risk — one of the most complex financial transitions there is.
Link: "See how we work with you →"

**High-Net-Worth Families**
Multi-generational planning, trust structures, charitable giving, and 
coordinating your full advisory team under one unified plan.
Link: "See how we work with you →"

### 7. FIT ASSESSMENT (cream-mid, centered card)
Eyebrow: "Quick Fit Check"
H2: "Are we the right fit for you?"
Subhead: "Four questions. We'll tell you honestly whether Anchor Wealth 
Planning is built for where you are."

4 questions in a centered elevated card (Level 3 shadow):

**Q1:** "What best describes your situation?"
Options: Oil & gas executive / Business owner / High-net-worth individual/family / 
Other high-income professional

**Q2:** "What's your investable assets range?"
Options: Under $500K / $500K–$2M / $2M–$10M / $10M+

**Q3:** "What's your biggest concern right now?"
Options: Tax strategy & coordination / Equity comp (RSUs, deferred comp) / 
Legacy & estate planning / Finding the right advisor

**Q4:** "Do you currently have a financial advisor?"
Options: Yes, satisfied / Yes, looking for better fit / No advisor / 
Managing it myself

Email field: "Where should we send your results?"
Submit button (primary gold): "See If We're a Good Fit →"

Selected options get gold border + accent-wash background.
Inset shadow on inputs.

### 8. SERVICES PREVIEW (white, 2×2 grid)
Eyebrow: "What We Do"
H2: "A coordinated plan — not a collection of accounts"

4 cards with large decorative number (01–04 in very light gold, 48px):

**01 Investment Management**
Portfolio strategy built around your full financial picture — not just 
the accounts we hold.

**02 Tax Strategy & Coordination**
Working directly with your CPA to execute proactive tax strategies — 
not react on April 14th.

**03 Equity Compensation**
RSU vesting, deferred comp elections, bonus planning — timed and 
coordinated with your full tax picture.

**04 Estate & Legacy**
Working with your attorney to keep your estate plan current, funded, 
and aligned with your actual wealth today.

Ghost button: "See All Services →"

### 9. PROCESS (cream, 4-step horizontal)
Eyebrow: "How It Works"
H2: "A clear path from first call to full plan"

4 steps with gold-bordered circle numbers and a horizontal gold line 
connector between them:

**1 Discovery Call** — 30 minutes. No pitch. Just a conversation 
to see if there's a real fit.

**2 Financial Assessment** — We review your full picture and identify 
where the gaps and opportunities are.

**3 Plan Presentation** — A clear, written plan with specific 
recommendations. No vague "diversified portfolio" language.

**4 Ongoing Partnership** — Regular reviews, proactive outreach, and 
direct access to Alex — not a junior associate.

Ghost button: "See the Full Process →"

### 10. ABOUT ALEX (cream-mid, 2-column: photo left, content right)
Photo left: Navy gradient placeholder box (aspect 4:5), 
small gold accent bar bottom-left corner.

Content right:
Eyebrow: "About Alex"
H2: "A Houston advisor who's seen the complexity from the inside"

Body: After more than a decade at Merrill Lynch, Alex Miller founded 
Anchor Wealth Planning with one conviction: high-earning professionals 
in Houston deserve an advisor who specializes in the complexity they 
actually live with — not a generalist with a product to sell.

[PLACEHOLDER: Alex's personal story in his own words — marked visibly]

Credential badges (small gold-bordered chips):
[VERIFY: CFP® / ChFC®?] | Merrill Lynch · 10+ yrs | Houston, TX | Fee-Only Fiduciary

Ghost button: "Alex's Full Story →"

### 11. STATS STRIP (dark navy, 4-column)
4 stats with count-up animation on scroll:

- [VERIFY: AUM] Assets Under Management
- [VERIFY: count] Client Families Served
- 10+ Years at Merrill Lynch
- 30 Min. First Call — No Obligation

### 12. TESTIMONIALS (cream, 3-column)
Eyebrow: "Client Voices"
H2: "What it feels like to have a plan"

3 testimonial cards. Each has a large decorative open-quote mark 
(very light gold, 120px). All content marked as:
[PLACEHOLDER: Real testimonial needed — FINRA compliant before launch]

### 13. FINAL CTA (dark navy, centered)
Eyebrow: "The First Call Is Just a Conversation" (gold, centered)
H2: "Ready to see what a coordinated financial plan actually looks like?"
Body: "The first call is 30 minutes, no obligation, no pitch. We'll 
listen to your situation and tell you honestly whether we're the right fit."

Two buttons:
- Primary gold: "Schedule a Conversation →"
- Ghost white: "Take the Fit Assessment"

### 14. FOOTER (deepest navy #0f2038)
4 columns: Brand + tagline | Navigate links | Specialties links | Contact info

Compliance disclaimer (small, low opacity):
"Anchor Wealth Planning is a registered investment advisor. 
[RIA entity name — verify]. Registration does not imply a certain level 
of skill or training. Past performance is not a guarantee of future results. 
All investments involve risk, including possible loss of principal."

Copyright line: © 2026 Anchor Wealth Planning.

---

## TECHNICAL REQUIREMENTS

- Single HTML file. All CSS in `<style>` tag. No frameworks. No CDN dependencies 
  except Google Fonts.
- Vanilla JS only. IntersectionObserver for scroll reveals.
- Mobile-first. Test at 375px, 768px, 1440px.
- Mobile nav: hamburger → full-screen overlay with large serif links.
- All colors via CSS custom properties — never hardcode hex values.
- No external images. Use CSS gradient placeholders where photos would go.
- All placeholder content must be wrapped in a visible amber callout:
  `display: inline-block; background: #fef3c7; border: 1.5px dashed #d97706; color: #92400e; font-size: 12px; padding: 3px 9px; border-radius: 4px;`
- Compliance disclaimers get an HTML comment: `<!-- COMPLIANCE: Required before launch -->`
- No Lorem Ipsum anywhere.
- Arrow icons must be inline SVG — never emoji.

---

## SELF-CHECK BEFORE OUTPUTTING

Run through this list before finishing:
- [ ] Every card uses 3-layer shadow?
- [ ] Primary CTA has shimmer ::before?
- [ ] Every section background has radial gradient depth (no flat colors)?
- [ ] Nav blurs/frosts on scroll?
- [ ] Grain overlay present?
- [ ] No banned fonts (Inter/Arial/Roboto/system-ui)?
- [ ] No `transition: all` anywhere?
- [ ] No bento grids, eyebrow pills, gradient orbs, glassmorphism?
- [ ] Stats count up on scroll?
- [ ] Cards shimmer + lift on hover?
- [ ] Arrow icons animate on button hover?
