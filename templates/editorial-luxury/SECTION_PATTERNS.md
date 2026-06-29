# Section Pattern Library
## editorial-luxury template

Each of the 9 mandatory sections offers 3–4 layout patterns. Agent 02.5 selects one pattern per section in the Design Brief based on the client's ICP, dial settings, and content assets. Agent 04 implements the selected pattern using the Design Brief tokens.

Pattern selection is not style — it's composition. The same pattern at different token values produces genuinely different sites.

---

## HOW TO READ THIS DOCUMENT

Each pattern entry specifies:
- **Layout** — the composition in plain words
- **Works with** — which dial combinations suit it
- **Requires** — content assets needed to execute it well
- **CRO note** — conversion implication
- **Avoid if** — conditions that make this pattern the wrong choice

---

## SECTION 1 — HERO

Conversion job: Hook the right visitor in ≤5 seconds. Communicate ICP, pain/outcome, and CTA without scrolling.

**Non-negotiable hero elements (in every pattern):**
- ICP eyebrow line above the headline
- Headline names the pain or outcome (not the service)
- Primary CTA above fold at 1280px
- Secondary low-commitment CTA adjacent

---

### 1A — The Split
**Layout:** Copy occupies left 55%. Visual occupies right 45%. Headline at 64–80px, stacked vertically. CTAs below headline. Visual is a coordination diagram, product mockup, abstract geometric, or single strong image.

**Works with:** Tone: light or mixed | Density: editorial or balanced | Type: any

**Requires:** A clear visual asset — diagram, graphic, or strong single image. Not stock photography.

**CRO note:** Dual-panel creates natural scan path: eye enters headline (left), then proof visual (right), then CTA. The visual functions as immediate proof alongside the promise.

**Avoid if:** The visual language dial is `typographic` — no visual asset to fill the right panel.

---

### 1B — The Statement
**Layout:** Full-width composition. Headline dominates at 80–112px, runs across the full grid or breaks at a natural phrase boundary. ICP eyebrow above. Sub-headline below at 20–22px. CTAs as inline pair below the sub. Background is active: gradient, canvas, or subtle texture — never flat color.

**Works with:** Tone: dark or light | Density: balanced | Motion: expressive or cinematic | Type: editorial-serif or modernist-sans

**Requires:** A headline strong enough to own the full width. Background animation (mouse-reactive gradient, canvas, or slow-motion graphic). Weak headlines collapse under this composition.

**CRO note:** The headline must do all the work — there's no visual to compensate. Highest impact when the headline is provocative or specific. "You've built the wealth. Now it needs a strategy." beats "Comprehensive wealth management."

**Avoid if:** The headline is generic or the copy hasn't been written yet (placeholder headlines destroy this pattern).

---

### 1C — The Asymmetric Editorial
**Layout:** Headline runs full width at 80–100px with intentional ragged right (no forced line breaks). Sub-headline and CTAs occupy left column only (max 520px). Right two columns are empty or hold a large numeral, year, or single accent element. Extreme whitespace on the right creates visual tension.

**Works with:** Tone: light | Density: editorial | Motion: restrained or expressive | Type: editorial-serif

**Requires:** Confidence in negative space. A headline that reads powerfully on one line before it wraps. Works best with photography as the section background or immediately below.

**CRO note:** The asymmetry communicates "we don't need to fill every pixel" — which is itself a premium signal. Works for advisors positioned above the competition, not beside them.

**Avoid if:** Motion dial is `cinematic` (competing energies). ICP is younger / tech-adjacent (reads as stiff).

---

### 1D — The Immersive
**Layout:** Full viewport height. Background is video loop, scroll-scrubbed canvas, or full-bleed photography with parallax. Text overlay: ICP eyebrow + headline at 72px+ + sub + CTA. Text contrast handled by semi-opaque overlay panel or strategic placement on dark area of image. NO gradient overlay rectangles.

**Works with:** Tone: dark or mixed | Density: balanced | Motion: cinematic | Visual: photography

**Requires:** Strong video or photography assets — this pattern collapses without them. If using CSS video simulation, make it convincing (not placeholder gradients).

**CRO note:** Immersive creates emotional state before conveying information. Effective for aspirational ICPs (executives, business owners at inflection points). Requires ICP eyebrow to be prominent — emotion without specificity converts nobody.

**Avoid if:** Client has no real video or photography. Motion dial is `restrained`.

---

## SECTION 2 — PAIN VALIDATION

Conversion job: Make the ICP feel understood before pitching. 3–5 specific pains in their exact words.

**Non-negotiable:** Pain before any mention of solution. No service names in this section.

---

### 2A — The Ticker + Cards
**Layout:** Full-width CSS marquee of 6–8 short pain phrases runs as a continuous loop. Below: horizontal row of 4–5 numbered pain cards, each with a 2–4 word headline and 1–2 sentence description. Cards have drag-scroll on mobile.

**Works with:** Any tone | Density: balanced or dense | Motion: any

**CRO note:** Ticker creates immediate pattern recognition — visitors see their pain scrolling before they've committed to reading. High scroll-stopper value. Cards let them confirm the specifics.

**Avoid if:** Density dial is `editorial` (ticker feels too kinetic for restrained environments). Use 2B instead.

---

### 2B — The Editorial Stack
**Layout:** Each pain is a full-width row: large pain number (01, 02...) in light text at 80px left-column, pain headline at 36–44px right-column, description below the headline. Hairline separator between rows. Slow staggered reveal on scroll.

**Works with:** Tone: light | Density: editorial | Motion: restrained or expressive | Type: editorial-serif

**Requires:** Well-written pain headlines that stand alone at large scale.

**CRO note:** The numbered editorial format implies a thorough accounting of the problem — signals deep ICP understanding. Slower to consume but higher retention.

**Avoid if:** More than 5 pains (becomes exhausting). Motion dial is `cinematic` (pacing mismatch).

---

### 2C — The Wall
**Layout:** 2×3 or 3×2 grid of pain cards. Each card: icon or numeral + headline (20px, semi-bold) + 1–2 sentence description. Compact. All cards visible at once without scrolling on desktop.

**Works with:** Tone: any | Density: dense | Motion: expressive | Visual: graphic-system

**CRO note:** Dense grid lets visitors scan all pains quickly — good for analytical ICPs who self-qualify by pattern recognition. Higher cognitive load but faster qualification.

**Avoid if:** Type is `editorial-serif` with `editorial` density — visual discord.

---

## SECTION 2.5 — TRUST ESTABLISHMENT

Conversion job: Buy permission to keep talking. Immediately after the pain lands, prove the firm is credible enough to be worth the visitor's attention — *before* any pitch or ask. This is the manifest's mandatory core section #4 (between The Problem and Who We Serve).

**Non-negotiable:** No CTA in this section (QA blocks a CTA here). Authority signals only: credentials, fiduciary standard, scale, affiliations, named recognition. Quiet confidence, not a sales push.

---

### T1 — The Authority Strip
**Layout:** Full-width band, visually distinct from the sections around it (tone flip — dark strip in a light site, elevated surface in a dark site). A single line of credibility: fiduciary line + 3–4 hairline-separated proof points (years, AUM or households served, credential marks: CFP®/CFA/CPA). Optional: a row of muted partner/custodian logos (Schwab, Fidelity) below, desaturated.

**Works with:** Any tone | Density: balanced or dense | Motion: restrained or expressive

**Requires:** Real, verifiable proof points. Mark any unconfirmed number `[VERIFY]` — never invent.

**CRO note:** A tone-flipped strip reads as a structural "pause for credentials" — the visitor registers authority without being sold to. Highest trust-per-pixel of any pattern.

**Avoid if:** The firm has no confirmable proof points yet (use T3 instead — let the standard carry it).

---

### T2 — The Credential Editorial
**Layout:** Left column: a one-sentence statement of the firm's standard ("We are held to a fiduciary standard — legally bound to your interest, not a product shelf."). Right column: 3 stacked credibility rows, each a credential/affiliation with a one-line plain-English gloss (what CFP® actually means for them). Hairline separators. Slow staggered reveal.

**Works with:** Tone: light or mixed | Density: editorial | Type: editorial-serif | Motion: restrained or expressive

**Requires:** Copy that translates credentials into client benefit, not an alphabet soup of letters.

**CRO note:** Explaining what a credential *means* outperforms displaying it — most HNW prospects don't know a CFP® from a CFA. Translation = perceived candor.

**Avoid if:** Density is `dense` (this pattern needs room to breathe).

---

### T3 — The Quiet Mark
**Layout:** Minimal centered band. One fiduciary sentence at 20–24px, a thin accent rule, and a single restrained row of credential marks or a regulatory line (e.g., "Registered Investment Adviser · CRD #[VERIFY]"). Heavy whitespace. Almost an interstitial.

**Works with:** Tone: any | Density: editorial | Motion: restrained | Type: any

**CRO note:** When the firm's positioning is "we don't need to impress you," restraint IS the credential (Hoare's Bank / Bridgewater move). The absence of a hard proof display signals confidence.

**Avoid if:** ICP is younger / skeptical and actively wants to see proof (use T1).

---

## SECTION 3 — ICP SELF-SORT

Conversion job: Right-fit visitors identify themselves and continue. Wrong-fit visitors self-exit.

---

### 3A — The Profile Cards
**Layout:** Section heading: "Is this you?" or "We work with people at a specific inflection point." Below: 4 ICP cards in a row (or 2×2 on narrow). Each card: ICP label in large type + 1–2 descriptor sentences. Cards have hover state that deepens the card — click reveals a 3-sentence "if this is you..." statement.

**Works with:** Any tone | Density: balanced | Motion: expressive

**CRO note:** Cards give visitors permission to identify themselves without committing. The reveal on click/hover creates a micro-interaction that increases engagement.

---

### 3B — The Direct Question
**Layout:** Centered section. Large centered heading: "Does this sound like you?" Below: 4 large-type statements, each on its own line, left-aligned, preceded by a small accent dash. No cards. Pure typography. Below the statements: a CTA that says "If so — let's talk."

**Works with:** Tone: any | Density: editorial | Type: editorial-serif or modernist-sans | Motion: restrained

**Requires:** Statements that are specific and uncomfortable-accurate. Vague statements make this pattern feel generic.

**CRO note:** The question format creates internal agreement — visitors read and nod. More emotionally direct than cards. Higher resonance, lower interaction.

---

### 3C — The Segment Branches
**Layout:** Two or three large visual "paths" — each representing a visitor type. Path label in large type (e.g., "Business Owner" / "Corporate Executive" / "Windfall Event"). Below each label: 3-bullet confirmation list + CTA tailored to that path. Vertical separator between paths.

**Works with:** Tone: light | Density: balanced | Motion: expressive

**CRO note:** Explicit segmentation improves conversion for firms serving distinct ICPs with different needs. Slightly more complex to build — requires distinct copy per segment.

**Avoid if:** Client serves a homogeneous ICP (unnecessary complexity).

---

## SECTION 4 — FIT ASSESSMENT / MQL CAPTURE

Conversion job: Qualify the visitor. 4 questions + email = primary lead capture event on the page.

**Non-negotiable:** This is the #1 conversion event. Design hierarchy must make it feel like the natural next step after Section 3.

---

### 4A — The Multi-Step
**Layout:** Single centered column. Section heading: "Answer 4 questions — see if we're the right fit." One question visible at a time. Progress bar at top (4 steps). Question text at 24px. Answer options as large click targets (full-width buttons or cards). Final step: email field + submit. Animated forward/back transitions between steps.

**Works with:** Any tone | Motion: expressive or cinematic

**CRO note:** One question at a time dramatically increases completion rate vs. full form. Each step feels like commitment — sunk cost increases follow-through. Email on final step = highest completion point.

---

### 4B — The Inline Assessment
**Layout:** Full-width section. Left: persuasive 3-sentence statement ("Most advisors meet anyone. We work with a specific kind of person. Find out if that's you.") Right: compact 4-question form, all questions visible, clean spacing. Submit CTA below.

**Works with:** Tone: light or mixed | Density: balanced | Motion: restrained or expressive

**CRO note:** Shows the full form at once — lower perceived effort but lower completion rate than multi-step. Better for analytical ICPs who want to see the whole picture before committing.

---

### 4C — The CTA Gate
**Layout:** Centered section. Large persuasive headline ("The right fit changes everything. The wrong one costs you.") + 2-sentence sub. Single large primary CTA: "Take the 2-minute assessment →" which opens the multi-step form in a modal or inline expansion.

**Works with:** Any tone | Motion: expressive or cinematic

**CRO note:** Lower friction entry — one click to start. The persuasive framing before the form increases intent quality. Modal version keeps visitor on the page.

---

## SECTION 5 — SERVICES / SOLUTION

Conversion job: Show what you do, tied to the pains named above. Outcomes, not features.

---

### 5A — The Numbered Editorial
**Layout:** Each service is a full-width row: large service number left, service name as H3 right, outcome description below the name (2–3 sentences), small "→ learn more" link. Slow staggered reveal on scroll. Hairline between rows.

**Works with:** Tone: light | Density: editorial or balanced | Type: editorial-serif

**CRO note:** Editorial format implies depth — suggests each service is substantial, not a checkbox.

---

### 5B — The Outcome Cards
**Layout:** 2×2 or 3×2 card grid. Each card: service icon (SVG, not emoji) + service name + outcome statement (starts with verb: "Reduce", "Protect", "Grow") + 1-sentence description. Hover: card lifts + border accent appears.

**Works with:** Tone: any | Density: balanced or dense | Motion: expressive

**CRO note:** Cards are scannable. Outcome-first copy (verb + result) converts better than feature descriptions.

---

### 5C — The Accordion
**Layout:** Service names stacked as large clickable rows. Click expands to reveal: description + outcome statement + link. All collapsed by default — only one open at a time. Accordion animation: height transition, not display toggle.

**Works with:** Tone: any | Density: dense | Motion: expressive

**CRO note:** Best when the firm has 5+ services — prevents content overwhelm. Forces visitors to engage with each service rather than skimming.

**Avoid if:** Fewer than 4 services (accordion feels like empty ritual).

---

## SECTION 6 — PROCESS

Conversion job: Remove fear of reaching out. Show exactly what happens after they click.

---

### 6A — The Timeline
**Layout:** Horizontal numbered steps with connecting hairline. Each step: large numeral (01, 02...) + step name + 2-sentence description. On mobile: vertical stack. Animated: SVG line draws between steps on scroll.

**Works with:** Any tone | Density: balanced | Motion: expressive or cinematic

**CRO note:** Horizontal timeline feels like a journey, not a list. The connecting line implies continuity — reassures visitors the process is coherent.

---

### 6B — The Alternating Stack
**Layout:** 3–4 steps stacked vertically. Odd steps: text left, visual right. Even steps: visual left, text right. Visual = icon, diagram, or screenshot. Large step numbers as background elements.

**Works with:** Tone: light | Density: balanced | Visual: graphic-system | Motion: expressive

**CRO note:** Alternating rhythm prevents scan fatigue. Visuals alongside each step make abstract process feel tangible.

---

### 6C — The SVG Flow Diagram
**Layout:** Center-column SVG diagram showing the coordination flow. Nodes draw in via DrawSVG on scroll. Labels animate in after each node. Below: short explanatory paragraph. Single large statement above: "Here's exactly what happens when you reach out."

**Works with:** Any tone | Density: balanced | Motion: expressive or cinematic | Visual: graphic-system

**CRO note:** Diagram format communicates sophistication of process — implies the firm has thought through the relationship, not just the sales call.

---

## SECTION 7 — PROOF

Conversion job: Specific outcomes. Numbers, names, timelines. Never vague testimonials.

---

### 7A — Stats Row + Testimonial Cards
**Layout:** Full-width stats row (4 stats, GSAP blur-to-sharp counter on scroll). Below: 3-column testimonial cards with 3D tilt hover. Each testimonial: direct quote, client name, role + city. No anonymous testimonials.

**Works with:** Any tone | Density: balanced | Motion: expressive

**CRO note:** Stats first establish credibility quantitatively. Testimonials confirm emotionally. Sequential logic: proof of scale → proof of relationship.

---

### 7B — The Interleaved
**Layout:** Alternating rows: [stat + context sentence] → [full testimonial] → [stat + context sentence] → [full testimonial]. Each row full-width with section background alternation.

**Works with:** Tone: light or mixed | Density: editorial | Motion: expressive

**CRO note:** Interleaving prevents mental bucketing — visitor can't separate "I'll believe the numbers" from "I'll believe the stories." Weaves both into a single narrative.

---

### 7C — The Anchor Testimonial
**Layout:** One large featured testimonial dominates: name at large scale, quote at 28–32px, role below. Below or beside: 3–4 compact supporting stat blocks. Design makes one testimonial the hero — this should be the best one.

**Works with:** Tone: dark | Density: balanced | Type: editorial-serif | Motion: expressive

**CRO note:** One dominant testimonial read completely outperforms three testimonials read partially. Works when the firm has one exceptional case study to lead with.

---

## SECTION 8 — FINAL CTA

Conversion job: Close the page. Dual path: high-commitment (book a call) + low-commitment (download/assessment).

---

### 8A — The Centered Close
**Layout:** Dark or accent-background section. Centered large statement (40–52px) + 1-sentence sub. Two CTAs side by side: primary (filled) + secondary (ghost). Clean, minimal.

**Works with:** Any tone | Any density | Motion: restrained

**CRO note:** Simplest pattern. Highest conversion when copy is strong. The visual break (dark background) signals "page is ending — decide."

---

### 8B — The Split Close
**Layout:** Left column: persuasive paragraph — what happens if they don't act, what happens if they do. Right column: CTA card with form or buttons, slight elevation, background offset. Feels like a landing page within the page.

**Works with:** Tone: light or mixed | Density: balanced | Motion: expressive

**CRO note:** The persuasive paragraph gives hesitant visitors one more reason. Higher-effort pattern but better for analytical ICPs who need final justification.

---

### 8C — The Immersive Close
**Layout:** Full-viewport dark section. Single short statement fills the center at 56–72px. Below: one primary CTA. Photography or video background with subtle parallax. Feels like the end of a film.

**Works with:** Tone: dark or mixed | Motion: cinematic | Visual: photography

**CRO note:** High emotional impact. Works when the rest of the page has built sufficient trust — the final CTA doesn't need to argue, just invite.

---

## SECTION 9 — FOOTER

Conversion job: Navigation, contact, compliance. Required before shipping.

---

### 9A — Standard
**Layout:** Logo top-left. Nav links in columns. Tagline or brief description. Compliance disclaimer at bottom in small text.

**Works with:** Any configuration

---

### 9B — Rich
**Layout:** Logo + tagline. Contact info (phone, email, address). Nav links in columns. Optional: newsletter signup. Compliance disclaimer full-width at bottom.

**Works with:** Tone: light or mixed | Density: balanced

---

### 9C — Minimal
**Layout:** Logo centered. Single row of nav links. Compliance disclaimer below. That's it.

**Works with:** Tone: dark | Density: editorial | Motion: cinematic — the page has done the work; the footer should get out of the way.

---

## Pattern Selection Rules for Agent 02.5

When selecting patterns for the Design Brief, follow these constraints:

1. **Tone: dark + Motion: cinematic** → Hero: 1B or 1D, Pain: 2A or 2C, Final CTA: 8C
2. **Tone: light + Density: editorial** → Hero: 1C or 1A, Pain: 2B, Services: 5A, Final CTA: 8A or 8B
3. **Density: editorial** excludes the ticker (2A) and wall (2C)
4. **Visual: photography** with no confirmed assets → do not select 1D or 8C
5. **Motion: restrained** excludes patterns requiring SVG draw (6C), 3D tilt (7A), or multi-step animation (4A)
6. Never select the same basic layout rhythm twice in a row — alternate dense/sparse sections
