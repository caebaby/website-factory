# Website Factory — Claude Instructions

## What This Repo Is
An end-to-end pipeline for building high-converting, premium-quality websites on demand. Client fills out an intake form → agent pipeline runs → production-ready site on a review link within 24–48 hours.

**Target:** Full site in under 5 hours of agent time. One human gate: Johnny, pre-deploy.

---

## How to Start a New Project

### Step 1 — Set up project folder
```
projects/[client-slug]/
  INTAKE.md          ← client brief (fill from templates/_base/INTAKE.md)
  DESIGN.md          ← client color/font/logo overrides (fill from projects/_base/DESIGN.md)
  SITEMAP.md         ← all pages + section order (fill from SITEMAP template)
  research/          ← Agent 01 output
  strategy/          ← Agent 02 + 02.5 output
  copy/              ← Agent 03 output
  build/             ← Agent 04 output (final HTML files)
  qa/                ← Agent 05 output
```

### Step 2 — Select template
```
templates/
  editorial-luxury/  ← Financial advisory, wealth management, law, professional services
    DESIGN.md             ← Quality floor: shadow system, hover library, anti-slop rules
    DESIGN_DIRECTIONS.md  ← Variation system: 4 archetypes, layout patterns, signature moments
    SECTION_MANIFEST.md   ← Conversion architecture: mandatory sections, order, enforcement
  clean-craft/       ← Trades, artisan, agriculture (not yet extracted)
    DESIGN.md             ← [To be built]
```

### Step 3 — Run agents in order

| Agent | File | Reads | Produces |
|-------|------|-------|---------|
| 01 Research | `agents/01_research.md` | `INTAKE.md` | `research/ICP_BRIEF.md` |
| 02 Strategy | `agents/02_strategy.md` | `INTAKE.md` + `research/` + `SECTION_MANIFEST.md` | `strategy/COPY_STRATEGY.md` |
| 02.5 Design Direction | `agents/02.5_design_direction.md` | INTAKE + research + strategy + DESIGN.md + DESIGN_DIRECTIONS.md | `strategy/DESIGN_BRIEF.md` |
| 03 Copy | `agents/03_copy.md` | `strategy/` + `research/` + `SECTION_MANIFEST.md` | `copy/COPY_ALL.md` |
| 04 Build | `agents/04_build.md` | `templates/[t]/DESIGN.md` + `templates/[t]/DESIGN_DIRECTIONS.md` + `templates/[t]/SECTION_MANIFEST.md` + `strategy/DESIGN_BRIEF.md` + `projects/[s]/DESIGN.md` + `SITEMAP.md` + `copy/` | `build/*.html` |
| 05 QA | `agents/05_qa.md` | `build/` + `DESIGN.md` + `DESIGN_DIRECTIONS.md` + `SECTION_MANIFEST.md` + `DESIGN_BRIEF.md` + `SITEMAP.md` + `copy/` + `INTAKE.md` | `qa/QA_REPORT.md` |

**Parallelism:**
- Agents 01 + 02 can run simultaneously if intake is complete
- Agent 02.5 runs after 02 (needs strategy + research)
- Agent 03 can run in parallel with 02.5 (both consume strategy, don't depend on each other)
- Agent 04 starts after both 02.5 and 03 finish
- Agent 05 runs after 04

**Hard rules for Agent 04:**
1. It must read `templates/[template]/DESIGN.md` before writing any CSS. If DESIGN.md is missing, stop and request it.
2. It must read `strategy/DESIGN_BRIEF.md` before choosing layouts. If missing, stop and run Agent 02.5 first.
3. The archetype and layout patterns in DESIGN_BRIEF.md override the default layouts in BUILD_PROMPT.md. BUILD_PROMPT defines WHAT sections exist. DESIGN_BRIEF defines HOW they look.

### Step 4 — Johnny gate
Johnny reviews `qa/QA_REPORT.md` against the checklist. Status must be READY TO SHIP. No exceptions.

### Step 5 — Deploy
1. Push `build/` to a new Vercel project
2. Connect client domain
3. Wire Calendly/GHL form endpoints
4. Confirm compliance disclaimer in footer
5. Send review link + Loom to client

---

## What Goes in Each Project File

### INTAKE.md
Everything about the client: who they are, who they serve, their story, their proof, brand assets, timeline. See `templates/_base/INTAKE.md` for the full template. Must be at least 70% complete before running agents.

### DESIGN.md (client-level)
Color token overrides for the template. Maps client's brand colors to the template's CSS variable names. Also includes: fonts, logo spec, tagline, brand voice notes. See `projects/awp/DESIGN.md` as a reference.

### SITEMAP.md
All pages to be built + section order per page + nav labels. Each section has a named conversion job (not just a content description). See `projects/awp/SITEMAP.md` as a reference.

---

## Design Standard

All sites built on this factory are held to $25k agency quality. The standard is defined in three pillars, each with a distinct job:

**Pillar 1 — Conversion Architecture (never changes):** `templates/[template]/SECTION_MANIFEST.md`
- 9 mandatory core sections in fixed order (the MQL→SQL pipeline)
- 3 tiers: Core (mandatory) / Standard (default, droppable with reason) / Optional (added per client)
- Every section has a named conversion job and emotional contract
- Agent 05 blocks shipping if any Tier 1 section is missing or reordered

**Pillar 2 — Quality Floor (never changes):** `templates/[template]/DESIGN.md`
- 3-layer shadow stacks on all cards (never single box-shadow)
- Shimmer pseudo-element on primary CTA buttons
- Background radial gradient depth on every section (never flat color)
- Frosted glass nav on scroll
- Grain overlay on every page
- Zero banned fonts (Inter, Arial, Roboto, system-ui)
- Zero AI tells: no bento grids, no gradient orbs, no glassmorphism, no eyebrow pills

**Pillar 3 — Variation System (changes per client):** `templates/[template]/DESIGN_DIRECTIONS.md`
- 4 archetypes: Institution, Editor, Modernist, Heritage
- Layout pattern menus for each section
- Signature moment selection (one per site)
- Interaction style by archetype (duration, easing, hover lift, stagger)
- Agent 02.5 selects the archetype and patterns → produces `strategy/DESIGN_BRIEF.md`

**How the three pillars interact:**
- SECTION_MANIFEST says WHAT sections exist and in what order (structure)
- DESIGN.md says WHAT QUALITY those sections must meet (craft)
- DESIGN_DIRECTIONS says HOW those sections look (personality)
- BUILD_PROMPT.md is now deprecated — the pipeline generates everything through clean layers

Agent 05 enforces all three pillars in the QA report before anything ships.

---

## Project Registry

| Client | Template | Folder | Status |
|--------|----------|--------|--------|
| Anchor Wealth Planning (Alex Miller) | editorial-luxury | `projects/awp/` | 🟡 Intake partial — waiting on Alex |
| LongView Planning Partners | editorial-luxury | separate repo | 🟡 Active |
| Farrier (TBD) | clean-craft | `projects/farrier/` | 🔴 Template not built yet |

---

## Technical Principles (all templates)

1. **Single HTML files** — no build step, no dependencies, no npm
2. **CSS custom properties** for all colors — never hardcode hex values
3. **Vanilla JS only** — IntersectionObserver for scroll animations
4. **Mobile-first** — test at 375px, 768px, 1440px
5. **No placeholder copy in build** — all `[NEEDED]` fields must be visibly marked
6. **Self-contained** — every page works standalone

---

## Owner
Chris Evans — Chris@chrisaevans.com
