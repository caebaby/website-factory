# One-paste ChatGPT design prompt — AGL homepage
Paste everything below the line. Output comes back as a single HTML file you drop into this
session for the QA gauntlet — same flow as the copy passes.

---

You are a senior web designer and creative developer. Design and build a complete homepage for
Advisor Growth Lab (AGL) as **one single self-contained HTML file** — all CSS and JavaScript
inline, no build step, no external requests except one Google Fonts link (Schibsted Grotesk
400–900 + Newsreader italic 400). Production quality, not a wireframe.

## The business (context, not copy to invent from)
AGL tracks every U.S. financial-advisor transition in the public record (SEC / FINRA /
BrokerCheck, ~725,000 registrations) and gives advisors privately weighing a firm change an
evidence-based read on their position. Conversion events: a private 3-minute readiness
assessment, then a booked private "transition read" call. AGL's differentiator: it will honestly
tell an advisor to stay put. Audience: skeptical, senior, allergic to recruiter hype.

## Brand system (binding — this is the palette)
- Accent indigo `#4338CA` (hover `#3730A3`, soft fill `rgba(67,56,202,.07)`) — the ONE accent,
  used sparingly: buttons, links, kickers, key numerals.
- Periwinkle `#A5B4FC` / `#C3CCFF` — the accent's voice on dark surfaces.
- Warm gold `#F2C782` — tiny doses only (dots, pulses, chips). Never large fills.
- Ink `#0F172A`, body `#334155`, muted `#69768C`; surfaces white / `#F1F4F9` / `#E4E9F1`;
  hairlines `rgba(15,23,42,.10)`.
- ONE dark band per page: gradient `#0B0F28 → #171E48` with a soft indigo radial glow; on-deep
  text `#E9ECF9` / `rgba(226,230,248,.68)`.
- Type: Schibsted Grotesk for headlines AND body (headlines ~650 weight, −0.03em tracking,
  line-height ≤1.08; hero clamp 44→74px). Newsreader italic 400 for 1–3 accent words per
  headline only — indigo on light, periwinkle on dark. Tabular numerals for all figures.
- Shape: buttons 10px radius (NEVER pill buttons), cards 16–18px radius, 1px hairline borders,
  layered soft shadows. Glass elements over dark/photo: white 8–14% + backdrop blur + edge light.
- Motion: one easing `cubic-bezier(.21,.86,.36,1)` everywhere. Scroll reveals = fade + 16–22px
  rise, staggered 90–130ms, settled in <1.5s. Counters tick up, bars scale from origin. Full
  `prefers-reduced-motion` fallback (everything visible, no animation). Content must be visible
  even if JavaScript never runs.

## Anti-generic rules (a design fails review if it breaks these)
- No 3-icon-card "features" grids. Use editorial layouts: asymmetric two-column, ruled rows,
  numbered kickers (01/02/03 — only where a real sequence exists).
- No generic icon-pack icons. Any icon is custom duotone: tinted indigo fill (~16%) + indigo
  stroke, drawn for the concept, 44px grid.
- No purple-gradient-on-white SaaS hero, no emoji, no everything-centered layouts.
- Signature motifs available: a slow constellation-network canvas on the dark band (sparse nodes,
  alpha ≤0.2 links, occasional warm-gold pulse traveling an edge) and a horizontal marquee ticker.
- Sections alternate white / light-grey, plus the one dark band. Design real mobile breakpoints
  (~900px, ~620px) — no horizontal page scroll ever.

## Page structure + FINAL COPY (locked — do not rewrite, do not invent additional claims)
1. **HERO** (cinematic: full-bleed dark or photographic treatment, layered scrims ok)
   H1: "Advisor transitions are normal. *Yours still needs a read.*"
   Sub: "Public filings in. Private read out. 'Stay' is a real answer."
   Micro-commitment: "Are you quietly running the numbers?" [Yes →] [Not yet]
2. **01 · THE QUESTIONS** (dark band + marquee ticker of these 12, larger type)
   H2: "The questions come *before the pitch.*"
   Ticker: Can my book legally come with me? · What does my non-solicit actually block? · How
   much of my T-12 is at risk in year one? · What happens to my deferred comp if I leave? · Do my
   clients have to repaper everything? · Who owns the notes, the files, the history? · Is my firm
   still in Protocol? Is theirs? · What if the support gets worse after year two? · Is the check
   worth the handcuffs? · Am I early — or already late? · Would independence mean doing this
   alone? · What would make staying the right call?
   Exit: "If one of these is already yours, get it answered before your firm knows you asked."
3. **02 · THE PRIVATE RESEARCH** — H2: "The questions advisors research *on a throwaway
   account.*" Lead: "The grid change. The acquisition. The recruiter who keeps calling. Those are
   the visible triggers. Under them is a quieter set of questions you can't safely ask anyone at
   your firm. All of them have answers — just not from someone with only one answer to sell."
   Four cards (title + short body each): "Can my book actually move?" / "What's the real math —
   not the recruiter's version?" / "Who can I even ask without tipping my hand?" / "What am I
   actually building here?"
4. **03 · THE EVIDENCE** (this is the dark band if not used above) — H2: "Moving is normal now.
   *Guessing at the math isn't.*" Body: "Advisor movement isn't fringe. In 2025, 11,172 advisors
   changed firms — up 16.2%, a record. Fidelity found 56% of advisors had weighed a move over
   five years. One in four actually moved. Three in four didn't." Stats card with kickers:
   YOU'RE NOT CRAZY (11,172 — Diamond Consultants via WealthManagement.com) · YOU'RE NOT ALONE
   (56% / 1 in 4 — Fidelity 2018) · WHERE THEY GO (64% chose independence — Fidelity 2018) ·
   THE SHIFT IS STRUCTURAL (wirehouses −1.9%/yr through 2028, RIAs +4%/yr — Cerulli) ·
   THE VERDICT (94% happy, 85% more control — Fidelity 2023; "In the exit threads, the regret
   runs one direction: sooner."). Keep every source line. Card closer: "Those are the industry's
   numbers. The only ones that matter are yours — your book, your channel, your timing. That's
   the 30-minute read. You get the answer; we don't get a decision." CTA: "Get your private
   transition read".
5. **04 · THE MISTAKES** — H2: "The expensive mistakes happen *before resignation day.*"
   8 numbered items (label + one line): Staying too long — Waiting for certainty that never comes
   while your leverage quietly erodes. / Jumping too early — Moving on the trigger emotion instead
   of the contract math. / Chasing the headline number — Reading the transition check as income
   instead of a loan against clawback and time. / Picking economics over fit — The grid pencils;
   the platform, culture, and support don't — and that's what you live in daily. / Assuming your
   clients feel what you feel — Loyalty is real. So is repapering friction. Portability is a fact,
   not a feeling. / Winning this move by losing the next one — Signing terms that trap you where a
   second move is worse than staying. / Only asking people who win if you leave — Every
   recruiter's math ends the same way. Conflict-free counsel doesn't. / Skipping the read
   entirely — Deciding by drift. No move is a decision too — it deserves the same diligence.
6. **05 · THE SOLUTION** — H2: "You were handed two bad options: *the grid, or going it alone.*"
   Two-column comparison: left "The grid — or going it alone" (10 pains, X marks); right "The
   third door — how the model actually works" (6 mechanisms, check marks: yours-by-contract book,
   salable asset, ~90%-range payouts labeled "illustrative, not an offer", enterprise back
   office, your brand, peers who made the move). Closer: "Independence was never the problem.
   Alone was. And a real diagnostic can end three ways: stay, wait, or explore — if only one
   answer is ever allowed, it was never a diagnostic. It was a pitch."
7. **06 · STEP ONE — the readiness assessment** — H2: "We've probably already found you."
   Body must include: "The report is yours alone; no one is notified." Note: "Three minutes.
   Nothing hits your firm. No recruiter ever calls." CTAs: "Start the assessment" / "See a sample
   report".
8. **07 · STEP TWO — the conversation** — H2: "Straight with you, from the first email."
   Body: "Thirty minutes with a guide, not a recruiter. You leave with a clearer read on five
   things: book portability, contract risk, timing, real economics, and what would make staying
   the right call. Sometimes the read is: don't move." Disclosure block (verbatim, prominent):
   "How we get paid, since you're wondering: partner firms pay us when an introduction turns into
   a placement — you never pay anything. If your read says 'explore,' we'll point you at the org
   that actually fits — Axiom or another firm — and tell you exactly when our interest is in the
   room. If it says 'stay' or 'wait,' that's what you hear, and no one is notified." CTA: "Get
   your private transition read" + "No commitment to move. Nothing is sent to your firm."
9. **THE LAB** — H2: "Who moved, where, and *what it signals.*" Dek: "A daily read on advisor
   movement, deal math, and firm signals — straight from the public record. No rumor mill
   required." Three post cards (title/date/link): "The clawback math nobody walks you through
   before the 7-year note" · "Your firm just got bought. How to read the retention offer before
   you sign anything" · "How to know if you're actually ready to leave your firm — before anyone
   knows you're asking".
10. **CLOSE** — H2: "Know before you move. *Know if you shouldn't.*" Body: "Waiting doesn't lower
    the risk. It just moves the timeline into someone else's hands." CTA: "Get your private
    transition read". Footer: "Intelligence built from public SEC, FINRA and BrokerCheck
    registration data covering roughly 725,000 U.S. advisors." + "Disclosure: Advisor Growth Lab
    provides growth and recruiting services to partner firms, including Axiom. Industry figures
    shown are illustrative, derived from public registration filings, and are not claims about
    any specific firm. Nothing on this page is an offer, a compensation estimate, or a guarantee
    of any economic outcome."

## Hard rules
- Use the copy above EXACTLY. Do not invent statistics, testimonials, advisor stories, or any
  claims. Do not drop the source lines or "illustrative" labels.
- Booking/assessment endpoints are pending: primary CTAs = `<a href="#" data-verify="booking-url">`
  or in-page anchors — never a fake external link.
- Accessibility: visible focus states, aria labels on interactive and decorative elements, body
  contrast ≥4.5:1, semantic headings.
- Deliver the complete single HTML file in one code block. No explanations before or after.
