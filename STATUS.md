# Website Factory — Status
Last updated: 2026-07-01 (Anchor WARM homepage built + verified; next = two more genuinely-different design styles, then finalize/deploy)

> **Standing instruction (Chris, 2026-07-01):** update this status doc with EVERY learning lesson, each session, for the next session. The "Learnings" section below is append-only memory.

---

## ▶ NEXT SESSION — Two MORE design styles + finalize/deploy the Warm page (start here)

**Where we are:** the full Anchor **WARM homepage is BUILT + verified** — `projects/awp/build/warm-home.html`. Hand-built to the approved-hero bar, color-diverse (navy hero → cream → navy → cream → cream-mid → cream → cream-mid → **gold proof** → navy CTA → deep-navy footer), corrected copy (leads on coordinated planning; ALL fiduciary/fee-only/RIA claims removed → `[VERIFY]`), honest pending placeholders, gate 0 P0. Hero: Ken Burns + family/energy/city crossfade, 6px buttons. Proof: centered testimonial moment + scroll count-up. Fit-form fieldset border fixed. Chris has iterated it live and is largely happy.

**Do next, in order:**
1. **Build TWO MORE completely different design STYLES for Anchor** (Chris's explicit ask — genuinely distinct, NOT color variants of Warm). Hand-built to the bar (NOT cold-generated). Give Alex a real choice of *style direction*. Likely: a cool-editorial / private-bank style and a bold-modern style — but each must differ in layout, motion, type feel, and color treatment, not just palette. Same method: study references → measure → build → verify section-by-section in-browser.
2. **Mobile pass** on warm-home (real device-width verification — the resize tooling was flaky; use Claude_Preview device emulation or DevTools).
3. **Brand-fidelity decisions (Chris):** (a) exact brand gold `#b18f4d` vs the brightened `#c9a24b` I used for legibility on dark — pick one; (b) for launch, license the real brand fonts (Adobe Garamond Pro + Proxima Nova via Adobe Fonts) vs the free EB Garamond + Nunito Sans web substitutes.
4. **`[VERIFY]` with Alex:** regulatory status (RIA/hybrid/BD) + fee model, exact Merrill years, real FINRA-approved testimonials, phone/email, compliance entity name.
5. **Extract the built Warm sections into the component library** (the deferred design-system scaffold: `tokens.css` + `components/` + `catalog.html`) — now we have a real gold-standard page to harvest from.
6. **Deploy** warm-home + the 3 hero image variants as **live review links for Alex** (Chris's account approves the deploy).

**Copy note (Chris's domain):** reference heroes use SHORT punchy headlines; Anchor's is the long question. Offer 2-3 punchier H1 options, don't rewrite unilaterally.

### Beyond the homepage — the real scope (Chris, 2026-07-01)
- **We need the FULL page set, not just the homepage:** About, Services, Who We Serve, Process, Contact (see `projects/awp/SITEMAP.md`). Build each to the same bar as `warm-home.html`, in the chosen style.
- **Model the page structure on the Longview Advisors site.** Find it first — likely in `~/Documents/advisor-sites/` (per CLAUDE.md sibling repos: "Longview site and advisor site builds") or GitHub `caebaby`. Review ALL its pages; AWP will be "something very similar." Read it before designing the inner pages.
- **Copy workflow:** once page structure is set → do copy research → produce a **client-fillable copy doc** (structured, one field per page/slot) for Alex to fill in, so we drop it in and it looks sharp (like INTAKE/COPY_ALL but client-facing + fillable, keyed to each page section).
- **The homepage is missing CONTENT:** add a content/resources section to the homepage (blog + podcasts), and plan content pages (blog, podcasts, resources). Content is part of the deliverable, not an afterthought.

---

## 🎓 LEARNINGS — 2026-07-01 (the pivot; append-only for next session)

1. **Cold generation from prose does NOT give consistent quality.** 3 cold-agent AWP homepages (Heritage/Warm/Modern) passed the geometry gate (0/0/0) AND 3 independent Tier-B taste critics (all PASS) — yet were timid AND literally broken (faded/boxed hero, a junk anchor watermark, text overlapping the process rule, a broken count-up stat bar, a stray form border). Docs *describe* quality; cold agents revert to the template mean (cream/Garamond/safe). Prose is advisory and gets ignored.
2. **The automated QA loop manufactures FALSE CONFIDENCE.** The geometry gate checks a fixed list at one width with animations frozen → it can't see text-overlap, a broken first-paint count-up, or a stray border. The taste critics graded the *concept* generously (one literally praised a broken element). **"Passes" ≠ "great." Never relay automated "ship" — a human eye gates great-vs-fine.** I made this mistake (told Chris "all 3 pass, ships to Alex").
3. **Quality must live in CODE (components), DEFAULTS (tokens), or CHECKS (gate) — never prose.** The prose extraction of the first 7 sites never changed output. Only components/defaults/checks reproduce.
4. **Real extraction = look → MEASURE (live) → build to the bar → own it.** Measured 6 warm-hero references live (Maven/Lyra/Spring/Included/Hinge/Alma) → the **validated full-bleed-media-hero pattern**: full-bleed photo/video (`object-fit:cover`, ~full viewport) · large LIGHT/medium display + ONE accent (italic-serif word OR a colored line) · solid brand-color PILL primary + ghost secondary · warm real imagery · one committed brand color. Legibility = directional scrim / whole-image darken / frosted content card. (Measured specs e.g. Maven = Helvetica Now 300 76px + Ivar Display italic 91px.)
5. **The anti-pattern our builds hit (now provable):** boxed/faded image (10% opacity skyline), all-one-heavy-serif headline, decorative watermark instead of a real image. The doc words "restraint / subtle / whisper / 8% opacity" literally produced the invisible hero. **Kill timid defaults for heroes.**
6. **The hero is ~80% of first impression** and needs a bold-by-default tested primitive, not "1 of 9 sections."
7. **Consistency mechanism = ASSEMBLE from a blessed component library, not GENERATE.** Generation is reserved for NEW components (careful, human-approved); client pages assemble proven parts → variance disappears.
8. **Design tokens = semantic variables** (`color-brand-primary`, not `#hex`) — the bridge design↔code; one change propagates (theming / brand change / shared vocabulary).
9. **The missing technical layer** (Ras Mic "Building beautiful UI using AI"): a machine-readable **design-system artifact** (tokens + a components showcase) that the build agent READS and IMPLEMENTS from. His stack = claude.ai `.dc.html` design files + `claude_design` MCP + Claude Code implementing into SvelteKit.
10. **Chris's constraint: NO vendor lock-in (no Claude/Claude Design).** Portable equivalent = the design system as plain files in OUR git repo: `tokens.css`/`tokens.json` (Style Dictionary/W3C) + owned component files (shadcn *philosophy*: you own the code) + `catalog.html` + **the repo itself as the "connector"** (any agent reads files; MCP optional/self-hosted). Works with any model.
11. **Don't buy component packs.** Marketplace kits (Tailwind Plus ~$299) make sites look templated — the slop look. Distinctive = extraction (free). Plumbing = free OSS (HyperUI/shadcn/Radix/GSAP) re-skinned to tokens. **$0 plan.**
12. **Stack note:** factory outputs vanilla single-file HTML; free OSS libs are React/Tailwind → adapt patterns, don't `npm install`. Possible future: move the factory to a React/Astro component stack so libs + token tooling (Style Dictionary/Storybook) drop in directly. Separate decision, not needed now.
13. **The workflow that WORKED this session** (do this): look at real references in a browser + MEASURE them → build ONE component by hand to those specs → iterate against Chris's eye → hero-first, show before building the rest. That is the factory's real workflow; cold autonomous generation is demoted to proposing-new-components-only.
14. **AWP copy is built on UNVERIFIED positioning — inaccurate.** The pipeline copy leads on "fiduciary / fee-only / independent RIA / left the wirehouse to avoid product quotas / no commissions." Chris (2026-07-01): fiduciary + fee-only are NOT confirmed for Alex; **check with Alex** on (a) regulatory status (RIA / hybrid / BD) and (b) fee model (fee-only / fee-based / commission). **Correction: strip ALL regulatory + fee claims → `[VERIFY]`; reposition the whole page on the TRUE, distinctive differentiator — coordinated planning (works with the client's CPA + attorney, one living plan) + 10+ yrs at Merrill Lynch (VERIFY exact) + Houston + the ICP pains.** General rule reaffirmed: never ship claims we can't verify; lead with what's true. (Same class as the Axiom/AGL accuracy rule.)
15. **Hero motion + shape tuning (approved direction):** Ken Burns slow drift + crossfade rotation through the 3 hero images (family→energy→city) tells the whole ICP story; reduced-motion/no-JS falls back to one static image. Buttons: full-pill read too rounded — moved to `--radius-btn:6px` (clean rounded-rect, token-tunable). Chris wants **color diversification** across the page (dark hero → cream → gold-drenched zone → navy band → cream → dark close; scroll-recolor as the bold option) and, future, a **client-chosen theme dial** (trivial once colors are semantic tokens).
16. **Colors/fonts used = brand-accurate, one tuned exception.** navy `#1e395a` + cream `#F5F0E6` = EXACT AWP brand guide; fonts EB Garamond + Nunito Sans = the brand's own specified *web substitutes* for Adobe Garamond Pro + Proxima Nova (paid). GOLD brightened to `#c9a24b` from brand `#b18f4d` for legibility on dark grounds — **decision pending** (snap to exact `#b18f4d`, or keep brightened). For launch, consider licensing the real paid brand fonts via Adobe Fonts.
17. **Proof section — the good version is a centered testimonial MOMENT**, not a flat grid of small stats floating in a gold void: a feature quote + large quotation mark, richer *radial* gold ground, and a balanced stat row under a hairline divider. Plus a scroll-triggered count-up + blur-to-sharp ("spin on scroll") on the numeric stats (MOTION T2.4 pattern). General: a testimonial/proof section wants ONE hero quote, not four competing tiny stats.
18. **`<fieldset>` default border = the "weird lines" in forms.** Always reset `fieldset{border:0;padding:0;margin:0;min-width:0}` — otherwise the legend renders sitting on the border. Add to the design-system base reset so no form ships with it again.
19. **Chris wants TWO MORE genuinely different design STYLES** for Anchor (not palette variants — different layout/motion/type/color treatment), hand-built to the bar, so Alex chooses a style direction. This is the multi-direction idea done RIGHT (hand-built, not cold-generated).

---

### ✅ DONE this session (2026-06-30) — the ceiling encoding + primitives
- **"Make it sing" encoded** — `LAYOUT_CRAFT.md` PART 8 (the ceiling, LLM-agnostic, with a new **[TASTE]** confidence tier): 8.1 *safe=invisible*, 8.2 *editorial-reflex trap*, 8.3 *color commitment* (Restrained/Committed/Drenched + the timidity check), 8.4 *counterweight raised*, 8.5 *density rhythm*, 8.6 *signature-moment quality bar*. Floor vs ceiling framing throughout.
- **Reference-extraction protocol defined** — `docs/REFERENCES.md` RULE #4 (admire → NAME the technique → codify as tested primitive + LAYOUT_CRAFT rule + REFERENCES entry → verify → deploy). Zoom hero extracted (mesh gradient + video-with-scrim), Stripe cross-confirmed.
- **Two tested primitives built** — `COMPONENTS.md` Primitive 4 (animated CSS mesh-gradient hero, GSAP-drifted, degrades static) + Primitive 5 (video hero, poster fallback + directional scrim + IO lazy-load + reduced-motion pause). Wired into MOTION_TIERS (T3.1b + T3.3 reconciled) + SECTION_PATTERNS (Hero 1B/1D) + LAYOUT_CRAFT PART 9.
- **Gate extended** — `qa/visual-checks.js` gained `accent-fill-absent` + `section-rhythm-monotony` (informational P2 ceiling proxies; verified clean on the known-good Field rebuild — corpus integrity intact).
- **Proof built + verified through the full loop** — `qa/fixtures/signature-hero-proof.html`: 0 P0 geometry on first build; Tier-B critic PASS after fixing two real execution-timidity defects (LED-007 faint mesh, LED-008 ghost counterweight). This is the loop closing on **taste**, not geometry. Shipped as a replay-corpus known-good fixture (served via `fixtures` on :8099).
- **Reference extraction (7 Chris-curated sites)** — ran RULE #4 on BetterUp/Maven/Modern Health/Facet/Wealthspire/Work.co/Instrument. Added: COMPONENTS Primitive 6 (scroll-driven color theming, from Instrument; verified, fixture `qa/fixtures/scroll-color-theming.html`), LAYOUT_CRAFT 8.7 (warm-human premium register, Maven), 8.3 committed-on-clean (Work.co), 9.3 (scroll-theming rule), PART 10 (content-block archetypes + section rhythm, BetterUp/Maven), PART 7 dated-UI tells (Wealthspire), and a Chris-Curated Extractions section in REFERENCES with STEAL/AVOID tags. `[VERIFY]` open on BetterUp's exact hero. **More refs + commentary from Chris pending.**

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
