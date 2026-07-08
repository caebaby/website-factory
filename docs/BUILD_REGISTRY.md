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
