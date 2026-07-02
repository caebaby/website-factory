# Agent 00 — THE DIRECTOR
*Runs ONCE per client, on the taste tier (Fable/design-director). Converts client inputs into a
self-contained BUILD BRIEF that any executor tier can build from at full quality. This is the layer
that makes "lesser models build at the highest quality of their capabilities" true: executors never
invent, never read the whole repo — they receive one measured artifact.*

## Inputs (from intake — PRINT_SPEC "FLEXIBLE")
brand palette · fonts (or "pick for register") · ICP + research · advisor/client details ·
optional register adjectives · the client's REAL assets (photos/video or none)

## Reads
`templates/ASSEMBLY.md` (rules) · `templates/components/catalog.html` + `docs/harvest/` (pattern pool)
· `docs/BUILD_REGISTRY.md` (prior vectors) · the client's research/copy docs

## Process
1. **Register:** pick type system + tonal map + motion temperament from the adjectives/ICP.
2. **Vector:** choose a pattern per section job. Enforce: no two adjacent layout skeletons alike;
   ≤40% overlap with any same-vertical prior vector (registry check); imagery/motion dials from
   REAL assets only.
3. **Signature:** specify the client's bespoke signature moment — derived from their MECHANISM
   (what they actually do), never decorative. One sentence of intent + placement.
   **AMBITION FLOOR (Chris, 2026-07-02, hero-v2 lesson):** the signature spec must demand a
   $50K-team flagship interaction — never "one subtle detail." A timid brief produces timid
   executors (LED-007 class, brief edition). Spec the interaction design fully.
   **CONVERSION LAW:** every interactive/signature element RESOLVES TOWARD THE CONVERSION EVENT —
   its final state, last frame, or endpoint is a conversion affordance. Nothing interactive is
   ever purely decorative.
4. **Retint:** derive the full token set from the brand palette, solving every AA rule in the
   pattern invariants (alpha-blend math; gradient lightest-stop rule; numeral-mix shares).
5. **Emit the BUILD BRIEF** (template below) to `projects/<client>/briefs/<scope>_BRIEF.md` and
   log the vector to the registry.

## Delivery cadence (token protection — Chris, 2026-07-02)
Brief and build ONE SCOPE at a time: hero first → Chris reacts (the direction gate) → then the
next sections. A wrong direction costs one section, never a site.

## BUILD BRIEF template (must be fully self-contained — the executor reads NOTHING else)
```
# BUILD BRIEF — <client> · <scope> · vector v<N>
## 1. Output: <exact file path>, self-contained HTML, scope = <sections>.
## 2. Tokens (:root — paste verbatim): <full solved token block w/ AA notes>
## 3. Fonts: <families + weights + the role each plays + <link> tags>
## 4. Pattern per section (for this scope):
   <job>: pattern <C-xx name> — INVARIANTS: <the measured numbers: type scale, spacing,
   radii, contrast floors, motion guards — copied INTO this brief, not referenced>
   EXECUTION LATITUDE: <what the builder may vary: geometry, dressing, details>
   FORBIDDEN: <the slop tells + stamp-avoidance notes (how prior builds did it — do differently)>
## 5. Signature moment: <intent, placement, meaning — bespoke, generate fresh>
## 6. Copy (verbatim slots): <all copy for the scope, [VERIFY] flags inline>
## 7. Motion budget: <the allowed moments + LED-011/012 guards>
## 8. Gauntlet checklist: <geometry, AA w/ alpha-blend math, reduced-motion, no-JS, console,
   the team-built signals for this scope>
## 9. Verification duty by tier: Sonnet+ = browser-verify before returning; Haiku = return
   unverified, external loop mandatory.
```

## Brief-authoring lessons (from executor ambiguity reports — the loop working)
- **Anchor names must match the section-id vocabulary** — define ids in the brief, use them in CTAs.
- **Scrims over real photos: specify as MINIMUMS + state the AA law wins** — a pinned scrim formula
  can be unsatisfiable over a bright photo; executor may compound a legibility veil (2026-07-02:
  addendum scrim measured 2.45:1 over actual pixels; veil fixed it). Pre-flight photos when possible.
- **Placeholder formats standardized:** durations = `0:xx` + VERIFY chip; never invent numbers.
- Newer/explicit brief sections override older general rules — but amend the older rule with a
  rider at issue time, don't leave the contradiction.

## Executor tier policy (Chris, 2026-07-02)
**Design-critical scopes (heroes, signature moments, full-page style passes): use the BEST design
model available (Opus-tier in this harness; Fable for pack/brief authoring).** Sonnet = mechanical
scopes (wiring, section assembly from tight invariants) and cold-test proofs only. Haiku = never
without the full external loop. Rationale: Sonnet executes correctly but under-reaches on taste
even with ambition-floor briefs — round 3 evidence.
