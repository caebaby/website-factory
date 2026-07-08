# AGL Site — Replit Handoff
One folder, zero build steps. Drag everything in this folder into a Replit static site
(or any static host) and it serves as-is. Every page is self-contained — fonts and images
are inlined; there are no external requests, no npm, no build.

## File map

```
handoff/
├── index.html                                    ← Home (+ built-in sample report view at #report)
├── README.md                                     ← this file (don't deploy; harmless if you do)
└── resources/
    ├── index.html                                ← "The Lab" — episode hub (nav label: The Lab)
    ├── am-i-ready-to-leave-my-firm.html          ← Episode post (July 6)
    ├── retention-offer-after-acquisition.html    ← Episode post (July 7)
    └── forgivable-note-clawback.html             ← Episode post (July 8) ← newest / featured
```

All links between pages are relative — the folder works at the domain root or in a subfolder.

## The two things waiting on Chris (both are one-line edits)

1. **Booking URL** — every "Book a private call" button that isn't wired yet is marked:
   `href="#" data-verify="booking-url"`
   Search each file for `data-verify="booking-url"` and replace `#` with the real
   Calendly/SavvyCal/GHL link (keep or drop the data-verify attribute — once the real URL
   is in, drop it). Files affected: `index.html` (guide card) + all 3 episode posts
   (end-of-post secondary CTA).
2. **Subscribe endpoint** — the hub's "Get the daily briefing" button is marked:
   `href="#" data-verify="subscribe-endpoint"` in `resources/index.html`.
   Point it at the GHL form/landing URL when Chris supplies it.

Until those land, the buttons are visibly styled but intentionally inert — that's the
factory's no-dead-CTA discipline (a declared pending endpoint, not a bug).

## How to add a new episode (≈10 minutes, no design skills)

1. **Copy** the newest post file (e.g. `forgivable-note-clawback.html`) →
   `resources/<new-keyword-slug>.html`. The slug IS the search phrase
   ("why-advisors-leave-wirehouses"), never an episode number.
2. **Edit the head:** `<title>`, `<meta name="description">`, `<link rel="canonical">`,
   the three `og:` tags, and the JSON-LD block (headline, description, datePublished, url).
3. **Edit the hero:** breadcrumb short name, kicker category, H1, dek, `<time>` date.
4. **Replace the article body** (`<article class="article">` → inside `.prose`):
   H2s are the literal questions advisors type; keep the mid-post assessment CTA
   (`.midcta`) after the biggest insight; keep the end conversion block untouched.
5. **Update the related-briefings cards** at the bottom (link the 2 most relevant siblings).
6. **Surface it** in three places:
   - `resources/index.html`: update the featured card to the new post AND add a row to
     the "All briefings" list (newest first).
   - `index.html` home "The Lab" section: add the new card, remove the oldest (keep 3).
   - Add the new post as a "related briefing" on 1–2 older sibling posts.
7. **Compliance checklist per post** (non-negotiable): every dollar/percent figure is a
   labeled illustrative range ("illustrative, not an offer, estimate, or guarantee");
   movement stats name their public source (SEC/FINRA/BrokerCheck, or the named study);
   no invented advisor stories or testimonials; unknown fact = ask Chris, don't guess.

When audio ships: replace the "Audio edition coming soon" line with the player embed and
add a `PodcastEpisode` object to the post's JSON-LD.

## What's already true on every page

- Conversion: every page routes to the assessment (`index.html#report` = the sample
  report experience for now) and the private call. Don't add CTAs that go anywhere else.
- The Axiom disclosure lives in every footer — never remove it.
- Design system is locked (`projects/agl/v9/DESIGN_SYSTEM.md` in the factory repo):
  indigo #4338CA accent, Schibsted Grotesk + Newsreader italic, 10px-radius buttons.
  Copy edits are welcome; restyling is not.

## QA before deploy (optional but recommended)

From the factory repo: `node qa/run-pipeline.js <page.html> --critic-doc projects/agl/v9/DESIGN_SYSTEM.md`
— all five pages shipped PASS through that gauntlet on 2026-07-08.
