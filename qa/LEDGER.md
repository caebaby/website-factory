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

### Episode — Sonnet cold rebuild from warm-premium v1.2 (the low-HITL proof, 2026-07-01 overnight)
- **Test:** a fresh **Sonnet** agent, walled to ONLY the v1.2 Pack + the Kindred brief, built the full homepage cold (`projects/_coldtest/kindred-v12/index.html`).
- **Result: PASSED.** Independent gate 0/0/0 (after one 70ch disclaimer cap). All v1.2 systems present and correct: mini-hero + labeled diagram, deep-accent proof w/ light text, stagger, hovers, sheen, underline-draw, no-JS fallback, reduced-motion. It even solved `--accent-deep` to a boundary-exact 5.00:1 against the gradient's lightest stop.
- **The agent HARDENED the Pack while executing it** — 4 real notes, all encoded back: (a) `.wrap`/`.nav-in` flex `min-width:0` trap (real mobile overflow it caught + fixed); (b) mobile nav-CTA sizing recipe; (c) accent-deep retint must target the gradient's LIGHTEST stop, not the base hex; (d) **unverified stats must never carry `data-count`** — its own first draft animated a placeholder into a fabricated "0+ yrs" on screen, caught in self-check. That last one is a fabrication vector the compliance rules didn't anticipate: motion can synthesize a claim no copy ever stated.
- **THE LESSON:** the Pack method survives a lower-tier executor at full-page scope — and cold executors are also Pack QA: every ambiguity they hit is a hardening note. The cost of the proof was one review of their notes, not a rebuild.
- **Known checker tension (accepted):** `banned-font: Poppins` fires on dark-confident-pack builds — Poppins is that Pack's MEASURED default (Stashwealth). The banned list is calibrated for editorial-luxury; a Pack's measured font roles supersede it (same class as tension #7).
- **Status:** ✅ proof complete. Next escalation: same test on Haiku.

### Episode — Haiku cold rebuild (the tier-floor test, 2026-07-02 overnight)
- **Test:** same walled cold-build, **Haiku** executor (`projects/_coldtest/kindred-haiku/index.html`).
- **Result: STRUCTURE PASSED, SELF-CHECK DIDN'T.** Independent gate: 0 P0 / 0 P1 — the register,
  composition map, mini-hero + diagram, deep-accent proof, motion systems all reproduced correctly.
  BUT: 3 real P2 measure defects (96/133/157 CPL uncapped text), one invalid CSS declaration
  (`var(--ease))` double-paren killing the why-card transition), and an INVERTED hover (dark-2 →
  darker instead of lighter). **And its self-report claimed a fully clean §9 gate without opening a
  browser** (5 tool uses vs Sonnet's 99 — it "checked" by re-reading its own code).
- **THE LESSON (tier calibration):** Sonnet = executes AND self-verifies (its browser QA caught its
  own bugs). Haiku = executes the language faithfully but its self-verification is confabulation —
  Haiku-tier builds are fine ONLY inside the external repair loop (deterministic gate + independent
  repair), never on self-report. That loop fixed everything in one pass (4 CSS line repairs).
- **Factory rule:** builder tier sets the verification tier. Haiku build → full external QA loop
  mandatory; Sonnet build → external gate as confirmation; NO tier's self-report is ship evidence
  (this was already law for taste — now proven for geometry too).
- **Status:** ✅ repaired to gate-clean; tier guidance encoded here.

---

## Open doc tensions to resolve (found during the Field build)
1. **Eyebrow = accent (DESIGN.md) vs accent ≤ 3 places (DESIGN_FUNDAMENTALS).** → Resolve: eyebrows default to muted ink; accent reserved for CTA + one hero element + key numerals. (LED-003)
2. **`--bg-inverse-rgb` not in the RGB-triplet rule.** → Add `--bg-inverse` to the required-triplet list in DESIGN_TOKENS.
3. **7C Anchor Testimonial has no headline in COPY_ALL** — ambiguous whether the pattern wants one. → Clarify in SECTION_PATTERNS.
4. **`[VERIFY]` vs `[PLACEHOLDER]` visible-marker treatment conflict** (DESIGN.md §9). → Disambiguate: PLACEHOLDER = visible amber; VERIFY = HTML comment only.
5. **Mandatory ICP eyebrow vs the hero-eyebrow-chip slop tell** (found 2026-06-30, ceiling proof). SECTION_PATTERNS makes a tracked-caps ICP eyebrow above the hero h1 non-negotiable for conversion; the impeccable detector flags exactly that shape as "the default AI SaaS hero." Both are right. → Resolve at the template level: keep the eyebrow as a *deliberate, named brand system* (the brand register exempts named systems), but (a) default it to **muted ink, not accent** (LED-003 resolution — applied in the proof, fixed both the chip-feel and the 4.3:1 contrast), and (b) consider integrating the kicker into the headline or a nav-breadcrumb on hero-dominant pages. Decision affects every build — flag for Chris.
6. **`--text-muted` (#9A968C) fails WCAG AA on `--bg-base`** (2.8:1; needs 4.5:1). A token-level a11y floor issue present in *every* light Field build, not just the proof (the reference rebuild inherits it). → Darken `--text-muted` to ≥ 4.5:1 on bg-base, or restrict it to large/decorative text only. The proof bumped its affected captions to `--text-secondary` as a local fix; the token needs the real fix.
7. **Single-family vs two-family pairing** (detector `single-font`). The proof uses Satoshi across weights 400–900 (a deliberate single-family voice, which the brand register explicitly permits — "a single well-chosen family with committed weight/size contrast is stronger than a timid display+body pair"). The detector flags any single family. → Not a defect; note that the deterministic `single-font` flag is advisory and a deliberate single-family choice clears it via the taste critic.

### LED-013 — `backwards`-fill stagger animation ungated from `.in` = permanently invisible content (P0-class, escaped BOTH gates)
- **Build:** home-v2.html, introduced during the Opus elevation pass (2026-07-02). `.stagger > *{opacity:0; animation:staggerRise .7s backwards}` with only the DELAYS gated on `.in`: the animation runs once at page LOAD (offscreen), finishes, and backwards-fill reverts children to base `opacity:0` — every card on the page invisible in a real focused browser. Chris caught it ("the elements aren't there, it's just blank").
- **Why both gates missed it:** the deterministic gate freezes animations and checks GEOMETRY (height/overflow) — an opacity:0 element has full height. The executor verified in a throttled hidden tab where animations never tick, so computed opacity was 0 in both broken and correct code — indistinguishable. The ONLY reliable check: neutralize animations (`*{animation:none!important}`), force `.in`, then census `opacity<0.05` on revealed elements — that isolates the BASE-RULE truth from animation state.
- **Fix:** correct pattern (Kindred-proven): base = `.stagger>*{opacity:0}`; ALL of `{opacity:1; animation}` lives under `.stagger.in>*`. After animation ends, backwards-fill reverts to the `.in` base = visible.
- **Permanent artifacts:** (a) the pattern rule → packs already carry the correct snippet; briefs must forbid restructuring the reveal-gating (elevation passes included). (b) ✅ DONE (2026-07-02): `window.__opacityCensus()` in `qa/visual-checks.js`, wired into `run-checks.js` as the LAST step (it mutates the page: `animation:none!important` — NOT duration:0, fill states must die — then `.in` forced on every element, then census computed `opacity<0.05` on content-holding, ≥4px, normal-flow elements; `position:fixed/absolute` skipped — overlays/carousel decks are legitimately hidden at rest). Two codes: **P0 `opacity-invisible`** (no animation attached — nothing can ever reveal it) and **P1 `opacity-anim-dependent`** (forwards/both-fill load animation — visible only if it runs, LED-011 rAF risk; the "48th element" class below, now surfaced instead of hand-waved). Proven on `qa/fixtures/led013-broken.html`: broken stagger = 3 P0 + exit 1; correct Kindred-pattern grid clean; forwards hero = P1. `home-v3.html` re-gated clean (exit 0). (c) Throttled-tab verification CANNOT validate reveal systems — use the neutralize-and-census technique (now automated).
- **Status:** ✅ fixed + checker shipped. Fully closed.

### LED-014 — Dead primary CTA / unreachable second screen (P0-class, conversion)
- **Build:** model-bench claude-sonnet-5 one-shot (2026-07-08)
- **Symptom:** "Start the assessment" (the page's MQL event) linked to `#assess` — the section it sits in. The report screen was reachable only by hand-typing the URL hash; the view-switch never scrolled to top.
- **Root cause:** one-shot builder wired visuals, not interactions; nothing in the gate exercises clicks.
- **Caught by:** rendered review + JS probe (bench). Escaped the deterministic gate entirely — it checks geometry, not wiring.
- **Permanent artifact (pending implementation):**
  - Check → `qa/visual-checks.js` `cta-dead-anchor` (P0): any `.btn`/primary CTA whose href resolves to its own containing section, a missing id, or `#`.
  - Check → `conversion-path-smoke` (P0): programmatically invoke each primary CTA; assert a state change (navigation, view switch, or form focus).
  - Rule → DESIGN_SYSTEM R34 (interaction wiring is part of "done").
- **Status:** ⏳ checks not yet written; rule added 2026-07-08.

### LED-015 — Animated stat renders 0 on an entry path (P0-class, trust)
- **Build:** model-bench claude-sonnet-5 (2026-07-08)
- **Symptom:** report's "match confidence" stat (data-count-to=93) rendered **0%** when the report was opened via URL hash — the counter only ran on the button-driven view switch.
- **Root cause:** count-up wired to one entry path; hash entry skipped it.
- **Caught by:** rendered review (bench).
- **Permanent artifact (pending):** check → `counter-stuck-at-zero` (P0): after freezing animations to end-state, any `[data-count-to]`-style element whose rendered text is still 0/empty. Note: the gold build's 5×P1 `opacity-anim-dependent` warnings are the same class (state depends on an animation actually running) — fix queued for gold.
- **Status:** ⏳ check not yet written; rule R34 covers.

### LED-016 — Internal build-notes leaked into public copy (P1-class, taste/trust)
- **Build:** model-bench fugu-ultra one-shot (2026-07-08)
- **Symptom:** marketing page showed implementation caveats as visible copy: "*Fictional interface value for this demo; replace with live public-filing query before launch*", "Ticker … public page must be wired to verified aggregate queries", report sub-head "This screen demonstrates the assessment result experience."
- **Root cause:** the model's compliance instinct expressed itself as dev-notes instead of reader-facing labels; the packet never distinguished the two registers.
- **Caught by:** rendered review (bench).
- **Permanent artifact:** Rule → DESIGN_SYSTEM R32 (compliance labels are reader-facing words like "Illustrative — from public filings"; never dev-notes, never self-describing demo-speak). Critic checklist item added. A cheap check is possible (`grep` for "replace with|must be wired|this demo|this screen demonstrates" class of phrases) — pending.
- **Status:** rule added 2026-07-08; check pending.

### LED-017 — Charts with zero information content (P1-class, craft)
- **Build:** model-bench fugu-ultra (2026-07-08)
- **Symptom:** "What you may be worth" range bars rendered as EMPTY grey tracks labeled only "Illustrative" ×3 — no endpoints, no fill, no comparative fact. Net-flow card: three thin bars labeled Inflow/Mixed/Selective — a chart-shaped object carrying one word of information.
- **Root cause:** over-compliance + no minimum-information standard for data viz.
- **Permanent artifact:** Rule → DESIGN_SYSTEM R33 (every chart encodes ≥1 comparative, labeled fact; range charts show numeric endpoints; if the honest content is one word, use a sentence, not a chart).
- **Status:** rule added 2026-07-08.

### LED-018 — Negative-inline mobile overflow can escape `scrollWidth` checks (P0-class visual defect)
- **Build:** `projects/awp/build/home-v4-review.html` (2026-07-13), first mobile taste pass.
- **Symptom:** the full-width fit panel used `.wrap` plus a negative inline margin; at 390px it shifted off the left edge even though `document.documentElement.scrollWidth === innerWidth`.
- **Why the gate missed it:** negative-start overflow does not necessarily increase the document's measured scroll width. A no-horizontal-scroll assertion can pass while visible content is clipped off-canvas.
- **Fix:** mobile override on the direct full-width child: `width:100%; margin-inline:0`. Use a mathematically bounded breakout when true bleed is needed; never negative-margin a constrained `.wrap` blindly.
- **Permanent lesson:** Tier-B must inspect representative mobile screenshots, not infer mobile safety from `scrollWidth` alone. Add a future rendered-bounds census for meaningful normal-flow elements whose left edge is `< 0` or right edge exceeds the viewport.
- **Status:** ✅ closed in v4; checker enhancement open.

### LED-019 — Brand law can legitimately clear `accent-fill-absent` (accepted P2)
- **Build:** `projects/awp/build/home-v4-review.html` (2026-07-13).
- **Gate:** 0 P0 / 0 P1 / 1 P2 (`accent-fill-absent`).
- **Why accepted:** Anchor's brand register explicitly requires gold to be sparing and precise, never a background field. Adding a gold drench only to silence the proxy would violate the client brand.
- **Permanent lesson:** `accent-fill-absent` remains informational. The Tier-B critic may clear it when a documented brand rule intentionally reserves accent for details, controls, and small moments; record the exception instead of weakening the design or hard-coding client-specific gate logic.
- **Status:** ✅ documented, accepted.

### LED-020 — Correct source casting can become wrong after responsive cropping (P1-class meaning defect)
- **Build:** `projects/awp/build/home-v4-review.html` family-video revision (2026-07-13).
- **Symptom:** the source frame contained grandparents, parents, and children, and the desktop composition read as intergenerational. The same 16:9 footage under `object-fit:cover` at 390×844 reduced the visible story to one adult, contradicting the “High-Net-Worth Families” market label.
- **Why the gate missed it:** geometry, loading, contrast, and overflow were all correct. The defect was semantic: responsive cropping removed the people that made the image true.
- **Fix:** keep the wide documentary source for desktop and art-direct the narrow viewport with a slow bounded `object-position` sweep across the family. A dedicated portrait source remains the stronger production solution when client footage exists.
- **Permanent lesson:** Tier-B media QA must test whether each responsive crop still contains the subject that substantiates its label, not merely whether the image loads and looks attractive. Add “semantic crop” to photo/video review.
- **Status:** ✅ closed for review; portrait client footage preferred for launch.

### LED-021 — Reveal CSS must gate under `.in` not `.visible` (P0, LED-013 recurrence)
- **Build:** `projects/awp/build/home-v5.html` (2026-07-13).
- **Symptom:** 10 P0 `opacity-invisible` blockers on first gate run — every `.reveal` element permanently invisible when gate forces `.in` class.
- **Root cause:** CSS used `.reveal.visible` as the visible end-state, but the gate's animation-neutralizer forces `.in` (not `.visible`). The JS observer adds both `.visible` and `.in`, so in a real browser it worked — but under the gate's forced `.in` the content stayed at `opacity:0`.
- **Fix:** Added `.reveal.in` as an additional selector for the visible end-state: `.reveal.in, .reveal.visible { opacity:1; transform:none; }`.
- **Permanent lesson:** The gate's `__opacityCensus()` forces `.in` — reveal CSS must gate visible state under `.in` as well as any custom class the JS adds. This is the same class of bug as LED-013 (reveal end-state not gated under the forced class). The fix is trivial but the gate will catch it every time.
- **Status:** ✅ closed. Gate: 0 P0 / 0 P1 / 1 accepted P2 (`accent-fill-absent`, LED-019).

### LED-022 — Accordion `grid-template-rows:0fr→1fr` collapses under gate (P0, LED-001 class)
- **Build:** `projects/awp/build/home-v6.html` (2026-07-13).
- **Symptom:** 5 P0 `collapsed-height` blockers — accordion body elements rendered at 0px height despite holding content.
- **Root cause:** `grid-template-rows:0fr→1fr` transition technique for CSS-only accordions collapses when the gate's animation neutralizer freezes transitions. The `1fr` state on the open item gets reset to `0fr`, and `overflow:hidden` on the inner wrapper clips all content to 0px. The `max-height:0→400px` fallback also collapses for the same reason.
- **Fix:** Replaced accordion with outcome cards (2-col grid of elevated cards with 3-layer shadow + gold bottom-line hover). No collapsing containers — all content is always in-flow.
- **Permanent lesson:** Any layout technique that relies on animated height transitions (`grid-template-rows`, `max-height`, `height:auto` transitions) will collapse under the gate's animation neutralizer. For content that must be visible at all times, use static in-flow layouts (cards, grids, lists). Reserve animated-height techniques for truly optional content (mobile menus, filter panels) where the gate can be told to ignore them.
- **Status:** ✅ closed. Replaced with outcome cards. Gate: 0 P0 / 0 P1 / 0 P2 (fully clean).

### LED-023 — A clean-sheet reprint can silently drop approved narrative modules
- **Build:** `projects/awp/build/home-v6.html` (2026-07-13).
- **Symptom:** the new visual direction preserved the broad conversion spine but omitted three previously approved homepage modules: Why Anchor, the firm-origin/coordination story, and Insights. The client caught the loss below the hero.
- **Root cause:** the reprint was checked against the factory skeleton, but no ordered section-manifest diff was made against the prior client-approved candidate. “Same spine” was treated too broadly and approved narrative content disappeared during recomposition.
- **Fix:** restored all three modules inside v6's current “Chart” language; no visual rollback and no current sections removed.
- **Permanent lesson:** before replacing a live candidate, diff the ordered semantic section manifest against the prior approved candidate. Mark every prior module **KEEP / MERGE / DELETE** with a reason. A clean print may change composition, but it cannot silently discard client-approved content.
- **Status:** ✅ closed. Desktop/mobile Tier-B passed; gate 0 P0 / 0 P1 / 0 P2.

### LED-024 — Reusing a generic section class/id can cross-wire two independent modules
- **Build:** `projects/awp/build/home-v6.html` (2026-07-16 continuation).
- **Symptom:** the Alex story-video module and the firm-origin module both used `.story` and `id="story"`. The later origin styles silently restyled the earlier video section, and fragment navigation had two destinations with the same identity.
- **Root cause:** a restored narrative module inherited a generic component name already claimed elsewhere in the clean-sheet build. The semantic section manifest was preserved, but the selector/ID namespace was not checked.
- **Fix:** renamed the advisor module to `.alex-story` / `#alex-story`, gave its descendants a scoped namespace, and removed the duplicate interactive placeholder. A rendered probe now reports zero duplicate IDs.
- **Permanent lesson:** every restored or merged module needs a selector-and-ID namespace check in addition to the ordered section-manifest diff. Section names should describe the job (`alex-story`, `firm-origin`), not a generic shape (`story`).
- **Status:** ✅ closed. Gate 0 P0; duplicate-ID probe clean.

### LED-025 — Auto-advance plus a manual Continue action creates a double-step race
- **Build:** `projects/awp/build/home-v6.html` (2026-07-16 design revision).
- **Symptom:** choosing a Fit Check radio option scheduled the next step after 380ms while a live Continue button could advance immediately. A fast click skipped a question; a pending timer could also undo Back. Focus remained inside the fieldset that had just been hidden because its legend was not focusable.
- **Root cause:** two controls owned the same state transition, and the delayed callback read mutable global step state.
- **Fix:** removed redundant Continue buttons from radio steps, stored the selected step inside the callback, cancels pending timers on every navigation, verifies the originating fieldset is still active, and focuses a `tabindex="-1"` legend after the new step renders.
- **Permanent lesson:** an auto-advance form must have one transition owner. Delayed state changes need cancellation, a captured origin state, and an explicit post-transition focus target.
- **Status:** ✅ closed. Desktop and 390px runtime probes advance exactly one step and Back remains stable after the former timer window.

### LED-026 — Preview-media controls must match the media stream and interaction state
- **Build:** `projects/awp/build/home-v6.html` (2026-07-16 design revision).
- **Symptom:** silent placeholder MP4s exposed Unmute controls; the story play overlay became visually transparent but stayed tabbable, and reel play/pause had no keyboard path.
- **Root cause:** production-video affordances were applied before the placeholder assets were inspected, and visual hidden state was treated as interaction hidden state.
- **Fix:** removed fake sound controls and labeled the previews as silent, restored the GLM lazy-play pattern with native controls after playback starts, makes the overlaid play button non-interactive when hidden, and added focus/Enter/Space reel controls. Reduced-motion now blocks automatic video playback and smooth rail scrolling.
- **Permanent lesson:** inspect actual audio tracks before drawing sound UI. Every visual control state must have matching focus, keyboard, and reduced-motion behavior.
- **Status:** ✅ closed. Runtime probes confirm native story controls, reachable keyboard reel controls, and paused hero video under reduced motion.

### LED-027 — A geometry-clean content shell can still fail search, trust, and publishing quality
- **Build:** `projects/awp/build/resources.html`, `blog-template.html`, and `podcast-template.html` (2026-07-17 content-system reprint).
- **Symptom:** the first content routes passed the visual geometry gate but looked like generic financial-editorial templates. The article exposed publish/read-time tokens, lacked named sources and a useful content artifact, and had no article schema, canonical, social metadata, or complete internal-link path. The podcast exposed pending platform links without real media. The directory treated content as rows beneath an oversized hero rather than a publication.
- **Root cause:** the factory architecture names Resources as an SEO surface, but the deterministic gauntlet has no content-page contract. It checks rendered geometry, not whether a page is publishable, attributable, source-backed, machine-readable, or organized around search intent.
- **Fix:** clean reprint into one Planning Room system. Added answer-first article structure, an Anchor-specific RSU timing map, primary IRS sources, contextual internal links, visible podcast inventory, honest preview states, semantic landmarks, review-mode `noindex`, canonical scaffolding, social metadata, and parseable `CollectionPage`, `BlogPosting`, `BreadcrumbList`, and `PodcastEpisode` JSON-LD.
- **Permanent lesson:** every content route needs a preflight beyond the visual gate: unique title and description; review-versus-production robots state; final canonical and clean URL; exactly one H1; parseable page-type schema; approved author/date/image; primary sources for financial claims; problem-led taxonomy; related-service, trust, and conversion links; no visible build tokens; and no media/platform UI until real media exists.
- **Status:** ✅ closed for local review. All three routes: 0 P0 / 0 P1 / 1 accepted P2 (`accent-fill-absent`, cleared under LED-019). Final domain, licensed fonts, author approval, and podcast media remain production inputs.

### LED-028 — Content-route typography must sit one tier below campaign display scale
- **Build:** `projects/awp/build/resources.html`, `blog-template.html`, and `podcast-template.html` (2026-07-17 content-system revision).
- **Symptom:** the content routes were structurally sound, but oversized page titles and generous campaign-style section spacing made the directory, article, and episode pages feel slower and less useful than the homepage. The footer repeated a generic conversion link without showing what the Fit Check involved.
- **Root cause:** homepage display tokens and vertical rhythm were carried too directly into long-form routes, where scanning density and information hierarchy matter more. The final CTA described an action but did not reduce uncertainty about the action.
- **Fix:** reduced route-level H1/H2 scales and section gaps, tightened cards and article rhythm, retained purposeful numbered sequences, and replaced the generic footer CTA with a four-step Fit Check preview and direct start action.
- **Permanent lesson:** content-route type should be calibrated separately from campaign/homepage display type. A conversion footer should preview the next interaction when that preview lowers commitment anxiety.
- **Status:** ✅ closed for local review. All three routes: 0 P0 / 0 P1 / 1 accepted P2 (`accent-fill-absent`, cleared under LED-019); desktop and 390px taste passes show no horizontal overflow.

### LED-029 — A public review mirror needs a release allowlist and media-license audit
- **Build:** Anchor v6 public team-review release (2026-07-17).
- **Symptom:** the first staged Pages worktree contained two inactive Mixkit family files whose free 720p license was restricted to personal use. They were no longer referenced, but a broad `git add -A` would still have published them. The media ledger also described two active loops as eight seconds when the encoded files were four seconds.
- **Root cause:** the review mirror had accumulated assets through folder-level copying, while provenance was treated as a launch-only concern. Unreferenced files inside a Pages worktree are still public if committed, and stale duration/source notes make the release audit unreliable.
- **Fix:** restored the project-generated modern family loop as the active hero asset, corrected `assets/SOURCES.md`, explicitly quarantined the restricted Mixkit reference, and rebuilt the public mirror from a curated page-and-asset allowlist in a fresh clone. Added review-wide `noindex,nofollow` before publication.
- **Permanent lesson:** every public preview is a distribution event. Stage Pages from an explicit allowlist, verify every active media license and duration, exclude restricted and unused assets physically, and apply review-mode robots metadata consistently before push.
- **Status:** ✅ closed. Fresh mirror contains no restricted family media; all active references resolve and all nine routes pass the release gate for team review.
