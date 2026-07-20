# Anchor content SEO/GEO production preflight

Google treats generative-search visibility as an extension of foundational SEO. The production goal is original, expert-led, source-backed content with clear technical structure, not separate AI-targeted copy.

## Review build, current

- `resources.html`: `CollectionPage` plus `ItemList` JSON-LD.
- `blog-template.html`: `BlogPosting`, `BreadcrumbList`, and visible `FAQPage` JSON-LD; answer-first summary; named IRS and SEC primary sources; contextual internal links; explicit decision, document, and FAQ sections.
- `podcast-template.html`: `PodcastEpisode` plus `PodcastSeries` JSON-LD, episode notes, written companion, related article and conversion route.
- All three review pages are `noindex,nofollow`.
- Local metadata/schema preflight: `/tmp/check-anchor-content.js` during the 2026-07-17 build session.

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
