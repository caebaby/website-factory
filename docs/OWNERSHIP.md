# OWNERSHIP — who owns what, per client

*The standard. ClickUp (Client Delivery space) mirrors this; conflicts resolve in favor of this doc.
Goal: Chris's total time per client site ≈ 45 minutes, all judgment, zero operations.
Updated 2026-07-29.*

## The three-way split

**THE SYSTEM owns production.** Deep research (Black Book), ICP brief, copy strategy + spine,
build brief, copy, copy audit, HTML build, QA + self-repair, the [VERIFY] register, metrics.
One command (`node factory.js print <client>`), two pauses. If the system's output is bad,
the fix is a rule/check/pattern in the system — never a human quietly redoing the work.

**JOHNNY owns operations.** Everything with a checklist:
- Phase 00–01: kickoff, intake collection, asset chasing, compliance contacts, booking links
- Triggering pipeline runs; babysitting them; marking tasks done **when the artifact exists**
- Compliance submission + chasing (attach the auto-generated [VERIFY] register)
- QA acceptance, hosting/Replit deploys, DNS, feedback widget, handover package
- All client logistics and scheduling; ClickUp is his single source of truth
- Escalating to Chris ONLY at the five touchpoints below

**CHRIS owns judgment + relationship.** Five touches per client:
| # | Touch | When | Time |
|---|-------|------|------|
| 1 | Founder interview (the VOC hour) | Phase 01–02 | 30–60 min |
| 2 | Approve positioning direction | Phase 02, async | 5 min |
| 3 | ✋ Direction gate — approve/redirect the creative concept | Phase 03, async | 5 min |
| 4 | ✋ Ship gate + final launch approval | Phase 06 | 10 min |
| 5 | Taste corrections → each becomes a rule in the system | as they arise | — |

Nothing else routes to Chris. A task assigned to Chris that isn't one of these five is
mis-assigned by definition.

## The leverage rule: checklists anchored to artifacts

A task is DONE when its artifact exists or its gate passed — never when someone feels done.
Every automatable ClickUp task names its artifact (e.g. "Run deep research → research/BLACK_BOOK.md
exists with verification: PASSED"). Johnny's custom fields carry the contract per task:
Definition of done · Authority · Scope boundary · Accountable owner.

This is the scaling asset: the checklist standard is what lets N clients run in parallel with
the same tiny human footprint, and what makes the fulfillment engine transferable beyond any
one operator.

## Phase 08 — ongoing services (the retainer this all segues into)

The same research + system that built the site feeds recurring services at near-zero marginal
cost. Menu, each mapped to its already-built engine:

| Service | Engine it runs on | Cadence |
|---|---|---|
| Conversion reporting (MQL→SQL lens) | pixel/GA4 + the conversion skeleton's capture points | monthly |
| Content episodes (the 8–12 series) | Black Book commonalities/mistakes/myths = the episode list; PAGE_SYSTEM publishes | 2–4/mo |
| SEO/GEO pages | templates/PAGE_SYSTEM.md engine | monthly |
| Webinar/static funnel upkeep | S.A.F.E./webinar assets + copy spine | quarterly |
| A/B iterations | scoped repairs through the gauntlet (never hand-edits) | as data warrants |
| VOC refresh (re-run research, catch drift) | the research chain, ~$2 | quarterly |

Ownership in Phase 08: system produces, Johnny operates and reports, Chris reviews quarterly
and owns the client relationship. Same split, forever.
