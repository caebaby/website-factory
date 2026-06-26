# SECTION_MANIFEST.md — Editorial Luxury
**Template:** `editorial-luxury`
**Purpose:** The canonical conversion architecture. Defines every section every advisor homepage MUST have, in the exact order that converts MQL → SQL. This is the single source of truth for structure.

> **Read this BEFORE DESIGN.md and before writing any strategy or copy.** The conversion structure is fixed. What changes per client is the content, the archetype interpretation, and the visual treatment — never the sequence, never the conversion jobs.

---

## The Three Tiers of Sections

```
TIER 1: CORE SECTIONS (mandatory, non-negotiable, fixed order)
  → The conversion engine. Every advisor homepage has these, in this order.
  → Agent 02 cannot remove or reorder them. Agent 05 blocks shipping without them.

TIER 2: STANDARD SECTIONS (default inclusion, droppable with reason)
  → Strengthen conversion but can be omitted if the archetype or ICP warrants it.
  → If dropped, Agent 02.5 must document WHY in DESIGN_BRIEF.md.

TIER 3: OPTIONAL SECTIONS (added based on client complexity)
  → For bigger firms, niche specialists, or richer proof stories.
  → Insert at defined positions, never disrupt Tier 1 sequence.
```

---

## TIER 1: CORE SECTIONS (The Conversion Engine)

**Rule:** Every advisor homepage MUST have all 9 core sections, in this exact order. This is the MQL → SQL pipeline. No exceptions. No reordering.

### Section 1: NAVIGATION
**Conversion job:** Trust signal — "this is a real, credible firm."
**Psychology:** First impression. Within 2 seconds, the prospect answers: *Is this legit? Do they serve people like me? Can I find what I need?*
**Required elements:**
- Logo (text-based for Phase 1, client logo Phase 2)
- Nav links (About / Services / Who We Serve / Process / Contact)
- Primary CTA button (gold) — "Book a Call →"
- Mobile: hamburger → full-screen overlay
**Quality rule:** Frosted glass on scroll. Transparent at top.
**Cannot be removed. Cannot be reordered.**

### Section 2: HERO
**Conversion job:** Hook — name the problem the prospect has, in language they recognize.
**Psychology:** The "that's me" moment. The prospect arrives with a vague problem. The hero must crystallize it into a specific question they've been unable to answer. If they read the hero and think "yes, that's exactly my situation," they scroll. If not, they bounce.
**Required elements:**
- Eyebrow: Location + category ("Houston, TX · Fiduciary Wealth Management")
- H1: A question that names the prospect's core problem (from intake — the "how to" question)
- Subhead: Who the advisor is + who they serve, in one sentence
- Two CTAs: Primary (book) + Secondary (lower commitment)
- Proof strip: 3-4 trust markers (years, fiduciary, fee-only, location)
**Quality rule:** Dark navy background with radial gradient depth. Serif headline. Gold accent on key phrase.
**Emotional contract:** The hero makes the prospect feel *understood* before they feel *sold to*.
**Cannot be removed. Cannot be reordered.**

### Section 3: THE PROBLEM (Pain Validation)
**Conversion job:** Mirror the prospect's pain back to them — validate that their struggle is real and common.
**Psychology:** After the hero hook, the prospect is thinking "ok, they get the problem. But do they understand how it actually FEELS?" This section proves it. Real client language. Specific pains, not generic.
**Required elements:**
- Eyebrow + H2 framing the problem
- 3-4 pain points in client language (from ICP research — never invented)
- Each pain: the emotional reality + the practical consequence
**Variation (from DESIGN_DIRECTIONS.md):** Pain ticker (scrolling), pain cards (2×2), editorial stack, or numbered list — archetype determines which.
**Emotional contract:** The prospect sees their own unspoken frustration named precisely. They feel seen.
**Cannot be removed. Cannot be reordered.**

### Section 4: TRUST ESTABLISHMENT
**Conversion job:** Credential proof — establish the advisor as qualified and safe to trust.
**Psychology:** The prospect has acknowledged their pain. Now they're evaluating: *Can this person actually help me? Are they legitimate?* This section answers with facts, not claims.
**Required elements:**
- 4-6 trust markers with custom SVG icons (never emoji)
- Standard markers: Fiduciary standard, FINRA/SEC registered, years of experience, location, fee-only
- Client-specific markers: credentials, affiliations, awards
**Quality rule:** Subtle. This is a credibility floor, not a boast. Cream background. Icons in accent gold.
**Cannot be removed. Cannot be reordered.**

### Section 5: WHO WE SERVE (ICP Self-Sort)
**Conversion job:** Qualification — help the prospect decide "does this advisor work with people like me?"
**Psychology:** The prospect is thinking *This sounds good, but do they specialize in MY situation?* If they can't self-identify, they leave. This section makes the ICPs explicit so the prospect can sort themselves.
**Required elements:**
- Eyebrow + H2 ("We specialize. Generalists are everywhere.")
- 3 ICP cards, each with: icon, title, description, "See how we work with you →" link
- Each ICP description: their situation (not demographics) + what the advisor does for them
**Emotional contract:** The prospect sees themselves in one of the cards and thinks *They work with people exactly like me.*
**Cannot be removed. Cannot be reordered.**

### Section 6: FIT ASSESSMENT (Lead Capture)
**Conversion job:** The primary MQL → SQL conversion event. Capture the prospect's information.
**Psychology:** This is the lowest-friction conversion point. The prospect has acknowledged their pain, seen the advisor is credible, and self-identified as a fit. Now they're primed to raise their hand. Make it easy, make it low-commitment, make it feel like a service (not a sales trap).
**Required elements:**
- Eyebrow + H2 ("Are we the right fit for you?")
- Subhead framing it as a service to the prospect
- 4 qualifying questions (situation / assets / concern / current advisor status)
- Email field — "Where should we send your results?"
- Submit button (primary gold)
**Quality rule:** Elevated card (Level 3 shadow). Feels like a premium tool, not a web form.
**Emotional contract:** The prospect feels like they're getting a personalized assessment, not being captured into a funnel.
**Cannot be removed. Cannot be reordered.**

### Section 7: THE SOLUTION (Services / What We Do)
**Conversion job:** Show depth — demonstrate that the advisor has a comprehensive, coordinated approach.
**Psychology:** The prospect has raised their hand (or is about to). Now they need to see *what they'd actually get.* This isn't a menu of services — it's a demonstration that the advisor sees the full picture, not just a product to sell.
**Required elements:**
- Eyebrow + H2 framing the coordinated approach
- 4-6 service blocks: name + client pain it solves + what the advisor does
- Each service must connect to a pain from Section 3 (no orphan services)
- CTA: "See All Services →" or "Learn More →"
**Emotional contract:** The prospect feels relief — *Finally, someone who can handle all of this, not just a piece.*
**Cannot be removed. Cannot be reordered.**

### Section 8: THE PATH (Process / How It Works)
**Conversion job:** Remove friction — answer "what happens if I reach out?"
**Psychology:** The #1 reason prospects don't contact an advisor is fear of the sales pitch. This section de-risks the next step. Show them exactly what happens, step by step. Make the first step feel safe and small.
**Required elements:**
- Eyebrow + H2
- 4 steps: Discovery → Assessment → Plan → Partnership
- Each step: what happens, how long, what the prospect gets
- "No obligation" reassurance callout
- CTA: "Schedule the First Call"
**Emotional contract:** The prospect thinks *Ok, the first step is just a conversation. I can do that.*
**Cannot be removed. Cannot be reordered.**

### Section 9: FINAL CTA (The Close)
**Conversion job:** Close — convert interest into action.
**Psychology:** The prospect has seen their problem, the credibility, the solution, and the path. Now they need one more push. The final CTA is warm, personal, and direct. Not aggressive. Not desperate. Just: *Here's the next step. Whenever you're ready.*
**Required elements:**
- Eyebrow (gold, centered): "The First Call Is Just a Conversation"
- H2: Direct question or invitation
- Body: 1-2 sentences of reassurance
- Two CTAs: Primary (book) + Secondary (assessment)
**Quality rule:** Dark navy. Centered. Feels like a personal invitation, not a sales banner.
**Emotional contract:** The prospect feels invited, not pressured.
**Cannot be removed. Cannot be reordered.**

---

## TIER 2: STANDARD SECTIONS (Default inclusion, droppable with reason)

These sections strengthen the conversion architecture. They are included by default. If an archetype or ICP warrants omission, Agent 02.5 must document the reason in DESIGN_BRIEF.md.

### Section: PAIN TICKER
**Position:** Between Hero (2) and Trust (4) — only if Trust Bar is present
**Conversion job:** Reinforce pain awareness immediately after the hero hook.
**When to drop:** Heritage archetype (too aggressive for warm brands), or if the Pain Cards section is editorial-style (redundant).

### Section: TRUST BAR
**Position:** Between Pain Ticker (3a) and Pain Cards (3) — OR merged into Trust Establishment (4)
**Conversion job:** Quick credential visibility above the fold of scrolling.
**When to drop:** If Trust Establishment (Section 4) is strong enough to stand alone. Can merge these two into one section.

### Section: ABOUT THE ADVISOR
**Position:** Between Solution (7) and Final CTA (9) — typically after Process (8)
**Conversion job:** Humanize the advisor. Build personal trust.
**Required elements:**
- Photo (or gradient placeholder)
- Eyebrow + H2
- Origin story (why they do this work)
- Credentials as gold-bordered chips
- CTA: "Full Story →"
**When to keep:** Always recommended. Especially critical for Heritage and Institution archetypes where the advisor's personal credibility is central to the brand.
**When to drop:** Only if the About content is entirely [PLACEHOLDER] and the advisor hasn't provided their story yet. Better to omit than ship empty.

### Section: STATS STRIP
**Position:** Between About and Final CTA
**Conversion job:** Quantified proof.
**Required elements:** 4 stats with count-up animation. At least one must be non-placeholder.
**When to drop:** If no stats are verified. Placeholder stats are worse than no stats.

### Section: TESTIMONIALS
**Position:** Between Stats and Final CTA
**Conversion job:** Peer validation.
**Required elements:** 3 testimonial cards. Must be real and compliance-approved.
**When to drop:** If no testimonials are compliance-cleared. Placeholder testimonials violate FINRA rules — never ship them.

### Section: FOOTER
**Position:** Always last.
**Conversion job:** Navigation, compliance, contact.
**Required elements:**
- 4 columns: Brand + tagline / Navigation / Specialties / Contact
- Compliance disclaimer (FINRA/SEC) — marked `<!-- COMPLIANCE: Required before launch -->`
- Copyright
**Never dropped.**

---

## TIER 3: OPTIONAL SECTIONS (Added for bigger firms / niche specialists)

These sections are NOT in the default homepage. They are added when a client's positioning, complexity, or firm size warrants them. They are inserted at defined positions and never disrupt the Tier 1 sequence.

### Optional: TEAM SECTION
**Insert at:** After About, before Stats — replaces About for multi-advisor firms
**When to add:** Multi-advisor practices, team-based firms, firms where the team is a selling point.
**Structure:** Grid of advisor cards (photo, name, title, 2-line bio, credentials)

### Optional: COMPARISON TABLE
**Insert at:** After Solution (7), before Process (8)
**When to add:** Fee-only RIAs competing against wirehouses, advisors whose key differentiator is "how we're different from where you are now."
**Structure:** Side-by-side comparison: Wirehouse vs. This Advisor. Categories: fee structure, advice, access, product focus, alignment.
**Quality rule:** Never trash competitors. State facts. Let the prospect draw the conclusion.

### Optional: RESOURCE TEASER
**Insert at:** After Testimonials, before Final CTA
**When to add:** Advisors with strong content/thought leadership, firms with a blog or resource library.
**Structure:** 3 most recent resources as cards (title, excerpt, read time, link)

### Optional: FAQ SECTION
**Insert at:** After Process (8), before About
**When to add:** When there are common objections or questions that block conversion (fees, switching advisors, what's included).
**Structure:** 6-8 questions. Accordion or editorial Q&A style.

### Optional: PHILOSOPHY / VALUES
**Insert at:** After About, before Stats
**When to add:** Heritage archetype, advisors whose brand is values-driven, advisors differentiating on philosophy rather than mechanics.
**Structure:** 3-4 values as editorial blocks. Not a generic "our values" wall.

---

## OPTIONAL PAGES (Beyond Homepage)

For bigger firms or richer sites. The homepage remains the conversion engine. These pages serve depth, SEO, and specific ICPs.

### Standard Pages (every project)
- **About** (`about.html`) — Advisor origin story, philosophy, credentials, personal side
- **Services** (`services.html`) — Full service depth, each connected to client pain
- **Who We Serve** (`who-we-serve.html`) — ICP deep dives, one per ideal client
- **Process** (`process.html`) — Expanded process + FAQ
- **Contact** (`contact.html`) — Calendly + form + what to expect

### Custom Pages (added per client complexity)
- **Team** (`team.html`) — For multi-advisor firms. Grid of advisor profiles.
- **Resources/Blog** (`resources.html`) — For thought leadership / SEO play
- **ICP Landing Pages** (`/oil-gas-executives`, `/business-owners`) — For paid traffic / high-intent SEO
- **Fee Transparency** (`fees.html`) — For fee-only RIAs differentiating on transparency
- **Assessment Standalone** (`assessment.html`) — For ad campaigns pointing directly to the fit assessment

---

## ENFORCEMENT RULES

### For Agent 02 (Strategy)
- You MUST include all 9 Tier 1 core sections in your page architecture.
- You cannot reorder them.
- You can add Tier 2 sections between them at the defined positions.
- You can add Tier 3 sections at the defined positions.
- If you omit a Tier 2 section, state why in COPY_STRATEGY.md.

### For Agent 02.5 (Design Direction)
- You MUST preserve the Tier 1 sequence in your layout pattern selections.
- You select the VISUAL INTERPRETATION of each section (from DESIGN_DIRECTIONS.md), never the structure.
- If you recommend dropping a Tier 2 section, document the reason in DESIGN_BRIEF.md.

### For Agent 03 (Copy)
- You MUST write copy for all Tier 1 core sections.
- For Tier 2 sections you're including, write copy.
- For Tier 2 sections that are dropped, skip them — they won't be in the build.
- Every pain point in Section 3 must connect to a service in Section 7.

### For Agent 04 (Build)
- You MUST build all Tier 1 core sections, in order.
- You build any Tier 2 sections that appear in COPY_ALL.md.
- You build any Tier 3 sections that appear in COPY_ALL.md.
- You apply the layout patterns from DESIGN_BRIEF.md to each section.

### For Agent 05 (QA)
- **BLOCKER:** Any missing Tier 1 section = automatic NEEDS FIXES. No exceptions.
- **BLOCKER:** Tier 1 sections in wrong order = automatic NEEDS FIXES.
- **WARNING:** Tier 2 section dropped without documented reason in DESIGN_BRIEF.md.
- **WARNING:** Pain points in Section 3 with no corresponding service in Section 7.
- **INFO:** Tier 3 sections present — flag for content review.

---

## THE EMOTIONAL JOURNEY (Why This Order)

The section sequence isn't arbitrary. It follows a psychological progression:

```
1. NAV        → "This looks legit."                    [Safety]
2. HERO       → "That's my problem."                   [Recognition]
3. PROBLEM    → "They really understand."              [Validation]
4. TRUST      → "They're qualified."                   [Credibility]
5. WHO WE SERVE → "They work with people like me."    [Belonging]
6. FIT CHECK  → "I want to see if I qualify."          [Engagement]
7. SOLUTION   → "They can actually fix this."          [Hope]
8. THE PATH   → "The first step is easy."              [Confidence]
9. FINAL CTA  → "I'm ready to reach out."              [Action]
```

Every prospect moves through these emotional stages in this order. Skipping a stage breaks the progression. Reordering stages creates friction. The sequence is the conversion architecture — it is the product.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-06-25 | Initial SECTION_MANIFEST.md — 3 tiers, 9 core sections, emotional journey, enforcement rules |
