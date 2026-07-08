# Running the test in a non-Claude harness (GLM · Fugu Ultra)

Goal: give other models the same *working conditions* Claude had — file tools + the ability to
render and verify — without Claude Code. Both GLM and Fugu expose OpenAI-compatible APIs, so any
harness that accepts a custom OpenAI-compatible endpoint runs both. One harness, two models,
clean A/B.

## Recommended harness

**Cline** (free VS Code extension) — accepts custom OpenAI-compatible providers AND has a
built-in browser tool, so the model can screenshot its own build and iterate. That's the verify
loop that matters. Alternative: **OpenCode** (terminal) if you'd rather stay out of VS Code.

## Endpoints

| Model | Base URL | Model ID | Key from |
|---|---|---|---|
| GLM | `https://api.z.ai/api/paas/v4` (coding plan: `https://api.z.ai/api/coding/paas/v4`) | current flagship — check z.ai models page (e.g. `glm-5.2`) | z.ai console |
| Fugu Ultra | `https://api.sakana.ai/v1` | `fugu-ultra` | console.sakana.ai |

In Cline: Settings → API Provider → "OpenAI Compatible" → paste base URL, key, model ID.
Make one Cline profile per model so switching is one click.

## Run the test

1. Open this folder (`docs/agl-site/llm-test/`) as the workspace. If the repo is too much,
   copy this folder somewhere standalone first — it's self-contained.
2. Paste this as the task:

   > Read `PROMPT.md` — everything below the divider is your brief. Read `reference-v8.html`
   > as your starting material. Write your build to `candidate-<model>.html` using the three
   > placeholder tokens exactly as specified. Then run
   > `python3 build.py candidate-<model>.html`, open the `-final.html` in a browser,
   > screenshot it at desktop and ~390px mobile, and fix anything broken or below the brief's
   > bar before declaring done.

3. Compare outputs against `../v9-claude/agl-site.html` (or https://caebaby.github.io/agl-site-preview/).

## Scoring (optional but recommended)

Run the critic from `docs/design-taste/CRITIC.md` on ALL builds — GLM's, Fugu's, and Claude's —
with the same screenshots, using a model that didn't build any of them. That converts "which
looks better" into rule-cited findings and 0–10 scores you can compare across models.

## Notes

- Session cost: expect one build pass to be a large single task (the reference HTML + brief is
  ~40K tokens in, ~80KB of code out, plus fix rounds).
- If a harness has no browser tool, the model builds blind — note that next to its score; it's
  the main handicap vs. Claude's run.
- Keep each model's output as `candidate-glm.html` / `candidate-fugu.html` in this folder so
  the comparisons live next to the kit.
