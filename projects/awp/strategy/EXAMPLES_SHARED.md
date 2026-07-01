# AWP — Three Homepage Directions for Alex (shared build spec)

**Goal:** 3 client-facing homepage *directions* for Anchor Wealth Planning (Alex Miller) to react to. Same brand DNA + same copy + same 9-section conversion skeleton — **only the register, composition, signature, and imagery change.** This is the factory's real-world test: prove the dials produce genuinely different $25k sites from one brand.

Each direction is ONE self-contained homepage HTML file in `projects/awp/build/`:
- Heritage → `index-heritage.html`
- Warm → `index-warm.html`
- Modern → `index-modern.html`

---

## READ BEFORE BUILDING (the doc stack — non-negotiable)
`templates/editorial-luxury/`: `DESIGN.md`, `SECTION_MANIFEST.md`, `DESIGN_TOKENS.md`, `SECTION_PATTERNS.md`, `MOTION_TIERS.md`, `DESIGN_FUNDAMENTALS.md`, `LAYOUT_CRAFT.md` (esp. **PARTS 8–10**: ceiling/make-it-sing, signature backgrounds, content-block rhythm), `COMPONENTS.md` (assemble the tested primitives — do NOT re-derive them), `PAGE_SYSTEM.md`.
Copy: `projects/awp/copy/COPY_ALL.md` (HOMEPAGE section — use this verbatim where possible). Brand/ICP: `projects/awp/INTAKE.md`, `projects/awp/research/ICP_BRIEF.md`.
**Quality bar references to study** (the proven look): `projects/field/build/index-rebuild.html`, `qa/fixtures/signature-hero-proof.html`, `qa/fixtures/scroll-color-theming.html`.

## SHIP GATE (every direction)
`node qa/run-checks.js projects/awp/build/index-<dir>.html '<accentHex>'` must return **0 P0 blockers**. Self-run it and fix until clean. (1 P2 `accent-fill-absent` is acceptable only on the scroll-themed Modern direction.)

---

## BRAND TOKENS (all directions — AWP brand guide)
```
--primary/navy:  #1e395a   rgb 30,57,90
--accent/gold:   #b18f4d   rgb 177,143,77
--steel:         #3d5a75
--pigeon:        #748ba0   (muted text)
--robin:         #c0d8e9   (light accent)
--cream/base:    #F5F0E6
--cream-mid:     #EDE8DA
--surface:       #FFFFFF
```
Fonts (brand web subs, via Google Fonts): **EB Garamond** (display/serif) + **Nunito Sans** (body). These are the AWP brand's specified substitutes — do NOT swap to Satoshi/Fontshare here; this client has a defined brand. EB Garamond + Nunito Sans are NOT on the banned list.
Maritime restraint: anchor mark in nav + tagline only; ONE subtle wave/anchor motif max. Do NOT scatter nautical icons. Custom SVG icons only (never emoji, never stock icon packs — see LAYOUT_CRAFT PART 7 dated-UI tells).

## VERIFIED IMAGERY (these URLs are confirmed-resolving — use ONLY these; do not invent Unsplash IDs, they 404)
Append `?auto=format&fit=crop&w=1600&q=80` (or w=900 for cards). All labeled as placeholders for Alex's real photos.
- Skyline dusk over water (energy-capital): `https://images.unsplash.com/photo-1531218150217-54595bc2b934`
- Glass towers, dramatic upward (corporate authority): `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab`
- Downtown financial street: `https://images.unsplash.com/photo-1449824913935-59a10b8d2000`
- **Hands planning over laptops + documents (coordinated planning — the differentiator):** `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40`
- **Multi-generational family at beach sunset (legacy / HNW family / warmth):** `https://images.unsplash.com/photo-1511895426328-dc8714191300`
- Smiling man portrait (client placeholder): `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d`
- Suited executive, faceless (executive ICP — does NOT impersonate Alex): `https://images.unsplash.com/photo-1560250097-0b93528c311a`
- Modern office interior (neutral): `https://images.unsplash.com/photo-1497366216548-37526070297c`
Every `<img>` needs descriptive alt text AND a nearby tasteful note that final photos are Alex's (e.g., a small caption or a one-line "Imagery placeholder — final photography from the client" in the footer). Do not splash loud amber boxes over photos.

## PLACEHOLDER / HONESTY RULES (FINRA + factory rule: never fabricate)
- `[VERIFY: 10]+ years` etc. → render the value inline cleanly ("10+ years at Merrill Lynch") and leave an HTML comment `<!-- VERIFY: confirm exact years -->`. These are near-certain facts; no visible amber.
- `[TESTIMONIAL: ...]` → **never fabricate a quote.** Render the testimonial section as a tasteful *pending* state: a designed quote-card with the suggested-angle text in muted italic clearly labeled `Illustrative — client testimonials added at launch (pending FINRA approval)`. Honest, designed, not deceptive.
- Stats strip: use only the real ones (`10+` yrs, `100%` fiduciary/fee-only, `1` shared plan); the "families served" stat → `<!-- VERIFY -->` and show as `—` or omit, never invent a number.
- Footer: keep the compliance disclaimer (HTML comment + visible small print) from COPY_ALL.
- Fit-assessment form posts to `#` (no real endpoint) — it's a demo.

## MOTION / TECH (all)
GSAP 3.13 + ScrollTrigger (+ SplitText/DrawSVG as needed) + Lenis 1.3.25 via CDN. Respect `prefers-reduced-motion`; never let JS failure blank the page; hero CTA never waits on JS/fonts. Single self-contained HTML file. Mobile-first; verify 390/768/1280.

---

## DIRECTION 1 — HERITAGE (the private-bank / cool-editorial register)
**One line:** Pictet/Hoare's-grade restraint — navy + gold, editorial serif, the confident asymmetric hero, authority through typography and whitespace. The "we don't need to impress you" signal.
- **Dials:** Tone light (cream base, navy dark sections) · Density editorial · Motion expressive · Type editorial-serif (EB Garamond display) · Visual graphic-system + minimal photography.
- **Color commitment (8.3):** Committed — gold owns the final-CTA *or* the stats band as a drench/zone; navy owns hero + stats + final CTA. Gold is the precious-metal accent, scarce as glyphs but it OWNS one zone. Not timid.
- **Hero:** SECTION_PATTERNS **1C Asymmetric Editorial** — H1 (the COPY_ALL hero question) full-width EB Garamond ~80px, subhead+CTAs in the left column, right negative space holds ONE large low-opacity gold anchor SVG (~300px, 8%). Background: subtle cream radial depth. Optional: the skyline image as a faint, tasteful right-edge bleed at low opacity (energy-capital whisper) — keep restrained.
- **Signature moment (8.6):** **The Margin-Notes Process** — the Process section as a marked-up manuscript page (cream-mid, EB Garamond body, gold italic margin notes from COPY_ALL: "← this is just a conversation", "← usually 1–2 weeks", "← you keep this document", "← proactive, not reactive"), a thin gold margin rule connecting the 4 steps, notes stagger in 0.4s after each step. NO numbered circles/timeline. This is the screenshot moment.
- **Imagery:** minimal — glass-towers or skyline as ONE restrained section accent; faceless-exec for the executive ICP card watermark. Heritage leans typographic (8.7: cool-editorial can carry type-only).
- **Patterns:** Pain 2B editorial stack (alternating bands) · Trust T1 authority strip (navy tone-flip) · ICP 3A profile cards w/ custom SVG ICP icons · Assess 4A multi-step (COMPONENTS Primitive 2) · Services 5A numbered editorial · Proof 7A stats + (pending) testimonials · Final 8A centered close, navy, gold accent.
- **Accent hex for gate:** `#b18f4d`.

## DIRECTION 2 — WARM (the human-relationship register — tests LAYOUT_CRAFT 8.7)
**One line:** Maven-grade warm-human premium applied to wealth — the trusted human coordinator, not a cold institution. Photography-led, warmer palette, oversize stats, testimonials on a warm ground.
- **Dials:** Tone light-warm (cream base, lean on gold/bronze warmth + a soft navy for grounding) · Density balanced · Motion expressive · Type editorial-serif headers + Nunito Sans body · Visual **photography** (this register REQUIRES real photography — 8.7).
- **Color commitment:** Committed-warm — gold/bronze carries more surface than Heritage; a warm cream/gold testimonial band (Maven's sage-ground move, in AWP's warm palette). Crescendo to a warm close.
- **Hero:** SECTION_PATTERNS **1A The Split** — copy left (hero question + subhead + CTAs), right = the **family-at-sunset** image (legacy/warmth) OR the planning-hands image, in a soft rounded frame with depth. Warm, human, immediately relational. Eyebrow muted ink.
- **Signature moment:** **Oversize stat showcase + warm testimonial feature** — the proof section as the emotional peak: 72px+ gold stat numbers (blur-to-sharp count-up, COMPONENTS/MOTION T2.4) over a warm cream-gold ground, then a featured (pending) testimonial as a magazine-style pull quote with the planning-hands or family image alongside. Plus the planning-hands image anchoring the Services/coordination block.
- **Imagery (required, from the verified list):** family-at-sunset (hero or proof), hands-planning (services/coordination), smiling-man or office (about/advisor placeholder). Warm, documentary — never clinical.
- **Patterns:** Pain 2B or 2A · Trust T2 credential editorial (warm) · ICP 3A cards with photography accents · Assess 4B inline or 4A · Services 5A/5B with the planning image · Proof **7C anchor testimonial** (the warm peak) · Final 8B split warm close.
- **Accent hex for gate:** `#b18f4d`.

## DIRECTION 3 — MODERN (the confident-challenger register — tests the new primitives)
**One line:** Contemporary fee-only RIA breaking from the wirehouse — bigger type, committed color, a signature animated background. Premium but current, not stuffy.
- **Dials:** Tone mixed/dark-leaning (navy grounds, cream relief) · Density balanced · Motion **cinematic** · Type modernist-leaning (EB Garamond display still, tighter tracking, heavier contrast) · Visual graphic-system.
- **Color commitment:** Committed→Drenched — navy and/or gold own multiple zones; a gold-drenched final CTA crescendo.
- **Hero signature (pick ONE, assemble from COMPONENTS):**
  (a) **Mesh-gradient hero** (Primitive 4) in AWP navy+gold+steel tints behind a bold hero question (SplitText line reveal) — the "living" modern hero; OR
  (b) **Scroll-driven color theming** (Primitive 6) across the page sections (navy → cream → gold-jewel → navy), the page recoloring as you scroll — the Instrument move, paired contrast-checked themes. Pick (b) if you want the standout; it's the most distinctive. (If (b), the 1 P2 accent-fill-absent is acceptable.)
- **Signature moment (8.6):** whichever background you chose IS the signature, plus consider a **coordination diagram** (DrawSVG, MOTION T2.5) visualizing CPA+Attorney+Advisor converging on one plan — content-specific to the differentiator.
- **Imagery:** skyline/glass-towers as a dramatic dark hero underlay (with scrim, Primitive 5 scrim treatment) OR keep the hero graphic (mesh) and use towers in a section.
- **Patterns:** Pain 2A ticker + cards · Trust T1 authority strip · ICP 3A/3C · Assess 4A multi-step · Services 5B outcome cards or 5A · Proof 7A stats (count-up) + pending testimonials · Final 8A/8C immersive drenched close.
- **Accent hex for gate:** `#b18f4d`.

---

## WHAT TO RETURN (each build agent)
The built file path, the `node qa/run-checks.js` result (P0/P1/P2 counts), which COMPONENTS primitives you assembled, the signature moment, and any [VERIFY]/[TESTIMONIAL] items left as pending. Do NOT grade your own taste — a separate critic does that.
