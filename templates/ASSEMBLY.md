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

---

## 6. INSTANCES ARE EXHIBITS, NOT TEMPLATES (Chris directive, 2026-07-08)

Chris, reviewing the catalog: "I don't want it to be the exact same thing over and over…
I want elements of it — the important number highlighted, motion on the number — but not the
same layout on every site." This section makes PRINT_SPEC #2 physical.

**Every catalog entry is now read as three layers:**

1. **INVARIANT (the craft numbers — what makes it 10/10, always kept):**
   e.g. C-12: one numeral owns the moment · display-scale/300-weight · count-up on scroll ·
   tabular nums · label discipline. e.g. C-14: exactly one full-saturation brand moment per
   page. e.g. C-21: a self-qualification moment whose visual converges on "you belong here"
   and resolves to the conversion event.
2. **VARY (mandatory freshness axes — geometry, count, ground, arrangement, medium):**
   a build may not reuse the same (pattern × layout-skeleton × ground) combination as the
   catalog exhibit OR any registry build for the same vertical. Similar class, never same layout.
3. **NEVER PORT (instance artifacts):** content metaphors, diagrams, imagery, and copy born
   from one client's mechanism (Maven's blinds/CPA/attorney convergence artifact is the
   canonical example). These are re-derived from THIS client's mechanism + research, every time.

**Enforcement (three hooks):**
- **Director:** the DESIGN_BRIEF's per-section spec must state the fresh execution — pattern ID
  + this-client geometry + this-client content artifact. A brief that says only "use C-21" is
  incomplete and gets bounced.
- **Registry:** `docs/BUILD_REGISTRY.md` logs each build's per-section (pattern, skeleton,
  artifact) triple; the Director's ≤40% same-vertical overlap rule now applies at this level,
  not just the vector level.
- **Critic:** stamp-detection item — compare each section against the catalog exhibit and
  registry entries; flag any near-identical layout skeleton or any ported content artifact
  as MAJOR.

**Catalog retrofit (queued):** each C-entry gets its INVARIANT / VARY / NEVER-PORT block and
the exhibit watermarked "one execution — never rebuild this instance." Until the retrofit
lands, executors receive the invariant blocks from the brief, not raw catalog HTML.

---

## 7. THE CANDIDATE TIER + COVERAGE TABLE (2026-07-08 sprint)

The library now has two tiers:

- **PROVEN** — live exhibit in the catalog, born three-layer. C-01…C-45 (killed IDs excluded).
  The 2026-07-08 sprint harvested the shipped AGL v9 build into C-32…C-45 (constellation motif,
  movement wire, count-up grid, diverging bars, range bands, gauge, match card, quiz preview,
  audience toggle, glass system, ruled feature rows, emotional close, compliance footer,
  transparent→glass nav).
- **CANDIDATE** — machine-measured spec card (`CANDIDATE — exhibit pending` badge), no exhibit
  yet. C-46…C-71, mined from the 15 `docs/harvest/*.json` sites, prioritized at the section
  jobs with the fewest options. A candidate is promoted by building its exhibit through the
  normal gauntlet; Directors may select a candidate only when its brief supplies the full
  fresh-execution spec (the three-layer block is already in the card).

**Coverage table lives at the top of `templates/components/catalog.html`** — section job →
proven/candidate counts, FLAG on any job under 4 proven options. Update it whenever an entry
is added, killed, or promoted. Jobs flagged after this sprint: cred (2), pain (1),
icp-sort (2), fit/capture (3), process (1), final-CTA (1), insights (1), footer (1),
nav/chrome (1) — the next harvest passes aim there.
