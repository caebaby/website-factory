# ASSEMBLY — how components mash into consistently diverse, client-unique sites
*The anti-lock-in layer. Authored 2026-07-02 from Chris's directive: "we're getting locked into a
format/style — I need a library of the entirety of these sites and how to mash them up."*

## The three-layer model (who carries what)

| Layer | Carries | Lives in |
|---|---|---|
| **Patterns** | QUALITY — measured invariants (the craft numbers, contrast floors, motion guards); instances VARY per site within them — never stamped verbatim, never blank-page generated | `templates/components/catalog.html` + `docs/harvest/*.json` |
| **Packs / registers** | CHARACTER — type voice, tonal map, motion temperament, card DNA | `templates/packs/*.pack.md` |
| **Assembly rules** (this doc) | DIVERSITY + UNIQUENESS — which components, in which composition, for THIS client | build registry + the rules below |

Lower-tier models ASSEMBLE (proven: kindred-v12). Generation happens only when a new component
enters the library — that's design-director work.

## 1. The library is organized by SECTION JOB, not by site
The conversion skeleton's ~10 jobs (hero · cred · pain · ICP-sort · fit/capture · services ·
process · proof · final-CTA · insights · footer). **Target: every job holds 4–6 genuinely different
composition patterns, drawn from ≥3 different source sites.** Different = different layout skeleton
(grid vs rows vs band vs split), not a recolor. 5 options × 10 jobs ≈ 10M skeleton-compliant page
layouts before color or type enters.

## 2. Diversity dials (color is only ONE of six)
A build's character = its position on all six, and clients in the same vertical must differ on
MORE than color:
1. **Type register** — light-sans+italic / oversized-serif / condensed / four-sizes-serif / (more as measured)
2. **Tonal map** — mostly-light · alternating · dark-with-light-conversion · drench placement
3. **Composition vector** — the per-section pattern picks (the biggest lever, see §3)
4. **Imagery mode** — warm-documentary photo / video-led / typographic-no-imagery / graphic-system
5. **Motion temperament** — quiet-premium (0.4s) / snappy-confident (0.12s) / cinematic (draws + counts)
6. **Palette** — brand tokens (the retint layer; the only dial clients usually bring themselves)

## 3. The selection vector + build registry (uniqueness, enforced not remembered)
Every build records a one-line **selection vector**:
`hero:C-06 | cred:C-11 | pain:C-16 | icp:C-17 | fit:C-21 | svc:C-18 | proc:C-20 | proof:C-14 | cta:… | ins:C-19 || type:T1 tonal:light motion:quiet imagery:photo`
into `docs/BUILD_REGISTRY.md`. Two hard rules:
- **No two adjacent sections share a layout skeleton** (existing law — PART 10).
- **Same-vertical distance rule:** a new build may overlap a prior same-vertical build on at most
  **40% of its vector positions** (type register + tonal map count as positions). Checked before
  build, mechanically — the Dark Precision "I mentally cloned Warm" failure becomes impossible to
  ship silently.

## 4. The director step (client → unique assembly)
Input: brand tokens + ICP research + positioning adjectives. Process:
1. Pick type register + tonal map from the client's adjectives (the pack/register shortlist).
2. Draw the composition vector: for each section job, choose from that job's pattern options,
   honoring adjacency + distance rules; bias toward patterns whose SOURCE register matches the pick.
3. Imagery/motion dials from what the client actually has (real video → video-led; no assets →
   typographic; never fake).
4. Log the vector to the registry → build → gate → taste pass.
For a client choice moment: generate 2 vectors maximally distant from each other → hero-only
previews → full-build the pick. Never 5 full sites.

## 5. How the library grows (the harvest loop)
`node qa/harvest.js <url> <slug>` → machine-measured inventory in `docs/harvest/<slug>.json`
(type census, button/card variants, section flow w/ skeletons, grounds/accents, motion norms).
Design-director curates harvest JSON → catalog entries (numbered C-xx, live demo, provenance,
measured spec) → Chris keep/kill by ID → survivors are blessed. Prose never enters the library —
only measured code. A reference with no harvest JSON is just a bookmark.
