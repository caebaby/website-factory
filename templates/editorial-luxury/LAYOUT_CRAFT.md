# Layout & Typographic Craft
## LLM-agnostic reference — the craft that separates $25k from "competent AI"

Synthesized from a 12-agent research pass across Bringhurst/Butterick, Material 3, Apple HIG, Carbon, Refactoring UI, Smashing, the CSS specs, and the AI-slop detector literature. Every rule is written as a **machine-checkable threshold** so `qa/visual-checks.js` and the QA critic can enforce it.

> **Why this doc exists:** the factory reliably gets the *skin* right (tokens, fonts, color) and reliably failed *composition craft* — display type trapped in narrow columns, collapsed signature elements, accent overuse. Those failures are not aesthetic opinion; they are measurable. This doc makes them measurable.

The numbers below have two confidence tiers: **[HARD]** = published/cross-confirmed, safe to enforce as pass/fail. **[TUNE]** = operationalized engineering threshold, enforce as a warning and tune.

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

## How agents use this doc
- **Agent 04 (build):** read before writing CSS. Size every measure with the PART 1 formula; apply PART 4 `text-wrap` baseline; satisfy the PART 5 counterweight rule for any capped column or big-type hero; avoid every PART 7 tell.
- **Agent 05 (QA):** run `qa/visual-checks.js` (encodes PART 1, 5, 7 deterministically). Route the judgment items (rag quality, composition balance, brand feel) to the LLM critic.
