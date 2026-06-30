# Motion Tier System
## editorial-luxury template

Every animation in every build is assigned a tier. Tier determines whether it ships. The motion intensity dial (set in DESIGN_TOKENS.md) activates tiers. Agent 04 reads this document and implements every animation in the active tier(s).

The goal: no more "fade in and call it done." Tier 1 ships in every build. Restrained sites still have sophisticated motion — it's just economical, not absent.

---

## Tier Overview

| Tier | When Active | Character |
|------|-------------|-----------|
| **Tier 1** | Always — every build, every dial | Economical. Purposeful. Makes cheap sites feel expensive. |
| **Tier 2** | Motion: `expressive` or `cinematic` | Expressive. Dimensional. The gap between "nice site" and "premium site." |
| **Tier 3** | Motion: `cinematic` only | Cinematic. Immersive. Only where the content earns it. |

---

## TIER 1 — Always Present

These animations ship in every build regardless of the motion dial. Restrained sites still get these. They are the quality floor for motion — below them is indistinguishable from a template site.

---

### T1.1 — Lenis Smooth Scroll

Initialization required in every build. Connects Lenis to GSAP ScrollTrigger via the ticker.

```javascript
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

CDN: `https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js`

**Why it matters:** Smooth scroll is the single highest-impact, lowest-cost quality signal. Every premium site uses it. Visitors won't name it but they will feel the difference.

---

### T1.2 — Frosted Glass Nav on Scroll

Nav starts transparent. On scroll past 40px: backdrop-filter blur + subtle background + border-bottom appears.

```css
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 24px 0;
  transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}
nav.scrolled {
  padding: 16px 0;
  background: rgba(var(--bg-base-rgb), 0.85);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--border);
}
```

```javascript
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });
```

---

### T1.3 — Scroll Reveal (rotateX variant — not just fade)

Default reveal for all section headlines, body copy, and cards. rotateX + opacity + Y travel feels dimensional; pure opacity fade does not.

```javascript
// On page load, wrap all reveal targets
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    rotateX: -12,
    y: 20,
    transformOrigin: '0% 50%',
    transformPerspective: 800,
    duration: var(--motion-base), // pull from CSS token via JS
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true
    }
  });
});

// For staggered groups (card rows, stat blocks, nav items)
gsap.utils.toArray('.reveal-group').forEach(group => {
  gsap.from(group.children, {
    opacity: 0,
    rotateX: -10,
    y: 18,
    transformPerspective: 800,
    duration: 0.65,
    ease: 'power3.out',
    stagger: 0.06,
    scrollTrigger: {
      trigger: group,
      start: 'top 85%',
      once: true
    }
  });
});
```

**Add class `reveal` to:** section headlines, body paragraphs, standalone CTAs
**Add class `reveal-group` to:** card containers, stat rows, nav items, process steps

---

### T1.4 — CTA Shimmer

Every primary CTA button has a shimmer `::before` element that loops every 3s. Signals interactivity before hover.

```css
.btn-primary {
  position: relative;
  overflow: hidden;
}
.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  animation: shimmer 3s ease-in-out infinite;
  animation-delay: 1.5s;
}
@keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
```

---

### T1.5 — Card Hover Lift

All cards respond to hover with Y lift + shadow deepen. Uses CSS transition, not GSAP — Tier 1 must work even if GSAP fails to load.

```css
.card {
  transition:
    transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1),
    box-shadow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-hover);
}
```

---

### T1.6 — Accent Underline on Text Links

Text links (within body copy, nav, footer) animate an underline on hover. Not a static underline — it draws in.

```css
.text-link {
  position: relative;
  text-decoration: none;
}
.text-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0%;
  height: 1px;
  background: var(--accent);
  transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.text-link:hover::after { width: 100%; }
```

---

### T1.7 — Section Background Depth

Every section has a radial gradient depth layer — never a flat background color. The gradient is subtle: same hue, 3–5% lighter or darker at the edges.

```css
.section {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, var(--bg-surface) 0%, var(--bg-base) 100%),
    var(--bg-base);
}
/* For dark sections within light sites: */
.section-dark {
  background:
    radial-gradient(ellipse 70% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 70%),
    var(--bg-inverse);
}
```

---

## TIER 2 — Expressive

Active when motion dial is `expressive` or `cinematic`. These are the animations that separate premium from generic. Each one solves a specific visual problem that Tier 1 can't.

---

### T2.1 — GSAP SplitText Line Reveal

Headlines split into lines, each line reveals upward with stagger. More dimensional than the base rotateX reveal because text lines feel like a curtain lifting.

```javascript
gsap.registerPlugin(SplitText);

document.querySelectorAll('.split-headline').forEach(el => {
  const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
  // Wrap each line to create overflow clip
  split.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'overflow: hidden; display: block;';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(split.lines, {
    y: '105%',
    opacity: 0,
    duration: 0.85,
    ease: 'power4.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: el,
      start: 'top 82%',
      once: true
    }
  });
});
```

**Add class `split-headline` to:** hero headline, section H2 headlines, pull quotes

CDN for SplitText: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js`

---

### T2.2 — Magnetic Buttons (gsap.quickTo)

Primary CTAs respond to mouse proximity with magnetic pull. `quickTo` caches the tween config — runs at 60fps without per-event overhead.

```javascript
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power4.out' });
  const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power4.out' });

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
    yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
  });
});
```

**Apply `btn-magnetic` class to:** hero primary CTA, final CTA primary button. Max 2 per page.

---

### T2.3 — 3D Card Tilt (perspective on parent)

Testimonial cards and service cards respond to mouse position with 3D tilt. `perspective` goes on the parent container — not the card (child perspective = fisheye distortion).

```javascript
document.querySelectorAll('.tilt-parent').forEach(parent => {
  parent.style.perspective = '900px';
});

document.querySelectorAll('.tilt-card').forEach(card => {
  const xTo = gsap.quickTo(card, 'rotateX', { duration: 0.25, ease: 'power2.out' });
  const yTo = gsap.quickTo(card, 'rotateY', { duration: 0.25, ease: 'power2.out' });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    xTo(-y * 8);
    yTo(x * 8);
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  });
});
```

**Add `tilt-parent` to:** testimonial grid wrapper, service card grid wrapper
**Add `tilt-card` to:** individual testimonial/service cards

---

### T2.4 — Blur-to-Sharp Stat Counters

Stats animate from 0 to target with simultaneous blur-to-sharp. Proxy object formatting ensures numbers display with proper formatting (commas, $, %) during animation — not just at completion.

```javascript
document.querySelectorAll('.stat-count').forEach(el => {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isDecimal = !Number.isInteger(target);
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: el,
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate() {
          const progress = obj.val / target;
          const display = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
          el.textContent = prefix + display.toLocaleString() + suffix;
          el.style.filter = `blur(${(1 - progress) * 8}px)`;
        },
        onComplete() {
          el.textContent = prefix + target.toLocaleString() + suffix;
          el.style.filter = 'none';
        }
      });
    }
  });
});
```

HTML: `<span class="stat-count" data-target="4200000" data-prefix="$" data-suffix="">0</span>`

---

### T2.5 — SVG Diagram Draw

Coordination diagrams, process flows, and connection lines draw themselves on scroll. Uses `strokeDashoffset` animation — no plugin required, though DrawSVG plugin (now free) simplifies the offset calculation.

```javascript
// Without plugin (manual offset calculation):
document.querySelectorAll('.draw-line').forEach(line => {
  const length = line.getTotalLength ? line.getTotalLength() :
    Math.hypot(line.x2.baseVal.value - line.x1.baseVal.value,
               line.y2.baseVal.value - line.y1.baseVal.value);
  line.style.strokeDasharray = length;
  line.style.strokeDashoffset = length;
});

ScrollTrigger.create({
  trigger: '.diagram',
  start: 'top 70%',
  once: true,
  onEnter: () => {
    gsap.to('.draw-line', {
      strokeDashoffset: 0,
      duration: 1.3,
      ease: 'power2.inOut',
      stagger: 0.2
    });
    // Nodes appear after their connecting line draws
    gsap.to('.diagram-node', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: 0.25,
      delay: 0.3
    });
  }
});
```

SVG design rule: stroked paths only — DrawSVG animates stroke, never fill.

---

### T2.6 — Parallax Sections

Background elements move at a slower rate than scroll speed, creating depth between foreground and background.

```javascript
gsap.utils.toArray('.parallax-bg').forEach(el => {
  gsap.to(el, {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
      trigger: el.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});
```

**Add `parallax-bg` to:** background image layers within sections. Do NOT apply to text content — text must remain stationary.

---

### T2.7 — Curtain Wipe Text Reveal

For high-emphasis standalone statements (pull quotes, hero sub-headlines, final CTA copy). The text wipes in from left via clip-path — feels like a curtain lifting rather than a dissolve.

```css
.curtain-reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}
.curtain-reveal.in-view {
  clip-path: inset(0 0% 0 0);
}
```

```javascript
const curtainObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      curtainObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.curtain-reveal').forEach(el => curtainObserver.observe(el));
```

---

## TIER 3 — Cinematic

Active only when motion dial is `cinematic`. These are the site-defining moments that make someone screenshot and send to a colleague. Use selectively — one or two per page maximum. Overuse cheapens them.

---

### T3.1 — Mouse-Reactive Gradient Hero

Hero background gradient responds to mouse position in real time. The gradient center tracks the cursor, creating a breathing, living environment.

```javascript
// Uses CSS custom properties updated via requestAnimationFrame
const hero = document.querySelector('.hero');
let mouseX = 0.5, mouseY = 0.5;
let currentX = 0.5, currentY = 0.5;

hero.addEventListener('mousemove', (e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
});

function lerp(a, b, t) { return a + (b - a) * t; }

function updateGradient() {
  currentX = lerp(currentX, mouseX, 0.04);
  currentY = lerp(currentY, mouseY, 0.04);
  hero.style.setProperty('--mouse-x', (currentX * 100).toFixed(2) + '%');
  hero.style.setProperty('--mouse-y', (currentY * 100).toFixed(2) + '%');
  requestAnimationFrame(updateGradient);
}
updateGradient();
```

```css
.hero {
  background: radial-gradient(
    ellipse 70% 60% at var(--mouse-x, 50%) var(--mouse-y, 40%),
    var(--accent-glow) 0%,
    transparent 60%
  ),
  var(--bg-base);
}
```

---

### T3.1b — Animated Mesh-Gradient Hero (the richer default)

The single mouse-radial above is the *floor* of an active hero. The premium move — extracted from Stripe's `minigl` hero and Zoom's "work connects" hero — is an **animated multi-stop mesh gradient**: 4–6 soft brand-tint blobs drifting on slow, desynchronized loops so the whole field *breathes*. The motion IS the brand, not decoration on top of it.

**Do not re-derive it — assemble `COMPONENTS.md` Primitive 4** (it carries the frozen correctness facts: blobs are siblings *behind* the copy, `overflow:hidden` clips the bleed so there's no `viewport-overflow`, drift is transform-only, and brand-tint stops only — a purple→blue mesh is the LAYOUT_CRAFT PART 7 slop tell at full size). Degrades to a static composed mesh with no JS; `prefers-reduced-motion` → frozen frame. See LAYOUT_CRAFT PART 9.1.

**Prefer T3.1b over T3.1** when the brand wants a living hero and has no video asset. Use the plain mouse-radial (T3.1) only for the lightest touch. Never stack both.

---

### T3.2 — Canvas Particle Field

Particle field that draws toward the cursor and disperses on mouse leave. Dark builds only — particles on light backgrounds always look cheap.

```javascript
// Vanilla JS canvas — no library
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
const PARTICLE_COUNT = 80;  // max 80 — more = cheap
const particles = [];
let mouseX = 0, mouseY = 0;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;  // tiny particles only
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.1;  // never above 0.5
  }
  update() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      this.speedX += (dx / dist) * 0.02;
      this.speedY += (dy / dist) * 0.02;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX *= 0.98;
    this.speedY *= 0.98;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;  // use accent color
    ctx.fill();
  }
}

// Only use in dark sections. Cap opacity at 0.3 for the canvas element itself.
canvas.style.opacity = '0.28';
```

**Restriction:** Only in sections with `--bg-base: dark tone`. Never on light sections. Never more than one particle canvas per page.

---

### T3.3 — Background Video with Scene Transitions

Cinematic hero or section using actual video footage. Three scenes that crossfade every 7s. Requires real video files — never use CSS gradient simulation as a substitute.

```javascript
const scenes = document.querySelectorAll('.video-scene');
let current = 0;

function nextScene() {
  scenes[current].classList.remove('active');
  current = (current + 1) % scenes.length;
  scenes[current].classList.add('active');
}

// Initialize
scenes[0].classList.add('active');
setInterval(nextScene, 7000);
```

```css
.video-scene {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}
.video-scene.active { opacity: 1; }
.video-scene video {
  width: 100%; height: 100%;
  object-fit: cover;
}
```

**For a video HERO, assemble `COMPONENTS.md` Primitive 5** (video hero with directional scrim) rather than re-deriving — it carries the poster-fallback, IntersectionObserver lazy-load, and reduced-motion contracts. The scene-crossfade code above is for a *background* video band, not the hero.

**Requirements:**
- Real video files in the `assets/video/` project folder (never a CSS simulation)
- Each video loop: 10–20s, H.264, 1080p max for web; `preload="none"` + lazy-load (no autoplay download until in view)
- `poster` image always set — it loads first and is what shows if video is slow/blocked/absent (the hero is never blank)
- **Legibility = a *directional* gradient scrim anchored to the text side** (`linear-gradient(105deg, rgba(8,8,8,.80) 0%, …, transparent 70%)`), **not** a uniform `rgba(0,0,0,.45)` rectangle over the whole frame (that flat box is the SECTION_PATTERNS 1D "no overlay rectangles" failure). The scrim must clear ≥ 4.5:1 body / ≥ 3:1 large contrast on the copy side while leaving the far side of the footage clean. See LAYOUT_CRAFT PART 9.2.
- Autoplay with `muted` + `playsinline` + `loop`; `prefers-reduced-motion` → do not autoplay, show poster

**If no real video:** ship the poster as a high-quality static hero (optionally with parallax). Never simulate video with CSS gradients — it reads as cheap immediately.

---

### T3.4 — Scroll-Scrubbed Section Reveal

Section content is pinned while the scroll position scrubs through an animation sequence. Creates the "Apple product page" feel where reading and scrolling are the same gesture.

```javascript
const section = document.querySelector('.scrub-section');
const content = section.querySelector('.scrub-content');

ScrollTrigger.create({
  trigger: section,
  start: 'top top',
  end: '+=100%',
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // Use self.progress (0-1) to drive animation state
    gsap.set(content, {
      opacity: self.progress,
      y: (1 - self.progress) * 40,
      rotateX: (1 - self.progress) * -15,
      transformPerspective: 800
    });
  }
});
```

**Use for:** A single defining section per page — the moment the page "unlocks." Not for every section.

---

## Implementation Rules

### For Agent 04

1. **Read the motion dial from the Design Brief.** Implement Tier 1 in every build, Tier 2 if dial ≥ `expressive`, Tier 3 only if dial = `cinematic`.

2. **Load scripts in correct order:**
```html
<!-- 1. GSAP core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<!-- 2. GSAP plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js"></script>
<!-- 3. Lenis (after GSAP) -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.25/dist/lenis.min.js"></script>
<!-- 4. Site JS (after all libraries) -->
<script>
  gsap.registerPlugin(ScrollTrigger, SplitText);
  // Initialize Lenis first, before any ScrollTrigger setup
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
  // Rest of animations below
</script>
```

3. **Prefers-reduced-motion:** Wrap all Tier 2 and Tier 3 animations:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  // Tier 2 and Tier 3 animations here
}
// Tier 1 CSS transitions must also respect this:
// @media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; } }
```

4. **`once: true` on all ScrollTrigger reveals.** Never replay on upscroll.

5. **Stagger minimum 40ms** between grouped elements. Maximum 120ms. Beyond 120ms the stagger becomes an unintended delay.

6. **Tier 3 restrictions:**
   - Canvas particles: dark tone only, opacity ≤ 0.3, max 80 particles
   - Video: real footage only, no CSS simulation
   - Maximum 2 Tier 3 animations per page — choose the defining moments

---

## Animation Anti-Patterns (Never Use)

- `animation: fadeIn 0.2s` — too fast, reads as a glitch not a reveal
- `transition: all` — never animate all properties
- `transform: scale(1.05)` on hover without shadow deepening — unanchored
- Simultaneous reveals with no stagger — looks like a page loading, not unveiling
- Bounce easing (`elastic.out`) on anything except magnetic return — bouncy = toy
- Pure `opacity: 0 → 1` with no Y or rotateX — the generic "it faded in"
- Particle systems on light backgrounds — always cheap
- `gsap.to()` in mousemove handlers — use `gsap.quickTo()` instead
- `perspective` on the card itself — always on the parent container
