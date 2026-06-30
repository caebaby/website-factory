# The Self-Improving Factory Loop

The factory's goal isn't "build a good site once." It's an engine that **compounds** — each build makes the next more reliable, with shrinking human rework. This doc is the architecture for that, synthesized from agentic self-correction research (Reflexion / Self-Refine), oracle-free layout-defect detection (ReDeCheck/ReDeFix), and design-system component governance.

The core move: stop verifying CSS source and start verifying **rendered pixels + geometry**, then feed every caught defect back so it's never re-learned.

---

## The loop

```
04 BUILD ──▶ RENDER ──▶ INSPECT ──▶ CRITIQUE ──▶ REPAIR ──▶ RE-VERIFY ──▶ {ship | loop≤3 | escalate}
(reads RULES.md   (full Chromium,  (deterministic   (LLM critic,    (scoped,    (defects gone AND
 + components)     multi-viewport,  qa/visual-       judgment-only   additive    no new defect)
                   anims frozen)    checks.js)       on screenshots) CSS)
                                                                          │
                                                                          ▼
                                                              LEARN: log episode, distill
                                                              new check / rule / component
```

**1. Render** — load the build in a controlled headless browser at 390 / 768 / 1280. *Freeze animations to end-state before any capture* (inject `*{animation-duration:0s!important;transition-duration:0s!important}` and/or check `document.getAnimations()` are `finished`). This converts "a frozen-rAF screenshot fooled the check" into a *detectable* defect (`anim-not-finished`). Use the full Chromium binary, not the lightweight headless shell, for render-sensitive captures.

**2. Inspect (deterministic gate — free, no tokens, no flakiness).** Run `qa/visual-checks.js`. It asserts geometry invariants: zero-height/starved-width collapse, viewport overflow, element protrusion, display-type-trapped-in-narrow-column, accent overuse, banned fonts, body measure. **P0 blockers must be 0 to ship.** This gate alone catches the entire class the Field build shipped.

**3. Critique (LLM design-critic — only what geometry can't judge).** Feed the stabilized screenshots + the deterministic findings + the brand brief + one gold exemplar. Score 5 judgment dimensions (hierarchy, rag quality, brand fidelity, composition balance, image/copy fit) with anchored 0–1 rubrics and a numeric threshold. Pairwise-against-an-exemplar beats absolute scoring.

**4. Repair (scoped).** Agent 04 patches only the failing selectors; prefer additive corrective CSS over rewriting working layout.

**5. Re-verify.** Re-run Inspect + Critique. A patch is rejected if it fixes the target but introduces a *new* blocker (regression guard).

**Stopping rules:** hard cap **3 repair iterations** (reflection research shows compounding errors past ~3). Stop on convergence (0 blockers + critic ≥ 0.85). Stop on **stall** (defect count not decreasing → escalate, don't thrash). Escalate to the human queue on stall/regression/cap-hit-with-blockers.

---

## The learning layer (what makes it compound)

A **Defect Ledger** — `qa/LEDGER.md` (human-readable) backed by the build episode logs — with three layers:

**Layer 1 — Episode log (every build).** Append-only: `{build_id, template, defects:[{code, selector, measured, threshold}], iterations, repair_diffs, final_status, critic_scores}`.

**Layer 2 — Learned rules (the compounding layer).** When a defect recurs OR escapes the deterministic gate (caught by the critic or a human), distill it into a predicate rule and ask the key question: **"can this be expressed as a geometric/computed-style invariant?"** If yes, *add a new check to `qa/visual-checks.js`* — the critic teaches the cheap gate. The "heading trapped at 306px" that once passed CSS-grep is now permanent deterministic check `display-trapped`. A rule is **admitted only if** valid (catches the real case), generalizable (matches ≥1 other case or a plausible class), and specific (won't over-fire on good pages).

**Layer 3 — Blessed components (highest leverage).** Any page region that passes both gates cleanly N times is promoted into `COMPONENTS.md` as a frozen, tested primitive with a **pixel-diff baseline** (now visual regression *is* the right tool — you finally have a stable golden). Future builds compose from blessed components instead of regenerating. The loop's job shifts from "re-fix the same hero collapse every build" to "the hero is solved." Defect rate per build trends to zero.

**Anti-regression:** maintain a **replay corpus** of known-bad + known-good fixtures. Every change to `visual-checks.js` or `RULES.md` must still pass the whole corpus — a new check that fixes case X but breaks 3 good pages is rejected. Prune rules with high false-positive rates.

**The compounding curve:** builds 1–20, the critic + humans catch lots → many new deterministic checks + rules. Builds 20–100, the cheap gate now catches what used to escape, the blessed-component library covers most regions, critic load drops to genuinely novel judgment. Each caught defect becomes a cheap permanent check, an admitted rule, or a blessed component — **and never has to be re-learned.**

---

## Wiring into the pipeline

- **Agent 04 (Build / Actor):** reads `LAYOUT_CRAFT.md` + `COMPONENTS.md` + `RULES.md` *before* generating (prior lessons shape the build, not just QA). Assembles blessed components; varies tokens. Receives the defect list each repair iteration.
- **Agent 05 (QA / Evaluator):** owns the loop — render → `qa/visual-checks.js` → critic → re-verify → episode log → reflection (distill new checks/rules). Returns `ship | repair(defects) | escalate`.
- **Orchestrator (you / the human gate):** enforces the iteration cap, stall/regression aborts, and reviews escalations. Shrinks over time.

---

## Build order (each ships value alone)

- **V0 — the gate that stops the bleeding (DONE):** `qa/visual-checks.js` — P0 checks (collapse, overflow, display-trapped) + accent/font checks, deterministic, no model calls. Proven: passes the repaired Field, would have failed the broken one.
- **V1 — close the loop:** feed the defect list back to Agent 04 with a scoped-repair prompt; cap 3; ship/escalate.
- **V2 — add the critic:** the 5-dimension LLM rubric on stabilized screenshots + a gold exemplar; add rag/composition checks.
- **V3 — add learning:** `qa/LEDGER.md`, the escape→new-check mechanism, the replay corpus, and component-blessing with pixel baselines.

---

## What's done vs next (2026-06-29)
- ✅ V0 deterministic checker (`qa/visual-checks.js`) — written, tested against Field.
- ✅ Craft encoded (`LAYOUT_CRAFT.md`) and hard primitives frozen (`COMPONENTS.md`).
- ✅ First ledger entries seeded (`qa/LEDGER.md`) from the Field defects.
- ⬜ V1 repair loop wiring in Agent 04/05 prompts.
- ⬜ V2 LLM critic + gold exemplars per template.
- ⬜ V3 ledger automation + replay corpus + pixel baselines on blessed components.
