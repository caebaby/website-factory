# SEO and generative-search publishing standard

This site treats search visibility as a publishing-system requirement. Rankings and citations are never guaranteed, but every public page must be crawlable, attributable, source-backed, and connected to the rest of the publication.

## Topic architecture

Assign every article and episode one primary topic before publishing:

1. Advisor transition readiness
2. Business-model alignment
3. Transition economics and recruiting packages
4. Client portability and transition planning
5. Practice valuation, succession, and exit
6. Advisor growth and digital marketing

Do not create empty topic pages. Add a dedicated topic hub when a topic has at least three substantive resources. The hub should define the subject, answer the core question, and link to every article and episode in that cluster.

## Article requirements

- One specific search intent and one primary topic.
- A unique title, meta description, canonical URL, H1, and social-preview description.
- A direct answer near the beginning of the page.
- Question-led H2 sections with the answer stated before supporting detail.
- Visible author or publishing organization, publication date, and honest modified date.
- Inline source links beside material factual claims.
- A visible Sources and further reading section.
- `BlogPosting`, `FAQPage` when the visible article is genuinely question-led, and `BreadcrumbList` JSON-LD.
- A crawlable 1200px-or-larger representative image in metadata and schema.
- A descriptive link to the companion podcast episode, two contextually related resources, the relevant evidence page when applicable, and one proportionate conversion action.

## Podcast episode requirements

- A unique episode page with a complete HTML transcript.
- `PodcastEpisode` and `BreadcrumbList` JSON-LD.
- Episode number, publication and modified dates, description, image, publisher, topic, and companion article relationship.
- A descriptive link to the companion article and two related episodes.
- When production audio is available, add a real HTML audio player, duration, audio URL, MIME type, and `associatedMedia` metadata. Do not add an empty audio URL or placeholder enclosure.
- Replace the general resources RSS feed with or supplement it with a standards-compliant podcast feed when audio distribution begins.

## Internal linking rules

Every resource should link upward, sideways, and forward:

- Upward: resource directory and eventual primary-topic hub.
- Sideways: companion article or episode plus two closely related resources.
- Forward: assessment, relevant research, or booking page based on visitor readiness.

Use anchors that name the destination and its value. Avoid generic anchors such as Read more, Learn more, or Click here. Do not place unrelated links merely to increase link count.

## Source standard

- Prefer regulators, public filings, original research, and first-party reports.
- Link a numerical or regulatory claim at the point where it appears.
- Distinguish reported facts, Advisor Growth Lab interpretation, and illustrative calculations.
- Label invented examples as illustrative in both visible copy and structured data.
- Do not publish precise percentages, offer ranges, legal conclusions, or tax conclusions without a source and appropriate qualification.
- Update `dateModified` only when the page receives a meaningful content change.

## Publishing checklist

1. Add the public URL to `sitemap.xml` with an accurate `lastmod` date.
2. Add the resource to `feed.xml`.
3. Add it to the correct directory and resource-hub list.
4. Add reciprocal article and episode links.
5. Add at least two visible authoritative source links for a substantive article.
6. Run `npm run check` before deployment.
7. Validate new structured data with Google's Rich Results Test after deployment.
8. Submit the sitemap and inspect important URLs in Google Search Console and Bing Webmaster Tools.

## Crawler policy

`robots.txt` allows standard search crawlers and explicitly allows OAI-SearchBot for ChatGPT Search discovery. Training-crawler policy is a separate business decision and should not be changed implicitly as part of search optimization.
