# Model Bench — cross-model quality benchmark

**Why this exists:** the factory's core claim is model-agnostic quality — the quality lives in
the docs, primitives, and QA gate, not in one model's taste (CLAUDE.md). This bench tests that
claim on external models (Fugu Ultra, GLM, whatever's next) with a fixed, real task: elevate the
AGL site from v8 to a v9-quality build.

**The task:** same information Claude Fable had for the reference build — brief + design rulebook
+ the actual v8 source + assets contract. Gold answer: `../../projects/agl/v9/agl-site.html`
(live: https://caebaby.github.io/agl-site-preview/). Never show candidates the gold build.

## Contents

| File | What |
|---|---|
| `packet.txt` | **The one-paste run file** — brief + rulebook + v8 reference + output contract, pre-assembled (~12K tokens). Paste into any chat model. |
| `PROMPT.md` | The brief with runner instructions (source packet.txt is generated from this + the rulebook + reference). |
| `reference-v8.html` | Starting material (previous site iteration), asset tokens in place. |
| `assets/` + `build.py` | The asset contract: candidates write `[[FONT_SCHIBSTED]]` / `[[FONT_NEWSREADER]]` / `[[IMG_HERO]]` tokens; `python3 build.py candidate.html` injects real base64 → `candidate-final.html`. |
| `OTHER-HARNESS.md` | Running candidates agentically (Cline/OpenCode + endpoints for GLM and Fugu). |
| `CRITIC-PORTABLE.md` | Paste-anywhere critic (screenshots + rulebook → rule-cited findings + scores). For scoring candidates outside the factory's own QA loop; inside the factory, `qa/run-checks.js` + Agent 05 remain the real gate. |

## Run protocol (browser chat)

1. Paste `packet.txt` into the candidate model. Say "continue" if output truncates.
2. Save output as `runs/candidate-<model>.html`; run `python3 build.py runs/candidate-<model>.html`.
3. Score: screenshot the `-final.html` (desktop + 390px) and run `CRITIC-PORTABLE.md` with a
   model that didn't build it — plus `node ../../qa/run-checks.js` for the deterministic gate.
4. Log the result here (model, date, critic scores, P0 count, verdict) — bench results are
   factory memory, same spirit as `qa/LEDGER.md`.

## Results log

| Date | Model | Harness | P0s | Critic scores | Verdict |
|---|---|---|---|---|---|
| 2026-07-08 | claude-fable-5 (reference) | Claude Code, self-verifying | — | — | GOLD |
