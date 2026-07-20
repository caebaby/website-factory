# Anchor content SEO/GEO production preflight

Google treats generative-search visibility as an extension of foundational SEO. The production goal is original, expert-led, source-backed content with clear technical structure, not separate AI-targeted copy.

## Review build, current

- `resources.html`: `CollectionPage` plus `ItemList` JSON-LD.
- `blog-template.html`: `BlogPosting`, `BreadcrumbList`, and visible `FAQPage` JSON-LD; answer-first summary; named IRS and SEC primary sources; contextual internal links; explicit decision, document, and FAQ sections.
- `podcast-template.html`: `PodcastEpisode` plus `PodcastSeries` JSON-LD, episode notes, written companion, related article and conversion route.
- All three review pages are `noindex,nofollow`.
- Local metadata/schema preflight: `/tmp/check-anchor-content.js` during the 2026-07-17 build session.

## Resource sitemap and publishing contract

The review build is static, but its page types map directly to a future CMS. New content must create a new detail URL; it must not overwrite the current article or podcast page.

```text
/resources/                         Resource directory: every format, filtered by decision topic
/resources/articles/<slug>/         One article or framework detail page
/resources/podcast/                 Anchor Wealth Podcast series archive when the catalog grows
/resources/podcast/<episode-slug>/  One episode page with audio, transcript, notes, and related links
```

Current review mapping:

- `resources.html` is the resource directory and carries the latest three podcast conversations.
- `blog-template.html` is the article-detail template.
- `podcast-template.html` is the episode-detail template.
- The three podcast previews currently share one review template. Production publishing gives every episode its own clean URL.

Required fields for every published resource:

- format: article, podcast, framework, or checklist;
- title, slug, concise answer-first summary, decision topic, and intended client group;
- author or host, publish date, modified date, and approved social image;
- primary sources and disclosure notes where financial claims require them;
- one related audience/service route, one trust route, and one contextual Fit Check CTA;
- podcast only: audio file or feed URL, duration, episode number, platform links, transcript, and episode notes.

Publishing behavior:

1. Create a unique detail page from the correct template.
2. Add one crawlable entry to the resource directory and its `ItemList` schema.
3. If it is a podcast, promote the newest three episodes into the Anchor Wealth Podcast feature block.
4. Add the clean URL to the XML sitemap and podcast feed where applicable.
5. Verify metadata, structured data, internal links, transcript, and Fit Check path before indexing.

This keeps the static review credible now and makes the content model portable to WordPress, Webflow, or another CMS later without changing the visible information architecture.

## Required before production indexing

1. Confirm the production domain and replace relative canonicals with final absolute URLs.
2. Replace review filenames with clean slugs, for example `/resources/rsu-vesting-tax-timing/`.
3. Remove review `noindex,nofollow`; confirm production robots and XML sitemap inclusion.
4. Approve the author byline, publish date, modified date, and firm disclosure.
5. Render crawlable 1200×630, 1200×900, and 1200×1200 article images; replace SVG-only social preview if the platform requires raster media.
6. Validate JSON-LD with Google Rich Results Test after final URLs and images exist.
7. Add real podcast audio, duration, transcript, platform URLs, and media metadata before adding listen controls or platform buttons.
8. Install licensed Adobe Garamond Pro and Proxima Nova webfonts if Alex supplies valid web licenses. Until then, retain the approved Phase-1 substitutes EB Garamond and Nunito Sans.
9. Confirm Search Console, Google Business Profile, analytics, and the sitemap after deployment.

## Content standard

- Answer the primary query near the top without repeating the headline.
- Add analysis or experience that cannot be produced from generic summaries alone.
- Use primary sources for tax, legal, regulatory, and investment facts.
- Show the author or responsible organization and link to a real bio or About page.
- Organize directory filters around client problems, not content formats.
- Every article links to one related service/audience page, one trust page, and one contextual conversion route.
- Do not expose `[VERIFY]`, dates-to-fill, read-time tokens, pending links, or internal compliance notes.
- Keep every FAQ answer visible in the HTML and identical in substance to its structured-data answer.
- Date-sensitive rates and thresholds must name the applicable year and be rechecked against the current primary publication before each annual update.
