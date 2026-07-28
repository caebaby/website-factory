# Copy Gate — Verdant — 2026-07-28

## Blocking findings

1. **[File integrity / all checks] `copy/COPY_ALL.md` is not a valid copy document — it is corrupted with diff/log artifacts and truncated mid-document.** The file as written to disk (104 lines) opens with a `┊ review diff` / unified-diff header, contains real copy only through Nav → Hero → Pain → partial "Who We Serve" → the eyebrow of "Fit Assessment," then cuts to a literal placeholder line — `… omitted 185 diff line(s) across 1 additional file(s)/section(s)` — followed by Agent 03's own chat meta-commentary ("Done. `copy/COPY_ALL.md` written and committed.", a self-graded bullet list, "Ready for Agent 04..."). Per the COPY SPINE this file must contain 9 sections (Hero, Pain, ICP, Fit, Services, Process, Proof, Final CTA, Insights) plus a Traceability Appendix. Sections 4–9 and the appendix are *claimed* to exist by the trailing commentary but are **not present in the file**. This is the same failure class already logged in this repo's history (provider/log text captured as the copy file instead of the real output — see `fix(factory): catch provider error strings as failures`). Fix: re-run the write step so the actual rendered document (all 9 sections + appendix) lands in `copy/COPY_ALL.md`, not a diff transcript with a self-summary appended.

2. **[Traceability] `research/ICP_BRIEF.md` contains no VOC ledger — it is a 5-line meta-summary of what was supposedly written, not the ledger itself.** COPY_STRATEGY.md's spine cites specific rows (VOC-01, 03, 05, 06, 07, 08, 09, 10, 11, 12) and COPY_ALL.md's own summary claims "every VOC row mapped." None of VOC-01 through VOC-17 actually appear in the file provided — only a paragraph saying a 17-row ledger split into `[INTAKE-SEED]`/`[MARKET]` exists. Traceability cannot be audited — I cannot compare cited-row meaning against source language when the source rows aren't in the file. Fix: regenerate `ICP_BRIEF.md` with the full VOC ledger table (all 17 rows, tags, and source), not a description of it.

3. **[Cascading] Checks 1, 3, 4, and 5 cannot be completed for ~60% of the page.** Because of #1, sections ICP (back half), Fit, Services, Process, Proof, Final CTA, Insights, and the Traceability Appendix are unreadable/absent. I can only audit Nav, Hero, Pain, and the first half of "Who We Serve" below. Re-submit once #1 and #2 are fixed — this gate cannot pass a document it cannot see.

4. **[Fact discipline — on the visible portion] Unsourced quantitative claim in the Hero proof strip.** "40+ sustainable brands transformed" is stated as fact with no citation to INTAKE/research and no `[VERIFY]` tag, sitting directly next to `[VERIFY: Years in business]` in the same proof strip — inconsistent treatment of unverified claims. Fix: either trace this number to INTAKE/portfolio data or tag it `[VERIFY: number of brands transformed]`.

## Advisory findings

- "Climate credibility specialists" and "Conversion-design focused" (Hero proof strip) are self-declared authority claims with no proof bound — borderline unbound-superlative territory (Check 3). Not blocking alone, but should get a proof anchor once the Proof/Portfolio section is actually visible.
- "We specialize in founders who've built something real." (Who We Serve H2) reads generic — could run on most B2B service sites unchanged. Only one instance found in the visible portion, below the >2 threshold, so advisory only. Re-check once the rest of the page is visible, since additional interchangeable headlines in the missing sections would tip this to blocking.
- Awareness match on the visible portion is reasonable: Hero H1 + subhead together do name the problem ("brand looks generic") before pitching the solution, consistent with the spine's problem-aware lead for Hero. Cannot confirm for downstream solution-aware sections since they're missing.
- The 78% Deloitte-attributed stat (Pain section, point 2) is plausible against COPY_STRATEGY's "Proof That Moves This ICP" note, but cannot be confirmed as sourced since the VOC ledger it should trace to (finding #2) isn't in the file.

## [VERIFY] register

| # | Claim | Where | What the client must supply |
|---|-------|-------|------------------------------|
| 1 | Years in business | Hero proof strip (explicitly tagged `[VERIFY: Years in business]`) | Actual founding/years-operating figure |
| 2 | "40+ sustainable brands transformed" | Hero proof strip (currently untagged — should be `[VERIFY]` per finding #4) | Actual client/project count, or source if from portfolio records |
| 3 | "78% of conscious consumers say brand design influences their trust in climate claims" | Pain section, point 2 | Confirm Deloitte citation exists in the actual VOC ledger (currently unverifiable — see finding #2) and link/footnote it |

VERDICT: REPAIR
