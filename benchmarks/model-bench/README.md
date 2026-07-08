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
5. FIX verdicts don't need a human: `node ../../qa/run-pipeline.js runs/candidate-<model>.html`
   drives the candidate through the headless repair loop (gate → critic → scoped repair →
   re-verify) and logs metrics to `docs/BUILD_REGISTRY.md`.

## Regression gate (this bench is also the factory's regression suite)

The one-shot candidates + the gold build are PINNED in `qa/replay-manifest.json` — the gold
build's scores may never get worse, and each candidate's known defects must keep firing. Any
change to `qa/*.js`, agent prompts, templates, `PROCESS.md`, the packet, or the gold build
re-runs the corpus via the pre-commit hook (`git config core.hooksPath .githooks`, or run
`node ../../qa/replay.js` by hand). Re-pin only consciously, same commit, with a LEDGER entry.
**The one-shot runs/ artifacts are frozen evidence — never repair them in place** (the repair
loop works on a `.pipeline.html` copy).

## Results log

| Date | Model | Harness | P0s | Critic scores | Verdict |
|---|---|---|---|---|---|
| 2026-07-08 | claude-fable-5 (reference) | Claude Code, self-verifying | 0 (5×P1 anim-robustness warnings — fix queued) | — | GOLD |
| 2026-07-08 | claude-sonnet-5 | claude.ai chat, one-shot blind | 0 P0 · 0 P1 · 3 P2 | craft 8 · distinct 7.5 · motion 6.5 · copy 8.5 · compliance 9 | FIX — 4 findings (see below) |
| 2026-07-08 | fugu-ultra | sakana chat, one-shot blind | 0 P0 · 0 P1 · 2 P2 | craft 7 · distinct 7 · motion 6 · copy 7.5 · compliance 9 | FIX — 3 findings (see below) |
| 2026-07-08 | claude-sonnet-5 → **run-pipeline** | headless repair loop, zero humans | entry 1 P0 · 4 P1 → exit 0/0 | opus critic **ship 0.86** | **PASS** — 2 repair iters, $0.78, 6m12s |
| 2026-07-08 | fugu-ultra → **run-pipeline** | headless repair loop, zero humans | entry 0 P0 · 5 P1 → exit 0/0 | opus critic 0.84, MINORs only | **PASS** — 1 repair iter, $0.39, 3m48s |

**Repair-loop note (2026-07-08):** the entry gate is the NEW check suite (LED-014/015/016) —
under it the one-shots' real defect matrix is: sonnet = 1 dead CTA (bare-`#`; its `#assessCta`
"self-anchor" from the original findings is actually JS-wired — the behavioral click-probe
cleared what the static read over-condemned) + 4 anim-dependent counters; fugu = 5 build-note
phrases, wiring genuinely flawless. Repaired outputs live UNCOMMITTED as
`runs/candidate-*.pipeline.html` (+ `.episode.json` audit trails); the one-shot artifacts stay
frozen. First acceptance run also surfaced + fixed critic goalpost-moving → LED-019.

**Sonnet findings (2026-07-08):** (1) BLOCKER: primary CTA "Start the assessment" links to `#assess`
(itself) — dead conversion path; report only reachable by URL hash. (2) BLOCKER: on hash entry the
"we found you" match-confidence counter never runs — headline stat renders **0%**. (3) MAJOR: scroll
reveals take 2–4s to land — sections sit ghosted; hero italic accent spans 7 words (rulebook says 1–3);
feature icons drift toward generic line icons. (4) MINOR: copy says "seven questions," quiz card says
"1 of 4"; "guides get paid the same" claim needs [VERIFY]. Notable strengths: independently converged
on the system look (16% line overlap with gold — convergence, not copying), strong original copy
("Everyone's recruiting you. Almost no one's telling you the truth."), cleaner deterministic-gate
result than the gold build, sticky fictional-sample banner on the report was its own idea.
**Fugu findings (2026-07-08):** (1) MAJOR: internal build-notes leaked into public copy ("replace
with live public-filing query before launch," "must be wired to verified aggregate queries," report
head describing itself as a demo) → LED-016 / new rule R32. (2) MAJOR: charts with zero information —
deal-range bars rendered as empty grey tracks labeled "Illustrative"×3; net-flow reduced to three
one-word bars → LED-017 / R33. (3) MINOR: narrow headline measures (3-line hero break, 1-word-per-line
report title), counter digit-spacing ("725 , 000+"), sparse card interiors. Notable strengths:
FLAWLESS interaction wiring (every CTA resolves; added mailto endpoints unprompted — exactly where
Sonnet failed), italic budget respected, sticky sample-profile sidebar on the report, strongest
compliance instincts of the three, good lines ("ranges, not promises — pressure-test the shape of a
move before anyone sells you a deal").

**System verdict:** the docs successfully carried a mid-tier model to ~85% of gold in one blind shot;
Sonnet's failures cluster in interaction wiring + motion timing; Fugu's in copy register + data-viz information content — near-disjoint failure modes, which is the strongest possible argument for the deterministic-gate + critic + repair loop over any single model's judgment — exactly what the agentic QA repair loop exists
to catch. Bench-harness lesson: verify the served file is the asset-injected one (a stale `serve` on
the same port reviewed the token-raw file first).
