# Website Factory — Design & Conversion Reference Library

> This document is the calibration standard for all build agents.
> Read it before generating any site. Every layout, copy pattern, and interaction decision is traceable to a reference here.

---

## RULE #1 — The Conversion Skeleton Is Constant

**Archetype changes the skin. Never the skeleton.**

Every site — regardless of archetype, client, or aesthetic direction — hits these 9 sections in this exact order.

| # | Section | Conversion Job |
|---|---------|---------------|
| 1 | **Hero** | Hook the right visitor in 3 seconds. Name the pain or outcome. CTA visible without scrolling. |
| 2 | **Pain Validation** | Make the ICP feel understood before pitching. 3–4 pains in the client's exact words. |
| 3 | **ICP Self-Sort** | Right-fit visitors identify themselves. Wrong-fit visitors self-exit. Never speak to everyone. |
| 4 | **Fit Assessment / MQL Capture** | The lead gate. 4 qualifying questions + email. Primary conversion event on the page. |
| 5 | **Services / Solution** | Outcomes tied to pains above. Not a feature list. |
| 6 | **Process** | Remove fear of reaching out. Show exactly what happens after they click. |
| 7 | **Proof** | Specific numbers, names, timelines. Never vague testimonials. |
| 8 | **Final CTA** | Dual path: high-commitment (book a call) + low-commitment (assessment). |
| 9 | **Footer** | Nav, contact, compliance disclaimer. Required before shipping. |

Agent 05 blocks QA if any section is missing or reordered.

---

## RULE #2 — CRO Principles That Cannot Be Traded for Aesthetics

These apply regardless of archetype or design direction. Design earns its place by serving these rules.

1. **Hero must answer in 5 seconds:** who you serve, what problem you solve, what to do next
2. **ICP eyebrow line in the hero** — "For Houston oil & gas executives" before the headline
3. **Pain acknowledged before solution** — always, in every archetype
4. **CTA visible without scrolling** at 1280px desktop — if it requires scroll, it's not above the fold
5. **Single CTA per section** — all CTAs on the page point to the same destination
6. **ICP self-sort within first 3 sections** — let people opt in or out fast
7. **Fit assessment = primary lead capture** — not a contact form. Assessment qualifies; contact form doesn't
8. **Social proof adjacent to friction** — stats + testimonials within 2 sections of the assessment
9. **Specificity over generality** in all copy — "Oil & gas executives with $5M–$30M net worth" beats "successful professionals"
10. **Animations cannot delay CTA appearance** — hero CTA loads with page, not on animation completion

---

## RULE #3 — Reference Tagging

Every reference site is tagged:
- **[DESIGN + CONVERTS]** — steal both structure AND visual technique
- **[DESIGN ONLY]** — visual technique only; do not copy IA or content architecture
- **[CONVERTS ONLY]** — structural pattern only; visual execution is mediocre

---

## Section-Mapped References

### Hero Section

**[DESIGN + CONVERTS]**

- **stripe.com** — WebGL noise-shader gradient hero. The gradient breathes on a loop using a custom `minigl` library (~10KB). This is the animated gradient benchmark. Steal: CSS custom property mesh gradient as the hero background, animated via GSAP timeline. The motion IS the brand, not decoration on top.

- **mercury.com** — Output visual as the hero right panel. Real product UI shown in motion, not a lifestyle image. For service firms: substitute the UI screenshot with a CSS-rendered coordination diagram or financial plan mockup. Steal: product/output visual as primary hero proof mechanism.

- **linear.app** — Dark product-interface hero with GSAP scroll animations. Real product shown in motion — not mockups. Engineering teams distrust marketing; showing the actual product in motion = trust. Steal: section-to-section transitions as user scrolls through product views.

- **stashwealth.com** — Full black advisory site that converts. Targets 30-somethings with high earning potential. Typography-forward, unapologetic, breaks every stale advisor convention. The benchmark for "dark wealth advisory that actually converts." Steal: the confidence of the full-dark commitment in a category that defaults to light.

- **mosey.com** (Awwwards HM) — SVG path reveal + kinetic typography timed to scroll position. Real business, real CTA. Steal: scroll-linked SVG stroke-dashoffset animation on headline characters.

- **b-reel.com** — Looping cinematic background video hero (sky footage). Restrained text overlay. No WebGL, no particles — confidence through restraint. Steal: the "single looping video as brand statement" pattern; for advisor sites, replace with storm→calm→golden hour footage sequence.

**[DESIGN ONLY]**

- **obys.agency** — Kinetic oversized typography where letters scale, split, and morph on scroll. Text IS the image. Too experimental for converting advisory sites but shows the ceiling for type-as-motion.

- **lusion.co** — WebGL physics particle hero. Too experimental for conversion contexts. Steal: the principle that the hero animation demonstrates the product/service promise — not decoration.

---

### Pain / Problem Section

**[DESIGN + CONVERTS]**

- **intercom.com** — Pain acknowledged in hero subhead before any solution. Steal: structure where the first 3 sections acknowledge pain before offering anything.

- **basecamp.com / hey.com** — "Other software makes simple things complicated." Steal: pain articulated as industry critique, not personal failing. Gives the visitor a villain to agree with.

- **gong.io** — Pain and proof interleaved. Steal: specific named pain → immediate proof it was solved → next pain. Don't batch all pain then all proof.

---

### ICP Self-Sort

**[DESIGN + CONVERTS]**

- **superhuman.com** — "Is Superhuman right for me?" as an explicit section. Forces the visitor to self-identify. Steal: ICP cards where clicking one reveals content specific to that segment.

- **convertkit.com** (now Kit) — Creator vs. Enterprise segmentation early in the page. Steal: the two-path fork that personalizes the scroll experience based on visitor type.

---

### Lead Capture / Fit Assessment

**[DESIGN + CONVERTS]**

- **james clear.com** — Email capture with a specific value proposition ("Get the 3-2-1 newsletter") not a generic "Subscribe." Steal: every form field has a reason to exist visible in the label or adjacent copy.

- **typeform.com** (as a pattern) — One question at a time, animated transitions between steps. Steal: the multi-step assessment pattern where each question appears individually rather than a wall of form fields. Higher completion rates.

---

### Social Proof / Stats

**[DESIGN + CONVERTS]**

- **stripe.com** — Stats with units that are specific and unexpected (not just "10,000 customers" but "businesses in 46 countries"). Steal: stat copy that says something specific about the breadth or nature of the outcome, not just a number.

- **gong.io** — Proof proximate to the pain it resolves. "Deal close rate improved 27%" appears next to the pain about losing deals. Steal: match each testimonial to the pain point it resolves, not random testimonials in a generic section.

---

### Final CTA

**[DESIGN + CONVERTS]**

- **framer.com** — Dual-path close executed cleanly. Primary CTA (start free) + secondary (see examples). Steal: secondary CTA is always lower-commitment, same visual hierarchy treatment with less visual weight.

---

## Full-Site Design References

### Light / Editorial Dominant

**[DESIGN + CONVERTS]**

- **lombardodier.com** ⭐ — Swiss private bank since 1796. Thought leadership layout: serif headline at ~80px → body at 18px with generous leading → full-bleed image break → repeat. Trains readers to expect depth. Steal: the "Rethink Everything" pattern — long-form scroll with large pull-quote serifs breaking dense editorial content. "Patek Philippe ad turned into a website."

- **pictet.com** — Geneva private bank. Type hierarchy via scale, never color. Four sizes (display, headline, subhead, body) do all organizational work. Color is never used as hierarchy signal. Steal: the discipline of using only scale and weight to organize — forces better copy because the type has to earn its size.

- **brunellocucinelli.com** — The "editorial pause." Hero is 60% cream negative space + italic 120px serif that asserts presence without selling. No CTA above the fold. The psychological effect: the brand doesn't need you. Steal: for wealth management — selective use of a section with no CTA communicates "we choose our clients" which converts sophisticated HNW prospects.

- **hoaresbank.co.uk** — Britain's oldest private bank (est. 1672). Classic serif on near-white, no stock photography, sparse navigation, absence of marketing language. The restraint IS the credential. Steal: the "we don't need to tell you we're premium" signal — for advisors serving old money, visual restraint outperforms visual polish.

- **aman.com** — Content embedded in environment, not stacked on top of it. Opacity and blur handle image/text layering so text feels inside the photograph, not overlaid on it. Steal: `mix-blend-mode` + blur handling on hero overlays to create depth rather than a dark gradient rectangle.

- **acollectedman.com** — Luxury watch marketplace site structured like a premium service business. Serif editorial type at large scale, extreme whitespace, 1–2 images per scroll section, journal section reads like print magazine. Steal: the editorial-to-commerce handoff — 3 scroll moments of editorial atmosphere then a clear CTA, without the editorial feeling like setup for a pitch.

- **hoganlovells.com** (Living Group redesign) — #1 law firm site globally, Living Ratings 2025. Condensed serif for hero statements at large scale over full-width photography, 6-item nav. Steal: the three-word service frames ("Grow, Protect, Innovate") that organize complex service pages without losing editorial weight.

**[DESIGN ONLY]**

- **patekphilippe.com** — "Object in space" layout: single watch, 70% white surround, minimal label. Too product-centric for a service firm. Steal the technique only: for hero sections where the "object" is a financial plan or coordination diagram, not a product.

- **davidchipperfield.com** — Typography as architecture. Projects listed as dense text; images only appear on hover. The confidence to withhold imagery and force word engagement. Too experimental for a converting advisory site, but teaches the principle.

---

### Dark / Precision Dominant

**[DESIGN + CONVERTS]**

- **twosigma.com** ⭐ — The "Bloomberg terminal meets consumer brand" benchmark. Tech-meets-finance aesthetic, dark interface, data visualization emphasis. This is Direction 03 (Dark Precision) done at institutional scale. Steal: the way data visualization IS the design, not decoration.

- **stashwealth.com** ⭐ — Full black advisory site that converts HNW clients under 40. Typography-forward, modern. The proof that full-dark works in wealth management when the ICP is right. Steal: the bold copy that assumes a smart reader ("We're not for everyone. We're for people who've figured out money is a tool.").

- **sound.capital** (Awwwards Honorable Mention) — Swiss independent wealth manager. The only Awwwards-credentialed wealth management site. Minimalist scroll-triggered text reveals with fixed-position background layers creating depth. Steal: the Swiss-precision approach where motion is restrained to single-axis reveals, nothing decorative.

- **xapo.com/bank** — Crypto-adjacent private bank. Black + orange accents. One of the most genuinely premium dark financial sites — futuristic without being loud. Steal: the single warm-metal accent system on true dark (not navy).

- **lombardodier.com** — Also dark-leaning in alternating sections. Deep charcoal tones, premium serif. Steal: the section alternation pattern (dark hero → light content → dark pull-quote → light).

- **pitch.com** — Buttery animations, bold-but-not-loud palette, excellent typographic hierarchy. Dark done well in SaaS. Steal: the way animation pacing communicates the product's own speed and smoothness.

**[DESIGN ONLY]**

- **rolls-roycemotorcars.com** — Deep navy/black + gold. Slow, deliberate animation pacing communicates "this takes time to build." The anti-pattern to cheap dark: no glow effects, no lens flares, no particles. Steal: animation duration as brand voice.

- **richardmille.com** — Technical/engineering precision on dark backgrounds. Geometry and precision as the luxury signal. Steal: the "watch movement as page architecture" pattern — data density and technical specificity as premium proof.

- **lombardodier.com** — Swiss restraint in financial services. See above.

- **pagani.com** — Material texture photography on near-black. The photography does all the work; the dark background is the gallery. Steal: for advisor sites with excellent photography, let the photography carry the page — dark as museum background.

---

## Technique Library

### CRITICAL: Premium vs. Cheap Dark (apply to all dark builds)

| Signal | Premium | Cheap |
|--------|---------|-------|
| Background | `#0D0D0D`, `#111111`, `#0e2340` (slight warm/cool tint) | `#000000` pure black |
| Elevation | Lighter darks for higher layers (cards = bg + 10%) | Drop shadows on dark |
| Card shadow | `inset 0 1px 0 rgba(255,255,255,0.08)` inner glow | `box-shadow: 0 4px 20px rgba(0,0,0,0.5)` |
| Body text | `#CCCCCC` or `rgba(255,255,255,0.75)` | Pure `#FFFFFF` (too harsh, causes bloom) |
| Accent color | 1 muted gold/jewel tone, low saturation | Multiple neons or fully-saturated |
| Display font | Editorial serif (EB Garamond, Canela, Editorial New) | Heavy compressed sans |
| Motion speed | `0.4–0.8s` ease-out | Fast bouncy, `0.1–0.2s` |
| Particles | Never | Cheap tell, always |
| Glow effects | Never (except targeted on one element) | Everywhere |

### GSAP Technique Specifications (use these exact patterns)

**Magnetic buttons — use `gsap.quickTo()` not `gsap.to()`:**
```javascript
// quickTo caches the tween — 60fps without overhead
const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power4.out' });
const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power4.out' });
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  xTo(e.clientX - rect.left - rect.width / 2);
  yTo(e.clientY - rect.top - rect.height / 2);
});
btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
```

**3D card tilt — `perspective` on the PARENT, not the card:**
```javascript
// perspective on child = fisheye distortion (wrong)
// perspective on parent = correct foreshortening (right)
parent.style.perspective = '900px';
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, duration: 0.25, ease: 'power2.out' });
});
```

**Stat counters — animate a proxy object, format in `onUpdate`:**
```javascript
// Formats live during animation (not just at end)
const obj = { val: 0 };
gsap.to(obj, {
  val: 4200000,
  duration: 2.2,
  ease: 'power2.out',
  onUpdate() {
    el.textContent = '$' + Math.ceil(obj.val).toLocaleString();
    el.style.filter = `blur(${(1 - obj.val/target) * 8}px)`;
  },
  onComplete() { el.style.filter = 'none'; }
});
```

**Curtain wipe text reveal (more premium than fade+translate):**
```css
.reveal-clip { clip-path: inset(0 100% 0 0); }
.reveal-clip.in { clip-path: inset(0 0% 0 0); transition: clip-path 0.8s cubic-bezier(0.25, 0.1, 0.25, 1); }
```

**SVG diagram draw (DrawSVG is now free):**
```javascript
gsap.registerPlugin(DrawSVGPlugin);
gsap.from('.diagram-line', {
  drawSVG: '0%',
  duration: 1.3,
  ease: 'power2.inOut',
  stagger: 0.3,
  scrollTrigger: { trigger: '.diagram', start: 'top 70%', once: true }
});
```

**Section scroll reveal — `rotateX` more premium than Y translate:**
```javascript
gsap.from('.reveal', {
  opacity: 0,
  rotateX: -15,
  transformOrigin: '0% 50%',
  transformPerspective: 700,
  y: 30,
  duration: 0.8,
  stagger: 0.06,
  ease: 'power3.out',
  scrollTrigger: { trigger: el, start: 'top 88%', once: true }
});
```

---

## Typography Reference

### Display / Hero Headlines
- **EB Garamond** (Google Fonts, free) — editorial serif, strong on both light and dark, slight warmth. Current default.
- **Canela** (Commercial Type, paid) — "the signature premium dark pairing right now." Thin strokes glow slightly on dark.
- **Editorial New** (Pangram Pangram, paid) — high-contrast editorial serif, Awwwards-seen everywhere in 2024–2025.
- **Noe Display** (Schick Toikka, paid) — premium alternative if Canela is unavailable.

For free builds: EB Garamond is the correct choice. For clients willing to invest in typography: recommend Canela or Editorial New as the display face.

**Premium dark body pairing:** Canela (display) + Inter (body) = signature premium dark combination per 2025 reference research.

### Body / UI
- **Nunito Sans** — current default body font. Clean, approachable, slightly rounded. Good for wealth advisory.
- **Inter** — slightly more technical/precision feel. Better for Direction 03 (Dark Precision).
- **IBM Plex Sans** — data-dense feel, pairs well with quant/finance aesthetics.

---

## Free GSAP Plugins (confirmed free as of 2025)

GSAP made all Club plugins free in late 2024/early 2025:
- **ScrollTrigger** — always free
- **SplitText** — now free (use instead of Splitting.js)
- **DrawSVG** — now free (stroke-dashoffset animation)
- **ScrollSmoother** — now free (alternative to Lenis)
- **MorphSVG** — now free

CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js`
SplitText: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/SplitText.min.js`

---

## Design Gallery Resources (for ongoing reference)

| Resource | Best for |
|----------|---------|
| gsap.com/showcase | GSAP animation examples (production-proven) |
| tympanus.net/codrops | Source code + technique breakdown for specific effects |
| awwwards.com/awwwards/collections/dark-mode | Curated dark mode sites |
| awwwards.com/awwwards/collections/animation | Animation-first sites |
| saaspo.com/style/dark-mode | Live-updated dark SaaS landing pages |
| lapa.ninja/color/black | 1,700+ dark landing pages, filterable |
| freefrontend.com/scroll-trigger-js | 60+ ScrollTrigger examples curated |
| awwwards.com/sites/soundcapital | The Awwwards wealth management benchmark |
| thomasdigital.com/industry/hedge-fund-websites | 40 hedge fund site examples |

---

## Anti-Slop Checklist

Agent 04 and Agent 05 must verify ALL of these before shipping.

### Typography
- [ ] No Inter as the display font (only acceptable as body/UI)
- [ ] No Arial, Roboto, or system-ui anywhere
- [ ] Hero headline ≥ 60px on desktop, weight 400–500 (not bold)
- [ ] Line height 1.0–1.1 on display, 1.6–1.75 on body
- [ ] Letter spacing slightly negative on large display (-0.02em to -0.03em)
- [ ] Body text NOT pure white on dark (use rgba(255,255,255,0.7) or #CCCCCC)

### Color
- [ ] Background is NOT pure `#000000` (use near-black with slight tint)
- [ ] Accent color appears in ≤ 3 places: logo, primary CTA, one hero element
- [ ] No gradient text (except very selective use on hero italic word)
- [ ] Dark sections use elevation via lighter backgrounds, not drop shadows

### Layout
- [ ] No bento grid layouts
- [ ] No centered hero with centered body text below centered CTA (looks AI-generated)
- [ ] Sections alternate between visual weight levels — not all the same density
- [ ] Grid is 12-column, sections don't all use the same column count

### Components
- [ ] No particle.js or generic particle backgrounds in production builds (cheap signal)
- [ ] Particle canvas: only in Dark Precision archetype, at ≤ 30% opacity
- [ ] No standard Bootstrap/Tailwind button shapes
- [ ] Cards have 3-layer shadow system: `0 2px 8px, 0 6px 20px, 0 1px 3px`
- [ ] Primary CTA has shimmer `::before` animation
- [ ] `perspective` on card parent containers, not individual cards

### Animation
- [ ] Animations: `0.4–0.8s` duration, never linear, never `0.1–0.2s` snappy
- [ ] `prefers-reduced-motion` respected — all animations wrapped in media query check
- [ ] Scroll reveals use `once: true` — never replay on upscroll (looks cheap)
- [ ] No simultaneous reveals — stagger minimum 40ms between elements

### Copy
- [ ] No "fiduciary" in the first paragraph (everyone says it)
- [ ] No stock phrases: "comprehensive", "holistic", "personalized", "solutions"
- [ ] ICP named specifically in first 3 sections
- [ ] Stats include units and specificity (not just the number)
- [ ] Social proof includes name, role, outcome — never anonymous

### Financial Services Specific
- [ ] Compliance disclaimer in footer (required before any site ships)
- [ ] No performance guarantees in copy
- [ ] "Past performance" disclaimer near any stats section
- [ ] CTA is "Schedule a Call" or "See If We're a Fit" — not "Get Started" or "Sign Up"
- [ ] Assessment/quiz is the primary lead capture — contact form is secondary
