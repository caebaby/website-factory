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

All sites below are Chris-approved.

---

## Section-Mapped References

### Hero Section

**[DESIGN + CONVERTS]**

- **stripe.com** — WebGL noise-shader gradient hero. The gradient breathes on a loop using a custom `minigl` library (~10KB). This is the animated gradient benchmark. Steal: CSS custom property mesh gradient as the hero background, animated via GSAP timeline. The motion IS the brand, not decoration on top.

- **mercury.com** — Output visual as the hero right panel. Real product UI shown in motion, not a lifestyle image. For service firms: substitute the UI screenshot with a CSS-rendered coordination diagram or financial plan mockup. Steal: product/output visual as primary hero proof mechanism.

- **linear.app** — Dark product-interface hero with GSAP scroll animations. Real product shown in motion — not mockups. Engineering teams distrust marketing; showing the actual product in motion = trust. Steal: section-to-section transitions as user scrolls through product views.

- **stashwealth.com** — Full black advisory site that converts. Targets 30-somethings with high earning potential. Typography-forward, unapologetic, breaks every stale advisor convention. The benchmark for "dark wealth advisory that actually converts." Steal: the confidence of the full-dark commitment in a category that defaults to light.

**[DESIGN ONLY]**

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

- **stripe.com** — Stats with units that are specific and unexpected. Steal: stat copy that says something specific about the breadth or nature of the outcome, not just a number.

- **gong.io** — Proof proximate to the pain it resolves. Steal: match each testimonial to the pain point it resolves, not random testimonials in a generic section.

---

### Final CTA

**[DESIGN + CONVERTS]**

- **framer.com** — Dual-path close executed cleanly. Primary CTA (start free) + secondary (see examples). Steal: secondary CTA is always lower-commitment, same visual hierarchy treatment with less visual weight.

---

## Full-Site Design References

### Light / Editorial

**[DESIGN + CONVERTS]**

- **pictet.com** — Geneva private bank. Type hierarchy via scale, never color. Four type sizes do all organizational work. Color is never used as a hierarchy signal. Steal: the discipline of using only scale and weight to organize — forces better copy because the type has to earn its size.

- **hoaresbank.co.uk** — Britain's oldest private bank (est. 1672). Classic serif on near-white, no stock photography, absence of marketing language. The restraint IS the credential. Steal: the "we don't need to tell you we're premium" signal.

---

### Dark / Precision

**[DESIGN + CONVERTS]**

- **twosigma.com** ⭐ — The "Bloomberg terminal meets consumer brand" benchmark. Tech-meets-finance aesthetic, dark interface, data visualization emphasis. Steal: the way data visualization IS the design, not decoration.

- **stashwealth.com** ⭐ — Full black advisory site that converts HNW clients under 40. Typography-forward, modern. Proof that full-dark works in wealth management. Steal: bold copy that assumes a smart reader.

- **xapo.com/bank** — Crypto-adjacent private bank. Black + warm metal accents. Genuinely premium dark financial site — futuristic without being loud. Steal: the single warm-metal accent system on true dark.

- **pitch.com** — Buttery animations, bold-but-not-loud palette, excellent typographic hierarchy. Dark done well in SaaS. Steal: animation pacing that communicates product speed and quality.

---

## Technique Library

### CRITICAL: Premium vs. Cheap Dark

| Signal | Premium | Cheap |
|--------|---------|-------|
| Background | `#0D0D0D`, `#111111` (tinted near-black) | `#000000` pure black |
| Elevation | Lighter darks for higher layers | Drop shadows on dark |
| Card shadow | `inset 0 1px 0 rgba(255,255,255,0.08)` inner glow | `box-shadow: 0 4px 20px rgba(0,0,0,0.5)` |
| Body text | `#CCCCCC` or `rgba(255,255,255,0.75)` | Pure `#FFFFFF` (causes bloom) |
| Accent color | 1 muted gold/jewel tone, low saturation | Multiple neons or fully-saturated |
| Display font | Editorial serif (EB Garamond, Canela) | Heavy compressed sans |
| Motion speed | `0.4–0.8s` ease-out | Fast bouncy, `0.1–0.2s` |
| Particles | Never | Cheap tell, always |
| Glow effects | Never (except targeted on one element) | Everywhere |

### GSAP Technique Specifications

**Magnetic buttons — use `gsap.quickTo()` not `gsap.to()`:**
```javascript
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
parent.style.perspective = '900px';
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, duration: 0.25, ease: 'power2.out' });
});
```

**Stat counters — proxy object with live formatting:**
```javascript
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

**Curtain wipe text reveal:**
```css
.reveal-clip { clip-path: inset(0 100% 0 0); }
.reveal-clip.in { clip-path: inset(0 0% 0 0); transition: clip-path 0.8s cubic-bezier(0.25, 0.1, 0.25, 1); }
```

**SVG diagram draw (DrawSVG is free):**
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

---

## Typography Reference

### Display / Hero
- **EB Garamond** (Google Fonts, free) — editorial serif, strong on light and dark. Current default.
- **Canela** (Commercial Type, paid) — signature premium dark pairing. Thin strokes glow on dark.
- **Editorial New** (Pangram Pangram, paid) — high-contrast editorial serif.

### Body / UI
- **Nunito Sans** — current default. Clean, approachable. Good for wealth advisory.
- **Inter** — technical/precision feel. Better for Dark Precision direction.
- **IBM Plex Sans** — data-dense feel, pairs well with quant/finance aesthetics.

---

## Free GSAP Plugins (confirmed 2025)

- **ScrollTrigger** — always free
- **SplitText** — now free (use instead of Splitting.js)
- **DrawSVG** — now free
- **ScrollSmoother** — now free (alternative to Lenis)
- **MorphSVG** — now free

CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js`

---

## Design Gallery Resources

| Resource | Best for |
|----------|---------|
| gsap.com/showcase | GSAP animation examples (production-proven) |
| tympanus.net/codrops | Source code + technique breakdown |
| awwwards.com/awwwards/collections/dark-mode | Curated dark mode sites |
| saaspo.com/style/dark-mode | Live-updated dark SaaS landing pages |
| lapa.ninja/color/black | 1,700+ dark landing pages, filterable |
| freefrontend.com/scroll-trigger-js | 60+ ScrollTrigger examples |

---

## Anti-Slop Checklist

### Typography
- [ ] No Inter as display font
- [ ] No Arial, Roboto, or system-ui
- [ ] Hero headline ≥ 60px desktop, weight 400–500
- [ ] Line height 1.0–1.1 display, 1.6–1.75 body
- [ ] Letter spacing slightly negative on large display (-0.02em to -0.03em)
- [ ] Body text NOT pure white on dark

### Color
- [ ] Background NOT pure `#000000`
- [ ] Accent color in ≤ 3 places
- [ ] No gradient text
- [ ] Dark sections: elevation via lighter backgrounds, not drop shadows

### Layout
- [ ] No bento grid layouts
- [ ] No centered hero + centered body + centered CTA
- [ ] Sections alternate visual weight
- [ ] 12-column grid, sections vary column count

### Components
- [ ] No particle backgrounds in production (cheap signal)
- [ ] Cards have 3-layer shadow: `0 2px 8px, 0 6px 20px, 0 1px 3px`
- [ ] Primary CTA has shimmer `::before` animation
- [ ] `perspective` on card parent containers, not individual cards

### Animation
- [ ] `0.4–0.8s` duration, never linear
- [ ] `prefers-reduced-motion` respected
- [ ] Scroll reveals use `once: true`
- [ ] Stagger minimum 40ms between elements

### Copy
- [ ] No "fiduciary" in first paragraph
- [ ] No: "comprehensive", "holistic", "personalized", "solutions"
- [ ] ICP named specifically in first 3 sections
- [ ] Stats include units and specificity
- [ ] Social proof: name, role, outcome — never anonymous

### Financial Services
- [ ] Compliance disclaimer in footer
- [ ] No performance guarantees
- [ ] "Past performance" disclaimer near stats
- [ ] CTA is "Schedule a Call" or "See If We're a Fit"
- [ ] Assessment = primary lead capture; contact form = secondary
