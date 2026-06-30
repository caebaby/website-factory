# Website Factory — Status
Last updated: 2026-06-30 (ceiling raised: "make it sing" docs + mesh/video hero primitives + Tier-B repair proven on taste)

---

## ▶ NEXT SESSION — Run the ceiling loop on a REAL client build (start here, fresh context)

The ceiling is now **encoded and proven on a fixture**. The remaining step is to run the full geometry+taste loop end-to-end on a real client (AWP), with the live `impeccable` Tier-B critic in the loop, and confirm a COLD build comes out bold — then promote the mesh/video primitives off "proof" into a shipped client hero.

**1. Cold-build AWP through the pipeline** with the richened docs (PARTS 8–9 + Primitives 4/5). Then drive the loop:
- `node qa/run-checks.js projects/awp/build/<file>.html '<accentHex>'` → must be 0 P0.
- Independent Tier-B taste pass (`impeccable`, detect-only) → must clear bold-vs-timid against LAYOUT_CRAFT 8.1–8.6.
- Repair any taste defects (the loop now demonstrably closes on taste, not just geometry — see LED-007/008), re-verify, log to `qa/LEDGER.md`.

**2. Resolve the template-level tensions surfaced this session** (qa/LEDGER.md open tensions 5–7), since they affect every build:
- The mandatory ICP eyebrow vs the hero-eyebrow-chip slop tell (#5) — eyebrow → muted ink by default; decide the chip question. **Needs Chris.**
- `--text-muted` fails AA on `--bg-base` (#6) — darken the token.

**3. Then:** promote a blessed mesh/video hero into the real AWP build once it passes both gates N times (the COMPONENTS blessing path).

### ✅ DONE this session (2026-06-30) — the ceiling encoding + primitives
- **"Make it sing" encoded** — `LAYOUT_CRAFT.md` PART 8 (the ceiling, LLM-agnostic, with a new **[TASTE]** confidence tier): 8.1 *safe=invisible*, 8.2 *editorial-reflex trap*, 8.3 *color commitment* (Restrained/Committed/Drenched + the timidity check), 8.4 *counterweight raised*, 8.5 *density rhythm*, 8.6 *signature-moment quality bar*. Floor vs ceiling framing throughout.
- **Reference-extraction protocol defined** — `docs/REFERENCES.md` RULE #4 (admire → NAME the technique → codify as tested primitive + LAYOUT_CRAFT rule + REFERENCES entry → verify → deploy). Zoom hero extracted (mesh gradient + video-with-scrim), Stripe cross-confirmed.
- **Two tested primitives built** — `COMPONENTS.md` Primitive 4 (animated CSS mesh-gradient hero, GSAP-drifted, degrades static) + Primitive 5 (video hero, poster fallback + directional scrim + IO lazy-load + reduced-motion pause). Wired into MOTION_TIERS (T3.1b + T3.3 reconciled) + SECTION_PATTERNS (Hero 1B/1D) + LAYOUT_CRAFT PART 9.
- **Gate extended** — `qa/visual-checks.js` gained `accent-fill-absent` + `section-rhythm-monotony` (informational P2 ceiling proxies; verified clean on the known-good Field rebuild — corpus integrity intact).
- **Proof built + verified through the full loop** — `qa/fixtures/signature-hero-proof.html`: 0 P0 geometry on first build; Tier-B critic PASS after fixing two real execution-timidity defects (LED-007 faint mesh, LED-008 ghost counterweight). This is the loop closing on **taste**, not geometry. Shipped as a replay-corpus known-good fixture (served via `fixtures` on :8099).

---

## CONSOLIDATION — Repair loop wired + process cleaned (model-agnostic)

Goal locked: **hand the factory to any suite of models → consistent $25k quality.** Quality lives in docs + tested primitives + a deterministic gate + repair loop, not in a prompt or one model's taste.

- ✅ **Repair loop wired** — Agent 05 now OWNS the loop (render → `visual-checks.js` → Tier-B taste critic → verdict → `repair(defects)` to Agent 04 → re-verify; 3-iteration cap, escalate on stall/regression). Agent 04 has a Repair Mode (scoped fixes, fix-the-root via LAYOUT_CRAFT/COMPONENTS, swap in tested primitives).
- ✅ **Taste critic slotted in** — `impeccable` / `avoid-ai-design` run as the **detect-only Tier-B critic** (judgment layer), never as builder. Its deterministic 44-rule slop detector was **ported into `qa/visual-checks.js`** (indigo accent, gradient text, side-stripe border, flat 0.1 shadow, uniform radius) — runs free every build, model-agnostic.
- ✅ **Process cleaned** — removed deprecated/contradictory docs (git history preserves): `DESIGN_DIRECTIONS.md` (old archetypes), the duplicate template `REFERENCES.md`, `docs/FACTORY-V2-PROCESS.md`, `docs/ANIMATION_LIBRARY.md` (old vanilla-only, contradicted GSAP), `projects/awp/BUILD_PROMPT.md`, and the `build-a/c/d` experiment folders.
- ✅ **`CLAUDE.md` rewritten** — current pipeline, the 9-doc template stack, the model-agnostic goal, GSAP-allowed (supersedes "vanilla JS only"), the QA loop.

Template doc stack is now coherent and non-overlapping: SECTION_MANIFEST · DESIGN · DESIGN_TOKENS · SECTION_PATTERNS · MOTION_TIERS · DESIGN_FUNDAMENTALS · LAYOUT_CRAFT · COMPONENTS · PAGE_SYSTEM.

---

## OVERNIGHT SESSION — Self-Improving Factory (the big shift)

The factory was proven to produce the *skin* reliably but fail *layout craft* (Field shipped a collapsed signature element + headings trapped in 324px columns, and CSS-grep QA passed it). Fixed the root cause and built the compounding system:

- ✅ **Field repaired to bar** — cycle slot (grid-stack, can't collapse) + em-trap columns (now 32 CPL). Verified by measurement.
- ✅ **`qa/visual-checks.js`** — executable rendered-geometry QA gate. Catches collapse / overflow / display-trapped / accent-overuse / banned fonts. Tested: passes fixed Field, would have failed the broken one. This is the missing pixel-level QA.
- ✅ **`templates/editorial-luxury/LAYOUT_CRAFT.md`** — the craft, machine-checkable: measure-by-size formula, line-height/tracking tables, rag rules, whitespace/composition, AI-slop tells. From a 12-agent research pass (Bringhurst, Apple HIG, Material, Carbon, Refactoring UI, slop detectors).
- ✅ **`templates/editorial-luxury/COMPONENTS.md`** — golden primitives (cycling-word hero, multi-step form, scroll reveal) as TESTED code the build agent assembles, never re-derives. Plus the component-vs-prose decision rule.
- ✅ **`FACTORY_LEARNING.md`** — the self-improving loop: build→render→inspect→critique→repair→re-verify→learn; the 3-layer defect ledger; how each caught defect becomes a permanent check / rule / blessed component and compounds.
- ✅ **`qa/LEDGER.md`** — seeded with tonight's 4 real defects (LED-001..004) + 4 open doc tensions.
- ✅ Agents 04 + 05 wired to read the craft/components docs and RUN the visual checker.

**Next (V1+):** wire the repair loop into 04/05 prompts; add the LLM critic + gold exemplars; automate the ledger + replay corpus + pixel baselines on blessed components. Resolve the 4 open doc tensions in LEDGER.md.

---

---

## System State: Token System WIRED + Validated by Direction 01

The 5-dial token system is now live in the pipeline (the archetype fork is dead), and the first end-to-end proof build (Larkspur) is built and verified. The Opus audit's mid-migration blockers are resolved.

### Resolved this session (from the Opus audit)
- ✅ Agents 02.5 / 04 / 05 rewired from the dead archetype system to tokens + patterns + tiers + fundamentals + page-system
- ✅ Font contradiction fixed — Inter/DM Sans removed from DESIGN_TOKENS, replaced with Fontshare (Cabinet Grotesk, Switzer, General Sans); DESIGN.md ban and token mandate now agree
- ✅ GSAP-vs-vanilla resolved — DESIGN.md + Agent 04 now permit GSAP/Lenis CDN (supersedes "vanilla JS only")
- ✅ Missing TRUST pattern added to SECTION_PATTERNS (manifest core #4) + the Design Brief template
- ✅ RGB-triplet rule + cross-doc precedence rule added to DESIGN_TOKENS
- ✅ DESIGN.md reframed as the tone-AGNOSTIC quality floor (light/mixed/dark all valid)
- ✅ DESIGN_DIRECTIONS.md marked DEPRECATED

### Direction 01 — Larkspur Private Wealth (proof of concept) ✅ BUILT + VERIFIED
- `projects/larkspur/` — brief + homepage built through the new system
- Config: dark / balanced / expressive / modernist-sans / graphic-system / copper accent
- **Deliberately the inverse of AWP** (light / editorial-serif / navy-gold / photography) to prove the system makes unrelated sites
- Verified in preview: 9 sections render, dark tokens correct (#0D0D0D base, #1C1C1C surface), 3-layer shadows, copper accent in exactly 3 places, Fontshare fonts (no banned fonts), fit-assessment multi-step works, no-JS/GSAP-fail safe, prefers-reduced-motion handled
- Signature moment: custom SVG coordination graph in hero (DrawSVG animated)
- Hero screenshot = genuinely $25k-grade dark execution

---

## System State: Design System Foundation COMPLETE

The editorial-luxury template now has a full 7-document design system. Every build agent reads these before touching code.

---

## What's Built

### Template System — `templates/editorial-luxury/`

| File | Status | What It Does |
|------|--------|-------------|
| `DESIGN.md` | ✅ Exists | Quality floor: 3-layer shadows, shimmer CTAs, grain overlay, banned fonts, anti-slop rules |
| `SECTION_MANIFEST.md` | ✅ Exists | 9 mandatory conversion sections in fixed order. Agent 05 blocks ship if any missing. |
| `DESIGN_TOKENS.md` | ✅ Built | 5-dial token system (Tone / Density / Motion / Type / Visual). Replaces 4-archetype system. |
| `SECTION_PATTERNS.md` | ✅ Built | 3–4 layout patterns per section. Agent 02.5 selects one per section in Design Brief. |
| `MOTION_TIERS.md` | ✅ Built | T1/T2/T3 animation specs with exact GSAP code. CDN versions confirmed. |
| `DESIGN_FUNDAMENTALS.md` | ✅ Built | Visual hierarchy, type scale, color system, spacing grid, accessibility. LLM-agnostic. |
| `PAGE_SYSTEM.md` | ✅ Built | Inner page architecture: section orders per page type, nav, CTA strategy. LLM-agnostic. |
| `REFERENCES.md` | ✅ Updated | Chris-approved sites only. Section-mapped. GSAP technique specs included. |
| `DESIGN_DIRECTIONS.md` | ⚠️ Deprecated | Old 4-archetype system. Replaced by DESIGN_TOKENS.md. Delete after Direction 01 validates. |

### Agent Prompts — `agents/`

| Agent | File | Status |
|-------|------|--------|
| 01 Research | `01_research.md` | ✅ Exists |
| 02 Strategy | `02_strategy.md` | ✅ Exists |
| 02.5 Design Direction | `02.5_design_direction.md` | ⚠️ Needs update — still references old archetype system, not new token/pattern system |
| 03 Copy | `03_copy.md` | ✅ Exists |
| 04 Build | `04_build.md` | ⚠️ Needs update — doesn't reference DESIGN_FUNDAMENTALS.md or PAGE_SYSTEM.md yet |
| 05 QA | `05_qa.md` | ✅ Exists |

### Docs — `docs/`

| File | Status | Notes |
|------|--------|-------|
| `REFERENCES.md` | ✅ Chris-approved | Canonical version. templates/editorial-luxury/REFERENCES.md is a duplicate — resolve. |
| `ANIMATION_LIBRARY.md` | ✅ Exists | |
| `FACTORY-V2-PROCESS.md` | ✅ Exists | |

### Projects

#### `projects/meridian/` — Component Showcase
Status: **NEEDS BUG FIXES**

| Bug | Severity | Fix |
|-----|----------|-----|
| Hero gradient + blueprint grid lines | Visual | Replace with cleaner hero background |
| Font descenders clipped (y, g, p cut off) | Visual | Add padding-bottom to hero headline container |
| Font should animate on hover/scroll | Enhancement | Add SplitText reveal on scroll |
| Pain section "nobody owns" card cut off | Layout | Auto-scroll or expand container |
| ICP/particle section — wants color variations | Enhancement | Add color dial to particle section |
| 3D tilt hover "a little weird" | Fixed ✅ | quickTo() upgrade committed |
| Meridian Model graphic is weird | Visual | Replace diagram |
| Gold fade over blue = cheap | Visual | Replace with single-color treatment |
| Scene 01 Storm gradient = cheap | Visual | Replace with cleaner section bg |
| Video crossfade doesn't work | Feature | Replace with space/planet graphic |
| Magnetic buttons "weird and wonky" | Fixed ✅ | quickTo() upgrade committed |
| Dark blue + darker color combo | Visual | Color system fix |
| Lenis CDN 404 | Fixed ✅ | Updated to lenis@1.3.25 |
| perspective on card (fisheye distortion) | Fixed ✅ | Moved to parent container |

Chris likes: editorial look, square images, ticker, coordination gap section, ICP section, stats, client results layout.

#### `projects/awp/` — Anchor Wealth Planning (Alex Miller)
Status: **PAUSED — waiting on client**

| Asset | Status |
|-------|--------|
| Phase 1 build (5 pages) | ✅ Built — `build/` |
| Brand guide applied | ✅ |
| Alex Miller confirmed as anchor example | ✅ |
| Client photos, final copy | ⏳ Waiting on Alex |
| build-a, build-c, build-d variants | ⚠️ Uncommitted — need decision |

---

## What's Next (Priority Order)

### 1. Update Agent Prompts (1–2 hrs)
- **Agent 02.5:** Update to output new Design Brief format (token dial values + pattern selections + motion tier), not old archetype names
- **Agent 04:** Add `DESIGN_FUNDAMENTALS.md` and `PAGE_SYSTEM.md` to its required read list

### 2. Resolve REFERENCES.md Duplicate
- `docs/REFERENCES.md` and `templates/editorial-luxury/REFERENCES.md` — one of these is redundant
- Decision needed: keep one canonical location, delete or symlink the other

### 3. Build Direction 01 — Proof of Concept (4–6 hrs)
One complete fictional client site through the full new system:
- All 9 homepage sections
- 3+ inner pages using PAGE_SYSTEM.md
- Full token configuration from DESIGN_TOKENS.md
- Motion tier applied from MOTION_TIERS.md
- Proves the system produces a unique, premium site end-to-end

This validates the system before the next real client (AWP or Longview) runs through it.

### 4. Fix Meridian Showcase Bugs
- 8 remaining visual/feature bugs listed above
- Lower priority than Direction 01 unless the showcase is being shown

### 5. Deprecate `DESIGN_DIRECTIONS.md`
Delete after Direction 01 proves the token system produces better output.

---

## Technical Notes

- `website-factory/` is its own git repo (separate from the parent Claude Projects repo)
- All builds are single HTML files — no build step, no npm, no dependencies
- CDN stack confirmed working: GSAP 3.13.0, Lenis 1.3.25
- GSAP SplitText, DrawSVG, ScrollSmoother now free (no club membership required)
- AWP build-a/c/d variants are on disk but not committed — need decision on what to keep

---

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| 5-dial token system over 4 named archetypes | Archetypes = templates. Dials = unique combinations. |
| LLM-agnostic docs (not Claude skills) | Design knowledge must be portable across any AI. |
| Research-first before building | 6-agent parallel research → permanent docs beats trial-and-error. |
| Single HTML file builds | No build tooling = faster iteration, easier handoff, zero dependency hell. |
| Chris must approve all reference sites | Prevents over-reaching with sites that don't match the target aesthetic. |
