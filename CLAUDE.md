# Website Factory — Claude Instructions

## What This Repo Is
An end-to-end system for building high-converting websites on demand. Upload a client intake doc, run the agent pipeline, get a complete production-ready site.

**Target:** Full site in under 5 hours. Minimal human time required after intake.

---

## How to Start a New Project

### Step 1 — Create project folder
```
projects/[client-slug]/
  intake/        ← paste or upload completed INTAKE.md here
  research/      ← Agent 01 output
  strategy/      ← Agent 02 output
  copy/          ← Agent 03 output
  build/         ← Agent 04 output (final HTML files)
  qa/            ← Agent 05 output
```

### Step 2 — Run agents in order
Point to the agent file, provide the inputs, get the output.

| Agent | File | Input | Output |
|-------|------|-------|--------|
| 01 Research | `agents/01_research.md` | intake | `research/ICP_BRIEF.md` |
| 02 Strategy | `agents/02_strategy.md` | intake + research | `strategy/COPY_STRATEGY.md` |
| 03 Copy | `agents/03_copy.md` | strategy + research | `copy/COPY_ALL.md` |
| 04 Build | `agents/04_build.md` | copy + strategy + template | `build/*.html` |
| 05 QA | `agents/05_qa.md` | build + copy + intake | `qa/QA_REPORT.md` |

### Step 3 — Deploy
1. Push `build/` files to a new Vercel project
2. Connect client domain
3. Set up Sanity CMS if client needs content editing

---

## Template Selection

| Client Type | Template |
|-------------|----------|
| Financial advisory, law, professional services | `editorial-luxury` |
| Trades, farrier, artisan, agriculture | `clean-craft` |

---

## Agent Orchestration Note
Agents 01 and 02 can run in parallel if the intake doc is complete.
Agent 03 starts after 01 + 02.
Agent 04 starts after 03.
Agent 05 runs after 04.

To run parallel: spawn separate Claude instances for 01 and 02 simultaneously.

---

## Project Registry

| Client | Template | Folder | Status |
|--------|----------|--------|--------|
| LongView Planning Partners | editorial-luxury | separate repo | 🟡 Active |
| Farrier (TBD) | clean-craft | `projects/farrier/` | 🔴 Next |

---

## Design Principles (all templates)

1. **Single HTML files** — no build step, no dependencies
2. **CSS custom properties** for all colors — never hardcode
3. **Vanilla JS only** — IntersectionObserver for animations
4. **Mobile-first** — test at 375px
5. **No lorem ipsum** — all copy must be real before build
6. **Mark all placeholders** — never ship with invisible gaps

---

## Owner
Chris Evans — Chris@chrisaevans.com
