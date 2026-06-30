# Layout & Typographic Craft
## LLM-agnostic reference — the craft that separates $25k from "competent AI"

Synthesized from a 12-agent research pass across Bringhurst/Butterick, Material 3, Apple HIG, Carbon, Refactoring UI, Smashing, the CSS specs, and the AI-slop detector literature. Every rule is written as a **machine-checkable threshold** so `qa/visual-checks.js` and the QA critic can enforce it.

> **Why this doc exists:** the factory reliably gets the *skin* right (tokens, fonts, color) and reliably failed *composition craft* — display type trapped in narrow columns, collapsed signature elements, accent overuse. Those failures are not aesthetic opinion; they are measurable. This doc makes them measurable.

The rules below carry three confidence tiers. **[HARD]** = published/cross-confirmed, safe to enforce as pass/fail. **[TUNE]** = operationalized engineering threshold, enforce as a warning and tune. **[TASTE]** = a ceiling judgment the deterministic gate *cannot* see (PARTS 8–9) — the Tier-B taste critic's job, anchored by a measurable proxy. PARTS 1–7 are the **floor** (not broken / not slop / on-brand). PARTS 8–9 are the **ceiling** (bold / memorable / $25k). Ship requires passing both.

---

## PART 1 — TYPE MEASURE BY SIZE (the #1 failure)

**The load-bearing constant:** average character advance ≈ **0.5em**. So `CPL ≈ widthPx / (0.5 × fontPx)`, and inversely `widthPx ≈ CPL × 0.5 × fontPx`. This is how you convert a size into a required column width. [HARD — Bringhurst/webtypography, cross-confirmed]

Measure shrinks in CPL as type grows (big type is *scanned*, not read):

| Tier | Size | Target CPL | Max-width guidance |
|------|------|-----------|--------------------|
| Body | 15–18px | 45–75 (ideal 66) | `max-width: 65ch` (~33em) [HARD] |
| Lead | 20–28px | 40–60 | ~24em [HARD] |
| Section heading | 32–56px | 20–40 | ~12–18em [HARD] |
| Display / hero | 60–180px | **8–25** | ~9–14em [HARD] |

**Checks:**
- Display type (≥ ~32px) must render at **≥ 14 CPL** and **≤ ~32 CPL**. Below 14 = trapped narrow column (the Field bug: a 64px heading at 9 CPL). Above ~40 = reads like body, loses hierarchy. `qa/visual-checks.js` → `display-trapped` / `display-too-wide`. [HARD]
- A heading needs **≥ 9 × fontPx** of width for 3 words/line, **≥ 12 × fontPx** for 4. A 64px heading needs ≥ 576px (3 words) / ≥ 768px (4). [HARD]
- Body must stay **≤ 90 CPL** (hard fail), target 50–75. [HARD]

**THE EM-TRAP (the specific bug that shipped):** never set a container's `max-width` in `em` to "fit a heading." `em` on a container resolves against its *inherited* font-size (~17px), so `max-width: 18em` = ~324px, not 18×64px. A 64px heading inside it is crushed to ~9 CPL. **Use `ch`/`px` sized to the heading, or put the measure on the heading element itself (where `em` = the heading's font-size).** [HARD — this is the Field root cause]

---

## PART 2 — LINE-HEIGHT (inversely proportional to size)

Universal law: big type → tight leading; small type → loose. Fails if H1 and body share a line-height. [HARD]

| Size | line-height | Fail outside |
|------|-------------|--------------|
| Body 15–18px | 1.5 (1.4 narrow, 1.6 wide) | < 1.4 or > 1.7 |
| Lead 20–28px | 1.3–1.45 | > 1.5 |
| Heading 32–56px | 1.1–1.25 | > 1.3 or < 1.0 |
| Display ≥60px | **0.9–1.1** (≥120px → ~0.9) | > 1.2 |

Couple to measure: lines > 75 CPL need line-height ≥ 1.55. [HARD]

---

## PART 3 — LETTER-SPACING (tracking) BY SIZE

Inversely proportional. Big display → negative; small caps/labels → positive; body ≈ 0. Apple's optically-tuned curve is the model. [HARD]

| Size | letter-spacing | Fail |
|------|---------------|------|
| Display ≥90px | −0.03 to −0.05em | > 0 on ≥60px type |
| Display 48–80px | −0.02em | |
| Heading 28–48px | −0.005 to −0.02em | > +0.01em |
| Body/lead 15–28px | 0 (`normal`) | \|x\| > 0.02em |
| Caption ≤13px | +0.01 to +0.03em | negative |
| **Uppercase labels/eyebrows** | **+0.05 to +0.15em** | < +0.03em |

Never go below −0.06em (collisions). Always `em`, never `px`. [HARD]

---

## PART 4 — RAGGED-RIGHT & LINE BREAKS

Headlines and body have **opposite** rag goals.

**Headlines → balanced (equal-width lines):** apply `text-wrap: balance`. Only works ≤ 4 lines in Chromium (≤6 theoretical) — design headlines for ≤ 3 lines. [HARD]

**Body → `text-wrap: pretty`** (kills single-word last lines, improves the tail). Don't trust the browser alone (Chromium only fixes last 4 lines, Firefox unsupported) — also enforce the runt rules below. [HARD]

**Runt rules (enforce in your own validator):** [HARD]
- Last line ≥ **2 words AND ≥ 10 characters AND ≥ 20% of measure**.
- Single word allowed on last line only if the last two words wouldn't fit on the prior line.
- No stranded word < 4 chars; no hyphen-stub last line.

**Body rag shape (warnings):** [TUNE]
- No "notch" — a short interior line (< 60% measure) sandwiched between two long ones (> 85%).
- No monotonic staircase across 3+ lines.
- Max **2 consecutive** hyphenated line-ends (`hyphenate-limit-lines: 2`). [HARD]

**Manual `&nbsp;` binding (headlines):** never end a line on a preposition/article/conjunction or word ≤ 3 chars; bind numbers to units (`10&nbsp;km`), titles to names (`Dr.&nbsp;Smith`), and after dashes. [HARD]

```css
/* baseline to ship on every build */
h1,h2,h3,h4 { text-wrap: balance; }
p,li,blockquote { text-wrap: pretty; }
```

---

## PART 5 — WHITESPACE & COMPOSITION (fixes "narrow column, dead right half")

**The root insight:** empty space beside large type is *good* only when (a) a clear focal point anchors the heavy side AND (b) something — even small — activates/counterweights the empty side. A *completely* blank opposite region with no anchoring = the bug. [HARD — cross-confirmed]

**Checks:**
- **Dead-half detector** [TUNE]: FAIL if a section's primary block occupies < 50% width AND the remaining > 40% horizontal band contains **zero** weighted elements (no image, CTA, oversized number, graphic > 5% of section area).
- **Capped column needs a counterweight** [HARD principle]: a `max-width`-constrained text column in a wide canvas MUST be paired with a counterweight in the freed space (image, stat block, oversized graphic) OR offset within a composed asymmetric layout. The readability cap is a typography rule; it does not excuse a composition failure. This is the correct fix for Field's left-pinned headings — pair the heading with a right-side element or widen it.
- **Big-type lopsided check** [TUNE]: if headline ≥ 64px AND its block < 55% of viewport width, FAIL unless one of: an image/graphic occupies the opposite ≥ 30%, the type intentionally bleeds off the opposite edge, a background graphic sits behind it, or a stacked eyebrow+CTA+secondary form a counterweight column.

**Ratios to reach for (defaults, overridable):**
- Asymmetric split **60/40, 65/35, or 70/30** — not 50/50. Golden split ≈ 62/38. [TUNE]
- 60-30-10 visual weight; ~40% of a section as breathing room. [TUNE]
- Focal point near a thirds intersection (28–39% or 61–72% of width), and slightly **above** vertical center (38–45% from top). [TUNE]

**Section padding ≥ 3–5× body size** (80–160px desktop). Spacing on the 4/8px scale only; > 1 off-grid value fails. [HARD]

**"Fill the canvas" agency moves (remediations when the lopsided check fails):**
1. Background graphic/photo/texture behind the type (most automatable fix).
2. Secondary image/column at ~38% width in the dead half.
3. Intentional off-edge bleed of oversized type.
4. Overlap two elements (negative margin / grid same-cell) for depth.

---

## PART 6 — HIERARCHY & SCALE

- Largest element ≥ **3× body** (premium ≥ 4×). H1 < 2.5× body = no focal point. [HARD]
- Adjacent type sizes differ by **≥ 1.25×** (25% rule); ≤ 8 distinct sizes per page, ideally 4–6. [HARD]
- ≤ 3 font weights; none < 400; heading − body weight gap ≥ 200 (e.g. 700 vs 400). [HARD]
- One dominant focal element per above-the-fold view (squint test: one thing wins). [HARD]

---

## PART 7 — AI-SLOP TELLS (auto-fail list)

A page firing **≥ 4** of these reads as AI-generated (audit of 1,590 sites). Highest-signal first. [HARD where noted]

| Tell | Check |
|------|-------|
| Indigo/violet/purple accent | hue 250–290°, sat > 50%, dominant → fail |
| Purple→blue gradient | gradient stops spanning 220–290° → fail |
| Gradient text | `background-clip:text` + transparent fill on headings → fail |
| Permanent dark + grey body | dark-only + body contrast < 7:1 (slate-400) → fail |
| Inter/Geist/Space Grotesk as sole font | banned-font check |
| Single font family, no pairing | distinct families = 1 → flag |
| Weak hierarchy | per-step < 1.25× OR H1:body < 3× → fail |
| All-caps eyebrow above every section | ≥ 3 sections with small uppercase label → flag |
| 3 identical icon-on-top feature cards | ≥ 3 siblings, identical W×H ±2px, icon→h→p → fail |
| Side-stripe card border ("most reliable AI tell") | one-edge accent border ≥ 3px → fail |
| Uniform border-radius everywhere | > 80% of rounded elements identical radius → flag |
| Flat 0.1-opacity shadow on everything | `0 1px 3px rgba(0,0,0,.1)` repeated → flag |
| Glassmorphism decoration | `backdrop-filter:blur` over nothing → fail |
| Centered-everything | hero + ≥3 sections centered, no asymmetry → flag |
| Eyebrow pill chip above H1 | pill (radius-full, <14px) above hero h1 → fail |
| Monotonous spacing | > 70% of gaps identical → flag |
| Emoji as UI icons | emoji glyphs in nav/feature slots → fail |

Cross-reference: the existing `avoid-ai-design` / `impeccable` skills and the impeccable.style 44-rule detector implement much of this.

---

## PART 8 — MAKE IT SING (the ceiling: bold, not just clean)

PARTS 1–7 are the **floor** — measurable invariants that stop a build from being broken, slop, or off-brand. A build can pass every one of them and still read *timid*: competent, tasteful, forgettable. That is exactly what happened on the Field rebuild (0/0/0 on the gate, cleared by a fresh QA agent, and still flat — see `qa/LEDGER.md` LED-006 + the Tier-B episode). This part encodes the **ceiling**: what makes a page memorable enough to be worth $25k.

These rules are mostly **[TASTE]** — a third confidence tier above [HARD]/[TUNE]. The deterministic gate *cannot* see them; they are the Tier-B taste critic's job. But each is written with a **measurable proxy** so the judgment is anchored, not vibes. **Ship = floor-pass (geometry) AND ceiling-pass (taste).** "Passes the rules" must never equal "ship."

### 8.1 — The core law: *safe = invisible* [TASTE]
In a category where every competitor is tasteful (wealth, advisory, B2B, studios), **tasteful is the baseline, not the differentiator.** A restrained, well-spaced, one-accent page does not lose — it simply *isn't remembered*, which for a $25k brand site is the same as losing. The page must have a **point of view loud enough to survive the visitor's memory.**

- **The 10-minute test:** name the ONE thing a visitor will still recall ten minutes after closing the tab — a single oversize word, a color-drenched close, a diagram that drew itself, a headline that named their exact pain. If you cannot name it, the page is *safe = invisible*. Fix it before ship.
- A page that sings has a **spike**, not a flat plateau of tasteful. One dimension is committed *hard*; the rest support it.

### 8.2 — The editorial-reflex trap (the #1 timidity failure) [TASTE]
Handed a brand that "should be bold," the default reflex — for an AI especially — is the **editorial-typographic safe zone**: big serif/grotesk headline, generous whitespace, one thin accent line, hairline rules, restrained everything. It is *hard to make ugly*, which is exactly why models retreat to it — and it is *hard to make memorable*, which is why it reads timid. It executes the brief at 70% and stops.

- The fix is **not** to abandon editorial restraint — it's to **commit one dimension past the comfort line** so the page has a spike: a full-bleed color zone, a single word at 140–180px, a signature moment with real technical ambition, a hero background that breathes.
- **Tell:** if the page is "all tasteful, nothing brave," you are in the trap. The squint test for boldness: from across the room, does one move announce itself? If every section is the same quiet register, no.

### 8.3 — Color commitment: Restrained / Committed / Drenched [TASTE → measurable proxy]
Accent scarcity (PART 7, ≤ a few placements) governs accent **as text/glyph**. It says nothing about whether the brand color ever owns a **surface**. A bold brand that uses its accent *only* as small text highlights on warm-white has chosen the wrong commitment level — it is timid by default, not by intent.

Pick the level from **positioning**, then build to it:

| Level | What it means | Right for |
|-------|---------------|-----------|
| **Restrained** | Accent appears only as small marks/text on a near-neutral field. The *absence* of color is the statement. | Heritage / "we don't need to impress you" (Hoare's, Pictet). Restraint IS the credential. A deliberate choice — never a default. |
| **Committed** (the default for a brand that wants to be remembered) | The accent owns at least one **whole zone** — a full-bleed accent section, an accent-drenched final CTA, a saturated structural band — not just glyphs. | Studios, challengers, modern advisory, most $25k brand sites. |
| **Drenched** | Large surfaces *are* the brand color (a saturated hero and/or multiple full sections). | Bold consumer/creative/statement brands. |

- **The timidity check [measurable proxy]:** a brand positioned as bold/modern/challenger that has **zero** elements using the accent as a *background fill* covering a meaningful area (only `color:` glyphs) is **timid — flag it.** Resolution: drench at least one zone (the final-CTA crescendo is the lowest-risk, highest-impact place — see the Field rebuild's vermillion close). The deterministic gate now surfaces this as `accent-fill-absent` (informational P2) — but only the critic decides whether Restrained was *intended*.
- **Commitment is a crescendo, not a constant:** Committed/Drenched works best when color *builds* — quiet open, one mid-page accent zone, full drench at the close. A page that is loud everywhere is as monotonous as one that is quiet everywhere (see 8.5).

### 8.4 — Composition counterweight, raised (no dead-half, no timid balance) [TASTE → ties to PART 5]
PART 5 makes the *dead-half* a measurable fail. The ceiling rule is about the **quality of the counterweight**, which the gate can't judge:

- A counterweight must carry **real optical weight — roughly ≥ 25–30% of the section's visual mass.** A tiny graphic dropped into the empty half to "balance" a big-type hero reads as an afterthought, not composition. The fix for a lopsided hero is a *bold* counterweight: an oversize numeral/word that bleeds off the opposite edge, a full-height image column, a signature diagram — not a small decorative dot.
- **Reach for asymmetric tension, not centered safety.** Centered-everything (PART 7 tell) is the timid default. A 62/38 split with a heavy focal point and a bleeding counterweight sings; three stacked centered blocks do not.
- **Bleed is a premium move.** Oversize type or imagery that runs *off* an edge signals confidence ("we don't need to contain it"). Contained-everything signals caution.

### 8.5 — Density rhythm (breathe — inhale/exhale) [TASTE → measurable proxy]
A page where every section has the same padding, the same content density, and the same composition is **monotonous** even if each section is individually fine. Pages that sing **breathe**: they alternate dense, scannable passages with sparse, one-idea exhales.

- Build a deliberate rhythm: at least one **exhale** section (heavy whitespace, a single statement — the pattern's "pause for breath") and at least one **inhale** section (dense, multi-item, scannable). Never run three sections in a row at the same density.
- This reinforces SECTION_PATTERNS selection rule 6 ("never the same basic layout rhythm twice in a row") and the PART 7 *monotonous-spacing* tell, at **page scale**.
- **[measurable proxy]:** section vertical paddings should not be > ~70% identical across the page; consecutive sections should not share the same composition pattern. Surfaced as `section-rhythm-monotony` (informational P2).

### 8.6 — The signature moment, as a quality bar [TASTE]
Every $25k page has **exactly one** moment someone screenshots and sends to a colleague. It is not decoration — it **demonstrates the promise**.

- **Content-specific, not generic:** a coordination diagram for a firm whose value *is* coordination; a mesh that breathes for a brand about *connection*; a word that cycles for a studio about *messaging*. The test: **swap the client's name out — if the signature moment still fits any random site, it's decoration, not a signature.** (A canvas particle field fails this test on almost every brand — see MOTION_TIERS T3.2's own restriction.)
- **One, occasionally two — never more.** Placed at the fold or at the page's emotional climax (the final CTA). Overuse cheapens all of them (MOTION_TIERS caps Tier 3 at 2/page — this is the *taste* reason for that cap).
- **Technical ambition is the point.** The signature moment should be the one place the build reaches past "competent CSS" — a real animated mesh, a drawn diagram, a scroll-scrubbed reveal. If the whole page could have been hand-coded in 20 minutes, there is no signature moment.

---

## PART 9 — SIGNATURE BACKGROUNDS (reference-extracted primitives)

These rules were extracted from admired references via the protocol in `docs/REFERENCES.md` (admired site → name the exact technique → codify as a tested COMPONENTS primitive + this rule + a REFERENCES entry). They are how the ceiling rises over time. Each names a **tested primitive in `COMPONENTS.md`** — assemble it, do not re-derive it.

### 9.1 — Animated mesh-gradient hero background [extracted: Stripe / Zoom] [HARD where noted]
A single drifting `radial-gradient` "mouse glow" (MOTION_TIERS T3.1) is the *floor* of an active hero background. The richer, more premium technique is an **animated multi-stop mesh gradient**: 4–6 soft color blobs at different positions, slowly drifting on a loop, so the whole field *breathes*. The motion IS the brand (Stripe's WebGL `minigl` hero, Zoom's "work connects" hero), not decoration on top of it.

- **Implementation (factory-fit):** layered CSS `radial-gradient` blobs animated by a GSAP timeline (or CSS keyframes) drifting their positions — **not** a WebGL shader (single-file, zero-dep, testable, degradable). 4–6 stops; Stripe-soft (low saturation steps, large blur radius). → **`COMPONENTS.md` Primitive 4.**
- **Color discipline [HARD]:** mesh stops must be tints of the brand palette (accent + one or two analogous/neutral companions), never the rainbow default. A purple→blue mesh is the PART 7 slop tell at full size — auto-fail.
- **Degradation contract [HARD]:** static gradient with no JS; `prefers-reduced-motion` → freeze to a composed static frame (never blank, never a flat color). The hero copy/CTA never sit *inside* the animated layer's stacking risk — text is a sibling above it.
- **Legibility [HARD]:** body/headline text over the mesh must still clear contrast (≥ 4.5:1 body, ≥ 3:1 large). Keep stops low-opacity or confine the mesh to one side and place text on the calmer region.

### 9.2 — Product/video hero with a directional scrim [extracted: Zoom / Mercury / Linear] [HARD where noted]
When the client has a **real** product video or strong footage, a video hero outperforms any graphic — it shows the product/outcome in motion (trust), not a stock lifestyle image. The make-or-break craft detail is the **scrim**.

- **Scrim, not a box [HARD]:** legibility comes from a **directional gradient scrim** anchored to the text side (e.g. `linear-gradient(105deg, rgba(0,0,0,.62) 0–38%, transparent 70%)`), *not* a uniform dark rectangle over the whole frame (SECTION_PATTERNS 1D: "NO gradient overlay rectangles"). The scrim must guarantee text contrast (≥ 4.5:1 body / ≥ 3:1 large over the *lightest* pixel it covers) while leaving the far side of the footage clean. → **`COMPONENTS.md` Primitive 5.**
- **Never blank, never fake [HARD]:** a `poster` image always loads first and is what shows if video fails / is slow / is absent — so the hero is never empty. **Never simulate video with CSS gradients** (MOTION_TIERS T3.3) — if there's no real asset, ship the poster as a still hero and move on.
- **Performance + motion [HARD]:** `muted playsinline loop`, `preload="none"`, lazy-load the source via IntersectionObserver (no autoplay download until in view); `prefers-reduced-motion` → do not autoplay, show the poster. This is the difference between a cinematic hero and a 12 MB autoplaying jank-fest.

---

## How agents use this doc
- **Agent 04 (build):** read before writing CSS. Size every measure with the PART 1 formula; apply PART 4 `text-wrap` baseline; satisfy the PART 5 counterweight rule for any capped column or big-type hero; avoid every PART 7 tell. **Then raise the ceiling with PARTS 8–9:** pick a color-commitment level from positioning and build to it (8.3), give the page one real signature moment (8.6), vary density (8.5), avoid the editorial-reflex plateau (8.2), and assemble the PART 9 background primitives from `COMPONENTS.md` instead of re-deriving them.
- **Agent 05 (QA):** run `qa/visual-checks.js` (encodes PARTS 1, 5, 7 deterministically, plus the PART 8 proxies `accent-fill-absent` + `section-rhythm-monotony` as informational P2s). Route the **ceiling** items (PARTS 8–9 taste judgments — boldness, signature quality, color commitment intent, scrim legibility) to the **Tier-B taste critic** — the gate is the floor, the critic is the ceiling, and ship requires both.
