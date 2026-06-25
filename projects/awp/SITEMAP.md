# Site Map — Anchor Wealth Planning
**Phase 1 build — 7 pages**  
**Primary conversion goal:** Book a discovery call  
**Secondary goal:** Email capture via fit assessment

---

## Page Architecture

```
/                          Homepage — MQL→SQL conversion machine
/about                     About Alex — the human behind the practice
/services                  Services overview — all offerings, one page
/who-we-serve              ICP deep dive — 3 ideal client profiles
/process                   How we work — 4-step client journey
/contact                   Book a call + contact form
/book                      [Phase 2] Dedicated Calendly embed page
```

---

## Page 1: Homepage (`index.html`)

**Purpose:** Convert cold traffic (MQL) into warm leads (SQL). This is the full conversion machine. Every section has a job.

**Section order & job:**

| Section | Component | Conversion Job |
|---------|-----------|---------------|
| 1 | NAV | Trust signal — looks like a real firm |
| 2 | Hero | Hook — "how to" question that names the problem Alex solves |
| 3 | Pain Ticker | Expand pain awareness — "that's me" moment |
| 4 | Trust Bar | Credential proof — FINRA, fiduciary, years of experience |
| 5 | Pain Cards (4) | Deep pain validation — 4 client pain quotes + context |
| 6 | ICP Self-Sort (3) | Qualification — "does this person work with people like me?" |
| 7 | Fit Assessment | Lead capture — 4 Qs + email = primary conversion event |
| 8 | Services Preview (4) | Value depth — shows breadth without overwhelming |
| 9 | Process (4 steps) | Removes friction — "what happens when I reach out?" |
| 10 | About Alex | Trust + human — photo, story, credentials |
| 11 | Stats Strip (dark) | Social proof — years, clients, AUM |
| 12 | Testimonials (3) | Peer validation — real client voices |
| 13 | Final CTA (2-path) | Close — high commitment (book) + low commitment (assessment) |
| 14 | Footer | Navigation + compliance disclaimer |

**Hero placeholder (until Alex responds):**
> "How do successful Houston professionals turn a high income into lasting financial security?"

**Compliance note:** FINRA/SEC disclaimer required in footer before site goes live.

---

## Page 2: About (`about.html`)

**Purpose:** Build deep trust with prospects who are "shopping" advisors. This is where they decide if Alex is someone they can trust with their life's work.

**Section order:**

| Section | Content |
|---------|---------|
| Sub-hero | Alex's name + short positioning statement |
| Origin story | Why Alex does this work — personal, not corporate |
| Philosophy | How he thinks about wealth management |
| Approach | What makes him different (specialist, not generalist) |
| Credentials | Designations, firms, years, licenses |
| Community | Houston roots — where he lives, invests, serves |
| Personal | Family, faith, what drives him outside work |
| CTA | Schedule a conversation |

**Copy notes:**
- Written in first person where possible ("I believe...")
- No corporate PR speak
- Must pass the "would a real person say this?" test
- Photo: professional headshot + lifestyle shot (home/office context)

---

## Page 3: Services (`services.html`)

**Purpose:** Show depth and specialization. Each service connects to a client pain. No jargon.

**Section order:**

| Section | Content |
|---------|---------|
| Sub-hero | "What we do" — brief positioning statement |
| Services intro | 1 paragraph framing the coordinated approach |
| Service blocks (4–6) | Each service: name + client pain it solves + what we do + who it's for |
| Coordination callout | Dark band — "We're the only advisor who sees the full picture" |
| ICP connection | "Not sure which applies to you? Start here." → links to /who-we-serve |
| CTA | Book a conversation |

**Services to cover:**
1. Investment Management
2. Tax Strategy & Coordination
3. Retirement & Income Planning
4. Estate & Legacy Planning
5. Equity Compensation Planning (RSUs, deferred comp)
6. Business Owner Planning

---

## Page 4: Who We Serve (`who-we-serve.html`)

**Purpose:** ICP self-selection. Prospect arrives and immediately sees themselves. Reduces sales friction dramatically.

**Section order:**

| Section | Content |
|---------|---------|
| Sub-hero | "We specialize. Generalists are everywhere." |
| ICP cards (3) | Oil & Gas Executives / Business Owners / HNW Families — click to jump |
| ICP 1 deep dive | Oil & Gas Executives — situation, pain, what we do, proof |
| ICP 2 deep dive | Business Owners — situation, pain, what we do, proof |
| ICP 3 deep dive | HNW Families — situation, pain, what we do, proof |
| Qualifying question | "Not sure if you fit? Take the 4-question assessment." |
| CTA | Book / Assessment |

**Copy note for each ICP block:**
- Lead with their SITUATION (not demographics)
- Name their pain in their language
- Show the before/after
- One client testimonial or proof point

---

## Page 5: Process (`process.html`)

**Purpose:** Remove friction from booking. The #1 reason people don't reach out to a financial advisor is fear of the sales pitch. Show them exactly what happens.

**Section order:**

| Section | Content |
|---------|---------|
| Sub-hero | "Here's what working with us actually looks like." |
| Process steps (4) | Discovery → Assessment → Plan → Partnership |
| Step deep dives | Expand each step: what happens, how long, what you get |
| "No obligation" callout | Gold band — "The first call is just a conversation." |
| FAQ | 6–8 questions about the process (fees, timeline, switching advisors, etc.) |
| CTA | Schedule the first call |

**FAQ must-include questions:**
- How do you charge?
- How long does it take to get a plan in place?
- I already have an advisor. Can I still talk to you?
- What happens in the first meeting?
- How do I know if you're a fiduciary?
- Do you work with clients outside Houston?

---

## Page 6: Contact (`contact.html`)

**Purpose:** Make it easy to start. Two paths: book directly or send a message.

**Section order:**

| Section | Content |
|---------|---------|
| Sub-hero | "Let's start the conversation." |
| Two columns | Left: Calendly embed (or placeholder) / Right: Contact form |
| Contact info | Phone, email, Houston office address (if applicable) |
| What to expect | "After you submit, here's what happens next" — removes anxiety |
| Final reassurance | Compliance note + "Your information is never shared" |

**Calendly placeholder:** `<!-- CALENDLY: Embed booking widget here —  requires Alex's Calendly URL -->`

---

## Phase 1.5 (future — high SEO value)

```
/oil-gas-executives        Dedicated landing page for energy ICP
/business-owners           Dedicated landing page for business owner ICP
```

These are high-intent search pages. Someone searching "financial advisor for oil and gas executives Houston" lands on a page built for them specifically. Significantly higher conversion than a generic homepage.

---

## Phase 2 (later)

```
/resources                 Blog / thought leadership (SEO)
/resources/[article-slug]  Individual article pages
/assessment                Standalone assessment page (for ads/campaigns)
/thank-you                 Post-form / post-booking confirmation
```

---

## Navigation Labels

| Page | Nav Label |
|------|-----------|
| / | (logo = home) |
| /about | About |
| /services | Services |
| /who-we-serve | Who We Serve |
| /process | Process |
| /contact | Contact |
| /contact | Book a Call (CTA button, gold) |

---

## Footer Structure

**Column 1:** Logo + tagline + brief practice description  
**Column 2:** Navigation links  
**Column 3:** Contact info (phone, email, Houston TX)  
**Column 4:** (optional) Social links (LinkedIn)

**Footer bottom bar:**  
- Compliance disclaimer (FINRA/SEC — required before launch)
- © 2026 Anchor Wealth Planning
- Privacy Policy link (Phase 2)
