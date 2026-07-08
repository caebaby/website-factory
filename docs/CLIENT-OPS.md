# CLIENT-OPS — the service layer (Linear spine + client emails)

**Principle (Chris, 2026-07-08):** high level of service means the client never learns
software. Internally the pipeline runs on a visible state machine; externally the client gets
a small number of crafted, personal touchpoints and exactly one link at a time.

## The internal spine: Linear

One Linear project per client site; one issue per stage, advanced by the pipeline via API:

```
Intake → Research → Copy (facts-gated) → Direction brief ✋ → Build → QA loop →
Client copy/preview review ✋ → Ship → Harvest
```
- ✋ = human gate (Chris/Johnny approve in Linear; approval webhook kicks the next stage).
- Agents comment artifacts onto issues (ICP brief, copy doc, DESIGN_BRIEF, QA report, preview
  URL) so the whole build is auditable in one place.
- An issue idle >48h triggers the stage-runner's follow-up (internal ping, or client email if
  the ball is theirs).
- Clients are NEVER invited into Linear (no true client-portal role; and see the principle).

## The client-facing layer: four emails + one call

| Moment | Contents | The service move |
|---|---|---|
| 1. Kickoff | what we're building, what we need (the 3 intake questions), the date they'll see copy | one email, three questions, zero forms |
| 2. Copy approval | the copy doc + "design is already underway; wording tweaks welcome until <date>; facts marked [VERIFY] need your confirmation" | facts gate blocks build; voice edits don't — they land as scoped repairs |
| 3. Preview | one live link + a 3-bullet tour of the signature moment | never a staging login, never a zip |
| 4. Launch | live URL + the mini brand guide generated from their DESIGN_BRIEF as a parting deliverable | they came for a site, they leave with a brand system |

Emails are drafted by the stage-runner in the client's project voice, reviewed like any other
agent output (status=draft until a human sends — same HITL discipline as the recruiting
pipeline). Optional later: a read-only one-page status link per client. Not a portal.

## The two-gate copy flow (locked)

1. **Facts gate — blocking.** Claims-verification pass runs before build starts. Every factual
   claim traces to intake/research or ships to the client as a [VERIFY] question. No design
   work on unverified claims.
2. **Voice gate — non-blocking.** Copy doc goes to the client the moment build starts. Their
   wording edits return as scoped repairs (clean re-print law makes this cheap). Client
   silence past the stated date = ship what the facts gate approved.

## Build order

This layer is finish-line item 6 — it wraps the pipeline; it doesn't precede it. Nothing here
gets built until `run-pipeline` passes its acceptance test.
