# Animation Library

Vanilla CSS + JS patterns for the website factory. No libraries. All patterns respect `prefers-reduced-motion`. CSS custom properties expose token hooks throughout.

---

## Interaction Principles (Read First)

| Rule | Why |
|------|-----|
| Animate only `transform` and `opacity` | Compositor-thread only — zero layout reflow |
| Always add `prefers-reduced-motion` guard | WCAG 2.1 2.3.3 requirement |
| Call `observer.unobserve()` after trigger | Prevents re-firing on scroll-back |
| Use named cubic-bezier curves (see below) | Duration + easing = perceived quality |
| Max 3–5 concurrent animations per viewport | More reads as noise, not polish |
| Stagger: 80–150ms between siblings, 600ms max total | Compress to 60ms for >6 items |
| Scroll listeners always `{ passive: true }` | #1 source of scroll jank if missing |
| `will-change: transform` only while animating | Each one = a compositor layer = GPU memory |

**Standard easing curves:**
```css
/* Snappy reveal: fast start, smooth settle */
--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);

/* Bouncy micro-interaction: slight overshoot */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

/* Material state change */
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);

/* Scroll-linked only (parallax, progress bars) */
--ease-linear: linear;
```

**Standard durations:**
```css
--dur-hover: 280ms;
--dur-reveal: 600ms;
--dur-transition: 420ms;
--dur-counter: 1800ms;
```

---

## 1. Scroll Reveal Patterns

### 1.1 Fade-Up Reveal

Elements start invisible and 32px below their resting position, then fade in and slide up when entering the viewport.

**When to use:** Feature sections, testimonials, about blocks, any content discovered progressively.
**When NOT to use:** Hero sections (above the fold must be immediately visible), or when `prefers-reduced-motion` is set.

```html
<!-- HTML -->
<div class="reveal">Your content here</div>
<div class="reveal">Another block</div>
```

```css
/* CSS */
:root {
  --reveal-distance: var(--anim-reveal-distance, 32px);
  --reveal-duration: var(--dur-reveal, 600ms);
  --reveal-easing: var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  --reveal-opacity-start: var(--anim-opacity-start, 0);
}

.reveal {
  opacity: var(--reveal-opacity-start);
  transform: translateY(var(--reveal-distance));
  transition:
    opacity var(--reveal-duration) var(--reveal-easing),
    transform var(--reveal-duration) var(--reveal-easing);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
// JS — drop this once before </body>
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:**
- `--anim-reveal-distance` — vertical offset (default `32px`)
- `--dur-reveal` — transition duration (default `600ms`)
- `--ease-reveal` — easing curve

**Performance:** opacity + transform only. `unobserve()` fires once. `rootMargin: '-60px'` triggers slightly before the element hits the bottom edge.

---

### 1.2 Fade-In Reveal (No Movement)

Elements fade in without any translation — cleaner for layouts where vertical shift feels wrong.

**When to use:** Full-width image sections, stat rows, anything where vertical shift would look off.
**When NOT to use:** Same as 1.1 — never above the fold.

```html
<div class="reveal-fade">Content</div>
```

```css
.reveal-fade {
  opacity: 0;
  transition: opacity var(--dur-reveal, 600ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
}

.reveal-fade.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-fade {
    opacity: 1;
    transition: none;
  }
}
```

```js
// Same observer as 1.1 — change selector to '.reveal-fade'
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal-fade").forEach((el) => observer.observe(el));
})();
```

**Performance:** Single opacity transition. Lightest possible reveal.

---

### 1.3 Fade-In from Side

Element slides in from left or right. Use `--reveal-direction` to control.

**When to use:** Two-column content blocks where left and right panels should enter from their respective sides.
**When NOT to use:** Dense content grids, mobile where the lateral shift is jarring.

```html
<div class="reveal-side" style="--reveal-direction: -48px;">Left panel</div>
<div class="reveal-side" style="--reveal-direction: 48px;">Right panel</div>
```

```css
.reveal-side {
  opacity: 0;
  transform: translateX(var(--reveal-direction, -48px));
  transition:
    opacity var(--dur-reveal, 600ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1)),
    transform var(--dur-reveal, 600ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
}

.reveal-side.is-visible {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-side {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal-side").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:**
- `--reveal-direction` — positive = from right, negative = from left (inline or token)

---

### 1.4 Scale Reveal

Element scales up from 94% to 100% while fading in. Feels like content materializes rather than slides.

**When to use:** Single large hero cards, modal entrances, featured content blocks.
**When NOT to use:** Lists, grids, or any pattern with multiple simultaneous instances.

```html
<div class="reveal-scale">Featured content</div>
```

```css
.reveal-scale {
  opacity: 0;
  transform: scale(var(--reveal-scale-start, 0.94));
  transition:
    opacity var(--dur-reveal, 600ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1)),
    transform var(--dur-reveal, 600ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
}

.reveal-scale.is-visible {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-scale {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".reveal-scale").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:**
- `--reveal-scale-start` — starting scale value (default `0.94`)

---

## 2. Hover Effects

### 2.1 Card Hover Lift

Cards elevate on hover with upward translation and shadow depth, simulating physical lift.

**When to use:** Feature cards, pricing cards, blog thumbnails, portfolio items.
**When NOT to use:** Flat minimal designs where shadow competes with other elements. Touch devices (hover doesn't apply cleanly on iOS).

```html
<div class="card">
  <p>Card content</p>
</div>
```

```css
.card {
  position: relative;
  border-radius: var(--card-radius, 12px);
  transition: transform var(--dur-hover, 280ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  transform: translateY(0);
}

/* Pre-render the shadow in ::after and animate opacity only */
/* This is 2x faster than animating box-shadow directly */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 20px 60px -10px var(--card-shadow-color, rgba(0, 0, 0, 0.22));
  opacity: 0;
  transition: opacity var(--dur-hover, 280ms) ease;
  pointer-events: none;
  z-index: -1;
}

.card:hover {
  transform: translateY(var(--card-lift, -6px));
}

.card:hover::after {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card::after {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}
```

**CSS token hooks:**
- `--card-radius` — border radius (default `12px`)
- `--card-lift` — vertical lift amount (default `-6px`)
- `--card-shadow-color` — shadow color (default `rgba(0,0,0,0.22)`)
- `--dur-hover` — transition duration

**Performance:** `::after` shadow pre-renders; only `opacity` animates. `cubic-bezier(0.34, 1.56, 0.64, 1)` adds a slight overshoot bounce.

---

### 2.2 Button Fill Slide

On hover, a fill slides in from the left to cover the button background. Feels physically activated.

**When to use:** Outline/ghost CTAs, secondary buttons, nav links with hover state.
**When NOT to use:** Filled primary buttons (fill-over-fill looks muddy). High-contrast/accessibility-critical contexts.

```html
<button class="btn-slide">Get Started</button>
```

```css
.btn-slide {
  position: relative;
  overflow: hidden;
  padding: var(--btn-padding-y, 14px) var(--btn-padding-x, 32px);
  border: 2px solid var(--btn-border-color, currentColor);
  color: var(--btn-text-color, #0f0f0f);
  background: transparent;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  border-radius: var(--btn-radius, 6px);
  z-index: 0;
  transition: color var(--dur-hover, 280ms) ease;
}

.btn-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--btn-fill-color, #0f0f0f);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.35s var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  z-index: -1;
}

.btn-slide:hover::before {
  transform: scaleX(1);
}

.btn-slide:hover {
  color: var(--btn-hover-text-color, #fff);
}

@media (prefers-reduced-motion: reduce) {
  .btn-slide::before {
    transition: none;
  }
  .btn-slide {
    transition: none;
  }
}
```

**CSS token hooks:**
- `--btn-border-color` — border color
- `--btn-text-color` — default text color
- `--btn-fill-color` — hover fill color
- `--btn-hover-text-color` — text color on hover
- `--btn-radius` — border radius
- `--btn-padding-y` / `--btn-padding-x` — padding

**Performance:** `scaleX` on `::before` is compositor-only. Zero layout reflow.

---

### 2.3 Magnetic Button

Button physically tracks cursor proximity, moving toward the cursor on hover. Tactile, premium feel.

**When to use:** Primary CTAs on landing pages, hero buttons, agency/portfolio nav links.
**When NOT to use:** Mobile (mousemove doesn't fire on touch). Form submit buttons. Dense toolbars.

```html
<button class="magnetic">Contact Us</button>
```

```css
.magnetic {
  display: inline-block;
  cursor: pointer;
  transition: transform var(--dur-hover, 280ms) var(--ease-standard, cubic-bezier(0.25, 0.46, 0.45, 0.94));
}

@media (prefers-reduced-motion: reduce) {
  .magnetic {
    transition: none;
  }
}
```

```js
(function () {
  const strength = 0.35; // 0.2–0.4 is the sweet spot

  document.querySelectorAll(".magnetic").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      // Skip CSS transition on mousemove — the math is smooth enough
      btn.style.transition = "none";
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      // Restore CSS transition for the spring-back
      btn.style.transition = "";
      btn.style.transform = "translate(0, 0)";
    });
  });
})();
```

**Performance:** Only `transform` via `style` — zero reflow. CSS transition disabled on mousemove (the per-frame math is already smooth); re-enabled on mouseleave for the spring-back.

---

### 2.4 Image Zoom on Hover

Image scales up inside a clipped container on hover. The container prevents layout shift.

**When to use:** Blog thumbnails, team photos, portfolio grids, property listings.
**When NOT to use:** Full-viewport hero images (disorienting at 100vw). Transparent PNGs or icons.

```html
<div class="img-wrap">
  <img src="photo.jpg" alt="Description" />
</div>
```

```css
.img-wrap {
  overflow: hidden;
  border-radius: var(--img-radius, 8px);
  position: relative;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1);
  transition: transform var(--img-zoom-duration, 600ms) var(--ease-standard, cubic-bezier(0.25, 0.46, 0.45, 0.94));
}

.img-wrap:hover img {
  transform: scale(var(--img-zoom-scale, 1.06));
}

/* Optional: subtle overlay on hover */
.img-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background var(--img-zoom-duration, 600ms) ease;
}

.img-wrap:hover::after {
  background: rgba(0, 0, 0, var(--img-overlay-opacity, 0.1));
}

@media (prefers-reduced-motion: reduce) {
  .img-wrap img,
  .img-wrap::after {
    transition: none;
  }
  .img-wrap:hover img {
    transform: scale(1);
  }
}
```

**CSS token hooks:**
- `--img-radius` — corner radius (default `8px`)
- `--img-zoom-scale` — hover scale (default `1.06`, keep between `1.04–1.08`)
- `--img-zoom-duration` — transition duration (default `600ms`)
- `--img-overlay-opacity` — dark overlay opacity on hover (default `0.1`)

**Performance:** `scale` on the `img` only. Container `overflow: hidden` clips without layout changes.

---

### 2.5 Navigation Highlight Pill (Magic Underline)

A single background pill slides between nav items as the user hovers, tracking the active item.

**When to use:** Navigation bars, tab bars, segmented controls, pill-style filter groups.
**When NOT to use:** Vertically stacked navs. Menus with highly variable item widths (recalculate on resize).

```html
<nav class="nav-highlight">
  <a href="#">Home</a>
  <a href="#">Features</a>
  <a href="#">Pricing</a>
  <a href="#">About</a>
</nav>
```

```css
.nav-highlight {
  position: relative;
  display: inline-flex;
  gap: var(--nav-gap, 4px);
  padding: var(--nav-padding, 4px);
  border-radius: var(--nav-radius, 8px);
}

.nav-highlight a {
  position: relative;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--nav-text-color, inherit);
  z-index: 1;
  border-radius: calc(var(--nav-radius, 8px) - 2px);
}

.nav-bg {
  position: absolute;
  top: var(--nav-padding, 4px);
  left: 0;
  height: calc(100% - var(--nav-padding, 4px) * 2);
  background: var(--nav-highlight-color, rgba(0, 0, 0, 0.08));
  border-radius: calc(var(--nav-radius, 8px) - 2px);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.25s ease,
    width 0.25s ease,
    opacity 0.2s ease;
}
```

```js
(function () {
  document.querySelectorAll(".nav-highlight").forEach((nav) => {
    const highlight = document.createElement("span");
    highlight.className = "nav-bg";
    nav.appendChild(highlight);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        const rect = link.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        highlight.style.width = rect.width + "px";
        highlight.style.transform = `translateX(${rect.left - navRect.left}px)`;
        highlight.style.opacity = "1";
      });
    });

    nav.addEventListener("mouseleave", () => {
      highlight.style.opacity = "0";
    });
  });
})();
```

**CSS token hooks:**
- `--nav-gap` — gap between items
- `--nav-padding` — outer padding of the nav bar
- `--nav-radius` — border radius
- `--nav-highlight-color` — pill background color
- `--nav-text-color` — link text color

**Performance:** Single DOM element moved via `transform` — compositor only. `getBoundingClientRect()` reads layout but only on `mouseenter`, not per frame.

---

## 3. Text Animations

### 3.1 Eyebrow / Divider Line Reveal

A short horizontal rule scales from zero width before the eyebrow label slides in alongside it.

**When to use:** Section headers on landing pages, premium brand sites. Pairs with a large h2 that reveals after.
**When NOT to use:** Dark/minimal designs where the line competes with other ruled elements.

```html
<div class="eyebrow reveal">
  <span class="eyebrow-line"></span>
  <span class="eyebrow-text">Featured Services</span>
</div>
```

```css
.eyebrow {
  display: flex;
  align-items: center;
  gap: var(--eyebrow-gap, 12px);
}

.eyebrow-line {
  display: block;
  width: var(--eyebrow-line-width, 40px);
  height: var(--eyebrow-line-height, 2px);
  background: var(--eyebrow-line-color, currentColor);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.5s var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  flex-shrink: 0;
}

.eyebrow-text {
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 0.4s ease 0.2s,
    transform 0.4s ease 0.2s;
  font-size: var(--eyebrow-font-size, 0.75rem);
  letter-spacing: var(--eyebrow-letter-spacing, 0.08em);
  text-transform: uppercase;
  font-weight: 600;
}

.is-visible .eyebrow-line {
  transform: scaleX(1);
}

.is-visible .eyebrow-text {
  opacity: 1;
  transform: translateX(0);
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow-line {
    transform: scaleX(1);
    transition: none;
  }
  .eyebrow-text {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
// Use the same IntersectionObserver from 1.1 — .eyebrow already has .reveal
// No additional JS needed if you're using the unified reveal observer.
```

**CSS token hooks:**
- `--eyebrow-line-width` — line length (default `40px`)
- `--eyebrow-line-height` — line thickness (default `2px`)
- `--eyebrow-line-color` — line color
- `--eyebrow-gap` — gap between line and text
- `--eyebrow-font-size` — label font size
- `--eyebrow-letter-spacing` — label tracking

**Performance:** `scaleX` uses `transform`. The `0.2s` delay on the text creates sequential line-then-label feel without JS orchestration.

---

### 3.2 Clip-Path Text Reveal (Curtain Lift)

Text is hidden behind an overflow clip and revealed by translating the inner span upward, as if a curtain lifts.

**When to use:** Hero headlines, section eyebrows, pull-quote reveals, any text that should feel deliberate.
**When NOT to use:** Body copy paragraphs (too theatrical at scale). More than 3–4 lines — split lines individually instead.

```html
<h1>
  <span class="line-wrap reveal">
    <span class="line-inner">Grow Your Practice.</span>
  </span>
  <span class="line-wrap reveal">
    <span class="line-inner">On Your Terms.</span>
  </span>
</h1>
```

```css
.line-wrap {
  overflow: hidden;
  display: block;
}

.line-inner {
  display: block;
  transform: translateY(110%);
  transition: transform var(--text-reveal-duration, 750ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  transition-delay: var(--text-reveal-delay, 0ms);
}

.is-visible .line-inner {
  transform: translateY(0);
}

/* Stagger between lines: set --text-reveal-delay on each .line-wrap */
.line-wrap:nth-child(2) { --text-reveal-delay: 80ms; }
.line-wrap:nth-child(3) { --text-reveal-delay: 160ms; }
.line-wrap:nth-child(4) { --text-reveal-delay: 240ms; }

@media (prefers-reduced-motion: reduce) {
  .line-inner {
    transform: translateY(0);
    transition: none;
  }
}
```

```js
// Same observer as 1.1 — .line-wrap already has .reveal
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".line-wrap.reveal").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:**
- `--text-reveal-duration` — reveal duration (default `750ms`)
- `--text-reveal-delay` — per-line stagger offset (set inline or via nth-child)

**Performance:** `translateY` inside `overflow: hidden` is compositor-safe. Safer and more broadly supported than `clip-path` approach.

---

### 3.3 Gradient Text (Animated)

Text displays a moving gradient that shifts continuously, creating a shimmering iridescent effect.

**When to use:** Hero headlines, accent words in h2/h3, product names in marketing copy.
**When NOT to use:** Long paragraphs (readability drops). Dark backgrounds where gradient stops lack contrast — always check WCAG.

```html
<h2>The <span class="gradient-text">Smartest Move</span> You'll Make</h2>
```

```css
.gradient-text {
  background: var(
    --gradient-text-colors,
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 25%,
      #f093fb 50%,
      #4facfe 75%,
      #667eea 100%
    )
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift var(--gradient-text-speed, 4s) ease infinite;
}

@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-text {
    animation: none;
    background-position: 0% 50%;
  }
}
```

**CSS token hooks:**
- `--gradient-text-colors` — full `linear-gradient(...)` value to swap color palette
- `--gradient-text-speed` — animation cycle duration (default `4s`)

**Performance:** `background-position` animation is cheap. `-webkit-text-fill-color: transparent` is required for cross-browser support alongside `background-clip: text`.

---

## 4. Background & Depth Effects

### 4.1 Scroll-Driven Parallax (CSS-First)

Background images or decorative elements move at a slower rate than scroll, creating depth. CSS-only in modern browsers; JS fallback for Safari.

**When to use:** Hero sections with background imagery, decorative floating shapes, depth-layer storytelling.
**When NOT to use:** Mobile devices — disable entirely. Any element where scroll jank is already a concern.

```html
<section class="hero">
  <div class="parallax-bg"></div>
  <div class="hero-content">...</div>
</section>
```

```css
.hero {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.parallax-bg {
  position: absolute;
  inset: -20% 0;
  background-image: var(--parallax-image, url('hero.jpg'));
  background-size: cover;
  background-position: center;
  will-change: transform;
}

/* CSS scroll-driven (Chrome 115+ / Edge 115+) */
@supports (animation-timeline: scroll()) {
  .parallax-bg {
    animation: parallax-drift linear both;
    animation-timeline: scroll(root);
    animation-range: 0% 100%;
  }

  @keyframes parallax-drift {
    from { transform: translateY(0); }
    to   { transform: translateY(var(--parallax-distance, -120px)); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .parallax-bg {
    animation: none;
    transform: none;
  }
}

/* Disable on mobile */
@media (max-width: 768px) {
  .parallax-bg {
    animation: none;
    transform: none;
  }
}
```

```js
// JS fallback for Safari (only runs if CSS scroll-driven is unsupported)
(function () {
  if (CSS.supports("animation-timeline", "scroll()")) return;

  const els = document.querySelectorAll(".parallax-bg");
  if (!els.length) return;

  const rate = 0.3;

  window.addEventListener(
    "scroll",
    () => {
      els.forEach((el) => {
        el.style.transform = `translateY(${window.scrollY * rate}px)`;
      });
    },
    { passive: true }
  );
})();
```

**CSS token hooks:**
- `--parallax-image` — background-image value
- `--parallax-distance` — total vertical travel (default `-120px`)

**Performance:** CSS version runs off the main thread. JS fallback uses `{ passive: true }`. Never use `background-attachment: fixed` — forces paint on every frame.

---

### 4.2 Shimmer / Skeleton Loading

A sweeping gradient highlight animates across placeholder shapes while content loads.

**When to use:** Content cards, feed listings, table rows, image placeholders during async fetch.
**When NOT to use:** Load times under 200ms — the shimmer will flash and disappear, which is more disorienting than no loader.

```html
<div class="skeleton-card">
  <div class="skeleton" style="height: 200px;"></div>
  <div class="skeleton" style="height: 20px; width: 70%; margin-top: 16px;"></div>
  <div class="skeleton" style="height: 16px; width: 50%; margin-top: 8px;"></div>
</div>
```

```css
/* Standard shimmer */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--skeleton-base, #f0f0f0) 25%,
    var(--skeleton-highlight, #e0e0e0) 37%,
    var(--skeleton-base, #f0f0f0) 63%
  );
  background-size: 400% 100%;
  animation: shimmer var(--skeleton-speed, 1.4s) ease infinite;
  border-radius: var(--skeleton-radius, 4px);
}

@keyframes shimmer {
  0%   { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Synchronized single-light-source variant */
.skeleton-sync {
  position: relative;
  overflow: hidden;
  background: var(--skeleton-base, #f0f0f0);
  border-radius: var(--skeleton-radius, 4px);
}

.skeleton-sync::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 100%
  );
  animation: shimmer-sweep var(--skeleton-speed, 1.5s) linear infinite;
}

@keyframes shimmer-sweep {
  from { transform: translateX(-100vw); }
  to   { transform: translateX(100vw); }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton,
  .skeleton-sync::before {
    animation: none;
    background: var(--skeleton-base, #f0f0f0);
  }
}
```

**CSS token hooks:**
- `--skeleton-base` — base gray color
- `--skeleton-highlight` — sweep highlight color
- `--skeleton-radius` — corner radius
- `--skeleton-speed` — animation cycle duration

**Performance:** `background-position` is GPU-composited. `skeleton-sync` variant requires `overflow: hidden` on each element.

---

## 5. Data Animations

### 5.1 Count-Up Stat Animation

Numbers animate from 0 to their target value when scrolled into view. Draws attention to social proof sections.

**When to use:** Social proof sections (advisors served, AUM managed, years in business), metrics dashboards, stat bars.
**When NOT to use:** Numbers that update frequently (counter restart looks broken). Numbers with decimals (floating-point display flickers).

```html
<div class="stats-row">
  <div class="stat">
    <span class="count-up" data-target="90" data-suffix="+">0</span>
    <span class="stat-label">Advisors</span>
  </div>
  <div class="stat">
    <span class="count-up" data-target="2500000000" data-prefix="$" data-abbreviate="true">$0</span>
    <span class="stat-label">AUM Managed</span>
  </div>
  <div class="stat">
    <span class="count-up" data-target="25" data-suffix=" Years">0</span>
    <span class="stat-label">In Business</span>
  </div>
</div>
```

```css
.stats-row {
  display: flex;
  gap: var(--stats-gap, 48px);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.count-up {
  font-size: var(--stat-font-size, 3rem);
  font-weight: var(--stat-font-weight, 700);
  line-height: 1;
  color: var(--stat-color, inherit);
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: var(--stat-label-size, 0.875rem);
  color: var(--stat-label-color, #666);
}
```

```js
(function () {
  function abbreviateNumber(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    return n.toLocaleString();
  }

  function animateCounter(el) {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const abbreviate = el.dataset.abbreviate === "true";
    const duration = +(el.dataset.duration || 1800);
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out-expo: feels authoritative, decelerates naturally near target
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = Math.floor(eased * target);
      const display = abbreviate ? abbreviateNumber(value) : value.toLocaleString();
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".count-up").forEach((el) => observer.observe(el));
})();
```

**HTML data attributes:**
- `data-target` — target number (required)
- `data-suffix` — suffix string (e.g., `+`, ` Years`)
- `data-prefix` — prefix string (e.g., `$`)
- `data-abbreviate` — `"true"` to abbreviate large numbers (e.g., 2.5B)
- `data-duration` — animation duration in ms (default `1800`)

**CSS token hooks:**
- `--stat-font-size` — number font size
- `--stat-font-weight` — number weight
- `--stat-color` — number color
- `--stat-label-size` — label font size
- `--stat-label-color` — label color

**Performance:** `requestAnimationFrame` is always frame-synced. `ease-out-expo` (`1 - 2^(-10x)`) decelerates naturally near the target.

---

### 5.2 Scroll-Linked Progress Bar

A thin bar at the top of the page fills left-to-right as the user scrolls, indicating reading progress.

**When to use:** Long-form articles, documentation pages, blog posts.
**When NOT to use:** Single-screen landing pages. Checkout flows where "progress" has a different meaning.

```html
<!-- Place immediately after <body> -->
<div class="progress-bar" role="progressbar" aria-label="Reading progress"></div>
```

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: var(--progress-height, 3px);
  width: 100%;
  background: var(--progress-color, #0070f3);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
}

/* CSS-only version (Chrome 115+ / Edge 115+) */
@supports (animation-timeline: scroll()) {
  .progress-bar {
    animation: grow linear;
    animation-timeline: scroll(root);
  }

  @keyframes grow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-bar {
    display: none;
  }
}
```

```js
// JS fallback for browsers without scroll-driven animations
(function () {
  if (CSS.supports("animation-timeline", "scroll()")) return;

  const bar = document.querySelector(".progress-bar");
  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrolled = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${scrolled / max})`;
    },
    { passive: true }
  );
})();
```

**CSS token hooks:**
- `--progress-height` — bar height (default `3px`, keep to 2–3px)
- `--progress-color` — bar color

**Performance:** CSS version runs entirely off main thread. JS version uses `{ passive: true }` and `transform` only.

---

## 6. Section Transitions

### 6.1 Stacked Panels (Overlap Transition)

Full-width sections stack with a rounded top edge — each new panel slides up over the previous, creating layered depth.

**When to use:** Product storytelling pages, multi-step explanation sections, pricing comparison reveals.
**When NOT to use:** Short pages or content-dense sections that don't have enough scroll space to feel intentional.

```html
<div class="sticky-wrapper" style="--section-count: 3;">
  <section class="sticky-section" style="background: #f5f5f5; z-index: 1;">
    <div class="section-content">Panel 1</div>
  </section>
  <section class="sticky-section" style="background: #0f0f0f; color: #fff; z-index: 2;">
    <div class="section-content">Panel 2</div>
  </section>
  <section class="sticky-section" style="background: #1a1a2e; color: #fff; z-index: 3;">
    <div class="section-content">Panel 3</div>
  </section>
</div>
```

```css
.sticky-wrapper {
  min-height: calc(var(--section-count, 3) * 100vh);
}

.sticky-section {
  position: sticky;
  top: 0;
  min-height: 100vh;
  border-radius: var(--panel-radius, 24px) var(--panel-radius, 24px) 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-content {
  max-width: var(--content-max-width, 1200px);
  padding: var(--content-padding, 80px 40px);
  width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .sticky-section {
    position: relative;
    border-radius: 0;
  }
}
```

**CSS token hooks:**
- `--section-count` — number of panels (drives wrapper height)
- `--panel-radius` — top corner radius (default `24px`)

**Performance:** `position: sticky` is GPU-composited. No scroll listeners needed. Distinct background colors make the overlap edge clear.

---

### 6.2 Scroll-Driven Page Transition (View Transitions API)

Browser-native shared element transitions between pages/views. Elements morph from old to new position during navigation.

**When to use:** SPA navigation, card-to-detail transitions, gallery-to-single views, tab switching.
**When NOT to use:** Firefox/Safari until support ships. Multi-tab scenarios with duplicate transition names.

```html
<!-- Page A -->
<article class="card" id="post-1">
  <img src="thumb.jpg" class="card-img" style="view-transition-name: post-1-img;" />
  <h3 class="card-title" style="view-transition-name: post-1-title;">Article Title</h3>
  <a href="/post/1" class="card-link">Read More</a>
</article>

<!-- Page B (the detail page) -->
<article class="post-detail">
  <img src="hero.jpg" class="post-img" style="view-transition-name: post-1-img;" />
  <h1 class="post-title" style="view-transition-name: post-1-title;">Article Title</h1>
</article>
```

```css
/* Default cross-fade for elements without explicit transition names */
::view-transition-old(root) {
  animation: var(--vt-out-duration, 0.3s) ease both vt-fade-out;
}
::view-transition-new(root) {
  animation: var(--vt-in-duration, 0.4s) ease both vt-fade-in;
}

@keyframes vt-fade-out { to   { opacity: 0; } }
@keyframes vt-fade-in  { from { opacity: 0; } }

/* Named transitions animate automatically via browser */
::view-transition-old(post-1-img),
::view-transition-new(post-1-img) {
  animation-duration: var(--vt-morph-duration, 0.45s);
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.01ms;
  }
}
```

```js
// SPA navigation trigger
function navigateTo(url) {
  if (document.startViewTransition) {
    document.startViewTransition(async () => {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      document.body.innerHTML = doc.body.innerHTML;
      window.history.pushState({}, "", url);
    });
  } else {
    // Fallback: standard navigation
    window.location.href = url;
  }
}

// Wire up internal links
document.querySelectorAll("a[href^='/']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(link.href);
  });
});
```

**CSS token hooks:**
- `--vt-out-duration` — exit animation duration
- `--vt-in-duration` — enter animation duration
- `--vt-morph-duration` — named element morph duration

**Performance:** Browser-native. No GSAP or Framer needed. `view-transition-name` values must be unique per page.

---

## 7. Stagger Patterns

### 7.1 Stagger Reveal (Grid Children)

When a container enters the viewport, its children animate in sequentially with increasing delays. Cascading, choreographed feel.

**When to use:** Card grids, feature lists, icon rows, pricing columns.
**When NOT to use:** Lists of 20+ items (compress delay gap or stagger by row). Mobile where fast scrolling outruns the stagger.

```html
<div class="stagger-group">
  <div class="item card">Feature 1</div>
  <div class="item card">Feature 2</div>
  <div class="item card">Feature 3</div>
  <div class="item card">Feature 4</div>
  <div class="item card">Feature 5</div>
  <div class="item card">Feature 6</div>
</div>
```

```css
.stagger-group {
  display: grid;
  grid-template-columns: var(--stagger-columns, repeat(auto-fill, minmax(280px, 1fr)));
  gap: var(--stagger-gap, 24px);
}

.stagger-group .item {
  opacity: 0;
  transform: translateY(var(--stagger-distance, 24px));
  transition:
    opacity var(--stagger-duration, 500ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1)),
    transform var(--stagger-duration, 500ms) var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  transition-delay: var(--stagger-delay, 0ms);
}

.stagger-group.is-visible .item {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .stagger-group .item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
(function () {
  const BASE_DELAY = 100; // ms between items
  const MAX_ITEMS_BEFORE_COMPRESS = 6;
  const COMPRESSED_DELAY = 60;

  document.querySelectorAll(".stagger-group").forEach((group) => {
    const items = group.querySelectorAll(".item");
    const delay = items.length > MAX_ITEMS_BEFORE_COMPRESS ? COMPRESSED_DELAY : BASE_DELAY;

    items.forEach((item, i) => {
      item.style.setProperty("--stagger-delay", `${i * delay}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".stagger-group").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:**
- `--stagger-columns` — grid-template-columns value
- `--stagger-gap` — grid gap
- `--stagger-distance` — vertical offset per item (default `24px`)
- `--stagger-duration` — item transition duration (default `500ms`)

**Performance:** CSS variables make delay assignment clean. All items share one animation definition. Total stagger time auto-compresses above 6 items to stay under 600ms.

---

### 7.2 Stagger Reveal (Row-Based, Large Grids)

For grids with more than 12 items, stagger by row instead of individual item — all items in the same row animate together.

**When to use:** Logo walls, large advisor grids, any grid where per-item stagger would take too long.
**When NOT to use:** Grids with fewer than 7 items — use 7.1 instead.

```html
<div class="stagger-rows">
  <!-- 12+ items -->
  <div class="item">Logo 1</div>
  <div class="item">Logo 2</div>
  <!-- ... -->
</div>
```

```css
.stagger-rows {
  display: grid;
  grid-template-columns: var(--stagger-columns, repeat(auto-fill, minmax(160px, 1fr)));
  gap: var(--stagger-gap, 16px);
}

.stagger-rows .item {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.45s var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1)),
    transform 0.45s var(--ease-reveal, cubic-bezier(0.16, 1, 0.3, 1));
  transition-delay: var(--row-delay, 0ms);
}

.stagger-rows.is-visible .item {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .stagger-rows .item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
(function () {
  const ROW_DELAY = 120; // ms between rows

  document.querySelectorAll(".stagger-rows").forEach((group) => {
    const items = Array.from(group.querySelectorAll(".item"));
    const colCount = Math.round(group.offsetWidth / (items[0]?.offsetWidth || 200));

    items.forEach((item, i) => {
      const row = Math.floor(i / colCount);
      item.style.setProperty("--row-delay", `${row * ROW_DELAY}ms`);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document.querySelectorAll(".stagger-rows").forEach((el) => observer.observe(el));
})();
```

**CSS token hooks:** Same as 7.1.

**Performance:** Delays by row index — 12-column grid with 3 rows = only 3 delay values, total stagger ~240ms.

---

### 7.3 Horizontal Marquee / Ticker

Continuously scrolling row of logos, testimonials, or labels that loops seamlessly. No JS required.

**When to use:** Logo walls, testimonial strips, social proof bars, feature highlights.
**When NOT to use:** Interactive content requiring reading. Links inside the marquee (users can't click moving targets).

```html
<div class="marquee" aria-hidden="true">
  <!-- Duplicate the track for seamless loop -->
  <div class="marquee-track">
    <span class="marquee-item">Axiom Planning</span>
    <span class="marquee-item">Fee-Only Model</span>
    <span class="marquee-item">100% Ownership</span>
    <span class="marquee-item">Robust Back Office</span>
    <span class="marquee-item">Axiom Planning</span>
    <span class="marquee-item">Fee-Only Model</span>
    <span class="marquee-item">100% Ownership</span>
    <span class="marquee-item">Robust Back Office</span>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
  gap: var(--marquee-gap, 48px);
  animation: marquee var(--marquee-speed, 28s) linear infinite;
}

/* Pause on hover — usability best practice */
.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); } /* -50% because track is doubled */
}

.marquee-item {
  flex-shrink: 0;
  padding: var(--marquee-item-padding, 0 24px);
  font-size: var(--marquee-font-size, 0.875rem);
  color: var(--marquee-text-color, inherit);
  opacity: var(--marquee-item-opacity, 0.6);
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    gap: 12px;
  }
}
```

**CSS token hooks:**
- `--marquee-speed` — scroll cycle duration (default `28s`, slower = more readable)
- `--marquee-gap` — gap between items
- `--marquee-item-padding` — horizontal padding per item
- `--marquee-font-size` — label font size
- `--marquee-text-color` — label color
- `--marquee-item-opacity` — default opacity (muted feel)

**Performance:** `translateX(-50%)` on doubled track creates seamless loop with zero JS. Add `will-change: transform` on `.marquee-track` to promote to its own layer.

---

## Appendix: Unified Observer (Drop Once, Use Everywhere)

If using multiple scroll reveal patterns on the same page, use a single unified observer instead of initializing one per pattern. Drop before `</body>`.

```js
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Still add is-visible for layout — just no animation due to CSS
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
})();
```

Usage: add `data-reveal` to any element that uses a reveal class:
```html
<div class="reveal" data-reveal>...</div>
<div class="stagger-group" data-reveal>...</div>
<span class="line-wrap" data-reveal>...</span>
```

---

*Animation library — website factory. Vanilla CSS + JS only. No external dependencies.*
