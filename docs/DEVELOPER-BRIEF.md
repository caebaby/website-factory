# Developer Brief — Website Factory
*Written 2026-07-08 for the incoming developer. Read this, then PROCESS.md, then STATUS.md's
top blocks. That's the whole onboarding — everything else is reference.*

## What this is (60 seconds)

Chris runs Advisor Growth Lab: outbound marketing that recruits financial advisors, backed by a
proprietary data platform (~725K U.S. advisors from public filings, in the separate
`agent-flows` repo). This repo is the **website factory**: an agent pipeline that turns a client
intake into a $25–50K-quality, conversion-built, single-file website — with the ambition of
near-zero human minutes per site. Websites are the conversion surface for the campaigns; the
factory generalizes to any client AGL serves.

**The core thesis (proven this week):** quality lives in the system, not the model. We gave the
same doc packet to claude-sonnet-5 and fugu-ultra cold — both one-shot to ~85% of the
hand-built gold standard, with near-disjoint failure modes (see `benchmarks/model-bench/`).
The remaining 15% is what the QA repair loop closes mechanically.

## Current state

- **Proven:** gold build (`projects/agl/v9/agl-site.html`, live at caebaby.github.io/agl-site-preview),
  deterministic pixel/geometry gate (`qa/run-checks.js` — zero-dependency, drives system Chrome),
  defect ledger with 17 entries each backed by a permanent check or rule, 71-entry component
  library in an anti-stamp format (INVARIANT/VARY/NEVER-PORT per entry), blessed palette
  library, cross-model benchmark harness.
- **Queued (STATUS.md "FINISH LINE"):** three new deterministic checks (LED-014..016),
  `run-pipeline` (the headless render→inspect→critique→repair→re-verify loop) **with per-build
  metrics from day one**, the bench wired as a regression gate, then AGL rebuilt through the
  pipeline as pilot client #1.

## Where YOU come in: tokens

This is not post-hoc optimization — it's PROCESS.md **law 10**, a founding constraint: the
product is top-1% quality at the lowest token cost that clears the gates. Chris's directive.
You co-own that law. Your mission: **drive tokens-per-shipped-PASS-build down without moving
bench scores.** The regression gate makes this safe — any efficiency change that drops a
golden build's scores gets reverted, so you can be aggressive.

Known hotspots, in expected order of yield:

1. **Repair scope.** A full re-print is ~80KB of output; a scoped repair should be ~2–5KB.
   Repairs must patch failing selectors only (additive CSS preferred). Enforcing/verifying
   this is probably the single biggest win.
2. **Context loading per agent.** Each pipeline stage currently reads whole docs. The Director's
   BUILD BRIEF exists precisely so executors read ONE artifact — audit what each agent actually
   loads and cut everything else (STATUS's "Cherny audit" plans a usage-driven doc consolidation;
   your instrumentation feeds it).
3. **Model tiering.** Executor-tier policy: best design model only for design-critical scopes;
   mechanical scopes (repairs, retints, checks) run on cheaper tiers. The deterministic gate is
   free — always run it before any LLM critic spends tokens.
4. **The asset-token contract** (`[[TOKEN]]` placeholders + `build.py` injection) already keeps
   ~700KB of base64 out of every context — protect this pattern in anything you build.
5. **Catalog delivery.** Executors must never receive raw catalog HTML (61KB+) — they get the
   invariant blocks for their selected patterns from the brief. Worth verifying this is airtight.

Metrics contract (lands with run-pipeline): per build log to `docs/BUILD_REGISTRY.md` —
repair iterations, tokens by stage, wall-clock, human touches. What gets measured gets cut.

## Rules of engagement (non-negotiable, learned expensively)

- Feature branches only; Chris merges on explicit word.
- No builder self-verification — fresh agent (or you) for every verify. LED-001 exists because
  a builder shipped an invisible hero while reporting "verified."
- Every defect you catch → `qa/LEDGER.md` entry → a permanent check or rule. No exceptions;
  this is how the system compounds.
- Clean re-prints, never elevation passes on finished pages (LED-013).
- Bench scores are the quality contract: efficiency wins that lower them didn't happen.

## Run things

- Gate: `node qa/run-checks.js <file.html> '<accent-hex>'` (exits 0/1 on P0 count)
- Catalog: `python3 -m http.server 4580` in repo root → /templates/components/catalog.html
- Bench: `benchmarks/model-bench/README.md` (packet.txt = one-paste cross-model test;
  build.py injects assets into candidate outputs)
- Bench candidates for testing checks/repairs: `benchmarks/model-bench/runs/`

## Who's who

Chris — owner, taste authority, merges. Johnny — pre-deploy gate. The agents (00 Director,
01 Research, 02 Strategy, 03 Copy, 04 Build, 05 QA) — prompt files in `agents/`, they do the
production work; you're building/tuning the machine they run in.
