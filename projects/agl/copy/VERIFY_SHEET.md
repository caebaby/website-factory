# AGL — [VERIFY] Sheet (everything waiting on Chris)
One page. Each item: what's blocked, where it lives, what to send back. Updated 2026-07-08.

| # | Item | Where it appears | What Chris sends | Until then |
|---|---|---|---|---|
| 1 | **Booking URL** (Calendly/SavvyCal/GHL) | Guide-card CTA on home (`data-verify="booking-url"`); LED-042 says the LIVE preview still has 3 dead CTAs — redeploy needs this | The link | CTA declared pending; gauntlet treats as P1 non-blocking |
| 2 | **Guide name + photo + title** | Home "Who we are" guide card (currently `[Guide name]` + PHOTO placeholder) | Name (Lane? Chris?), headshot, confirm quote attribution | Placeholder stays visibly labeled |
| 3 | **"hundreds of advisors"** claim | Home "Decide in a private room" feature row ("a guide who has walked hundreds of advisors through this") | Confirm the number is defensible, or approve softened wording ("advisor after advisor") | Copy pass will propose the soft version |
| 4 | **Podcast name + one-liner** | /resources hero, episode template, JSON-LD `PodcastSeries`, home content section | The name + one sentence | Placeholder "The Advisor Growth Lab Podcast" [VERIFY] |
| 5 | **Episode audio hosting/embed** | Episode template player block | Platform choice (Spotify/Transistor/self-host) + embed pattern | Template ships text-first; player slot is a labeled pending block |
| 6 | **Newsletter name** ("Inside the Lab" per STRATEGY_MAP) | /resources subscribe line (if used) | Confirm still current | Not printed until confirmed |
| 7 | **Public contact email** | Footers | The address | Footer omits email (links only) |
| 8 | **Pixel snippet** (i.advisorgrowthlab.com) | All pages `<head>` if wanted at launch | The snippet, or "skip for v1" | Not embedded |
| 9 | **"90+ advisors"** (network size) | NOT on any page currently — held per accuracy rule | Jerry's confirmation if we ever want it | Never used |
| 10 | **Memphis testimonial videos** | Future proof section | Final edits + compliance sign-off | No testimonials anywhere (per no-fabrication rule) |
| 11 | **Brand-default og:image** | Hub + episode posts (social share cards) | A 1200×630 share image (or "make one from the brand mark") | Pages ship without og:image; twitter:card=summary |
| 12 | **Subscribe endpoint** (GHL form for the daily briefing) | Hub hero CTA (`data-verify="subscribe-endpoint"`) | The GHL form/landing URL | Declared pending; P1 non-blocking |
| 13 | **Compliance review: naming Commonwealth→LPL** | Home intelligence section ("When Commonwealth sold to LPL, the movement was visible in the filings…") | Becky/compliance OK per the STRATEGY_MAP review path — it's a publicly reported acquisition, framed as public-record fact, but it names firms | Line ships; swap to a no-names version on objection: "When a national BD gets acquired, the movement is visible in the filings within weeks." |
| 15 | **Outbound email sequences (Johnny)** | Hero sub's "If we reached out to you, that's why" + the whole first-screen message match | The actual email copy/angles being sent | Hero written traffic-agnostic; congruence pass pending the sequences (OUTBOUND_ARRIVAL.md) |
| 14 | **"List the firms people have left"** (Chris's ask, 2026-07-08) | Wants real firm-level departure data on the home page | Decision: this needs the live Track B data feed to be honest (real counts, real firms, refreshed). Until then the movement wire stays illustrative-labeled | Parked — revisit when Track B ships |

**Standing accuracy rules honored on every page:** ~725K universe = public-filings-footed;
9,400/18,000 = starred illustrative; deal economics = illustrative ranges + not-an-offer;
sample report = fictional + labeled; Axiom disclosure in footer + who-section; Lane = peer,
never recruiter; no income promises.
