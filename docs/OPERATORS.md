# Website Factory — Operator Manual (Hermes / multi-model)

> Authored by Mahdin (2026-07-27) from the live repo; adopted with corrections the same day.
> CORRECTIONS APPLIED vs the original draft:
> 1. glm-5-turbo via Hermes is NOT reliably verified — it 401'd mid-generation on a long run.
>    The proven Hermes worker is `hermes-default` (glm-4.5-flash), gauntlet-PASSED 2026-07-23.
> 2. Config C's `fallbacks` key was misplaced (sibling of roles — silently ignored). Fallbacks
>    are PER-ROLE. Fixed in `presets/`.
> 3. Config C ran copygate on the same model as copy — violates the independence rule (§4
>    stage 5). The auditor must be a different model than the writer. Fixed in `presets/`.
> 4. `runner/` lives in the Claude Projects repo at `playbooks/icp-research-pack/runner/`,
>    not in this repo. Stage 01 was rebuilt 2026-07-23 as EVIDENCE-GROUNDED (code assembles
>    the ledger from retrieved search results; model prose fabricated 3 runs straight).
> 5. §12's model tables are an AUDITION SHORTLIST, not a leaderboard — no model holds a live
>    role until it passes the bench (law: the bench is the hiring authority). OpenRouter
>    configs are inert until the OpenRouter key has credits.
> Ready-to-use rosters live in `presets/` — copy one over factory.config.json's roles.


*How to operate the website-factory pipeline with Hermes Agent and swappable models per role.*
*Written for Chris / Hermes operators. Feed this doc to Hermes for full factory understanding.*

---

## 1. What This Repo Is

The website-factory is an end-to-end pipeline that turns a client intake document into a premium, high-converting, single-page website. The target quality is what a $25K-$50K agency would produce.

**The core idea:** quality lives in the system (docs, pattern invariants, deterministic QA gates), not in any single model. Any suite of models can run the pipeline and produce consistent output because:

- LLM-agnostic docs define the craft, rules, and design tokens
- Tested code primitives get assembled (never re-derived from scratch)
- A deterministic QA gate + repair loop inspects rendered pixels and fixes defects before ship
- Every human correction compounds into a rule, check, or pattern

The pipeline takes one human-authored input (INTAKE.md) and produces a production-ready HTML file through 8 stages, with human gates at two critical decision points.

---

## 2. The Two Orchestrators

### 2.1 factory.js - The Main Pipeline

The foreman. Runs the full intake-to-ship pipeline, pausing at human gates. Every stage is a fresh subprocess of whatever CLI the config assigns to that role.

**CLI:**
```bash
node factory.js print <client>              # run/resume the pipeline
node factory.js print <client> --dry-run    # show the plan, spawn nothing
node factory.js approve <client> <gate>     # approve a gate, auto-continue
node factory.js status <client>             # where is this client?
node factory.js audition <alternate-name>   # run a candidate through the model-bench
```

**What it does:**
- Reads `factory.config.json` to resolve which CLI/model runs each stage
- Assembles prompts by concatenating the agent prompt file + all input file contents
- Spawns the configured CLI as a subprocess, captures output
- Writes output files to `projects/<client>/`
- Tracks state in `projects/<client>/.factory-state.json`
- Pauses at human gates (direction, ship) and waits for `approve`
- Falls back through the fallback chain if a model fails to spawn

### 2.2 qa/run-pipeline.js - The QA Gauntlet

The print button's repair loop. Takes a flawed build and drives it to shippable with zero humans in the loop.

**CLI:**
```bash
node qa/run-pipeline.js <build.html> [--accent '#C9A24B'] [--slug name]
  [--critic-model opus] [--repair-model sonnet] [--critic-doc path.md]
  [--max-iter 3] [--no-critic] [--registry docs/BUILD_REGISTRY.md]
```

**Flags:**
- `--accent HEX` - the brand accent color for visual checks
- `--slug name` - build name for registry (defaults to filename)
- `--critic-model MODEL` - model for the taste critic (default: opus)
- `--repair-model MODEL` - model for the repair agent (default: sonnet)
- `--critic-doc path.md` - optional rulebook for the critic
- `--max-iter N` - max repair iterations (default: 3)
- `--no-critic` - skip the LLM critic, pass on gate-clean alone
- `--registry path` - build registry path (default: docs/BUILD_REGISTRY.md)

**Output:** `<build>.pipeline.html` (repaired work file; original untouched), `<build>.pipeline-shots/` (frozen screenshots), verdict JSON on stdout. Exit 0 = PASS, 1 = ESCALATE/FAIL, 2 = harness error.

---

## 3. How Model Routing Works

All model routing lives in `factory.config.json`. The file has two top-level sections:

### 3.1 The `roles` Section

Each pipeline stage maps to a role. A role defines how to spawn the model:

```json
{
  "roles": {
    "research": {
      "label": "research - synthesis over Black Book + interview",
      "cmd": "claude",
      "args": ["-p", "{PROMPT}", "--output-format", "json", "--model", "claude-sonnet-5", "--allowedTools", "Read,WebSearch,WebFetch", "--permission-mode", "acceptEdits"],
      "io": "stdout",
      "parse": "claude-json",
      "timeoutMin": 30,
      "fallbacks": ["hermes-glm", "hermes-default"]
    }
  }
}
```

**Fields:**
- `cmd` - the CLI binary to spawn (claude, hermes, codex, anything)
- `args` - array of arguments; `{PROMPT}` is replaced with the assembled prompt at runtime
- `io` - how input/output works (see below)
- `parse` - how to read the output (see below)
- `timeoutMin` - subprocess timeout in minutes
- `fallbacks` - optional array of alternate names to try if the primary fails

### 3.2 The `alternates` Section

Tested command shapes staged for promotion. Copy one over a role's `cmd`/`args`/`io`/`parse` to swap models:

```json
{
  "alternates": {
    "hermes-glm": {
      "label": "GLM via Hermes",
      "cmd": "hermes",
      "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"],
      "io": "stdout",
      "parse": "raw",
      "timeoutMin": 30
    }
  }
}
```

### 3.3 The Two IO Modes

**`io: "stdout"`** - Inputs are embedded directly in the prompt text. The model's stdout is captured and written as the output file. Works with ANY CLI that prints to stdout. No file tools needed.

Prompt assembly for stdout mode:
```
[agent prompt]

---
CLIENT: <name>

=== INPUT: INTAKE.md ===
[full file contents]

=== INPUT: research/ICP_BRIEF.md ===
[full file contents]

---
Return ONLY the complete contents of research/ICP_BRIEF.md -- no preamble, no commentary, no code fences.
```

**`io: "tools"`** - The agent is told the file paths and must write the output file itself. Needs a tool-capable CLI (claude with `--allowedTools`, hermes with `hermes-cli` toolset, codex).

Prompt assembly for tools mode:
```
[agent prompt]

---
CLIENT: <name>
PROJECT FOLDER: <path>
INPUT FILES (read all of them first):
- <abs path to INTAKE.md>
- <abs path to ICP_BRIEF.md>
Write your complete output to: <abs path to output>
Create parent folders if needed. Write the file, then reply DONE.
```

### 3.4 Parse Modes

- `parse: "claude-json"` - Only for `claude -p --output-format json`. Parses the JSON envelope, extracts `result` (the text) and `total_cost_usd` (cost tracking). Unlocks per-stage cost reporting.
- `parse: "raw"` - Everything else. Stdout is taken as-is. No cost tracking (returns $0).

### 3.5 Fallback Chain

When a role has `fallbacks`, the pipeline tries the primary first, then each named fallback in order. This is **availability routing**, not quality routing:

1. Try the primary model (e.g., `claude` with `claude-opus-4-8`)
2. If it fails to spawn, times out, or returns empty output, try fallback 1 (e.g., `hermes-glm`)
3. If fallback 1 fails, try fallback 2 (e.g., `hermes-default`)
4. If all candidates fail, the pipeline dies

Quality is protected downstream by the gates and gauntlet. A fallback model producing weak work gets caught just like anyone else's.

---

## 4. The 8 Pipeline Stages

Each stage has: a role (which model config to use), an agent prompt file, input files, and an output file.

### Stage 1: research

| Field | Value |
|-------|-------|
| Role | `research` |
| Agent | `agents/01_research.md` |
| IO | `stdout` |
| Inputs | `INTAKE.md`, optional `research/BLACK_BOOK.md`, optional `research/INTERVIEW_TRANSCRIPT.md` |
| Output | `research/ICP_BRIEF.md` |

Reads the client intake plus any deep research (Black Book) or founder interview transcript. Produces an ICP Brief with a **VOC LEDGER** - 15-25 citable rows of voice-of-customer data. Each row has a verbatim quote + source. The ledger is the binding currency that all downstream agents must reference by VOC ID.

### Stage 2: strategy

| Field | Value |
|-------|-------|
| Role | `strategy` |
| Agent | `agents/02_strategy.md` |
| IO | `stdout` |
| Inputs | `INTAKE.md`, `research/ICP_BRIEF.md`, optional `research/BLACK_BOOK.md`, optional `research/INTERVIEW_TRANSCRIPT.md` |
| Output | `strategy/COPY_STRATEGY.md` |

Takes the ICP research and client intake. Produces the **COPY SPINE** (Part B of the output) - a binding contract, not guidance. Every section is bound by ID to VOC rows, one objection, placed proof, and CTA psychology. The spine is the forcing function that turns research into copy. "See research" is not a binding; a VOC ID is.

### Stage 3: direction

| Field | Value |
|-------|-------|
| Role | `director` |
| Agent | `agents/00_director.md` |
| IO | `stdout` |
| Inputs | `INTAKE.md`, `research/ICP_BRIEF.md`, `strategy/COPY_STRATEGY.md` |
| Output | `briefs/BUILD_BRIEF.md` |
| Gate Before | `direction` (pauses for human approval) |

**Taste tier.** Runs once per client. Converts client inputs into a self-contained BUILD BRIEF that any executor can build from at full quality. Sets **5 dials** (Tone, Density, Motion, Type, Visual) plus per-section pattern selections (max 40% same-vertical overlap) plus a signature moment. The Director routes client adjectives to blessed inventory and retints within solved math; it never invents tokens from vibes.

This is the layer that makes "lesser models build at the highest quality of their capabilities" true: executors never invent, never read the whole repo - they receive one measured artifact.

**Human gate:** The pipeline pauses here. Wrong direction costs one section, not a site.

### Stage 4: copy

| Field | Value |
|-------|-------|
| Role | `copy` |
| Agent | `agents/03_copy.md` |
| IO | `stdout` |
| Inputs | `strategy/COPY_STRATEGY.md`, `research/ICP_BRIEF.md`, `INTAKE.md`, optional `research/BLACK_BOOK.md` |
| Output | `copy/COPY_ALL.md` |
| Gate Before | `direction` (waits for direction approval) |

Writes all site copy. Every headline, subheadline, body paragraph, CTA, and microcopy. Nothing gets built until copy exists. Written FROM the spine (RMBC, kill-list, [VERIFY] discipline). Includes a mandatory **Traceability Appendix** mapping every section to its VOC rows and the specific lines that reference them.

### Stage 5: copygate

| Field | Value |
|-------|-------|
| Role | `copygate` |
| Agent | `agents/03.5_copy_gate.md` |
| IO | `stdout` |
| Inputs | `copy/COPY_ALL.md`, `strategy/COPY_STRATEGY.md`, `research/ICP_BRIEF.md`, optional `research/BLACK_BOOK.md` |
| Output | `copy/COPY_GATE.md` |
| Block On | `VERDICT: REPAIR` (halts pipeline if found in output) |

A fresh, independent auditor - different model than the writer whenever possible. Checks: traceability (did research actually make it into copy?), awareness match, generic-copy detection, fact discipline, conversion architecture. This gate exists because deep research once turned into generic copy with nothing stopping it.

**Should use a DIFFERENT model than the copy stage.** The independence rule: the writer never grades its own work.

If the output contains "VERDICT: REPAIR", the pipeline halts. Fix copy per `copy/COPY_GATE.md`, then re-run.

### Stage 6: build

| Field | Value |
|-------|-------|
| Role | `build` |
| Agent | `agents/04_build.md` |
| IO | `tools` (needs file-capable CLI) |
| Inputs | `briefs/BUILD_BRIEF.md`, `copy/COPY_ALL.md` |
| Output | `build/index.html` |

Assembles the final HTML site from the approved copy, template, and brand inputs. Does not invent copy. Does not make design decisions not supported by the template. Executes.

Reads 12 input files in exact order before writing any code (see Section 8 for the full list). Heavy assets travel as `[[TOKEN]]` placeholders with an inject script to keep builds reproducible.

### Stage 7: gauntlet

| Field | Value |
|-------|-------|
| Role | `null` (internal, not a model-spawned stage) |
| CLI | `node qa/run-pipeline.js <build.html>` |
| Output | `qa/QA_REPORT.md` |

Not a model-spawned stage. Runs the QA gauntlet directly. The loop:

1. **RENDER** - load the build in headless Chrome at 390/768/1280px, freeze animations
2. **INSPECT** - `node qa/run-checks.js` runs deterministic geometry checks (zero-dependency, no LLM, exits 0/1 on P0 count)
3. **CRITIQUE** - fresh LLM critic judges 5 dimensions on frozen screenshots (hierarchy, craft, brand, composition, copy-fit). Scored 0-1, 0.85+ = ship
4. **REPAIR** - fresh LLM builder patches only failing selectors with additive CSS
5. **RE-VERIFY** - re-run Inspect + Critique from scratch

Stopping rules: hard cap 3 iterations, stall (defect score not decreasing) = escalate, regression (new P0 introduced) = escalate.

### Stage 8: ship

| Field | Value |
|-------|-------|
| Role | `null` (human gate) |
| Gate Before | `ship` |

Pauses for final human approval. Review the gauntlet-clean build on the review link. Every correction must land as a rule/check/pattern in the LEDGER. Approval here ships it.

---

## 5. The Existing Hermes Alternates

Three tested Hermes command shapes are already in `factory.config.json`:

### hermes-glm
```json
{
  "label": "GLM-5-turbo via Hermes - UNRELIABLE on long runs (401 mid-generation); use hermes-default instead",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 30
}
```
Uses GLM-5-turbo through Hermes headless mode. CAUTION: 401'd mid-generation on a 13-minute run; short calls only. The proven long-run shape is hermes-default (glm-4.5-flash).

### hermes-default
```json
{
  "label": "Hermes default model - verified headless 2026-07-23",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 30
}
```
Uses whatever model is configured in Hermes' own config. No `-m` flag.

### hermes-tools
```json
{
  "label": "Hermes with file tools for io:'tools' roles - UNTESTED, verify --accept-hooks behavior before live use",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo", "-t", "hermes-cli", "--accept-hooks"],
  "io": "tools",
  "parse": "raw",
  "timeoutMin": 40
}
```
For roles that need file tools (like `build`). Uses the `hermes-cli` toolset. Marked as UNTESTED - verify before live use.

**Key Hermes flags:**
- `-Q` - quiet mode (no UI)
- `-q "{PROMPT}"` - the prompt text
- `-m <model>` - model override
- `-t hermes-cli` - enable the hermes-cli toolset (file read/write/edit)
- `--accept-hooks` - accept tool hooks

---

## 6. How to Swap Any Role to Hermes

To change a role's model, edit `factory.config.json` and replace the role's `cmd`, `args`, `io`, and `parse` fields. The pattern for Hermes is always:

```
cmd: "hermes"
args: ["chat", "-Q", "-q", "{PROMPT}", "-m", "<model-id>"]
io: "stdout"
parse: "raw"
```

### Example: Swap research to DeepSeek via Hermes

```json
"research": {
  "label": "research - DeepSeek via Hermes",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-chat-v3-0324"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 30
}
```

### Example: Swap strategy to Haiku via Hermes

```json
"strategy": {
  "label": "strategy - Haiku via Hermes",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "anthropic/claude-3.5-haiku"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 20
}
```

### Example: Swap director to Sonnet via Hermes

```json
"director": {
  "label": "director - Sonnet via Hermes",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "anthropic/claude-sonnet-4"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 30
}
```

### Example: Swap copy to GLM via Hermes

```json
"copy": {
  "label": "copy - GLM via Hermes",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 30
}
```

### Example: Swap copygate to DeepSeek (cheap skeptic)

```json
"copygate": {
  "label": "copygate - DeepSeek via Hermes",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-chat-v3-0324"],
  "io": "stdout",
  "parse": "raw",
  "timeoutMin": 15
}
```

### Example: Swap build to Gemini via Hermes (tools mode)

For the `build` role, you need `io: "tools"` because the agent writes files. Use the `hermes-tools` alternate pattern:

```json
"build": {
  "label": "build - Gemini via Hermes tools",
  "cmd": "hermes",
  "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "google/gemini-2.5-pro", "-t", "hermes-cli", "--accept-hooks"],
  "io": "tools",
  "parse": "raw",
  "timeoutMin": 40
}
```

### Quick Reference: Model IDs for Hermes `-m` flag

| Model | `-m` value |
|-------|-----------|
| DeepSeek V3 | `deepseek/deepseek-chat-v3-0324` |
| DeepSeek R1 | `deepseek/deepseek-r1` |
| Claude Haiku 3.5 | `anthropic/claude-3.5-haiku` |
| Claude Sonnet 4 | `anthropic/claude-sonnet-4` |
| Claude Opus 4 | `anthropic/claude-opus-4` |
| GLM-5-turbo | `glm-5-turbo` |
| Gemini 2.5 Pro | `google/gemini-2.5-pro` |
| GPT-4o | `openai/gpt-4o` |
| Kimi | `moonshotai/kimi-k2` |

Check Hermes config for exact model IDs available through your OpenRouter key.

---

## 7. The Gauntlet's Model Routing

The QA gauntlet (`qa/run-pipeline.js`) is a separate system from `factory.js`. It hardcodes the `claude` CLI via the `claudeAgent()` function:

```javascript
function claudeAgent(role, prompt, { model, tools }) {
  const args = ['-p', prompt, '--output-format', 'json', '--model', model];
  if (tools) { args.push('--allowedTools', tools, '--permission-mode', 'acceptEdits'); }
  const r = spawnSync('claude', args, { ... });
  // ...
}
```

The `--critic-model` and `--repair-model` flags only change the `--model` argument passed to `claude`. They do NOT change the CLI binary.

**To use Hermes in the gauntlet**, the code would need modification - specifically, the `claudeAgent()` function would need to be generalized to support spawning `hermes` instead of `claude`. For now:

- The `factory.js` pipeline stages (research, strategy, director, copy, copygate, build) can all use Hermes by editing `factory.config.json`
- The gauntlet (critic + repair agents) continues to use Claude
- This is fine because the gauntlet is a self-contained loop that runs independently

---

## 8. The Template Doc Stack (Agent 04 Reads These in Order)

Agent 04 (the build agent) reads exactly 12 files in this order before writing any code:

| # | File | Owns | Changes per client? |
|---|------|------|---------------------|
| 1 | `templates/[template]/SECTION_MANIFEST.md` | The 9-section conversion skeleton + order | No (structure) |
| 2 | `templates/[template]/DESIGN.md` | Universal quality floor (shadows, shimmer, grain, anti-slop, frosted nav) - tone-agnostic | No (craft floor) |
| 3 | `templates/[template]/DESIGN_TOKENS.md` | The 5 dials (Tone/Density/Motion/Type/Visual) + exact CSS token values | Yes (the skin) |
| 4 | `templates/[template]/SECTION_PATTERNS.md` | 3-4 layout patterns per section | Yes (composition) |
| 5 | `templates/[template]/MOTION_TIERS.md` | T1/T2/T3 animation specs (GSAP) | Per Motion dial |
| 6 | `templates/[template]/DESIGN_FUNDAMENTALS.md` | Hierarchy / type / color / spacing / a11y physics | No |
| 6b | `templates/[template]/LAYOUT_CRAFT.md` | Measure-by-size, line-height/tracking, rag, whitespace/composition, AI-slop tells | No |
| 6c | `templates/[template]/COMPONENTS.md` | Tested code primitives (cycle hero, multi-step form, scroll reveal) to ASSEMBLE, not re-derive | No |
| 7 | `templates/[template]/PAGE_SYSTEM.md` | Integration rules, page-level constraints | No |
| 8 | `strategy/DESIGN_BRIEF.md` | 5-dial config + per-section patterns + signature moment (from Agent 02.5/Director) | Yes |
| 9 | `projects/[slug]/DESIGN.md` | Client-specific design overrides | Yes |
| 10 | `projects/[slug]/SITEMAP.md` | Page structure for this client | Yes |
| 11 | `copy/COPY_ALL.md` | All site copy (from Agent 03) | Yes |
| 12 | `strategy/COPY_STRATEGY.md` | Copy spine + VOC bindings (from Agent 02) | Yes |

The current template is `editorial-luxury/`. The design system is layered: each doc owns one job, none overlap.

---

## 9. Project Structure

```
website-factory/
├── factory.js                    # Main pipeline orchestrator
├── factory.config.json           # Model routing config (roles + alternates)
├── PROCESS.md                    # The one-page process doc (start here)
├── CLAUDE.md                     # Instructions for Claude (also useful for Hermes)
├── STATUS.md                     # Current state / open loops
├── FACTORY_LEARNING.md           # Self-improving loop architecture
│
├── agents/                       # Agent prompt files
│   ├── 00_director.md            # Director (taste tier, once per client)
│   ├── 01_research.md            # Research (VOC ledger)
│   ├── 02_strategy.md            # Strategy (copy spine)
│   ├── 03_copy.md                # Copy writer
│   ├── 03.5_copy_gate.md         # Copy gate (independent auditor)
│   ├── 04_build.md               # Build executor
│   └── 05_qa.md                  # QA agent prompt
│
├── templates/                    # Design system templates
│   ├── editorial-luxury/         # Current template (the doc stack above)
│   │   ├── SECTION_MANIFEST.md
│   │   ├── DESIGN.md
│   │   ├── DESIGN_TOKENS.md
│   │   ├── SECTION_PATTERNS.md
│   │   ├── MOTION_TIERS.md
│   │   ├── DESIGN_FUNDAMENTALS.md
│   │   ├── LAYOUT_CRAFT.md
│   │   ├── COMPONENTS.md
│   │   └── PAGE_SYSTEM.md
│   ├── _base/                    # Base templates
│   │   ├── INTAKE.md             # Intake template (start here for new clients)
│   │   └── INTERVIEW.md          # Founder interview kit
│   ├── components/
│   │   └── catalog.html          # Pattern catalog (named variants)
│   ├── ASSEMBLY.md               # Pattern pool + diversity dials
│   ├── PRINT_SPEC.md             # What's LOCKED vs what a client supplies
│   └── PALETTES.md               # Palette library (selector)
│
├── projects/                     # Per-client project folders
│   └── <client>/
│       ├── INTAKE.md             # The only human-authored input
│       ├── .factory-state.json   # Pipeline state (auto-managed)
│       ├── GATE_*.md             # Gate files (auto-created, deleted on approve)
│       ├── research/             # Stage 1 output
│       │   ├── ICP_BRIEF.md
│       │   ├── BLACK_BOOK.md     # Optional deep research
│       │   └── INTERVIEW_TRANSCRIPT.md  # Optional
│       ├── strategy/             # Stage 2 output
│       │   ├── COPY_STRATEGY.md
│       │   └── DESIGN_BRIEF.md   # Stage 3 output (direction)
│       ├── briefs/               # Stage 3 output
│       │   └── BUILD_BRIEF.md
│       ├── copy/                 # Stages 4+5 output
│       │   ├── COPY_ALL.md
│       │   └── COPY_GATE.md
│       └── build/                # Stage 6 output
│           └── index.html
│
├── qa/                           # QA system
│   ├── run-pipeline.js           # The gauntlet orchestrator
│   ├── run-checks.js             # Deterministic gate (headless Chrome, no LLM)
│   ├── visual-checks.js          # Visual check definitions
│   ├── screenshot.js             # Screenshot capture
│   ├── LEDGER.md                 # Defect ledger (compounding memory)
│   └── replay.js                 # Regression gate (replay corpus)
│
├── docs/                         # Documentation
│   ├── BUILD_REGISTRY.md         # Build metrics + pipeline run log
│   ├── CLIENT-OPS.md             # Client-facing flow
│   ├── DEVELOPER-BRIEF.md        # Developer onboarding
│   └── REFERENCES.md             # CRO rules + conversion skeleton refs
│
├── benchmarks/                   # Model benchmarking
│   └── model-bench/
│       ├── packet.txt            # The audition test packet
│       ├── README.md             # Model leaderboard + verdicts
│       └── runs/                 # Candidate build outputs
│           └── candidate-<name>.html
│
└── runner/                       # Deep research runner
    └── run.py                    # ICP Deep Research Pack runner
```

---

## 10. The 10 Laws

These are the hard-won rules from PROCESS.md. Every decision in the factory traces back to one of these.

1. **Quality lives in the system, not the model.** Docs + pattern invariants + deterministic gate. A bad build = a system gap; fix the doc/check/pattern, not the prompt.

2. **Clean prints, never elevation passes.** Re-print from the Pack when a page degrades. Don't patch a broken foundation.

3. **No builder self-verification.** Fresh agent for every build, repair, and verification. The builder never grades its own work.

4. **Structure is locked, skin is not.** Conversion skeleton always; two same-vertical clients must differ on more than color (6 diversity dials).

5. **Nothing interactive is decorative.** Every signature element resolves toward the conversion event.

6. **Every human correction compounds.** Rule, check, or pattern - or it will be paid for twice.

7. **Real proof only.** No invented testimonials/stats; illustrative numbers labeled; compliance overlay per regime.

8. **Selection over generation, at every layer.** Sections come from the pattern pool, palettes from PALETTES.md, heroes/components from the catalog's named variants, motion from MOTION_TIERS. The Director routes client adjectives to blessed inventory and retints within solved math; it never invents tokens from vibes. Generation happens only when a new entry earns its way into a library through harvest -> curate -> Chris.

9. **Copy runs two gates.** Facts gate blocks build (claims-verification; [VERIFY]s go to the client). Voice gate runs in parallel with build (client wording edits land as scoped repairs).

10. **Tokens are a design constraint, not a cleanup task.** The product is top-1% quality at the LOWEST token cost that clears the gates - both matter, in that order. Deterministic checks run before any LLM spends a token; executors read ONE self-contained brief, never the repo; repairs are scoped patches (~2-5KB), never re-prints; heavy assets travel as [[TOKEN]] placeholders; every stage runs the cheapest model tier that passes the gauntlet.

---

## 11. Key Paths

| Need | Path |
|------|------|
| Config (model routing) | `factory.config.json` |
| Pipeline orchestrator | `factory.js` |
| QA gauntlet | `qa/run-pipeline.js` |
| Deterministic gate | `qa/run-checks.js` |
| Visual checks | `qa/visual-checks.js` |
| Screenshots | `qa/screenshot.js` |
| Defect ledger | `qa/LEDGER.md` |
| Build registry | `docs/BUILD_REGISTRY.md` |
| Agent prompts | `agents/00_director.md`, `agents/01_research.md`, `agents/02_strategy.md`, `agents/03_copy.md`, `agents/03.5_copy_gate.md`, `agents/04_build.md` |
| Template doc stack | `templates/editorial-luxury/` |
| Pattern catalog | `templates/components/catalog.html` |
| Assembly rules | `templates/ASSEMBLY.md` |
| Print spec (locked/flexible) | `templates/PRINT_SPEC.md` |
| Intake template | `templates/_base/INTAKE.md` |
| Interview kit | `templates/_base/INTERVIEW.md` |
| Palette library | `templates/PALETTES.md` |
| Status / open loops | `STATUS.md` |
| Learning / self-improvement | `FACTORY_LEARNING.md` |
| Process overview | `PROCESS.md` |
| Client operations | `docs/CLIENT-OPS.md` |
| Model bench packet | `benchmarks/model-bench/packet.txt` |
| Model leaderboard | `benchmarks/model-bench/README.md` |
| Quality gold exemplar | `projects/agl/v9/agl-site.html` |

---

## 12. Recommended Role-to-Model Mapping with Hermes

The principle: taste-tier roles (director, copy) need strong models. Execution roles (research, strategy) can run cheaper. The copygate should be a DIFFERENT model than copy (independence).

### 12.1 Model Benchmark Reference (July 2026)

The table below lists models verified available on OpenRouter with their exact `-m` slugs and key benchmark scores. All slugs were confirmed live via the OpenRouter API.

**Frontier Tier (taste roles - director, copy):**

| Model | OpenRouter `-m` slug | SWE-bench | Key strength | Cost (input/output per 1M tokens) |
|-------|---------------------|-----------|--------------|-----------------------------------|
| Claude Opus 5 | `anthropic/claude-opus-5` | highest tier | Strongest Claude, best reasoning | premium |
| Claude Opus 5 Fast | `anthropic/claude-opus-5-fast` | highest tier | Opus quality, faster inference | premium |
| Claude Fable 5 | `anthropic/claude-fable-5` | highest tier | Newest Claude variant | premium |
| Claude Opus 4.8 | `anthropic/claude-opus-4.8` | 69.2% SWE-bench Pro | Proven taste tier, design-director quality | premium |
| Claude Sonnet 5 | `anthropic/claude-sonnet-5` | 63.2% SWE-bench Pro | Close to Opus at 40-60% cost | mid |
| Kimi K3 | `moonshotai/kimi-k3` | 76.8% SWE-bench Verified | 2.8T MoE, #1 Frontend Code Arena, 1M context | mid |
| DeepSeek V4 Pro | `deepseek/deepseek-v4-pro` | 80.6% SWE-bench Verified | 1.6T MoE, LiveCodeBench 93.5, Codeforces Elo 3206 | $0.435/$0.87 |
| GLM-5.2 | `z-ai/glm-5.2` | 62.1% SWE-bench Pro | 744B MoE, 81.0 Terminal-Bench, MIT licensed | mid |

**Mid Tier (execution roles - research, strategy, build):**

| Model | OpenRouter `-m` slug | Key strength | Cost |
|-------|---------------------|--------------|------|
| Claude Sonnet 4.6 | `anthropic/claude-sonnet-4.6` | Proven workhorse, strong tool use | mid |
| Claude Haiku 4.5 | `anthropic/claude-haiku-4.5` | Fast, cheap, good enough for synthesis | cheap |
| GLM-5.1 | `z-ai/glm-5.1` | Strong open-weight, good value | cheap |
| GLM-5-turbo | `z-ai/glm-5-turbo` | Fast GLM, already verified in this factory | cheap |
| Kimi K2.7 Code | `moonshotai/kimi-k2.7-code` | Coding-specialized Kimi variant | cheap |
| Kimi K2.6 | `moonshotai/kimi-k2.6` | Proven Kimi generation | cheap |
| Qwen 3.7 Max | `qwen/qwen3.7-max` | Latest Qwen flagship | mid |
| Gemini 3.5 Flash | `google/gemini-3.5-flash` | Fast Google model, good for review | cheap |

**Budget Tier (copygate, review, bulk tasks):**

| Model | OpenRouter `-m` slug | Key strength | Cost |
|-------|---------------------|--------------|------|
| DeepSeek V4 Flash | `deepseek/deepseek-v4-flash` | 284B MoE, 13B active, 1M context | $0.09/$0.18 |
| DeepSeek V3.2 | `deepseek/deepseek-v3.2` | Proven, cheap | very cheap |
| GLM-4.7 Flash | `z-ai/glm-4.7-flash` | Fast, cheap GLM | very cheap |
| Gemini 3.1 Flash Lite | `google/gemini-3.1-flash-lite` | Cheapest Google model | very cheap |
| Step 3.7 Flash | `stepfun/step-3.7-flash` | Fast Chinese model | very cheap |

### 12.2 Role-to-Model Recommendations

| Role | Tier | Best Pick | Budget Pick | Why |
|------|------|-----------|-------------|-----|
| research | Execution | `moonshotai/kimi-k3` | `deepseek/deepseek-v4-flash` | Synthesis task. Kimi K3 has 1M context for long intake docs. V4 Flash is 35x cheaper than frontier. |
| strategy | Execution | `z-ai/glm-5.2` | `z-ai/glm-5-turbo` | Structural output (copy spine). GLM-5.2 is strong on agentic tasks. GLM-5-turbo already proven here. |
| director | Taste | `anthropic/claude-opus-4.8` | `anthropic/claude-sonnet-5` | Sets 5 dials + signature moment. Wrong direction costs a site. Sonnet 5 is close to Opus at 40% cost. |
| copy | Taste | `moonshotai/kimi-k3` or `deepseek/deepseek-v4-pro` | `anthropic/claude-sonnet-5` | Strongest writer. Kimi K3 leads on frontend/code quality. V4 Pro matches Opus on SWE-bench at fraction of cost. |
| copygate | Skeptic | `deepseek/deepseek-v4-flash` | `z-ai/glm-4.7-flash` | Must be DIFFERENT model than copy. Auditing, not creating. Cheap is fine. |
| build | Execution | `deepseek/deepseek-v4-pro` or `z-ai/glm-5.2` | `anthropic/claude-sonnet-5` | Reads 12 files, writes HTML. Needs strong code gen + file tools. V4 Pro: 80.6% SWE-bench. |

### 12.3 Example Full-Hermes Configs

**Config A: Best value (open-weight models, lowest cost per build):**
```json
{
  "roles": {
    "research":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-v4-flash", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "strategy":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "z-ai/glm-5-turbo", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 20 },
    "director":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "anthropic/claude-sonnet-5", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copy":      { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "moonshotai/kimi-k3", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copygate":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-v4-flash", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 15 },
    "build":     { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-v4-pro", "--provider", "openrouter", "-t", "file"], "io": "tools", "parse": "raw", "timeoutMin": 40 }
  }
}
```

**Config B: Maximum quality (frontier models, higher cost):**
```json
{
  "roles": {
    "research":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "moonshotai/kimi-k3", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "strategy":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "z-ai/glm-5.2", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 20 },
    "director":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "anthropic/claude-opus-4.8", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copy":      { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "deepseek/deepseek-v4-pro", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copygate":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "moonshotai/kimi-k3", "--provider", "openrouter"], "io": "stdout", "parse": "raw", "timeoutMin": 15 },
    "build":     { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "z-ai/glm-5.2", "--provider", "openrouter", "-t", "file"], "io": "tools", "parse": "raw", "timeoutMin": 40 }
  }
}
```

**Config C: Proven (models already tested in this factory):**
```json
{
  "roles": {
    "research":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "strategy":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"], "io": "stdout", "parse": "raw", "timeoutMin": 20 },
    "director":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copy":      { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"], "io": "stdout", "parse": "raw", "timeoutMin": 30 },
    "copygate":  { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo"], "io": "stdout", "parse": "raw", "timeoutMin": 15 },
    "build":     { "cmd": "hermes", "args": ["chat", "-Q", "-q", "{PROMPT}", "-m", "glm-5-turbo", "-t", "hermes-cli", "--accept-hooks"], "io": "tools", "parse": "raw", "timeoutMin": 40 },
    "fallbacks": ["hermes-default"]
  }
}
```

### 12.4 Model Slugs Quick Reference (all verified on OpenRouter, July 2026)

| Model | `-m` slug |
|-------|-----------|
| Claude Opus 5 | `anthropic/claude-opus-5` |
| Claude Opus 5 Fast | `anthropic/claude-opus-5-fast` |
| Claude Fable 5 | `anthropic/claude-fable-5` |
| Claude Opus 4.8 | `anthropic/claude-opus-4.8` |
| Claude Opus 4.8 Fast | `anthropic/claude-opus-4.8-fast` |
| Claude Sonnet 5 | `anthropic/claude-sonnet-5` |
| Claude Sonnet 4.6 | `anthropic/claude-sonnet-4.6` |
| Claude Haiku 4.5 | `anthropic/claude-haiku-4.5` |
| Kimi K3 | `moonshotai/kimi-k3` |
| Kimi K2.7 Code | `moonshotai/kimi-k2.7-code` |
| Kimi K2.6 | `moonshotai/kimi-k2.6` |
| DeepSeek V4 Pro | `deepseek/deepseek-v4-pro` |
| DeepSeek V4 Flash | `deepseek/deepseek-v4-flash` |
| DeepSeek V3.2 | `deepseek/deepseek-v3.2` |
| GLM-5.2 | `z-ai/glm-5.2` |
| GLM-5.1 | `z-ai/glm-5.1` |
| GLM-5-turbo | `z-ai/glm-5-turbo` |
| GLM-5v-turbo | `z-ai/glm-5v-turbo` |
| GLM-4.7 Flash | `z-ai/glm-4.7-flash` |
| Qwen 3.7 Max | `qwen/qwen3.7-max` |
| Qwen 3.7 Plus | `qwen/qwen3.7-plus` |
| Gemini 3.5 Flash | `google/gemini-3.5-flash` |
| Gemini 3.1 Pro | `google/gemini-3.1-pro-preview` |
| Gemini 3.1 Flash Lite | `google/gemini-3.1-flash-lite` |
| Step 3.7 Flash | `stepfun/step-3.7-flash` |
| MiniMax M3 | `minimax/minimax-m3` |
| GPT-5.4 | `openai/gpt-5.4` |
| GPT-5.4 Pro | `openai/gpt-5.4-pro` |
| Grok 4.5 | `x-ai/grok-4.5` |

---

## 13. How to Run a New Client

### Step 1: Create the intake
Copy the intake template and fill it in:
```bash
cp templates/_base/INTAKE.md projects/<client>/INTAKE.md
# Edit projects/<client>/INTAKE.md with client details:
# palette, fonts (or "pick for region"), ICP + pains, client details,
# real assets, visual world, signature-motif idea, proof inventory
```

### Step 2: (Optional) Run deep research
For higher-tier clients, run the ICP Deep Research Pack:
```bash
python3 runner/run.py projects/<client>/INTAKE.md --outdir projects/<client>/research/
```
This produces `BLACK_BOOK.md` with verified VOC, belief maps, and belief-change order. Cost: ~$1-3 on cheap APIs.

### Step 3: (Optional) Run a founder interview
For the highest-authority VOC source:
```bash
# Use templates/_base/INTERVIEW.md as the guide
# Save transcript to: projects/<client>/research/INTERVIEW_TRANSCRIPT.md
```

### Step 4: Configure models
Edit `factory.config.json` to set the desired models for each role. See Section 12 for recommendations.

### Step 5: Run the pipeline
```bash
node factory.js print <client>
```

The pipeline will:
1. Run research (stage 1)
2. Run strategy (stage 2)
3. Run direction (stage 3) and **pause at the direction gate**
4. Wait for approval: `node factory.js approve <client> direction`
5. Run copy (stage 4)
6. Run copygate (stage 5) - halts if VERDICT: REPAIR
7. Run build (stage 6)
8. Run gauntlet (stage 7) - the QA loop
9. **Pause at the ship gate**
10. Wait for approval: `node factory.js approve <client> ship`

### Step 6: Check status anytime
```bash
node factory.js status <client>
```

### Step 7: After shipping
- Deploy per `docs/CLIENT-OPS.md`
- Register the build vector in `docs/BUILD_REGISTRY.md`
- HARVEST: mine the build for new patterns (-> catalog), defects (-> LEDGER), episode (-> FACTORY_LEARNING)

---

## 14. How to Audition a New Model

Before promoting any model into a live role, run it through the model-bench.

### Step 1: Run the audition
```bash
node factory.js audition <alternate-name>
```
This runs the candidate through `benchmarks/model-bench/packet.txt` (a one-paste build test) and saves the output to `benchmarks/model-bench/runs/candidate-<name>.html`.

### Step 2: Score it through the gauntlet
```bash
node qa/run-pipeline.js benchmarks/model-bench/runs/candidate-<name>.html
```
Exit 0 = PASS, exit 1 = ESCALATE/FAIL.

### Step 3: Log the verdict
Record the result in:
- `benchmarks/model-bench/README.md` (the leaderboard)
- `docs/BUILD_REGISTRY.md`

### Step 4: Promote if it passes
If the model clears the gauntlet, copy its alternate config over the desired role in `factory.config.json`.

**The bench is the hiring authority.** No model enters a live role until it passes the packet or a copy-gate/gauntlet-audited trial run.

---

## 15. Prerequisites

| Requirement | Why | Check |
|-------------|-----|-------|
| **Hermes v0.19.0+** | Headless mode (`-Q -q`) and toolsets (`-t hermes-cli`) | `hermes --version` |
| **Node.js** | `factory.js` and `qa/run-pipeline.js` are Node scripts | `node --version` |
| **Chrome/Chromium** | `qa/run-checks.js` drives headless Chrome via DevTools Protocol | `which chrome` or check `C:\Program Files\Google\Chrome\Application\chrome.exe` |
| **At least one API key** | For the model CLIs. OpenRouter recommended (gives access to many models via Hermes) | `hermes config` or check provider dashboards |
| **Claude CLI** (optional) | If using Claude models directly (not through Hermes) | `claude --version` |
| **Python 3** (optional) | For deep research runner (`runner/run.py`) and asset injection (`build.py`) | `python3 --version` |

### API Key Setup with OpenRouter

The most cost-effective approach: use OpenRouter as a single API key that gives access to DeepSeek, Haiku, Sonnet, Opus, GLM, Gemini, and more. Configure it in Hermes:

```bash
hermes config set providers.openrouter.apiKey "sk-or-..."
```

Then use OpenRouter model IDs in the `-m` flag:
- `deepseek/deepseek-chat-v3-0324`
- `anthropic/claude-3.5-haiku`
- `anthropic/claude-sonnet-4`
- `google/gemini-2.5-pro`

---

## Quick Reference Card

```
# Run a client pipeline
node factory.js print <client>

# Approve a gate
node factory.js approve <client> direction
node factory.js approve <client> ship

# Check status
node factory.js status <client>

# Dry run (show plan, don't execute)
node factory.js print <client> --dry-run

# Run the QA gauntlet standalone
node qa/run-pipeline.js <build.html> --accent '#C9A24B'

# Audition a model
node factory.js audition hermes-glm

# Score an audition
node qa/run-pipeline.js benchmarks/model-bench/runs/candidate-<name>.html

# Check what's in the config
cat factory.config.json
```
