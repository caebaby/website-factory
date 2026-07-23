# THE PROCESS — one page, the whole factory
*The front door. If you (human or model) are here to build a website, start here and only here.
Everything else in the repo hangs off this page. Updated 2026-07-23.*

**The product:** give the system palette, fonts, ICP, and client details — it PRINTS a website
that looks like a $25–50K team built it and converts to MQLs/SQLs. (`templates/PRINT_SPEC.md` is
the contract: what's LOCKED vs what a client supplies.)

## THE ONE COMMAND

```
node factory.js print <client>        # runs stages 1→5 below, pauses at the two human gates
node factory.js approve <client> <gate>   # approve from anywhere (Slack ping if webhook set)
```
`factory.js` is the foreman: every stage is a fresh subprocess of whatever CLI
`factory.config.json` assigns to that role — claude, hermes (GLM/Kimi/OpenRouter), codex,
anything. Roles are swappable per model-bench results; the gates and gauntlet don't care who
built the file. Manual stage-by-stage (below) remains valid and identical in behavior.

## The print button — run of show

```
0a. INTERVIEW      higher-tier clients: 60-min founder interview
                   (templates/_base/INTERVIEW.md) → research/INTERVIEW_TRANSCRIPT.md.
                   The highest-authority VOC source in the system.
0b. DEEP RESEARCH  ICP Deep Research Pack (playbooks/icp-research-pack, ~$1–3 on cheap APIs):
                   python3 runner/run.py <intake> --outdir research/ → BLACK_BOOK.md
                   (verified VOC + belief maps + belief-change order).
0c. INTAKE         projects/<client>/INTAKE.md  ← the only human-authored input
                   (palette · fonts-or-register · ICP+pains · client details · REAL assets
                    · visual world + signature-motif idea + proof inventory*)
1. RESEARCH        agents/01 → ICP_BRIEF with the VOC LEDGER (citable VOC-nn rows:
                   verbatim quote + source). The ledger is the binding currency downstream.
2. STRATEGY        agents/02 → COPY_STRATEGY + the COPY SPINE (Part B): every section bound
                   by ID to VOC rows, one objection, placed proof, CTA psychology. The spine
                   is the forcing function that turns research into copy — "see research"
                   is not a binding, a VOC ID is.
2.5 DIRECTION      agents/00 DIRECTOR (taste tier, once per client):
                   register + pattern-per-section vector (ASSEMBLY dials, ≤40% same-vertical
                   overlap) + bespoke signature moment (AMBITION FLOOR + CONVERSION LAW)
                   → self-contained BUILD BRIEF. ✋ Chris gates DIRECTION here — wrong direction
                   costs one section, not a site.
3. COPY            agents/03 → COPY_ALL written FROM the spine (RMBC, kill-list, [VERIFY]
                   discipline) + mandatory Traceability Appendix (section → VOC rows → the line).
3.5 COPY GATE      agents/03.5 — fresh independent auditor, different model than the writer:
                   traceability · awareness match · generic-copy detection · fact discipline ·
                   conversion architecture. VERDICT: REPAIR blocks the build. This gate exists
                   because deep research once turned into generic copy with nothing stopping it.
4. PRINT           agents/04 EXECUTOR (best design tier for design-critical scopes):
                   builds FROM THE BRIEF + pattern invariants — clean prints only, NEVER
                   elevation passes on finished pages (LED-013). One scope at a time; hero first.
                   Heavy assets via token contract: [[TOKEN]] placeholders + inject script
                   (benchmarks/model-bench/build.py pattern) — keeps builds reproducible.
5. GAUNTLET        ONE COMMAND: node qa/run-pipeline.js <build.html> [--accent HEX]
                   = RENDER → INSPECT (run-checks.js, multi-entry-state, click-probes)
                   → CRITIQUE (fresh critic on frozen screenshots) → scoped REPAIR
                   (fresh agent) → RE-VERIFY, loop ≤3, stall/regression → escalate.
                   Builder never grades its own work — every role is a fresh spawn.
                   PASS = 0 P0 + 0 unwaived P1 + critic ship. Metrics (iterations,
                   tokens, cost, wall-clock, human touches) auto-log to
                   docs/BUILD_REGISTRY.md "Pipeline runs".
6. HUMAN GATE      Chris/Johnny on the review link. Every correction becomes a rule, a check,
                   or a pattern — logged in qa/LEDGER.md. Nothing merges without this gate.
7. SHIP            GitHub → Pages/Vercel. Register the build vector in docs/BUILD_REGISTRY.md.
8. HARVEST         mine the shipped build: new/improved sections → catalog patterns;
                   defects → LEDGER; episode → FACTORY_LEARNING. The compounding step.
```
*\*Intake additions folded from the 2026-07 brand-kit draft: visual world (one-sentence image
world), signature-motif seed, assets manifest, proof inventory with legal footing.*

## The laws (learned the hard way — don't relearn them)

1. **Quality lives in the system, not the model.** Docs + pattern invariants + deterministic
   gate. A bad build = a system gap; fix the doc/check/pattern, not the prompt.
2. **Clean prints, never elevation passes.** Re-print from the Pack when a page degrades.
3. **No builder self-verification.** Fresh agent for every build, repair, and verification.
4. **Structure is locked, skin is not.** Conversion skeleton always; two same-vertical clients
   must differ on more than color (6 diversity dials).
5. **Nothing interactive is decorative.** Every signature element resolves toward the
   conversion event.
6. **Every human correction compounds.** Rule, check, or pattern — or it will be paid for twice.
7. **Real proof only.** No invented testimonials/stats; illustrative numbers labeled; compliance
   overlay per regime.
8. **Selection over generation, at every layer.** Sections come from the pattern pool, palettes
   from `templates/PALETTES.md`, heroes/components from the catalog's named variants, motion
   from MOTION_TIERS — the Director ROUTES client adjectives to blessed inventory and retints
   within solved math; it never invents tokens from vibes (that's brand-level blank-page slop —
   the 2.5 failure mode Chris flagged). Generation happens only when a new entry earns its way
   into a library through harvest → curate → Chris.
9. **Copy runs two gates.** Facts gate blocks build (claims-verification; [VERIFY]s go to the
   client). Voice gate runs in parallel with build (client wording edits land as scoped
   repairs). See `docs/CLIENT-OPS.md` for the full client-facing flow.
10. **Tokens are a design constraint, not a cleanup task.** The product is top-1% quality at
   the LOWEST token cost that clears the gates — both matter, in that order. In practice:
   deterministic checks run before any LLM spends a token; executors read ONE self-contained
   brief, never the repo; repairs are scoped patches (~2–5KB), never re-prints; heavy assets
   travel as [[TOKEN]] placeholders; every stage runs the cheapest model tier that passes the
   gauntlet. Metric of record: **tokens per shipped PASS build**, logged per stage in
   BUILD_REGISTRY. The bench regression gate is what makes cost-cutting safe: efficiency
   changes that lower golden-build scores get reverted.

## Where things are

| Need | Go to |
|---|---|
| One-command orchestrator + model routing | `factory.js` + `factory.config.json` |
| Founder interview kit (60-min VOC extraction) | `templates/_base/INTERVIEW.md` |
| Deep-research chain (Black Book) | `playbooks/icp-research-pack` (Claude Projects repo) |
| Product contract (locked/flexible) | `templates/PRINT_SPEC.md` |
| Conversion skeleton + CRO rules | `docs/REFERENCES.md` |
| Pattern pool + mash-up rules | `templates/components/catalog.html` + `templates/ASSEMBLY.md` |
| Palette library (selector) | `templates/PALETTES.md` |
| Client service layer (Linear + emails) | `docs/CLIENT-OPS.md` |
| Agent prompts | `agents/00–05` |
| QA gate + defect memory | `qa/` (`run-checks.js`, `LEDGER.md`) |
| Quality gold exemplar | `projects/agl/v9/agl-site.html` (+ its `DESIGN_SYSTEM.md` rulebook) |
| Cross-model benchmark | `benchmarks/model-bench/` (packet.txt = one-paste test) |
| Headless repair loop (one command) | `qa/run-pipeline.js` |
| Regression gate (replay corpus) | `qa/replay.js` + `qa/replay-manifest.json` — pre-commit hook: `git config core.hooksPath .githooks` |
| Current state / open loops | `STATUS.md` |

## Open folds (deltas not yet merged into the core docs)

- [ ] Intake template: add the 4 brand-kit fields (marked * above).
- [ ] Harvest AGL v9 into the catalog (constellation canvas, wire ticker, count-up grid,
      diverging flow bars, range-band chart, gauge, match-card, report screen, glass system).
- [ ] Chris keep/kill pass on the 31 catalog patterns (pending since 2026-07-02).
- [ ] Run model-bench on fugu-ultra + GLM; log results.
