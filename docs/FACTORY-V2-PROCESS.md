# Website Factory v2 — Automated Pipeline Spec

> **Goal:** Advisor fills out a form → production-ready site on a review link within 24–48 hours.
> One human gate: **Johnny, pre-deploy.** Chris sets standards and tunes the machine; he is not in the per-site loop.
> Decided 2026-06-11.

---

## Target Experience (advisor's view)

1. Picks a template from a visual catalog page (3–5 live previews with sample advisor content)
2. Fills out one intake form (~20 min): practice basics, ICP, core competencies, how they win clients, brand assets upload
3. Gets a "your site is being built" confirmation
4. Within 24–48h: review link + Loom walkthrough
5. One revision round → live on their domain

---

## Pipeline (system view)

```
Intake form (GHL/Typeform)
   ↓ webhook
[Orchestrator]  — Mac Mini scheduled job or manual kickoff (v2.0), watches for new intakes
   ↓ creates projects/[slug]/, normalizes form → INTAKE.md
[01 Research]   — ICP deep research + positioning extraction        (auto, ~1-2h)
[02 Strategy]   — copy framework, headline hierarchy, CTA map       (auto, parallel w/ 01 where possible)
   ↓
[03 Copy]       — all page copy, advisor's voice + competencies      (auto)
[04 Build]      — assemble from chosen template                      (auto)
[05 QA]         — links, placeholders, compliance flags              (auto)
   ↓
[Compliance pass] — self-compliance checklist (post-review world)    (auto, flags → QA report)
   ↓
★ JOHNNY GATE — 30-min review against the QA checklist               (human, the only gate)
   ↓
Deploy to Vercel staging → review link + Loom to advisor
   ↓ approval / one revision round
Domain connect + GA4/pixel + GHL forms → LIVE
```

**Elapsed target:** agents complete same day; Johnny gate within one business day → 24–48h total.

---

## What Exists vs. What to Build

| Piece | Status | Next action | Owner |
|-------|--------|-------------|-------|
| Agent prompts 01–05 | ✅ Built (`agents/`) | Add "positioning extraction" (core competencies → differentiation angle) to 01 or 02 | Chris |
| `editorial-luxury` template | 🟡 Exists as Longview site, never extracted | **Extract into `templates/editorial-luxury/` with tokenized content slots — this is the #1 build task** | Claude session |
| Template catalog (3–5 options) | 🔴 Only 1 in progress | Derive 2–3 variants from editorial-luxury first (palette/layout variants are cheap); `clean-craft` extracts from CRS when it ships | Claude session |
| Catalog preview page | 🔴 Not built | One static page, each template rendered with sample advisor content | Claude session |
| Intake form | 🔴 INTAKE.md is a doc, not a form | Build in GHL (already in stack) mirroring INTAKE.md fields + file upload | Johnny |
| Orchestrator | 🔴 Manual ("point Claude at repo") | v2.0: form submission → notification → one command kicks off full run. v2.1: webhook → Mac Mini job runs unattended | Chris (build), then hands off |
| Johnny QA checklist | 🔴 Implicit in agent 05 | Write explicit 1-page review checklist (standards = Chris's job) | Chris |
| Compliance checklist pass | 🟡 Learnings exist (Longview sweep 6/10) | Codify into a checklist agent step | Chris |
| Revision-round protocol | 🔴 Undefined | One structured revision form, not open-ended email threads — "offers create parameters" applies to revisions too | Chris |

---

## Build Order

1. **Extract editorial-luxury template** from the Longview build (it's done, just not packaged) — unlocks everything
2. **Johnny QA checklist** + compliance checklist step
3. **GHL intake form** mirroring INTAKE.md
4. **Orchestrator v2.0** (one-command full run, timed) — run client #2 (Michael Romaine or Knoxville advisor) through it and **time every stage**
5. Catalog page + template variants
6. Orchestrator v2.1 (fully unattended webhook trigger)

Stage timings from step 4 become the capacity statement and unit economics for the ecosystem offer (sites/month at current team, cost per site).

---

## Standards (Chris owns, Johnny enforces at the gate)

- All existing design principles in `CLAUDE.md` (single HTML files, CSS variables, mobile-first, no placeholders)
- No generic AI copy — every site must reflect the advisor's actual competencies and positioning from research
- Compliance flags resolved or explicitly accepted before the advisor sees the link
- 45-day launch guarantee (offer doc) is backed by this pipeline; if the pipeline can't hit it, the guarantee changes, not the quality bar
