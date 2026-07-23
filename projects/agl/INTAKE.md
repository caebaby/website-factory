# Client Intake — Advisor Growth Lab (AGL)
Drafted 2026-07-08 by the factory from repo accuracy rules (BRIEF.md, STRATEGY_MAP, standing
AGL memory rules). Chris = client; anything he hasn't confirmed carries [VERIFY].
This is pilot client #1 through the full pipeline. Design is LOCKED to the v9 system —
this intake feeds copy + new pages only, never a redesign.

---

## 1. Business Basics

**Business name:** Advisor Growth Lab (AGL)
**Website URL:** advisorgrowthlab.com (live; v9 preview at caebaby.github.io/agl-site-preview)
**Primary contact:** Chris Evans, owner. Johnny = ops partner (will deploy on Replit).
**Email:** [VERIFY: public contact email for the site footer]
**Booking URL:** [VERIFY: Calendly/SavvyCal/GHL link — LED-042 blocker; until supplied every
booking CTA stays `href="#" data-verify="booking-url"`]

## 2. What You Do

**One sentence:** AGL is an advisor growth engine — movement intelligence, an honest
readiness assessment, and a private guide — for experienced financial advisors weighing
a transition, plus recruiting services to partner firms.

**Core offerings:**
1. Transition readiness assessment (7 questions, ~3 min) → personal report. **This is the MQL.**
2. Private call with a guide (no pitch, no pipeline). **This is the SQL / conversion event.**
3. Movement intelligence — public SEC/FINRA/BrokerCheck record, ~725,000 U.S. registrations.
4. Content engine: daily AI-produced podcast + episode posts on /resources (SEO/organic engine).

**What clients can't get elsewhere:** every recruiter who calls has a stake in the answer.
AGL shows the whole board — movement data across every U.S. firm — and tells an advisor
the truth even when the truth is "stay put."

**What we do NOT do:** we are not a recruiting mill. No lists sold, no drip campaigns on
un-opted-in advisors, no name-sharing with recruiters. Ever.

## 3. Who You Serve (ICP)

**Primary:** experienced U.S. financial advisors — wirehouse / BD / IBD / hybrid, real books
(roughly $10M–$150M+ AUM), 5–20+ years registered — feeling the itch: comp-grid changes,
senior departures around them, recruiter noise, ownership questions.
**Secondary:** firm leaders/executives who want movement intelligence on their own network.

**#1 problem before they find us:** the biggest financial decision of their career runs on
sales pitches. Every input they get is from someone with a stake in the outcome, and asking
questions openly risks tipping off their firm.

**After:** they know where they stand (readiness, economics in plain ranges, what peers
actually did), decided in private, on evidence — whether that means moving or staying.

**What makes them nervous:** being "worked" by another recruiter in disguise; their name
leaking; inflated deal math; anything that smells like a funnel.

## 4. The Model We Represent (accuracy rules — NON-NEGOTIABLE)

- **Sell the MODEL, never Axiom-as-entity:** full ownership · high recurring fee-based
  revenue · robust back-office/shared services · camaraderie with successful peers.
  Axiom is a partner firm AGL provides recruiting services to — disclosed in plain language
  on every advisor-facing page (v9 footer + who-section disclosure already does this; keep).
- "Client-first trifecta hybrid model": clients first · back-office so advisors can serve ·
  100% ownership.
- **Lane Schroder = an advisor who works with advisors in/after transition. A PEER, NOT a
  recruiter.** Never "made the transition herself," never "spent years in commission."
- Advisor count: "90+ advisors" ONLY, and only with [VERIFY with Jerry]. Never inflate.
- No fabricated stats, testimonials, or backstories anywhere. Unknown fact = [VERIFY].

## 5. Proof Inventory (with legal footing)

| Claim | Footing | Status |
|---|---|---|
| ~725,000 U.S.-registered advisor records tracked | Public SEC/FINRA/BrokerCheck filings | ✅ usable, cite footing |
| 9,400 moves detected this quarter / 18,000+ firms monitored | Illustrative operating figures | ✅ only with the existing asterisk + "illustrative" note |
| Transition package ranges (150–330% etc.) | Publicly reported transitions | ✅ only as illustrative ranges + "not an offer, estimate, or guarantee" |
| Sample report (Jordan M., percentiles, gauge) | Fictional | ✅ only with fictional-sample labeling (R27) |
| "90+ advisors" (network size) | Jerry's number | [VERIFY with Jerry] — do not use until confirmed |
| Guide name + photo + quote | Real person TBD | [VERIFY: who is the named guide — Lane? Chris? photo asset] |
| Testimonials / advisor stories | Memphis shoot footage in edit | [VERIFY: final edits + compliance review before any use] |
| Compliance regime | FINRA/SEC/FTC | No income promises; economics only as labeled illustrative ranges |

## 6. Brand (LOCKED — v9 system)

Everything visual is governed by `projects/agl/v9/DESIGN_SYSTEM.md` (R1–R34). Shorthand:
accent indigo #4338CA, warm gold #F2C782 in tiny doses, ink #0F172A on white/light-grey with
ONE dark band per page; Schibsted Grotesk + Newsreader italic accents; glass chips; 10px-radius
buttons; constellation canvas motif. **Visual world:** pre-dawn command room — calm, dark,
data constellations, one warm human light. **Signature motif:** the constellation/network
canvas + the movement wire ticker (already built; reuse, don't reinvent).

## 7. Pages (this build)

1. **Homepage** — exists (v9 gold). Job: route advisor → assessment (MQL) or call (SQL).
   Gets FINAL copy + a new content section routing to /resources. Enhance in v9's language;
   never redesign.
2. **/resources** — NEW. Job: the SEO/organic front door. Direct-response: hook → episodes →
   assessment CTA. Lists podcast episodes as posts.
3. **Episode/post template** — NEW. Job: convert organic readers of one episode into
   assessment starts. Semantic HTML, per-post meta/OG, schema.org, internal links.
4. Sample report view — exists inside the v9 file; untouched except copy consistency.

## 8. The Podcast (content engine)

Daily, 100%-AI-produced podcast; every episode becomes a post on /resources whose job is
organic traffic → assessment. **Podcast name:** [VERIFY: Chris to name it — placeholder
"The Advisor Growth Lab Podcast" used until then]. **One-liner:** [VERIFY]. Episode audio
hosting/player embed: [VERIFY: platform — until then the template ships a no-JS-safe
placeholder player block]. Newsletter "Inside the Lab" exists in GHL [VERIFY name still
current before printing it on the page].

## 9. Conversion Goals

**Primary:** booked private call (SQL). **Secondary:** assessment completion (MQL — feeds
GHL nurture, Johnny/ShowHog). Every interactive element on every page resolves toward
these (CONVERSION LAW). No dead CTAs (LED-014/018): unknown endpoint = `data-verify`.

## 10. Technical

**Hosting:** Replit (Johnny spins up from `projects/agl/handoff/` static files).
**Stack:** static HTML/CSS/JS, self-contained per factory standards (R30) — but handoff
splits shared CSS/fonts into linked assets so multiple pages don't each carry 780KB.
**CRM/nurture:** GHL (existing). **Analytics/pixel:** i.advisorgrowthlab.com pixel
[VERIFY: snippet to embed, if wanted at launch].
**Compliance:** FINRA/SEC/FTC overlay per §4/§5; Axiom disclosure on every page footer.

## 11. Timeline

Tonight: handoff folder Chris can send Johnny. Track B (live-data assessment wiring) is
explicitly OUT of scope for this build — assessment CTAs route to the existing sample-report
experience until the live version ships.
