# Defect Ledger
## The factory's memory — every caught defect becomes a check, a rule, or a component

Append-only. Each entry: what broke, why, how it was caught, and what permanent artifact now prevents it. This is Layer 2 of the self-improving loop (see `FACTORY_LEARNING.md`). When a defect recurs or escapes the deterministic gate, distill it here and — if it's a geometric invariant — add a check to `qa/visual-checks.js`.

---

### LED-001 — Signature element collapsed to 0 height (P0)
- **Build:** field/index.html (cold subagent build, 2026-06-29)
- **Symptom:** hero cycling-word rendered invisible; headline had a void where the word should be.
- **Root cause:** `.cycle` was `position:relative` with all `.word` children `position:absolute` → no in-flow content → slot collapsed to 0px → `overflow:hidden` clipped the visible word.
- **Caught by:** human (Chris) — escaped the build agent's self-check AND token verification (it's invisible to CSS-grep).
- **Fix:** CSS-grid-stack — `inline-grid` + every word `grid-area:1/1` stays in flow; slot sizes to widest/tallest word, can't collapse. JS animates opacity+y only.
- **Permanent artifact:**
  - Check → `qa/visual-checks.js` `collapsed-height` (P0): any element with content + rendered height < 2px.
  - Component → `COMPONENTS.md` Primitive 1 (cycling-word hero), frozen with contract "height never collapses."
- **Status:** ✅ closed. Verified: checker fires on the broken version, passes the fixed version.

### LED-002 — Display type trapped in a narrow column / em-trap (P1)
- **Build:** field/index.html (2026-06-29)
- **Symptom:** 64px headings wrapped into ~9-CPL columns (2-3 words/line) with the right half of the canvas empty.
- **Root cause:** container `max-width` set in `em` (`.pain-head{max-width:18em}`). `em` on a container resolves against its ~18px inherited font = ~324px, not 18×64px. The 64px heading was crushed.
- **Caught by:** human (Chris) + confirmed by computed-style measurement.
- **Fix:** removed the em container caps; the heading's own measure (16em ≈ 1024px ≈ 32 CPL) governs.
- **Permanent artifact:**
  - Check → `qa/visual-checks.js` `display-trapped` (P1): display type (≥ ~32px) rendering below 14 CPL or needing < 9×fontPx width.
  - Rule → `LAYOUT_CRAFT.md` PART 1 "THE EM-TRAP": never size a container max-width in `em`; use `ch`/`px` or put the measure on the heading element.
- **Status:** ✅ closed. Verified: pain heading now 1035px / 32 CPL.

### LED-003 — Accent-color overuse (P2)
- **Build:** field/index.html (2026-06-29)
- **Symptom:** vermillion on ~33 elements (eyebrows, every number, every dash, every dot) — "accent everywhere dilutes it."
- **Root cause:** doc tension — DESIGN.md says "eyebrow = accent" but DESIGN_FUNDAMENTALS says "accent ≤ 3 places." The agent followed the former across every section.
- **Caught by:** human (Chris) AND independently by `qa/visual-checks.js` `accent-overuse` (good — the cheap gate reproduces the human catch).
- **Fix (pending):** reduce accent placements; resolve the DESIGN.md vs DESIGN_FUNDAMENTALS tension (eyebrows should default to muted ink, accent reserved for CTA + cycling word + key numerals).
- **Permanent artifact:** Check → `qa/visual-checks.js` `accent-overuse` (P2), budget 14 text elements. Doc fix still open.
- **Status:** 🟡 check in place; doc-tension resolution open.

### LED-004 — Headless preview froze GSAP `from`-tweens, masking state (process defect)
- **Context:** during verification, the backgrounded preview tab throttled rAF → GSAP `from`-tweens froze at opacity 0 → screenshots came back black; my own force-final-state screenshot then *hid* the broken cycle word.
- **Lesson:** never trust a screenshot until animations are forced to end-state OR proven `finished` via `getAnimations()`, and two consecutive frames are geometrically stable.
- **Permanent artifact:** `FACTORY_LEARNING.md` render-stage anti-fooling rules + `qa/visual-checks.js` `anim-not-finished` surfacing.
- **Status:** ✅ documented.

### LED-005 — Checker measured box-width as a proxy for line length (false positives)
- **Context:** the Field cold-rebuild QA run flagged 18 P2s; ~11 were false — `measure-too-wide` / `display-too-wide` fired on SHORT text sitting in a WIDE box (one-word service names, a 50-char hero note, centered label rows). Box width ≠ actual line length.
- **Caught by:** orchestrator triage during the rebuild verification (the critic teaching the cheap gate).
- **Fix (in `qa/visual-checks.js`):** (a) skip centered/right-aligned, uppercase, and tracked `<p>` (not running prose); (b) gate both checks on actual `textContent.length` exceeding the CPL threshold — a short heading/paragraph in a wide box is not "too wide."
- **Result:** 18 → 7 P2s, all genuine (body paragraphs needing a measure cap). The checker now reports only real defects.
- **Status:** ✅ closed — the loop refined its own gate.

### Episode — Field cold rebuild on SONNET (model-agnostic consistency test)
- **Build:** field/index-rebuild.html, Agent 04 cold on **Sonnet** (original was Opus), reading the now-complete docs (incl. COMPONENTS + LAYOUT_CRAFT).
- **Deterministic gate:** **0 P0 blockers, 0 P1 warnings** on first inspection. The original cold build shipped a P0 collapsed cycle (LED-001) + P1 trapped headings (LED-002); the rebuild reproduced NEITHER — it pasted the COMPONENTS cycle primitive (slot 106px) and avoided the em-trap (heading 19 CPL). Eyebrows muted, accent scarce (LED-003 avoided).
- **Repair pass:** 7 genuine P2 body-measure items → capped `.pain-desc`/`.service-desc` per LAYOUT_CRAFT → re-verify **0 defects, fully clean.**
- **Conclusion:** the system produces the quality, not the model. Different model + same docs = consistent, clean result. ✅

---

## Open doc tensions to resolve (found during the Field build)
1. **Eyebrow = accent (DESIGN.md) vs accent ≤ 3 places (DESIGN_FUNDAMENTALS).** → Resolve: eyebrows default to muted ink; accent reserved for CTA + one hero element + key numerals. (LED-003)
2. **`--bg-inverse-rgb` not in the RGB-triplet rule.** → Add `--bg-inverse` to the required-triplet list in DESIGN_TOKENS.
3. **7C Anchor Testimonial has no headline in COPY_ALL** — ambiguous whether the pattern wants one. → Clarify in SECTION_PATTERNS.
4. **`[VERIFY]` vs `[PLACEHOLDER]` visible-marker treatment conflict** (DESIGN.md §9). → Disambiguate: PLACEHOLDER = visible amber; VERIFY = HTML comment only.
