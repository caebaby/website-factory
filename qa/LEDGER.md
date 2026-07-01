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

### LED-006 — Cycling word mid-line creates a dead gap (taste defect, gate-invisible)
- **Build:** field/index-rebuild.html. The Sonnet rebuild passed the deterministic gate clean (0/0/0) and a fresh QA agent cleared it to SHIP — but Chris's eye flagged it as unimpressive. Specific defect: the cycling-word slot ("Your story␣␣␣is a mess") left a visible gap, because the grid-stack cell sizes to the widest word and the word sat mid-line with text after it.
- **Caught by:** the human + the Tier-B taste critic (`impeccable`). The deterministic gate could NOT see it — it's not a collapse/overflow/trap; it's composition.
- **Fix:** placement rule added to COMPONENTS Primitive 1 — put the cycling word at a line END (its own line), oversize it, color it the accent → gap gone, becomes the hero's focal moment.
- **Status:** ✅ closed (primitive updated; rebuild hero re-cut).

### Episode — Tier-B taste pass on the Field rebuild (the lesson that matters most)
- **Trigger:** the rebuild passed every geometric check + a fresh QA agent said SHIP, yet read flat/timid. Chris: "this isn't great… took a step back."
- **THE LESSON:** **deterministic-clean ≠ impressive.** The gate is a FLOOR (not broken, no slop, on-brand). It is NOT a CEILING (memorable, $25k). "Passes the rules" must never equal "ship" — ship requires the Tier-B taste pass too. Shipping on geometry alone is the same false confidence, one level up, as a builder grading itself.
- **The taste critic earned its seat:** `impeccable`'s brand register reframed the problem from "a few bugs" to "the whole thing is timid — restrained color where a bold studio gets Committed permission; the editorial-typographic reflex executed safe." Fixes: cycling word → oversized vermillion focal (LED-006); eyebrow committed to accent; hero void tightened; final CTA → vermillion drench (committed-color crescendo). Geometry stayed 0/0/0; the design went from flat to bold.
- **Process change:** the ship gate is now **geometry-pass AND taste-pass**, both by fresh independent agents. Floor is model-agnostic (proven); the ceiling still needs the taste critic with teeth + richer "make it sing" docs + ideally a capable builder.
- **Status:** ✅ rebuild re-cut and re-verified; process updated.

### LED-007 — Mesh-gradient hero rendered too faint to read as color (taste defect, gate-invisible)
- **Build:** qa/fixtures/signature-hero-proof.html (the ceiling proof, 2026-06-30). The new COMPONENTS Primitive 4 mesh hero shipped at `.mesh__blob{opacity:.55; filter:blur(74px)}` with `mix-blend-mode:multiply` on warm-white.
- **Symptom:** the animated mesh — the boldest background on the page on paper — rendered as a pale haze, not a color event. "Brave-on-paper, executed safe."
- **Caught by:** the independent Tier-B taste critic (impeccable). Invisible to the deterministic gate (it's not collapse/overflow/trap — it's *intensity*, a composition/commitment judgment).
- **Fix:** opacity `.55 → .74`, blur `74px → 58px` so the gradient reads as brand color. Re-verified: geometry still 0/0/0; mesh now reads (computed opacity 0.74 confirmed).
- **Permanent artifact:** Primitive 4's QA-invariant note + LAYOUT_CRAFT 9.1 already say "keep blob opacity modest so text clears contrast" — now balanced by the inverse lesson: **too modest = invisible.** The committed-color rule (8.3) applies to the mesh too — a mesh you can barely see is the timid-color failure at the hero. Encoded as a [TASTE] check for the critic; not a geometric invariant.
- **Status:** ✅ closed.

### LED-008 — Composition counterweight rendered as an opacity-.06 watermark (taste defect, gate-invisible)
- **Build:** qa/fixtures/signature-hero-proof.html. The oversize `01` counterweight numeral (LAYOUT_CRAFT 8.4) shipped at `color:var(--text-primary); opacity:.06`.
- **Symptom:** the numeral had the right *geometry* (real optical mass, off-edge bleed) but near-zero *ink* — the safe-by-default editorial watermark move. Present as mass, absent as presence.
- **Caught by:** the Tier-B taste critic. Gate-invisible (geometry was correct; only the ink weight was timid).
- **Fix:** `color:var(--accent); opacity:.06 → .13` — the counterweight now has presence and is on-brand. (Accent on a decorative aria-hidden element; still within the accent budget.)
- **Lesson:** 8.4's "real optical mass" is necessary but not sufficient — a counterweight at watermark opacity satisfies the geometry and still reads timid. A counterweight must have **presence (ink/contrast), not just size.** Sharpened into LAYOUT_CRAFT 8.4 phrasing intent.
- **Status:** ✅ closed.

### LED-009 — Two ceiling proxies added to the gate (the critic teaching the cheap gate, ceiling edition)
- **Context:** the ceiling work (PARTS 8–9) is mostly [TASTE], but two timidity signals ARE structural and were promoted into `qa/visual-checks.js` as informational P2s.
- **`accent-fill-absent` (P2):** fires when the accent never owns a surface (only `color:` glyphs, no background fill on a meaningful area) — the LAYOUT_CRAFT 8.3 timidity proxy. Defers to the critic on whether Restrained was intended. Verified: does NOT fire on the proven-good Field rebuild (its vermillion final-CTA drench + hero accent radial satisfy it) or the ceiling proof.
- **`section-rhythm-monotony` (P2):** fires only when ≥6 sections share one identical vertical padding (pure-uniformity floor of the 8.5 density-rhythm rule). Conservative by design; the real rhythm judgment stays with the critic.
- **Replay-corpus check:** both new checks run clean (0 new false P0/P2) on the Field rebuild known-good fixture; corpus integrity preserved.
- **Status:** ✅ admitted.

### Episode — The ceiling proof + the Tier-B repair loop closing on TASTE defects (2026-06-30)
- **Trigger:** the floor is model-agnostic and proven; this session raised the *ceiling* — richer "make it sing" docs (LAYOUT_CRAFT PARTS 8–9), two reference-extracted primitives (mesh hero, video-hero-with-scrim), wired into MOTION_TIERS + SECTION_PATTERNS + REFERENCES, plus a built proof that assembles them.
- **The loop ran on taste, not geometry:** the proof passed the deterministic gate **0/0/0 on first build** (the new primitives didn't trip a single geometric invariant — mesh clipped, video poster fallback present, cycling word grid-stacked, drench satisfies accent-fill). A fresh independent Tier-B critic returned **PASS** but named two real *execution-timidity* defects (LED-007, LED-008) — exactly the "brave-on-paper, executed safe" class the gate can't see. Scoped repair → re-verify: geometry held 0/0/0, both defects gone.
- **THE LESSON (compounds the Field episode):** the ceiling has its own repair loop, and the taste critic is the only thing that can drive it. A primitive can be geometrically flawless and still ship timid (a mesh too faint, a counterweight too ghostly). **Geometry-pass is necessary; the taste critic with teeth is what turns "clean" into "sings."** The critic earned its seat a second time — this time catching intensity/commitment, not collapse.
- **Verification stack used:** `node qa/run-checks.js` (geometry, headless Chrome) + `npx impeccable detect` (a11y/slop deterministic) + an independent design-director subagent (Tier-B taste). Ship = geometry-pass AND taste-pass; achieved.
- **Status:** ✅ proof shipped as a known-good replay-corpus fixture: `qa/fixtures/signature-hero-proof.html`.

### Episode — Chris-curated reference extraction, 7 sites (2026-06-30)
- **Trigger:** Chris supplied 7 admired sites with per-site commentary (BetterUp, Maven, Modern Health, Facet, Wealthspire, Work.co, Instrument) to extract into the playbook — the first real run of the RULE #4 protocol on a batch.
- **What was codified:**
  - **COMPONENTS Primitive 6** — scroll-driven section color theming (from instrument.com): paired-theme sections, fixed-layer crossfade, text inversion; floor = solid readable sections with no JS. Verified: geometry 0 P0; mechanism confirmed live (scrolling swaps `--theme-bg`/`--theme-fg`/`--theme-accent`, fixed layer crossfades, body text inverts). Fixture: `qa/fixtures/scroll-color-theming.html`.
  - **LAYOUT_CRAFT 8.7** — premium has more than one register (warm-human, photography-led, from Maven) — counters the cool-editorial default reflex.
  - **LAYOUT_CRAFT 8.3 "Committed-on-clean"** (work.co) — clean ≠ timid; one bold color punches harder on a minimal ground.
  - **LAYOUT_CRAFT 9.3** — the scroll-color-theming rule (pairs Primitive 6).
  - **LAYOUT_CRAFT PART 10** — content-block archetype library + the no-two-adjacent-alike rhythm rule (BetterUp/Maven section variety; the real "next level").
  - **LAYOUT_CRAFT PART 7 dated-UI tells** (wealthspire.com) — beveled buttons, 2010s flat-icon packs, web-2.0 chrome: "competent but 2012" is its own way to lose.
  - **docs/REFERENCES.md** — Chris-Curated Extractions section (7 entries with STEAL/AVOID tags; his "not a fan of their branding" = take structure, never palette/chrome).
- **`[VERIFY]` open:** BetterUp's exact hero (text scrape saw a typographic word-cycle hero — our Primitive 1 — but Chris referenced a "hero image"; may be a background visual). Wealthspire exact hero layout. Instrument exact palette/timing. Worth a live browse pass before relying on those specifics.
- **Status:** ✅ extraction codified + Primitive 6 verified. Next batch of refs/commentary from Chris pending.

### LED-010 — `accent-fill-absent` false-fires on scroll-themed pages (known limitation, accepted)
- **Context:** the scroll-color-theming fixture trips `accent-fill-absent` (P2) because its accent *ground* (section 4 + the per-theme accent) only appears on scroll; at the frozen top state the fixed color layer is the first (dark) theme, so no accent fill is statically visible.
- **Why it's accepted:** the check is P2 informational and explicitly defers to the Tier-B critic; the page demonstrably commits to accent (it's just off-screen at inspect time). Not worth coupling the deterministic check to Primitive 6's data attributes.
- **Lesson:** the static gate inspects ONE scroll state — any commitment that only manifests on scroll (themed grounds, scroll-revealed drench) is the taste critic's call, not the gate's. Documented so it isn't "fixed" into a brittle special-case.
- **Status:** ✅ documented, accepted.

### LED-011 — `gsap.from()` hero/diagram reveals can stick invisible under rAF starvation (P0-class, process defect)
- **Build:** `projects/awp/build/dark-home.html` (Dark Precision, 2026-07-01), first build. Hero headline was wrapped in a SplitText line-reveal (`gsap.from(split.lines,{yPercent:105,opacity:0,...})`) and the signature SVG coordination-diagram used `gsap.from('.dg-line'/'.dg-node',{opacity:0 or drawSVG:'0%',...})` — both textbook Tier-2/3 MOTION_TIERS patterns.
- **Symptom:** in the verification browser (a backgrounded/unfocused tab), both the ENTIRE hero headline and the whole diagram rendered fully invisible — `getComputedStyle` showed the elements frozen at their `.from()` START state (`opacity:0`, `yPercent:105`, `drawSVG:0%`) indefinitely.
- **Root cause:** `document.visibilityState` was `"hidden"`, `document.hasFocus()` was `false`, and `gsap.ticker.frame` had advanced only ~6 frames over several seconds — the browser throttles `requestAnimationFrame` hard in backgrounded tabs, and GSAP's ticker runs on rAF. This is the exact phenomenon LED-004 already named for scroll-reveal freezing during verification — but here it exposed a REAL gap, not just a verification artifact: `gsap.from()` sets the hidden/offset state as soon as the tween is created, and if rAF never progresses, the tween never reaches its visible end state. A real user whose tab loads in the background (common: opened from a link in a new tab, then not switched to immediately) could see the same stuck-invisible hero.
- **Why COMPONENTS.md Primitive 3's existing hero-exception note didn't cover this:** "Animate the hero on LOAD with gsap.from (leaves elements visible at rest, so a JS failure can't hide them)" is true for JS *failing to load* (nothing ever sets the hidden state) but does NOT cover JS loading fine and the tween simply stalling mid-flight. Two different failure modes; only one was documented.
- **Fix applied (two-part):**
  1. **Hero headline:** dropped the SplitText line-reveal entirely — folded the `<h1>` into the same plain `.rise` opacity/transform CSS-transition system used for every other hero element (eyebrow, sub, CTAs), which was empirically NOT affected by the same rAF starvation in the same test (CSS transitions triggered by a class swap, not a running GSAP tween, degrade more gracefully). Simpler and more robust beats a fancier reveal on the single most important line on the page.
  2. **Diagram + any other must-not-hide `gsap.from()` reveal (kept, because the motion is worth it here):** capture the tween handle and add a `setTimeout` safety net that force-completes it — `var tw=gsap.from(...); setTimeout(function(){ if(tw.progress()<1) tw.progress(1); }, 1600);`. Applied to the diagram's line-draw + node-fade, and to the proof-section stat counters' `requestAnimationFrame` count-up loop (same rAF-starvation risk, different mechanism — fixed with an equivalent `setTimeout(finish, 2200)` guard). Verified via `element.getAnimations().find(a=>a.animationName===...)` + `.pause()` + `.currentTime=N` — scrubbing the Web Animations API directly, which sidesteps wall-clock polling races entirely (see Technical note below).
- **Permanent artifact — still open:** this should become a formal contract addition to `COMPONENTS.md` Primitive 3 (and any future primitive that uses `gsap.from()` to gate visibility): *any GSAP tween that hides content via its FROM state must carry a bounded forced-completion fallback.* Not yet written back into COMPONENTS.md as a frozen primitive — flagging for the next session rather than doing it now to keep this ledger entry itself from blocking the build.
- **Technical note (verification technique, worth reusing):** don't poll wall-clock to check whether a short GSAP tween has reached a given frame — tool round-trip latency makes hit-or-miss sampling unreliable (confirmed this empirically: identical polling attempts landed before-start, mid-animation, and after-finish across otherwise-identical calls). Instead use the Web Animations API: `el.getAnimations().find(a=>a.animationName==='x').currentTime=N` deterministically scrubs to an exact frame regardless of real-time throttling.
- **Status:** ✅ closed for this build (both fixes verified via computed style / getAnimations scrubbing). ⬜ the COMPONENTS.md contract update is open.

### LED-012 — `--ink-mute`-style alpha-blended muted-text tokens fail WCAG AA on dark backgrounds (confirms open tension #6, dark-mode edition)
- **Build:** `projects/awp/build/dark-home.html`, first build. `--ink-mute:rgba(237,235,231,.42)` was used for nearly all secondary body copy (hero sub, pain descriptions, credential/ICP/step/insight card text, footer links) — geometrically fine, visually looked "muted" as intended.
- **Symptom:** a first-pass automated contrast check reported a reassuring ~16.6:1 for these pairs — WRONG. That check computed the luminance of the raw `rgba(...,0.42)` triplet as if it were fully opaque, ignoring that a semi-transparent color's *effective* rendered color is alpha-composited over its background. Redoing the math with proper alpha blending gave the real number: **~3.6:1 — a genuine WCAG AA failure** (needs 4.5:1 for body-sized text; none of these usages qualify for the large-text 3:1 exception).
- **Why this matters beyond one build:** this is the exact same defect class as **open doc tension #6** (`--text-muted #9A968C` failing AA on light `--bg-base` at 2.8:1, logged during the Field build and never fixed at the token level) — now confirmed independently on the DARK side of the palette too. Any semi-transparent "muted" text token is a repeat offender because its real contrast is invisible to a naive color-string luminance check and easy to eyeball as "looks fine, it's just a caption."
- **Fix applied:** raised `--ink-mute` alpha from `.42` to `.58` (solved for ≥4.5:1 against both `--bg` #0A0A0A and the `--bg1` elevation step, landing at 5.8–6.0:1 with margin). Also found and fixed two proof-section text colors (`.stat span`, `.proof-quote .note`) that were alpha-blended dark-on-gold and failed specifically in the darkest corner of the gradient (~3.1–3.6:1) — switched both to solid `#0A0A0A` rather than re-tuning another alpha.
- **Permanent artifact — still open:** (a) resolve open tension #6 for the light-mode `--text-muted` token the same way (compute the real blended contrast, don't eyeball it); (b) promote a **contrast-checker snippet that alpha-blends before computing luminance** into the QA toolkit — the naive version is worse than no check, because it produces false confidence. A hand-rollable version: blend `effective = fg.rgb*fg.a + bg.rgb*(1-fg.a)` per channel, then apply the standard WCAG relative-luminance formula to `effective`, not to the raw foreground.
- **Status:** ✅ closed for dark-home.html (verified re-check: 5.83–5.94:1 across all affected selectors). ⬜ light-mode token + reusable checker snippet are open.

---

## Open doc tensions to resolve (found during the Field build)
1. **Eyebrow = accent (DESIGN.md) vs accent ≤ 3 places (DESIGN_FUNDAMENTALS).** → Resolve: eyebrows default to muted ink; accent reserved for CTA + one hero element + key numerals. (LED-003)
2. **`--bg-inverse-rgb` not in the RGB-triplet rule.** → Add `--bg-inverse` to the required-triplet list in DESIGN_TOKENS.
3. **7C Anchor Testimonial has no headline in COPY_ALL** — ambiguous whether the pattern wants one. → Clarify in SECTION_PATTERNS.
4. **`[VERIFY]` vs `[PLACEHOLDER]` visible-marker treatment conflict** (DESIGN.md §9). → Disambiguate: PLACEHOLDER = visible amber; VERIFY = HTML comment only.
5. **Mandatory ICP eyebrow vs the hero-eyebrow-chip slop tell** (found 2026-06-30, ceiling proof). SECTION_PATTERNS makes a tracked-caps ICP eyebrow above the hero h1 non-negotiable for conversion; the impeccable detector flags exactly that shape as "the default AI SaaS hero." Both are right. → Resolve at the template level: keep the eyebrow as a *deliberate, named brand system* (the brand register exempts named systems), but (a) default it to **muted ink, not accent** (LED-003 resolution — applied in the proof, fixed both the chip-feel and the 4.3:1 contrast), and (b) consider integrating the kicker into the headline or a nav-breadcrumb on hero-dominant pages. Decision affects every build — flag for Chris.
6. **`--text-muted` (#9A968C) fails WCAG AA on `--bg-base`** (2.8:1; needs 4.5:1). A token-level a11y floor issue present in *every* light Field build, not just the proof (the reference rebuild inherits it). → Darken `--text-muted` to ≥ 4.5:1 on bg-base, or restrict it to large/decorative text only. The proof bumped its affected captions to `--text-secondary` as a local fix; the token needs the real fix.
7. **Single-family vs two-family pairing** (detector `single-font`). The proof uses Satoshi across weights 400–900 (a deliberate single-family voice, which the brand register explicitly permits — "a single well-chosen family with committed weight/size contrast is stronger than a timid display+body pair"). The detector flags any single family. → Not a defect; note that the deterministic `single-font` flag is advisory and a deliberate single-family choice clears it via the taste critic.
