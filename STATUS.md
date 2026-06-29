# Website Factory — Status
Last updated: 2026-06-29

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
