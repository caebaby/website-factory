# Website Factory — Claude Instructions

## What this repo is
An end-to-end pipeline that turns a client intake into a premium, high-converting, single-file website. Client fills an intake → agent pipeline runs → a QA repair loop drives it clean → production-ready site on a review link.

**Target:** $25k agency quality, in under ~5 hours of agent time, with one human gate (Johnny) pre-deploy.

## The core goal: model-agnostic, consistent quality
The entire system is designed so you can hand it to **any suite of models** and get a great, consistent product. The quality does NOT live in a clever prompt or a single model's taste — it lives in:
- **LLM-agnostic docs** (the craft, the rules, the tokens) any model reads and applies,
- **tested code primitives** the build agent *assembles* (never re-derives), and
- a **deterministic QA gate + repair loop** that inspects rendered pixels and fixes defects before ship.

If a build is bad, that's a gap in the docs / primitives / checks — fix the system, not the prompt. The system compounds (see `FACTORY_LEARNING.md`).

---

## The pipeline

| Agent | File | Reads | Produces |
|-------|------|-------|----------|
| 01 Research | `agents/01_research.md` | `INTAKE.md` | `research/ICP_BRIEF.md` |
| 02 Strategy | `agents/02_strategy.md` | INTAKE + research + `SECTION_MANIFEST.md` | `strategy/COPY_STRATEGY.md` |
| 02.5 Design Direction | `agents/02.5_design_direction.md` | INTAKE + research + strategy + `DESIGN_TOKENS.md` + `SECTION_PATTERNS.md` + `MOTION_TIERS.md` | `strategy/DESIGN_BRIEF.md` (5-dial config + per-section patterns + signature moment) |
| 03 Copy | `agents/03_copy.md` | strategy + research + `SECTION_MANIFEST.md` | `copy/COPY_ALL.md` |
| 04 Build | `agents/04_build.md` | the template doc stack (below) + DESIGN_BRIEF + client DESIGN.md + SITEMAP + COPY_ALL | `build/*.html` |
| 05 QA + Repair Loop | `agents/05_qa.md` | build/ + the template docs + `qa/visual-checks.js` + brief/manifest | `qa/QA_REPORT.md`, drives repair, updates `qa/LEDGER.md` |

**Parallelism:** 01+02 together; 02.5 after 02; 03 parallel with 02.5; 04 after 02.5+03; 05 after 04.

**The QA repair loop:** the orchestrator spawns a FRESH, independent agent for every build, repair, and verification — **the builder never grades its own work** (self-verification is how a build once shipped a collapsed signature element while reporting "verified"). The loop: RENDER → INSPECT (`node qa/run-checks.js <file> '<accent>'` — a zero-dep headless gate that exits 0/1 on the P0 count) → CRITIQUE (Tier-B taste critic, detect-only) → verdict → `repair(defects)` to a fresh Agent 04 (scoped) → RE-VERIFY with a fresh Agent 05. Hard cap 3 iterations; escalate on stall/regression. Every caught defect → a new check / rule / blessed component. See `FACTORY_LEARNING.md`.

---

## Template doc stack — `templates/editorial-luxury/`
The design system is layered. Each doc owns one job; none overlap.

| Doc | Owns | Changes per client? |
|-----|------|---------------------|
| `SECTION_MANIFEST.md` | The 9-section conversion skeleton + order | No (structure) |
| `DESIGN.md` | Universal quality floor (shadows, shimmer, grain, anti-slop, frosted nav) — **tone-agnostic** | No (craft floor) |
| `DESIGN_TOKENS.md` | The 5 dials (Tone/Density/Motion/Type/Visual) + exact CSS token values | Yes (the skin) |
| `SECTION_PATTERNS.md` | 3–4 layout patterns per section | Yes (composition) |
| `MOTION_TIERS.md` | T1/T2/T3 animation specs (GSAP) | Per Motion dial |
| `DESIGN_FUNDAMENTALS.md` | Hierarchy / type / color / spacing / a11y physics | No |
| `LAYOUT_CRAFT.md` | Measure-by-size, line-height/tracking, rag, whitespace/composition, AI-slop tells — all machine-checkable | No |
| `COMPONENTS.md` | **Tested code primitives** (cycle hero, multi-step form, scroll reveal) to ASSEMBLE, not re-derive | No |
| `PAGE_SYSTEM.md` | Inner-page architecture (About/Services/Contact/etc.) | No |

Cross-build: `docs/REFERENCES.md` (Chris-approved reference sites), `qa/visual-checks.js` (the gate), `qa/LEDGER.md` (the factory's memory), `FACTORY_LEARNING.md` (the loop).

---

## Hard rules for Agent 04 (build)
1. Read the full template doc stack + the DESIGN_BRIEF before writing CSS.
2. Set the `:root` token block from DESIGN_TOKENS per the brief — including every `--*-rgb` triplet. Never hardcode a color that has a token.
3. **Assemble the hard interactive pieces from `COMPONENTS.md` — do NOT re-author them from a description** (that is exactly how the signature cycle element once shipped collapsed).
4. Size every heading measure with the `LAYOUT_CRAFT.md` PART 1 formula. Never put a container `max-width` in `em` (the em-trap).
5. Libraries: GSAP 3.13 + ScrollTrigger (+ SplitText/DrawSVG) and Lenis 1.3.25 via CDN are permitted and expected for the motion tiers. Fonts via Google/Fontshare `<link>`. Nothing else. (This supersedes the old "vanilla JS only" rule.)

## Technical principles (all templates)
1. Single self-contained HTML file per page — no build step, no npm.
2. CSS custom properties for all colors.
3. GSAP/Lenis via CDN for motion; respect `prefers-reduced-motion`; never let a JS/GSAP failure blank the page (no-JS-safe reveals; hero animates on load, CTA never waits on JS/fonts).
4. Mobile-first; verify at 390 / 768 / 1280.
5. Placeholders visibly marked; never fabricate stats/credentials/testimonials.

---

## Project registry
| Client | Template | Folder | Status |
|--------|----------|--------|--------|
| Anchor Wealth Planning (Alex Miller) | editorial-luxury | `projects/awp/` | 🟡 Intake partial |
| Larkspur (demo, dark + light) | editorial-luxury | `projects/larkspur/` | ✅ Two style proofs |
| Field (demo, typographic/cinematic) | editorial-luxury | `projects/field/` | ✅ Built cold + repaired |

---

## Owner
Chris Evans — Chris@chrisaevans.com
