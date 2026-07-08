# THE PROCESS — one page, the whole factory
*The front door. If you (human or model) are here to build a website, start here and only here.
Everything else in the repo hangs off this page. Updated 2026-07-08.*

**The product:** give the system palette, fonts, ICP, and client details — it PRINTS a website
that looks like a $25–50K team built it and converts to MQLs/SQLs. (`templates/PRINT_SPEC.md` is
the contract: what's LOCKED vs what a client supplies.)

## The print button — run of show

```
0. INTAKE          projects/<client>/INTAKE.md  ← the only human-authored input
                   (palette · fonts-or-register · ICP+pains · client details · REAL assets
                    · visual world + signature-motif idea + proof inventory*)
1. RESEARCH        agents/01 → ICP_BRIEF (exact-words pains, insider language)
2. STRATEGY        agents/02 → COPY_STRATEGY on the conversion skeleton (REFERENCES.md RULE #1)
2.5 DIRECTION      agents/00 DIRECTOR (taste tier, once per client):
                   register + pattern-per-section vector (ASSEMBLY dials, ≤40% same-vertical
                   overlap) + bespoke signature moment (AMBITION FLOOR + CONVERSION LAW)
                   → self-contained BUILD BRIEF. Chris gates DIRECTION here — wrong direction
                   costs one section, not a site.
3. COPY            agents/03 → COPY_ALL (RMBC, kill-list, [VERIFY] discipline)
4. PRINT           agents/04 EXECUTOR (best design tier for design-critical scopes):
                   builds FROM THE BRIEF + pattern invariants — clean prints only, NEVER
                   elevation passes on finished pages (LED-013). One scope at a time; hero first.
                   Heavy assets via token contract: [[TOKEN]] placeholders + inject script
                   (benchmarks/model-bench/build.py pattern) — keeps builds reproducible.
5. GAUNTLET        agents/05 + FRESH agents (builder never grades its own work):
                   node qa/run-checks.js (0 P0s) → taste critic on frozen screenshots →
                   scoped repair ≤3 → re-verify. Stall/regression → escalate.
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

## Where things are

| Need | Go to |
|---|---|
| Product contract (locked/flexible) | `templates/PRINT_SPEC.md` |
| Conversion skeleton + CRO rules | `docs/REFERENCES.md` |
| Pattern pool + mash-up rules | `templates/components/catalog.html` + `templates/ASSEMBLY.md` |
| Agent prompts | `agents/00–05` |
| QA gate + defect memory | `qa/` (`run-checks.js`, `LEDGER.md`) |
| Quality gold exemplar | `projects/agl/v9/agl-site.html` (+ its `DESIGN_SYSTEM.md` rulebook) |
| Cross-model benchmark | `benchmarks/model-bench/` (packet.txt = one-paste test) |
| Current state / open loops | `STATUS.md` |

## Open folds (deltas not yet merged into the core docs)

- [ ] Intake template: add the 4 brand-kit fields (marked * above).
- [ ] Harvest AGL v9 into the catalog (constellation canvas, wire ticker, count-up grid,
      diverging flow bars, range-band chart, gauge, match-card, report screen, glass system).
- [ ] Chris keep/kill pass on the 31 catalog patterns (pending since 2026-07-02).
- [ ] Run model-bench on fugu-ultra + GLM; log results.
