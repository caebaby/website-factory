# Outbound Arrival Strategy — How the AGL Home Page Should Work for Cold-Email Traffic
Date: 2026-07-09 · Researcher: conversion-strategy agent
Inputs: `INTAKE.md`, `research/ICP_BRIEF.md`, `handoff/index.html` (v9 gold), web research (cited inline).

**Premise:** nearly all near-term traffic clicks through from AGL's cold outbound email. The
visitor is an experienced advisor who (a) knows they were "found" on a list, (b) is in ambient
recruiter fatigue, and (c) fact-checks for a living. This changes what the first screen must do.

**Evidence honesty note:** most landing-page "best practice" is practitioner consensus, not
controlled studies. Where a claim below is consensus rather than measured data, it's framed
that way. No invented stats; the only numbers used are from named sources.

---

## 1. The Outbound-Arrival Trust Sequence

What a cold-email clicker needs, in order, on the first screen and immediately below it.
Two research facts frame everything:

- **Cold-email clickers arrive in VERIFY mode, not browse mode.** Multiple 2025–26 cold-email
  benchmark reports (Woodpecker, SmartLead, Martal) converge on the same behavioral shift:
  prospects research the sender — Google, LinkedIn, the website — before replying, and the
  reply is often conditional on what they find. The page's first job is to survive diligence,
  not to sell. ([Woodpecker cold email statistics](https://woodpecker.co/blog/cold-email-statistics/),
  [Martal B2B cold email statistics 2026](https://martal.ca/b2b-cold-email-statistics-lb/))
- **Believability beats warmth.** AiSDR's outbound trust-gap analysis: the prospect's first
  question isn't "is this relevant?" but "is this realistic?" — "Format doesn't build trust.
  Believability does." Claims that feel too broad, inflated, or convenient kill the reply.
  Your "digital footprint, track record, clarity, and consistency all influence whether a
  prospect is willing to take you seriously." ([AiSDR](https://aisdr.com/blog/outbound-trust-gap/))

The sequence:

**Step 1 — Confirm the thread (message match).** The page must visibly continue the email that
brought them. If the email said "readiness read from the public record," those words appear in
the hero — not a rebranded generic promise. Message match is the classic Unbounce doctrine
(mismatch between what the click promised and what the page delivers is "one of the most
destructive conversion killers"; consistent "information scent" across channels tells the
visitor they're on the right track), and SalesHive's 2025 outbound-landing-page guide makes it
outbound-specific: the email's offer phrase "should appear verbatim in the hero headline and
again near the CTA." ([Unbounce: message match](https://unbounce.com/conversion-glossary/definition/message-match/),
[Unbounce: information scent](https://unbounce.com/conversion-glossary/definition/information-scent/),
[SalesHive](https://saleshive.com/blog/b2b-designing-landing-pages-email-campaigns-2025-guide/))
**[VERIFY: email copy — congruence is only checkable against the actual sequences.]**

**Step 2 — Answer "who are you and are you real?" within one screen.** The verify-mode visitor
scans for: a real entity, a real human, real footing for the claims. For THIS ICP the footing
is the public-record mechanism (SEC/FINRA/BrokerCheck, ~725K registrations) — this audience
"verifies claims for a living" and public-record citation is a validated trust signal
(ICP_BRIEF, Trust Signals That Work). Nothing may be locked behind an interaction — a
verifier who can't scan bounces.

**Step 3 — Answer "how did you find me?" before they ask it.** The outbound visitor knows they
were found. Naming the mechanism plainly is both a compliance norm (senders must "explain
exactly how you obtained their email address" — a GDPR requirement that reads as best practice
everywhere: [ComplyDog](https://complydog.com/blog/gdpr-compliant-cold-emails)) and a
personalization-research finding: publicly available professional data reads as relevant;
opaque sourcing reads as creepy ([Mailtrap](https://mailtrap.io/blog/cold-email-personalization/),
[Superhuman Prospecting](https://superhumanprospecting.com/personalized-outreach-customizing-messages-for-b2b-buyers/)).
AGL has a structural advantage no competitor has: the answer to "how did you find me?" IS the
product. "You're in the public record — so is every move in your industry" converts the
category's most awkward moment into the pitch itself.

**Step 4 — Disclose the conflict before they hunt for it.** The category's original sin is a
hidden stake (ICP_BRIEF: "discovery of a hidden stake is fatal"; disclosed conflicts convert
"a landmine into a trust signal"). For search traffic, a footer disclosure suffices. For a
visitor who arrived suspicious that this is "another recruiter in disguise," the Axiom
disclosure and the "0 names sold" promise must be reachable within the first scroll or two,
not buried at the bottom of the page.

**Step 5 — Offer a private, low-commitment next step first.** Cold-arrival visitors are
problem/solution-aware, not product-aware (Schwartz stages consensus: "the headline that
converts a ready-to-buy prospect will bounce a cold one" —
[Rob Palmer on Breakthrough Advertising](https://robpalmer.com/blog/eugene-schwartz-breakthrough-advertising-lessons),
[Game of Conversions](https://gameofconversions.com/customer-awareness-stages/)). Practitioner
consensus for cold traffic: diagnostic/assessment CTAs outperform "book a call" because they
"feel like help, not a sales pitch" and carry zero exposure
([Landingi CTA playbook](https://landingi.com/blog/cta-on-landing-pages-playbook-examples/),
[Cortes.design on traffic temperature](https://www.cortes.design/post/optimizing-for-traffic-temperature-in-saas-landing-pages) —
cold traffic needs lower-commitment paths; SalesHive: "a diagnostic or 'here's what you'll
learn' benchmark converts better than vague 'Contact us'"). For this ICP specifically, the
private-first-step demand is behaviorally proven (throwaway-account research; FA Match's
no-sign-up "Test Drive"; 3xEquity's anonymity-first positioning — ICP_BRIEF). And the r/CFP
record shows the mode-switch AGL must engineer: advisors default-ignore automated recruiter
outreach but engage once it turns personal — "Most ignore recruiters because they're mostly
auto messages with an external CRM. Once you respond and engage, the conversation becomes
personal." (r/CFP via pullpush, /r/CFP/comments/13gveub/…/jk6tks4/; see also
/r/CFP/comments/1f64ov1/…/lkze5uw/ "happy I've been ignoring [recruiter messages]").
**So: assessment = primary CTA for outbound arrivals; call = visible secondary.** The call
stays present because a minority of outbound clickers are already in motion (firm just sold,
retention deadline) and direct-booking them loses nothing.

Summary of the sequence: **(1) you're in the right place → (2) we're real, here's our footing →
(3) here's exactly how we found you → (4) here's who pays us → (5) here's a step you can take
without anyone knowing.**

---

## 2. Verdict on the Gated "Are you a financial advisor?" Hero

**Verdict: MODIFY — keep the question as theater, remove the lock.** (For a dedicated
outbound arrival variant: REPLACE, see §3.)

What the current hero does: `html.gated` hides the entire page (`html.gated .pg{display:none}`)
until the visitor clicks Yes; "No" gets a polite dismissal. The sub copy ("every recruiter who
calls one has a stake in the answer… this is the other room") is excellent and stays.

Why the gate works for ORGANIC traffic:
- Self-segmentation questions are legitimate practice for mixed audiences, and a disqualifying
  first question can improve lead quality ([Landerlab](https://landerlab.io/blog/best-landing-page-examples)).
- "Yes" is a micro-commitment (consistency principle) and dramatizes the exclusivity/privacy
  positioning.

Why it fails for OUTBOUND traffic:
1. **It asks a question the email already answered.** AGL emailed this person BECAUSE their
   public record says they're an advisor. Asking "are you a financial advisor?" breaks the
   conversational thread the email opened — the opposite of message match (Unbounce; SalesHive
   "verbatim continuity"). To a sharp reader it signals either (a) the sender doesn't know who
   they emailed (undermines the entire intelligence positioning) or (b) it's a funnel mechanic
   — and "anything that smells like a funnel" is #1 on the ICP's backfire list (ICP_BRIEF).
2. **It blocks the verifier.** The outbound clicker is doing diligence (benchmark-report
   consensus above). The gate hides every proof element — movement data, disclosure, guide —
   behind a click. A skeptical scanner who can't scan leaves. Zero qualification value is
   gained: outbound traffic is 100% pre-qualified by construction.
3. **It adds friction exactly where cold traffic tolerates least.** Friction reduction is the
   most robust finding in the space (forms: 3 fields ≈ highest conversion, ≤5 fields convert
   ~120% better than ≥10 — HubSpot research via
   [SaaS Hero](https://www.saashero.net/design/b2b-saas-landing-cta-practices/)); an interstitial
   Yes/No before ANY content is a friction pattern with no cold-traffic evidence behind it.

The MODIFY spec (v9-compatible, one page serves both traffic types):
- Keep the H1 question and Yes/No buttons as the hero — the identity-flag opener is distinctive
  and the sub copy justifies the question ("because every recruiter who calls one has a stake
  in the answer" reframes it from qualification to thesis).
- **Un-gate the page.** Remove `html.gated .pg{display:none}` behavior: content is scrollable
  immediately. "Yes" becomes an accelerator (smooth-scroll to assessment or reveal the
  assessment CTA pair); "No" keeps its current polite copy inline. Scroll = implicit yes.
- Result: organic visitors keep the theater; outbound verifiers can scan; nobody is locked out.

---

## 3. Three Hero Directions for the Outbound Arrival

Assumption for all three: visitor just clicked a cold email from AGL. All three keep the v9
design shell (chip, H1, sub, CTA pair) — copy only. Primary CTA = assessment (private,
3-min); secondary = private call. Each needs the email sequences in hand before shipping:
**[VERIFY: email copy — no outbound emails exist in the project yet (checked `copy/`,
`strategy/`); every headline below must echo the sequence's actual promise verbatim].**

### Direction A — Close the email loop ("you're here because…") — RECOMMENDED
The transparency play. Answers "how did you find me?" in the headline and converts it into
the product demo.

> **Chip:** Confidential · You opted into nothing yet — this page just answers the email
> **H1:** We found you in the public record. **So is every move in your industry.**
> **Sub:** That email wasn't a list buy. Your firm, tenure, and registrations are public —
> SEC, FINRA, BrokerCheck — and we read that record on all 725,000 U.S. registrations. If
> [VERIFY: email copy — the trigger the email cites, e.g., "your firm just changed hands"]
> put you on our radar, three minutes tells you what the same record says about your position.
> Nothing shared. No one notified.
> **CTA 1:** See what the record says about you · 3 min, private
> **CTA 2:** Book a private call
> *Congruence dependency: the email must actually name the public-record mechanism, or this
> hero over-explains. [VERIFY: email copy]*

Why recommended: it's the only direction no competitor can copy (the "how we found you" answer
IS the movement-intelligence product), it satisfies trust-sequence steps 2–3 in one screen,
and it's honest in a category whose original sin is hidden sourcing.

Risk to test: leading with "we found you" can read as surveillance to a confidentiality-anxious
ICP. The disarm is the immediate "public record / nothing private / no one notified" framing —
if replies to the emails show creep-out signals, fall back to Direction B. [VERIFY: email
reply sentiment once sequences run.]

### Direction B — Pain-led (recruiter-fatigue thesis)
Problem-aware headline per Schwartz consensus for cold audiences; uses the ICP's own validated
power line.

> **Chip:** Confidential · for advisors weighing a move
> **H1:** The biggest decision of your career is **running on sales pitches.**
> **Sub:** Every recruiter who calls has a stake in the answer — including the one whose email
> brought you here. The difference: our read comes from the public record on 725,000
> registrations, our conflict is disclosed on this page, and if the evidence says "stay,"
> that's the answer you'll get. Start where no one sees you: a 3-minute read of your position.
> **CTA 1:** See where you stand · 3 min, private
> **CTA 2:** Book a private call
> *"Including the one whose email brought you here" is the loop-closing line — it only lands
> if the email is plainly from AGL and pitch-shaped enough for the self-aware nod to feel
> earned. [VERIFY: email copy]*

Strength: deepest resonance with the ICP brief (recruiter fatigue is the ambient condition).
The self-implicating honesty ("including the one…") is a believability move per AiSDR's
"is this realistic?" finding.

### Direction C — Proof-led (movement data first)
For the deal-math skeptic who trusts numbers before narrative.

> **Chip:** Public record · SEC / FINRA / BrokerCheck · 725,000 registrations
> **H1:** 11,172 advisors moved last year. **The record says whether you should be next —
> even if the answer is stay.**
> **Sub:** We read the public filings on every U.S. registration — the acquisitions, grid
> changes, and clustered departures behind every move. You're in that record; that's how we
> reached you. Three private minutes match you to advisors who stood where you stand. No
> pitch, nothing shared.
> **CTA 1:** Match me to the record · 3 min, private
> **CTA 2:** Book a private call
> *Number sourcing: 11,172 = Diamond Consultants 4th Annual Transition Report (already cited
> on-page). "That's how we reached you" assumes the email disclosed nothing about mechanism —
> adjust to avoid repetition if it did. [VERIFY: email copy]*

Strength: leads with the strongest verifiable asset for a fact-checking ICP. Weakness: a stat
headline is the most conventional of the three — closest to what a sophisticated visitor has
seen before.

---

## 4. Below the Hero — What Changes vs. What's Already Right

**Already right for outbound (keep, verbatim or near):**
- **Resonance marquee** ("The grid changed. Again." …) — perfect problem-aware match; it's the
  page proving it knows the visitor's life before asking anything. Correct at position 2.
- **Research-backed pains section** ("Why advisors actually move") — believability through
  specificity (7-to-9-year notes, clawbacks, "only a quarter of the book came along") is
  exactly the AiSDR prescription.
- **Movement-data section with named sources + "not our estimates" note** — the diligence
  visitor's destination. The named-study citations are the conversion asset here.
- **Assessment section headline "We've probably already found you."** — for outbound traffic
  this graduates from clever to literally true, and it rhymes with the email. Keep; consider
  it load-bearing for Direction A congruence.
- **"Straight with you, from the first email"** who-section H2 — already written for the
  outbound reader. Keep.
- **Plain-language Axiom disclosure block** — the single most important trust element on the
  page for this arrival mode (ICP: disclosed conflict = landmine → trust signal).

**Changes:**
1. **Pull a conflict/confidentiality strip up the page.** The disclosure and the "0 profiles
   sold or shared. Ever." stat currently live mid/low. Outbound verifiers hunt for the catch
   early. Add one compact glass-chip row directly under the hero (or as the marquee's chaser):
   "Our stake, disclosed: we provide recruiting services to partner firms, incl. Axiom — full
   disclosure below · 0 names sold or shared, ever · If the evidence says stay, we say stay."
   Three chips, links to #who. No new section; v9 chip vocabulary already exists.
2. **Reorder hero CTA priority for outbound: assessment first, call second.** Mid-page sections
   currently lead with "Book a private call" (pains section, intel section, old/new section).
   For an outbound-dominant page, flip primary/secondary in the pains and intel sections so the
   micro-commitment leads (evidence in §1 step 5). Keep the ways-section and closing call CTAs
   as-is — by that scroll depth, call-intent is earned.
3. **Un-gate per §2** — the one structural change.
4. **Add the "how we found you" line wherever the assessment is pitched** if Direction A/C
   ships: one sentence, "You're one of the 725,000 — that's how you got the email, and it's
   how the assessment works." Congruence glue between email → hero → assessment.
   [VERIFY: email copy]
5. **No other structural changes.** The old-way/new-way section, Lab section, and sample-report
   flow serve the post-trust reader correctly; nothing about outbound arrival argues for
   touching them. (Design is LOCKED to v9 regardless — INTAKE §6.)

---

## 5. Sources

**Internal:** `projects/agl/INTAKE.md`; `projects/agl/research/ICP_BRIEF.md` (r/CFP verbatims,
trust signals, kill list); `projects/agl/handoff/index.html` (current page).

**External:**
- [Unbounce — Message Match (glossary)](https://unbounce.com/conversion-glossary/definition/message-match/)
- [Unbounce — Information Scent (glossary)](https://unbounce.com/conversion-glossary/definition/information-scent/)
- [SalesHive — Designing Landing Pages for B2B Email Campaigns, 2025 guide](https://saleshive.com/blog/b2b-designing-landing-pages-email-campaigns-2025-guide/)
- [AiSDR — Trust is the real currency in cold outreach](https://aisdr.com/blog/outbound-trust-gap/)
- [Cortes.design — Optimizing for Traffic Temperature in SaaS Landing Pages](https://www.cortes.design/post/optimizing-for-traffic-temperature-in-saas-landing-pages)
- [Woodpecker — Cold Email Statistics (20M+ emails)](https://woodpecker.co/blog/cold-email-statistics/) · [Martal — B2B Cold Email Statistics 2026](https://martal.ca/b2b-cold-email-statistics-lb/) (sender-research-before-reply behavior)
- [Landingi — CTA on Landing Pages playbook](https://landingi.com/blog/cta-on-landing-pages-playbook-examples/) (quiz/diagnostic CTA for skeptical visitors)
- [SaaS Hero — B2B SaaS Landing CTA practices](https://www.saashero.net/design/b2b-saas-landing-cta-practices/) (HubSpot form-field friction data)
- [ComplyDog — GDPR-compliant cold emails](https://complydog.com/blog/gdpr-compliant-cold-emails) · [Mailtrap — Cold Email Personalization](https://mailtrap.io/blog/cold-email-personalization/) · [Superhuman Prospecting — Personalized Outreach](https://superhumanprospecting.com/personalized-outreach-customizing-messages-for-b2b-buyers/) (source-transparency norms; creepy-vs-relevant line)
- [Rob Palmer — Breakthrough Advertising lessons](https://robpalmer.com/blog/eugene-schwartz-breakthrough-advertising-lessons) · [Game of Conversions — 5 Stages of Awareness](https://gameofconversions.com/customer-awareness-stages/) (Schwartz awareness-matching)
- [Landerlab — Best Landing Page Examples](https://landerlab.io/blog/best-landing-page-examples) (self-segmentation/disqualifying questions)
- r/CFP via pullpush.io archive: comment `/r/CFP/comments/13gveub/…/jk6tks4/` ("Most ignore
  recruiters because they're mostly auto messages… Once you respond and engage, the
  conversation becomes personal"); comment `/r/CFP/comments/1f64ov1/…/lkze5uw/` ("happy I've
  been ignoring" recruiter messages). Re-verify against live threads before public use.

**Known gaps:** no controlled study isolates outbound-email arrivals vs. paid-cold arrivals on
landing pages — the friction/congruence guidance above is practitioner consensus applied to
this ICP's verified psychology. The single biggest unknown remains the emails themselves:
**[VERIFY: email copy]** appears wherever a recommendation depends on them.
