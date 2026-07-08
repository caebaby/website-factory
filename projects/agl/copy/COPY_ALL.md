# Site Copy — Advisor Growth Lab (AGL)
Date: 2026-07-08
Copywriter: Agent 03

**Scope:** Homepage = gold (v9). Section A lists deltas ONLY — every other homepage line ships as-is. Sections B–C are full copy for the new surfaces. All [VERIFY] items from the strategy's open register carry through unchanged. Publish dates below are placeholders set at publish time; they are layout copy, not fact claims.

---

## A. HOMEPAGE — DELTAS ONLY

### A1. Why-we-exist card 3 ("Decide in a private room") — soften the "hundreds" claim (strategy flag 1)

**Location:** `v9/agl-site.html` line 495, card body under "Decide in a private room."

**Current line:**
> No lists, no drip campaigns, nothing shared or sold. A guide who has walked hundreds of advisors through this — and only when you ask.

**Final line:**
> No lists, no drip campaigns, nothing shared or sold. A guide who does nothing but this — and only when you ask.

*Rationale: "hundreds" is a quantified experience claim not in the proof inventory (INTAKE §5). This is the strategy's always-safe option — no number, same cadence. If Chris later confirms the guide's real count, upgrade to: "A guide who has sat on your side of hundreds of these conversations" [VERIFY: guide's actual count — do not ship this variant unverified].*

### A2. Assessment dek — add the "even if the honest read is 'stay put'" clause (strategy flag 3)

**Location:** `v9/agl-site.html` line 540, the `.lede` in `#assess`.

**Current line:**
> You're one of the 725,000. Opt in and we match you to your public record — firm, tenure, registrations, movement history — then read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified.

**Final line:**
> You're one of the 725,000. Opt in and we match you to your public record — firm, tenure, registrations, movement history — then read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified — and if the honest read is "stay put," that's the report you'll get.

*Guardrail (strategy flag 2): this dek travels as a unit. "We've probably already found you." must never appear on any surface without the privacy counter in the same block.*

### A3. Guide card — no copy change; stays placeholder

**Location:** `v9/agl-site.html` lines 574–580 (`#talk`).

**Current:** `[Guide name]` / "Transition guide" / photo placeholder / quote "My job isn't to move you. It's to make sure that if you move, it's the right one."

**Final:** unchanged. [VERIFY: guide name + photo + quote — if the guide is Lane, peer framing only ("an advisor who works with advisors in and after transition"), never "made the transition herself," never recruiter framing.] Booking button stays `href="#" data-verify="booking-url"` per LED-018.

### A4. Nav — add "The Lab" (three locations)

Nav order per strategy: **How we help · Intelligence · The Lab · Assessment · Who we are · [Book a private call]** — The Lab sits before Assessment so the free path precedes the ask.

**Desktop nav (line 417):**
- Current: `How we help · Intelligence · Assessment · Who we are`
- Final: `How we help · Intelligence · The Lab · Assessment · Who we are` — new item: `<a href="/resources/">The Lab</a>`

**Mobile nav (line 422):**
- Current: `How we help · Intelligence · Assessment · Who we are · Book a private call`
- Final: `How we help · Intelligence · The Lab · Assessment · Who we are · Book a private call`

**Footer links (line 602):**
- Current: `How we help · Intelligence · Assessment · Who we are · Contact`
- Final: `How we help · Intelligence · The Lab · Assessment · Who we are · Contact`

### A5. NEW homepage section — "The Lab" content teaser

**Placement:** immediately after the `#assess` section closes (~line 561), before `<!-- WHO -->`. Skin in v9's own language (section grammar, `.eyebrow`, `.h-sec`, card patterns); no new design vocabulary.

**Kicker (eyebrow):** The Lab · daily

**H2:** The briefing recruiters wish <span class="serif-i">you weren't getting.</span>
<!-- Alt H2 (quieter, if Chris prefers): "What moved today, in plain terms." -->

**Dek:** Daily, plain-language reads on advisor movement, deal math, and firm signals — from the public record, no pitch.

**Episode cards (3, reverse-chron, newest first — title-as-link to the post; date; NO duration until audio exists):**

**Card 1**
- **Headline (link → /resources/forgivable-note-clawback.html):** The clawback math nobody walks you through before the 7-year note
- **Dek:** What leaving in year three of a forgivable note actually costs — in plain, illustrative numbers.
- **Date:** July 8, 2026

**Card 2**
- **Headline (link → /resources/retention-offer-after-acquisition.html):** Your firm just got bought. How to read the retention offer before you sign anything
- **Dek:** The headline number, the term math, and the questions to run before the deadline pressure starts.
- **Date:** July 7, 2026

**Card 3**
- **Headline (link → /resources/am-i-ready-to-leave-my-firm.html):** How to know if you're actually ready to leave your firm — before anyone knows you're asking
- **Dek:** Readiness is an evidence question, not a courage question. Here's what to read first.
- **Date:** July 6, 2026

**Section link:** All episodes → (links to `/resources/`)

*No new CTA type in this section — the cards are the CTA; conversion happens on the posts.*

---

## B. /RESOURCES HUB — FULL PAGE COPY

**URL:** `/resources/` (nav label "The Lab"; slug stays `resources` for search clarity)

### SEO / head

- **Title tag (53):** Daily Advisor Movement Briefings — Advisor Growth Lab
- **Meta description (142):** Daily briefings on advisor movement, deal math, and firm signals — built from the public record, including when the smart move is staying put.
- **OG title:** The whole board, read daily.
- **OG description:** same as meta description
- **og:type:** website · **og:url / canonical:** `https://advisorgrowthlab.com/resources/` · **og:image:** brand default [VERIFY: brand-default og:image asset path]
- **JSON-LD:** `CollectionPage` + `ItemList` of the 3 posts; `Organization` publisher block per PAGE_SYSTEM §2.4.

### Hero (compact dark band — the page's ONE dark band)

**Kicker:** The Lab

**H1:** The whole board, <span class="serif-i">read daily.</span>

**Dek:** A daily briefing on advisor movement, transition economics, and firm signals — built from the public record on roughly 725,000 U.S. registrations. For advisors who want the evidence before the pitch — including when the smart move is staying put.

**Podcast line (small print under dek):** Every briefing is an episode of The Advisor Growth Lab Podcast [VERIFY: podcast name — placeholder until Chris names it; one-liner also [VERIFY]].

**Primary CTA:** Get the daily briefing
*(Subscribe form → "Inside the Lab" [VERIFY: newsletter name still current in GHL]. Form action: [VERIFY: GHL form endpoint] — until supplied, `data-verify="subscribe-endpoint"` per LED-014; no dead CTAs.)*

**Secondary link:** Start the assessment →

### Featured post (latest briefing)

**Label:** Latest briefing

**Headline (link):** The clawback math nobody walks you through before the 7-year note

**Dek:** Forgivable notes look like a bonus until you model leaving early. The clawback math in plain, illustrative numbers — before you sign a 7-year term.

**Date:** July 8, 2026 · **Link:** Read the briefing →

### Post list (reverse-chron; stakes headline + dek + date; no duration until audio exists)

1. **The clawback math nobody walks you through before the 7-year note** — Forgivable notes look like a bonus until you model leaving early. The clawback math in plain, illustrative numbers — before you sign a 7-year term. · July 8, 2026
2. **Your firm just got bought. How to read the retention offer before you sign anything** — An acquisition turns loyalists into shoppers overnight. How to read the headline number, the term length, and the grid math before you sign anything. · July 7, 2026
3. **How to know if you're actually ready to leave your firm — before anyone knows you're asking** — Readiness is an evidence question, not a courage question. How to read your book, your math, and your timing — before anyone knows you're asking. · July 6, 2026

### Conversion rail (assessment card — homepage framing reused VERBATIM, including the A2 clause)

**Eyebrow:** The readiness assessment

**H2:** We've probably <span class="serif-i">already found you.</span>

**Body:** You're one of the 725,000. Opt in and we match you to your public record — firm, tenure, registrations, movement history — then read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified — and if the honest read is "stay put," that's the report you'll get.

**Meta chips:** 7 Questions · 3 min To complete · Private — Results are yours

**Primary CTA:** Start the assessment · **Secondary CTA:** See a sample report

### Footer

Standard site footer, verbatim from homepage, including the disclosure block:
> **Our disclosure, up front:** AGL provides growth and recruiting services to partner firms, including Axiom, an independent RIA platform. If your assessment points that way and you want the introduction, we'll make it — and say so plainly. If it doesn't, we'll tell you that too.

Footer contact email: [VERIFY: public contact email].

---

## C. EPISODE POSTS — FULL COPY

**Shared template notes (all three posts):**
- Breadcrumb: Home → The Lab → [short post name].
- Player block (no audio exists yet — reader-facing label only, R32): *"Audio edition coming soon. The full briefing is below."*
- og:type=article · twitter:card=summary_large_image · og:image = brand default [VERIFY: asset path] · `BlogPosting` JSON-LD (`PodcastEpisode` added only when audio ships) · `FAQPage` JSON-LD built ONLY from the question-shaped H2s and their actual body answers.
- Every economic figure below is a labeled illustrative range from publicly reported transitions — the label ships with the number, never separated.

---

### C1. POST — Am I ready to leave my firm

- **Slug / canonical:** `https://advisorgrowthlab.com/resources/am-i-ready-to-leave-my-firm.html`
- **Title tag (49):** Am I Ready to Leave My Firm? — Advisor Growth Lab
- **Meta description (145) / dek:** Readiness is an evidence question, not a courage question. How to read your book, your math, and your timing — before anyone knows you're asking.
- **OG title:** How to know if you're actually ready to leave your firm — before anyone knows you're asking
- **OG description:** same as meta description
- **Kicker:** The Lab · Readiness · **Date:** July 6, 2026 · **Breadcrumb short name:** Am I ready to leave?

**H1:** How to know if you're actually ready to leave your firm — before anyone knows you're asking

**Dek (2 sentences, doubles as meta):** Readiness is an evidence question, not a courage question. How to read your book, your math, and your timing — before anyone knows you're asking.

*Audio edition coming soon. The full briefing is below.*

#### Payload (~740 words)

**H2: Am I actually ready to leave, or just tired of my firm?**

Those are two different questions, and almost everyone who calls you will pretend they're the same one.

The itch is real information: a comp-grid change, an acquisition, senior advisors around you heading for the door, a recruiter calling every week. But an itch tells you something is wrong where you are. It tells you nothing about whether you're ready to be somewhere else.

Readiness is a different measurement. It lives in your book, your economics, your timing, and your life — and every piece of it can be read as evidence, in private, before a single person knows you're asking.

**H2: How many advisors actually move?**

More than the trade press suggests, and fewer than the recruiters imply.

Fidelity's Advisor Movement Study found that 56% of advisors considered switching firms within a five-year window — and roughly one in four actually moved. In 2025, 11,172 experienced advisors changed firms, up 16% from 2024 and a four-year high, per Diamond Consultants' advisor movement data as reported by Financial Planning.

Read both numbers honestly. Considering a move is normal — a majority position. Making one is a minority outcome. Which means "stay" and "go" are both common, legitimate answers, and any process that can only ever output "go" isn't reading your situation. It's reading its own compensation.

**H2: Will my clients actually follow me?**

This is the readiness variable that decides everything else, and it's the one advisors most consistently overestimate.

In public forums, advisors describe transitions where only about a quarter of the book followed — and describe the hard lesson underneath it: we tend to think clients are more attached to us than they actually are. The advisors who tell those stories aren't less talented. They misread the evidence beforehand, or never checked it.

The evidence is checkable. How much of your revenue is recurring and relationship-driven versus tied to the platform? How many of your top twenty households would you describe as loyal to you, specifically — and what's that judgment based on? Are you under a non-solicit? Is your firm in the Broker Protocol, or did it leave? Channel matters too: books built inside a bank or wirehouse brand travel differently than books built on an advisor's own name.

None of that requires courage. It requires an honest read of your own record.

> **Where your book actually stands is one of the signals the readiness assessment reads against your own record. See where you stand — 7 questions, 3 minutes, results are yours alone.**

**H2: How do I explore a move without tipping off my firm?**

Quietly, and in the right order.

The confidentiality anxiety is rational. In public threads, advisors researching a move routinely post from throwaway accounts — and some describe learning that even a custodian wouldn't discuss a breakaway unless a principal at their current firm signed off first. Asking openly can be the disclosure itself.

So keep the first step private and self-serve. Your registration record is already public — SEC, FINRA, BrokerCheck — and so is the movement history of every advisor who stood where you stand. You can read your position against that record before any human conversation happens, and before anyone with a stake in your answer knows there's a question.

**H2: What does "ready" actually look like on paper?**

Four things, none of them a feeling:

- **Portability evidence.** A grounded estimate of what follows you, built from your revenue mix and relationship depth — not from optimism.
- **Economics in plain ranges.** What the move is publicly reported to pay, and what it costs — labeled illustrative, not a recruiter's rosy math.
- **An honest support inventory.** Do you actually want to run the operation — compliance, technology, staff — or do you need a back office so you can serve clients? Neither answer is wrong. Pretending is.
- **Timing and life.** Fidelity's study found the top concerns for advisors considering a move were fear of the unknown, family commitments, and losing clients in transition. Those aren't spreadsheet problems. They belong in the readiness read anyway.

**H2: What if the honest answer is "stay"?**

Then that's the answer, and it should be said out loud.

Roughly three of four advisors who consider a move don't make one — many for good reasons. The problem is that almost nobody in this conversation is paid to tell you that. Recruiters, transition consultants, platforms offering transition assistance — the economics run one direction.

A readiness read that can honestly return "stay put" is worth more than one that can't, because it's the only kind you can trust when it says "go." Staying on evidence beats leaving on a pitch. So does leaving on evidence. The point is the evidence.

#### End conversion block

**H3:** Know where you stand — even if the answer is "stay."

**Body:** Seven questions, three minutes. We match you to your public record and read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified — and if the honest read is "stay put," that's the report you'll get.

**Primary CTA:** Start the assessment
**Secondary CTA:** Book a private call — *No pitch, no pipeline. A guide who will tell you the truth, including when the truth is "stay."* [booking URL: `data-verify="booking-url"` per LED-018]

#### Related briefings

- [Your firm just got bought. How to read the retention offer before you sign anything](/resources/retention-offer-after-acquisition.html)
- [The clawback math nobody walks you through before the 7-year note](/resources/forgivable-note-clawback.html)
- ← All briefings: [The Lab](/resources/)

---

### C2. POST — Retention offer after acquisition

- **Slug / canonical:** `https://advisorgrowthlab.com/resources/retention-offer-after-acquisition.html`
- **Title tag (58):** Retention Offers After an Acquisition — Advisor Growth Lab
- **Meta description (149) / dek:** An acquisition turns loyalists into shoppers overnight. How to read the headline number, the term length, and the grid math before you sign anything.
- **OG title:** Your firm just got bought. How to read the retention offer before you sign anything
- **OG description:** same as meta description
- **Kicker:** The Lab · Trigger events · **Date:** July 7, 2026 · **Breadcrumb short name:** Reading a retention offer

**H1:** Your firm just got bought. How to read the retention offer before you sign anything

**Dek:** An acquisition turns loyalists into shoppers overnight. How to read the headline number, the term length, and the grid math before you sign anything.

*Audio edition coming soon. The full briefing is below.*

> *Numbers below are illustrative ranges and structures drawn from publicly reported and publicly discussed transitions. They are not an offer, an estimate, or a guarantee, and nothing here is legal or tax advice.*

#### Payload (~730 words)

**H2: My firm was acquired — why is everyone suddenly calling me?**

Because an acquisition converts an entire firm's advisors into prospects overnight, and everyone in the industry knows it.

Within days of a deal announcement, the recruiter calls start. Advisors at recently acquired firms describe being bombarded — and describe something sharper underneath the noise: the firm they chose, sometimes specifically because it wasn't the acquirer, made the decision for them. Loyalty to the old firm doesn't transfer automatically. Everyone calling you understands that, and every one of them has a stake in what you do next.

Which is exactly why the retention offer deserves a slower, colder read than the moment invites.

**H2: What is a retention offer actually for?**

It's the acquirer paying to keep your assets on the platform through the integration.

That's not cynicism; it's the deal model. The purchase price assumed a certain amount of revenue stays. The retention package is the tool that makes the assumption hold. It's typically structured as forgivable money over a multi-year term — you get a check or a note now, and you earn it by staying.

Understanding whose problem the offer solves doesn't make it a bad offer. It tells you how to read it: as one side's opening position, priced to their economics, not yours.

**H2: How do I read the headline number?**

Annualize it, then net it against what the acquirer takes back.

The headline is a lump sum, and lump sums are designed to feel large. Spread it over the term instead. In public threads following recent brokerage acquisitions, advisors have worked this math on their own offers and described results like a package that annualizes to roughly 0.25% a year over an eight-year term, or offers around 30 basis points on certain asset bases — figures from public discussion, illustrative only, not offers.

Then run the other side of the ledger over the same term: the new grid versus your old one, platform and administrative fees, ticket charges, payout policy changes. Advisors doing this math in public have reached a blunt conclusion about some offers — that the acquirer more than recovers the check through its grid and fees over the life of the term. Whether that's true of *your* offer is exactly the calculation to run before signing. The check is the visible number. The term economics are the real ones.

**H2: What does the term length really commit me to?**

Publicly discussed retention structures commonly run seven to eight years, with clawbacks if you leave early — illustrative structures, not offers.

Read that duration honestly. You're not deciding whether you like the acquirer today. You're deciding whether you'll want to be there in year six — after the systems conversion, the repapering, the staff changes, and whatever the service model becomes once the integration budget runs out. Advisors facing these offers describe the fear precisely: what if the support degrades two or three years in, and the note means you're stuck?

That's not a hypothetical to wave away. It's a clause to price. (The full mechanics of forgivable-note clawbacks — including what leaving in year three actually costs — are in [the clawback math briefing](/resources/forgivable-note-clawback.html).)

> **A retention offer landing on your desk is one of the signals the readiness assessment reads against your own record. See where you stand — 7 questions, 3 minutes, results are yours alone.**

**H2: Should I sign, stay without signing, or start looking?**

All three are legitimate positions. The mistake is choosing under deadline pressure with one input.

- **Sign** if the netted, annualized economics genuinely work and you'd choose the acquirer on its merits anyway. Some advisors publicly describe modest retention offers as almost beside the point — the real question being service quality, not check size.
- **Stay without signing** if you want to watch the integration before committing your next seven years. You keep optionality; you forgo the check.
- **Look** if the acquisition broke something you can't price back in — but look on evidence, not on a recruiter's timetable.

One caution: offer deadlines are a negotiating instrument. Your actual position — what your book is, what would follow you, what the whole market of destinations looks like — doesn't expire on someone else's calendar. Read the offer against the whole board, not against the two weeks printed on it.

#### End conversion block

**H3:** Know where you stand — even if the answer is "stay."

**Body:** Seven questions, three minutes. We match you to your public record and read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified — and if the honest read is "stay put," that's the report you'll get.

**Primary CTA:** Start the assessment
**Secondary CTA:** Book a private call — *No pitch, no pipeline. A guide who will tell you the truth, including when the truth is "stay."* [booking URL: `data-verify="booking-url"` per LED-018]

#### Related briefings

- [The clawback math nobody walks you through before the 7-year note](/resources/forgivable-note-clawback.html)
- [How to know if you're actually ready to leave your firm](/resources/am-i-ready-to-leave-my-firm.html)
- ← All briefings: [The Lab](/resources/)

---

### C3. POST — Forgivable note clawback math

- **Slug / canonical:** `https://advisorgrowthlab.com/resources/forgivable-note-clawback.html`
- **Title tag (50):** Forgivable Note Clawback Math — Advisor Growth Lab
- **Meta description (147) / dek:** Forgivable notes look like a bonus until you model leaving early. The clawback math in plain, illustrative numbers — before you sign a 7-year term.
- **OG title:** The clawback math nobody walks you through before the 7-year note
- **OG description:** same as meta description
- **Kicker:** The Lab · Deal math · **Date:** July 8, 2026 · **Breadcrumb short name:** Clawback math

**H1:** The clawback math nobody walks you through before the 7-year note

**Dek:** Forgivable notes look like a bonus until you model leaving early. The clawback math in plain, illustrative numbers — before you sign a 7-year term.

*Audio edition coming soon. The full briefing is below.*

> *Every figure below is an illustrative range or structure drawn from publicly reported transitions. Not an offer, an estimate, or a guarantee. Nothing here is legal or tax advice — the actual note in front of you should go through your own counsel.*

#### Payload (~760 words)

**H2: How does a forgivable note actually work?**

The transition check isn't a bonus. It's a loan you repay by staying.

The standard structure: the destination firm advances transition assistance up front — publicly reported packages have run roughly 150% to 330% of trailing-12 production, illustrative range, not an offer — papered as a forgivable promissory note. Each year you stay (and, in many structures, hit stated production or asset hurdles), a slice of the principal is forgiven. Terms of seven to nine years are common in publicly discussed deals.

Two consequences follow from the structure, and both get less airtime than the headline number. First, the forgiven slice typically lands as taxable compensation in the year it's forgiven — timing your own tax picture around it is a question for your tax counsel, not this briefing. Second, the unforgiven balance is a debt, and debts come due.

**H2: What actually triggers a clawback?**

Leaving early is the obvious one. It's rarely the only one.

Publicly discussed note structures have included triggers like resignation before the term ends, termination — sometimes including termination the firm initiates — and shortfalls against production or asset hurdles baked into the forgiveness schedule. When a trigger fires, the unvested balance generally becomes repayable, in some structures with interest, and in some structures promptly rather than on a schedule.

Advisors reading these terms in public reach for the same phrase again and again: golden handcuffs. The sharper worry they describe is the scenario where the trigger isn't ambition but disappointment — what if the support and service degrade two or three years in, and the note means you're stuck with them anyway? That's the clause doing exactly what it was priced to do.

**H2: What would leaving in year three actually cost?**

Run one illustrative model — invented numbers, chosen to be round, not an offer or estimate of any real deal:

- Trailing-12 production: **$1,000,000**
- Note at 200% of T-12: **$2,000,000**, eight-year term, straight-line forgiveness
- Forgiven per full year: **$250,000**
- You leave after year three: **$750,000 forgiven — $1,250,000 unvested and repayable**

And the repayment isn't the whole cost. You've likely already paid income tax on the $750,000 that was forgiven. You're writing the $1.25M check while funding a second transition. If the balance carries interest, add that. The move you'd be making in year three has to clear all of it — which is why the industry phrase for mid-note advisors is "locked up," and why the *next* recruiter's math so often quietly assumes the new package pays off the old note.

> **Note terms like these are one of the signals the readiness assessment reads against your own record. See where you stand — 7 questions, 3 minutes, results are yours alone.**

**H2: What should I check before signing a 7-year note?**

Six clauses worth pricing before the signature, not after:

1. **The forgiveness schedule.** Straight-line or back-loaded? Annual or monthly vesting? A back-loaded schedule moves the real handcuff years later than the brochure implies.
2. **The hurdles.** If forgiveness is contingent on production or asset levels, model a down market. A hurdle you'd miss in a 20% drawdown is a clawback trigger you don't control.
3. **The departure definitions.** What counts as leaving? What happens if *they* terminate you — with cause, without cause? The difference can be the entire unvested balance.
4. **Interest and timing.** Does the unvested balance accrue interest? Is repayment immediate on departure?
5. **Change of control.** If the firm you're signing with is itself acquired — an outcome the last two years of consolidation make hard to dismiss — does the note travel, accelerate, or bind you to the acquirer?
6. **The full-term grid math.** The note is one column. The other is payout, platform fees, and expenses over all seven-plus years, netted against where you are now. Publicly discussed deal analyses keep landing on the same caution — headline recruiting numbers are frequently not what they appear to be once the term economics are added up.

**H2: Is a bigger check ever the wrong deal?**

Sometimes — because the check and the term move together.

The larger the upfront number, the longer and tighter the structure that secures it, and the more of your future optionality it consumes. The alternative frame that advisors with long horizons keep raising in public is ownership economics: independent models publicly trade the big upfront check for higher ongoing payout and equity you can eventually sell — enterprise value at publicly reported multiples — versus the employee-model path of serial notes. (That trade deserves its own briefing; it's deal math of a different kind.)

Neither path is "right." But only one of them is usually presented with a deadline attached — and a note you understood completely before signing is the only kind that never surprises you in year three.

#### End conversion block

**H3:** Know where you stand — even if the answer is "stay."

**Body:** Seven questions, three minutes. We match you to your public record and read your position against advisors who stood exactly where you stand. The report is yours alone; no one is notified — and if the honest read is "stay put," that's the report you'll get.

**Primary CTA:** Start the assessment
**Secondary CTA:** Book a private call — *No pitch, no pipeline. A guide who will tell you the truth, including when the truth is "stay."* [booking URL: `data-verify="booking-url"` per LED-018]

#### Related briefings

- [Your firm just got bought. How to read the retention offer before you sign anything](/resources/retention-offer-after-acquisition.html)
- [How to know if you're actually ready to leave your firm](/resources/am-i-ready-to-leave-my-firm.html)
- ← All briefings: [The Lab](/resources/)

---

## Compliance ledger (what was applied, doc-wide)

- **Economics:** all figures labeled illustrative ranges from publicly reported/discussed transitions + "not an offer, estimate, or guarantee" adjacent, every time (150–330% of T-12; 0.25%/yr and ~30 bps retention math; 7–9 year terms; worked C3 example flagged as invented round numbers).
- **Movement figures:** 725,000 registrations = public SEC/FINRA/BrokerCheck; 11,172 moves in 2025 (+16%, four-year high) cited to Diamond Consultants data via Financial Planning; 56% / 1-in-4 cited to Fidelity's Advisor Movement Study. No uncited counts anywhere.
- **r/CFP material:** paraphrased only, always as "advisors describe…" — zero verbatim quotes (not re-verified against live threads).
- **Legal/tax:** C2 and C3 carry "illustrative structures, not offers; not legal or tax advice"; C3's tax point explicitly deferred to the reader's own counsel.
- **No invented advisor stories, no testimonials, no "90+ advisors," no Lane backstory.** Axiom appears only in the standard disclosure block; the model is never sold as an entity in the posts (ownership economics framed generically).
- **Kill list:** audited clean — no opportunity/unlock/journey/maximize/monetize/free consultation/urgency ("deadline pressure" appears only as the thing we tell readers to distrust).
- **R32:** all placeholders reader-facing ("Audio edition coming soon") — no dev-note language in copy.

## Consolidated [VERIFY] list — NEW items beyond the strategy's open register

The strategy's register (booking URL · footer email · guide name/photo/quote · "hundreds" claim · "90+ advisors" · podcast name + one-liner · audio platform/embed · "Inside the Lab" GHL name · pixel snippet · testimonial footage) carries through unchanged. Newly introduced by this doc:

1. **[VERIFY: brand-default og:image asset path]** — PAGE_SYSTEM §2.3 requires og:image on hub + posts; no default asset is registered anywhere upstream.

That is the only new item. (Episode publish dates are placeholders set at publish time — operational, not fact claims requiring verification.)
