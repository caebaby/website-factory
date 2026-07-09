# BUILD REGISTRY — selection vectors (the anti-lock-in ledger)
*Every build logs its vector. New same-vertical builds may overlap a prior vector on ≤40% of
positions (ASSEMBLY.md §3). Append-only.*

| Date | Client (vertical) | Scope | Vector |
|---|---|---|---|
| 2026-07-01 | Anchor (wealth-advisory) | full home v1 | hero:photo-scrim(C-06) · cred:— · pain:cards(C-16) · icp:photo-cards(C-17) · fit:mini-hero(C-21) · svc:bento(C-18) · proc:stepper(C-20) · proof:deep-drench(C-14) · ins:featured-split(C-19) ‖ type:T1 tonal:mostly-light motion:quiet imagery:photo |
| 2026-07-01 | Kindred (wealth-advisory, fictional/test) | full home | same language as Anchor v1 — test artifact, exempt from distance rule |
| 2026-07-02 | Anchor (wealth-advisory) | hero v2 (direction test) | hero:product-visual-split(C-26, living-plan artifact) · cred:bar(C-11) ‖ type:T1 tonal:light motion:quiet imagery:artifact — differs from v1 hero by composition + imagery mode |


## Pipeline runs (Cherny-audit instrumentation — append-only)
*Every `run-pipeline` invocation logs itself. Human touches are 0 by construction here; count
human edits in the session that makes them.*

| Date | Build | Entry | Exit | Iter | Agents | Tokens in/out | Cost | Wall-clock | Human touches |
|---|---|---|---|---|---|---|---|---|---|
| 2026-07-08 | bench-sonnet | FIX(1P0/4P1) | ESCALATE · critic repair (0.81) | 3 | repair#1:sonnet critic:opus repair#2:sonnet critic:opus repair#3:sonnet critic:opus | 1095k/19.7k | $1.17 | 596s | 0 |
| 2026-07-08 | bench-sonnet | FIX(1P0/4P1) | PASS · critic ship (0.86) | 2 | repair#1:sonnet critic:opus repair#2:sonnet critic:opus | 643k/12.2k | $0.78 | 372s | 0 |
| 2026-07-08 | bench-fugu | FIX(0P0/5P1) | PASS · critic repair (0.84) | 1 | repair#1:sonnet critic:opus | 233k/6.8k | $0.39 | 228s | 0 |
| 2026-07-08 | agl-pilot-handoff-index | FIX(0P0/5P1) | ESCALATE | 1 | repair#1:sonnet | 233k/2.7k | $0.19 | 103s | 0 |
| 2026-07-08 | agl-pilot-resources-index | CLEAN | PASS · critic ship (0.87) | 0 | critic:opus | 50k/3.2k | $0.20 | 94s | 0 |
| 2026-07-08 | agl-pilot-resources-am-i-ready-to-leave-my-firm | CLEAN | PASS · critic ship (0.88) | 0 | critic:opus | 49k/2.8k | $0.19 | 85s | 0 |
| 2026-07-08 | agl-pilot-resources-retention-offer-after-acquisition | CLEAN | PASS · critic ship (0.86) | 0 | critic:opus | 49k/2.7k | $0.18 | 82s | 0 |
| 2026-07-08 | agl-pilot-resources-forgivable-note-clawback | CLEAN | PASS · critic ship (0.87) | 0 | critic:opus | 49k/2.6k | $0.18 | 85s | 0 |
| 2026-07-08 | agl-pilot-handoff-index-v2 | CLEAN | PASS · critic ship (0.87) | 0 | critic:opus | 49k/3.7k | $0.21 | 123s | 0 |
| 2026-07-08 | agl-pilot-handoff-index-v3 | CLEAN | PASS · critic ship (0.87) | 0 | critic:opus | 49k/3.4k | $0.20 | 119s | 0 |
| 2026-07-08 | agl-pilot-handoff-index-v4 | CLEAN | PASS · critic ship (0.87) | 1 | critic:opus repair#1:sonnet critic:opus | 296k/6.4k | $0.50 | 233s | 0 |
| 2026-07-08 | agl-pilot-handoff-index-v5 | CLEAN | PASS · critic repair (0.87) | 0 | critic:opus | 49k/4.9k | $0.24 | 156s | 0 |
| 2026-07-09 | agl-pilot-handoff-index-v6 | CLEAN | PASS · critic repair (0.87) | 0 | critic:opus | 49k/3.4k | $0.20 | 115s | 0 |
| 2026-07-09 | agl-pilot-post1-v2 | CLEAN | ESCALATE · critic escalate (0.87) | 1 | critic:opus repair#1:sonnet critic:opus | 171k/6.2k | $0.45 | 183s | 0 |
| 2026-07-09 | agl-pilot-handoff-index-v7 | CLEAN | PASS · critic ship (0.87) | 0 | critic:opus | 509k/7.1k | $0.64 | 219s | 0 |
| 2026-07-09 | agl-pilot-handoff-index-v8 | CLEAN | ESCALATE · critic repair (0.87) | 1 | critic:opus repair#1:sonnet | 582k/6.6k | $0.64 | 224s | 0 |
