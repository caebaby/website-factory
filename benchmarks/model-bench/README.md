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
| 2026-07-08 | claude-fable-5 (reference) | Claude Code, self-verifying | 0 (5×P1 anim-robustness warnings — fix queued) | — | GOLD |
| 2026-07-08 | claude-sonnet-5 | claude.ai chat, one-shot blind | 0 P0 · 0 P1 · 3 P2 | craft 8 · distinct 7.5 · motion 6.5 · copy 8.5 · compliance 9 | FIX — 4 findings (see below) |

**Sonnet findings (2026-07-08):** (1) BLOCKER: primary CTA "Start the assessment" links to `#assess`
(itself) — dead conversion path; report only reachable by URL hash. (2) BLOCKER: on hash entry the
"we found you" match-confidence counter never runs — headline stat renders **0%**. (3) MAJOR: scroll
reveals take 2–4s to land — sections sit ghosted; hero italic accent spans 7 words (rulebook says 1–3);
feature icons drift toward generic line icons. (4) MINOR: copy says "seven questions," quiz card says
"1 of 4"; "guides get paid the same" claim needs [VERIFY]. Notable strengths: independently converged
on the system look (16% line overlap with gold — convergence, not copying), strong original copy
("Everyone's recruiting you. Almost no one's telling you the truth."), cleaner deterministic-gate
result than the gold build, sticky fictional-sample banner on the report was its own idea.
**System verdict:** the docs successfully carried a mid-tier model to ~85% of gold in one blind shot;
failures cluster in interaction wiring + motion timing — exactly what the agentic QA repair loop exists
to catch. Bench-harness lesson: verify the served file is the asset-injected one (a stale `serve` on
the same port reviewed the token-raw file first).
