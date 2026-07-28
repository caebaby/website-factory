## Check 1 — Citation audit (the fabrication test)

**Note:** The provided `CODE CITATION AUDIT` results are used as ground truth. `UNVERIFIABLE` is treated as `NOT FOUND` for the purpose of the automatic FAIL rule, as the quote cannot be confirmed to exist at the URL.

| L-id | URL live? | quote found verbatim? | verdict |
|---|---|---|---|
| L-11 | live | UNVERIFIABLE (bot-walled page, no content served) | NOT FOUND |
| L-02 | live | NOT FOUND | NOT FOUND |
| L-16 | live | VERBATIM | OK |
| L-12 | live | UNVERIFIABLE (bot-walled page, no content served) | NOT FOUND |
| L-17 | live | UNVERIFIABLE (bot-walled page, no content served) | NOT FOUND |
| L-26 | live | NOT FOUND | NOT FOUND |
| L-05 | live | NOT FOUND | NOT FOUND |
| L-01 | live | VERBATIM | OK |
| L-29 | live | NOT FOUND | NOT FOUND |
| L-10 | live | VERBATIM | OK |

**Verdict on Check 1:** **AUTOMATIC FAIL** due to multiple `NOT FOUND` and `UNVERIFIABLE` citations (L-11, L-02, L-12, L-17, L-26, L-05, L-29).

## Check 2 — Unsupported-claim sweep

- **Section 1 (Executive Summary):**
    - "Continuum Planning Partners (CPP) serves married, family-oriented business owners and executives who value charitable giving and seek a 'living legacy' through prudent financial decisions."
    - "Their core desire is for a trusted partner who relates to them as a fellow business owner, simplifies their complexity, and helps them build a legacy defined by their values, not just their assets."
    - "Awareness is high—they know what they don't want (yachts, status signaling) but are unsure how to articulate what they do."
    - "Sophistication is moderate; they understand the need for bespoke solutions but are blocked by distrust of advisor motives."
    - "The #1 leverage point is reframing legacy as 'Preparing for the Future While Living in the Present' [L-33], making planning feel immediate and values-driven rather than abstract and death-focused." (The claim of it being the "#1 leverage point" is unsupported).

- **Section 2 (Awareness & Sophistication):**
    - **Sophistication Axis:** The entire paragraph describing "MODERATE" sophistication lacks any ledger IDs.

- **Section 4 (Contradictions & Leverage Points):**
    - "CPP's equity model is a perfect proof point for this." (Referring to Leverage Point 1)
    - "Use the 'Transfer of Trust' narrative."
    - "This speaks directly to the ICP's desire to build a lasting legacy by ensuring the right partner (not just the original advisor) serves their family long-term." (Referring to Leverage Point 4)

- **Section 5 (Belief-Change Architecture):**
    - **Framing Ratio:** "Focus on their identity as a business owner, family leader, and philanthropist. Frame the problem as complexity and time poverty, not just a lack of money."
    - **Framing Ratio:** "Use evidence of their specific pains (e.g., '73% of HNW have not received formal philanthropic guidance' [L-24]) and CPP's unique structure (equity model, team of partners) as proof that the solution is different." (The claim about "CPP's unique structure (equity model, team of partners)" is unsupported).

## Check 3 — Axis calls

**Awareness Axis:** The call for "HIGH" awareness is plausible, as the ICP is described as having experienced specific frustrations (rejection, ghosting, complicated financial picture). However, the evidence for "acutely aware" and "actively seeking a solution" is weakened by the `UNVERIFIABLE` status of L-11 (cited 10x) which supports "rejection" and "ghosting." While L-13 (complicated financial picture) is verified, the overall strength of the evidence for *high* awareness, beyond just problem recognition, is somewhat thin without stronger, verifiable quotes. A call of "Moderate-High" might fit better given the lack of verified evidence for active solution-seeking.

**Sophistication Axis:** The call for "MODERATE" sophistication is asserted without any supporting ledger entries. This makes it an unsupported claim. While the description of understanding the existence of problems but lacking a framework for solutions seems reasonable, there is no evidence from the VOC to back this specific level of sophistication or the nuances described (e.g., knowing a standard plan won't work, not grasping holistic components). Without citations, this axis call is speculative.

## Check 4 — Bridge integrity

- **Bridge 1 (Problem to Solution):**
    - (a) CURRENT belief truly evidenced? Yes, L-18 ("Siloed Wealth Data Across Platforms... fragmented decision-making") directly supports "My financial life is a complicated mess of siloed parts."
    - (b) Relies only on allowed levers? Yes, it uses "reframe" (from problem to solution) and "mechanism" (holistic planning).
    - (c) Required seller evidence assumed? No, the "To" belief is the desired outcome, not assumed seller evidence.

- **Bridge 2 (Distrust to Trust):**
    - (a) CURRENT belief truly evidenced? Yes, L-08 ("adviser who is just selling a product or selling just an investment") directly supports "Advisors are just selling products."
    - (b) Relies only on allowed levers? Yes, it uses "proof" (transparency of fee-based model) and "mechanism" (fee-based alignment). The justification mentions L-17 ("Show me, in writing what I will pay in fees—all in"), which is `UNVERIFIABLE`, weakening the *evidence* for the VOC's demand for transparency, but the *lever* itself is allowed.
    - (c) Required seller evidence assumed? Yes, the "To" belief ("A fee-based partner is aligned with your outcomes, not commissions") implies CPP operates this way. This is appropriately flagged in Section 7 as "EVIDENCE REQUIRED FROM SELLER: Transparency on fee structure."

- **Bridge 3 (Legacy as Death to Legacy as Life):**
    - (a) CURRENT belief truly evidenced? Yes, L-35 ("You write wills, you select the executor and explain what is meant to happen... paperwork is located for insurance policies, retirement accounts...") directly supports "Legacy planning is about getting your affairs in order for when you're gone."
    - (b) Relies only on allowed levers? Yes, it uses "reframe" (from death to life/impact) and leverages the ICP's "charitable identity."
    - (c) Required seller evidence assumed? No, the "To" belief is the desired reframe, not assumed seller evidence.

## Check 5 — Rubric (score 1–5 each, one line of justification)

| Dimension | Score | Justification |
|---|---|---|
| Evidence density | 2 | Numerous critical claims lack citations, and a significant portion of cited evidence is `NOT FOUND` or `UNVERIFIABLE`. |
| VOC authenticity | 3 | While the VOC sections are well-structured and many verbatim quotes are present, the high number of failed citations undermines the authenticity of the overall evidence base. |
| Gap honesty | 5 | Excellent identification and categorization of `NO DATA`, `THIN`, and `DRY LANE` areas, demonstrating thorough self-awareness. |
| Internal consistency | 4 | Beliefs, axes, and bridges generally align, but the Sophistication Axis lacks internal evidence to support its call. |
| Actionability | 4 | Provides clear strategic direction and a strong framework, but the extensive repair list for citations and unsupported claims will require significant rework before full actionability. |

## Verdict

VERDICT: **FAIL**
RUBRIC TOTAL: 18/25 (FAIL requires ≥20 AND zero NOT FOUND citations AND zero banned-lever bridges)

**REPAIR LIST:**

R-1: **Address all `NOT FOUND` / `UNVERIFIABLE` citations:**
    - **L-02:** "A true financial partner acts as a fellow business owner, not just an agent." (Cited 9x) - Find a new, verifiable source for this core belief.
    - **L-11:** "rejection," "prospects ghosting after a few meetings." (Cited 10x) - Find new, verifiable sources for these critical pain points.
    - **L-12:** "Wealth managers are just 'cost centers,' not strategic partners." (Cited 6x) - Find a new, verifiable source for this problem belief.
    - **L-17:** "Financial advice is just selling products or investments." (Cited 6x) - Find a new, verifiable source for this critical problem belief and the VOC demand for transparency.
    - **L-26:** "Charitable giving and legacy planning are about living your values now." (Cited 1x) - Find a new, verifiable source for this solution belief.
    - **L-05:** "screwed up." (Cited 1x) - Find a new, verifiable source for this pain point.
    - **L-29:** "donors should be clear on the nature of their needs and their priorities." (Cited 2x) - Find a new, verifiable source for this desire.

R-2: **Add citations for unsupported claims in Section 1 (Executive Summary):**
    - "Continuum Planning Partners (CPP) serves married, family-oriented business owners and executives who value charitable giving and seek a 'living legacy' through prudent financial decisions." - Add L-IDs or mark as `HYPOTHESIS:`.
    - "Their core desire is for a trusted partner who relates to them as a fellow business owner, simplifies their complexity, and helps them build a legacy defined by their values, not just their assets." - Add L-IDs or mark as `HYPOTHESIS:`.
    - "Awareness is high—they know what they don't want (yachts, status signaling) but are unsure how to articulate what they do." - Add L-IDs or mark as `HYPOTHESIS:`.
    - "Sophistication is moderate; they understand the need for bespoke solutions but are blocked by distrust of advisor motives." - Add L-IDs or mark as `HYPOTHESIS:`.
    - The claim that "reframing legacy as 'Preparing for the Future While Living in the Present' [L-33]" is the "#1 leverage point" needs a citation or `HYPOTHESIS:`.

R-3: **Add citations for the entire "Sophistication Axis" paragraph in Section 2.** The description of "MODERATE" sophistication is currently entirely unsupported.

R-4: **Add citations for unsupported claims in Section 4 (Contradictions & Leverage Points):**
    - "CPP's equity model is a perfect proof point for this." - Add L-ID or mark as `EVIDENCE REQUIRED FROM SELLER:`.
    - "Use the 'Transfer of Trust' narrative." and its subsequent explanation - Add L-ID or mark as `HYPOTHESIS:`.

R-5: **Add citations for unsupported claims in Section 5.3 (Framing Ratio):**
    - "Focus on their identity as a business owner, family leader, and philanthropist. Frame the problem as complexity and time poverty, not just a lack of money." - Add L-IDs or mark as `HYPOTHESIS:`.
    - "CPP's unique structure (equity model, team of partners) as proof that the solution is different." - Add L-ID or mark as `EVIDENCE REQUIRED FROM SELLER:`.