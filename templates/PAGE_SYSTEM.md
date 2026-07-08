# PAGE_SYSTEM — Resources / Blog / Episode pages (the SEO engine)
*Designed 2026-07-08 during the AGL pilot (first client with a content engine). This is the
factory's blueprint for organic-traffic surfaces: a /resources index + per-post/episode pages.
Status: v1 — harvested from the AGL build; refine per client.*

**The job:** every post is a landing page for one search intent, and every post resolves to
the site's conversion event (CONVERSION LAW — same law as interactive elements). A blog that
"builds the brand" without routing to the MQL is decoration; kill it.

## 1. Architecture (three surfaces, one loop)

```
ORGANIC (search / AI answers)          SITE
  └── /resources/<slug>.html   ←──  home content section (3 latest + "all episodes")
        │  hook → payload → conversion block
        ├──→ MQL: assessment CTA (primary, mid-post + end)
        ├──→ SQL: booking CTA (secondary, end)
        └──→ 2–4 internal links: related posts + /resources + home section anchor
  /resources/index.html = category hub: hero (value prop for the FEED itself, e.g. subscribe)
        + featured post + reverse-chron list + conversion rail
```

- **Home page gets a content section** (routes to /resources) — the hub inherits the home
  page's authority; posts inherit the hub's. Three-tier internal linking, no orphan pages.
- **URL shape:** `/resources/<keyword-slug>.html` — slug = the search phrase, not the episode
  number ("why-advisors-leave-wirehouses", not "ep-014"). Episode number lives in metadata.

## 2. Per-page SEO contract (the checklist a post must pass)

1. **One search intent per post.** `<title>` = intent phrase + brand (≤60 chars).
   `<meta name="description">` = the hook, 140–155 chars, ends in the payoff promise.
2. **Semantic skeleton:** single `<h1>` (the hook headline); `<article>` wraps the post;
   `<h2>` for content beats (question-shaped where natural — snippet/AI-answer bait);
   `<time datetime>` on the date; `<nav aria-label="Breadcrumb">` home → resources → post.
3. **Open Graph + Twitter:** `og:type=article`, `og:title`, `og:description`, `og:url`,
   `og:image` (per-post or brand default), `twitter:card=summary_large_image`.
4. **schema.org JSON-LD, one block per page:**
   - Post page: `PodcastEpisode` (when audio exists) nested in / alongside `BlogPosting`
     (`headline`, `datePublished`, `author` → Organization, `publisher`, `description`,
     `mainEntityOfPage`). If the post answers listable questions, add `FAQPage` with the
     real Q/As from the body — never invented ones.
   - Hub: `CollectionPage` + `ItemList` of posts. Home section: none needed.
   - `Organization` (publisher) declared once per page, referenced by `@id`.
5. **Canonical** `<link rel="canonical">` on every page (hub and posts).
6. **Internal links:** every post links ≥2 sibling posts + the hub; the hub links every post;
   the home section links the hub + latest 3. Anchor text = the target's intent phrase,
   never "click here" / "read more" alone.
7. **Media:** audio/video embeds get a text payload equivalent (the post IS the content;
   the player is progressive enhancement). Images get real `alt`. Embeds `loading="lazy"`.
8. **No index bloat:** tag/category archive pages only when a category has ≥5 posts;
   until then the hub is the only archive.

## 3. Direct-response post anatomy (hook → payload → conversion)

Order is fixed; skinning follows the client's design system.

1. **Breadcrumb + kicker** (episode nº / category — true taxonomy only, R6).
2. **H1 hook** — the search intent phrased as the reader's stakes, not the topic
   ("What a comp-grid change means for your next 24 months", not "Episode 14: Comp Grids").
3. **Dek** (2–3 sentences): who this is for + the payoff. This doubles as meta description.
4. **Player block** (when audio exists) — with duration; degrades to nothing broken.
5. **Payload** — the actual insight, 600–1,200 words, scannable H2 beats, ≤65ch measure.
   Numbers follow the client's proof rules (public-footing or labeled illustrative).
6. **Mid-post conversion moment** — ONE inline CTA after the biggest insight beat, framed
   as the natural next step of the insight ("see where you stand"), never a banner ad.
7. **End conversion block** — the full offer: primary CTA (MQL: assessment/lead magnet),
   secondary (SQL: booking). Restate privacy/no-pressure objection handlers here.
8. **Related posts** (2–3) + back-to-hub link.
9. **Footer** = site footer with compliance/disclosure intact (every page carries it).

**Hub anatomy:** compact dark hero (the feed's value prop + subscribe/latest CTA) →
featured post card → reverse-chron post list (title-as-link + dek + date + duration) →
conversion rail (assessment card) → footer. The hub is a conversion page that happens
to list posts — not an archive with a CTA bolted on.

## 4. Production contract (how a new post ships)

- A post = ONE self-contained HTML file copied from the client's episode template, plus one
  entry added to: the hub list, the home section's "latest" slots (roll the oldest off), and
  2+ related-post blocks on siblings. That's the whole surface area — no build step.
- The template carries `<!-- POST-META -->` comment markers at every per-post edit point
  (title, description, canonical, OG, JSON-LD, date, slug, player src, body, related links)
  so a non-designer (or an agent) can produce a post without touching layout.
- Every post runs the same gauntlet as any page (`qa/run-pipeline.js`) before deploy.
- Facts discipline unchanged: unknown fact = [VERIFY], unknown endpoint = `data-verify`.

## 5. What stays client-flexible

Palette/typography/section skinning (the client's design system), hero treatment, category
taxonomy, media type (podcast/video/article), CTA offer (assessment vs guide vs call). The
INVARIANTS are: one intent per post, the anatomy order in §3, the SEO contract in §2, the
three-tier linking in §1, and conversion presence per CONVERSION LAW.
