# Advisor Growth Lab site

Static, Replit-ready website for Advisor Growth Lab. No build step is required.

## Replit handoff

Johnny should begin with [`JOHNNY-REPLIT-CHECKLIST.md`](JOHNNY-REPLIT-CHECKLIST.md). It contains the exact upload, production connection, custom-domain, testing, and Google/Bing sitemap submission checkboxes required for launch.

The clean package is published on the [`agl-replit-handoff` branch](https://github.com/caebaby/website-factory/tree/agl-replit-handoff), with a [direct ZIP archive](https://github.com/caebaby/website-factory/archive/refs/heads/agl-replit-handoff.zip). Because the repository is private, Johnny needs collaborator access or the downloaded ZIP must be sent to him.

## Run locally or in Replit

```bash
npm start
```

The server uses `PORT` when Replit supplies it and defaults to port `3000` locally.

## Site map

```text
/
├── index.html                         Home
├── private-research/index.html        Hidden/noindex research draft
├── evidence/index.html                Evidence and methodology
├── who-we-are/index.html              Who We Are
├── start-here/index.html              Hidden/noindex assessment fallback
├── schedule/index.html                On-site Calendly booking page
└── resources/
    ├── index.html                     Resource hub
    ├── articles/index.html            Article directory
    ├── podcast/
    │   ├── index.html                 Podcast directory
    │   ├── am-i-ready-to-leave-my-firm.html
    │   ├── retention-offer-after-acquisition.html
    │   └── forgivable-note-clawback.html
    ├── am-i-ready-to-leave-my-firm.html
    ├── retention-offer-after-acquisition.html
    └── forgivable-note-clawback.html
```

Every internal route is relative, so the folder can be served at a domain root or previewed locally.

## Required production connections

Search for `data-verify` before launch. Three external connections are intentionally pending, along with approved team content and privacy copy:

- `calendly-embed-url`: in `schedule/index.html`, replace `https://calendly.com/YOUR_LINK` with the production Calendly event URL. The page loads Calendly's supported inline widget only when a real URL is present. The assessment's “yes” path and every booking CTA already route to this on-site scheduling page.
- `lead-form-endpoint`: replace the research follow-up form's `action="#"` with the production GHL, CRM, or form-handler endpoint. The research path submits first name, email, all six assessment answers, and a tailored `redirect_url`. The production handler should preserve or redirect to that URL after capture. With `action="#"`, the static preview redirects locally without transmitting personal information.
- `newsletter-endpoint`: replace the daily briefing form's `action="#"` with the production email-platform or GHL endpoint. With `action="#"`, the static preview shows the confirmation state without transmitting the email address.

Johnny's checklist breaks these into five numbered production items and includes test criteria for each one.

The resource directory links, assessment route, article directory, podcast directory, and site navigation are already connected internally.

## Link verification

```bash
npm run check
```

This checks every local `href` and `src`, including URL fragments, then validates the public sitemap, canonical URLs, index directives, titles, descriptions, social metadata, JSON-LD, source sections, RSS discovery, and reciprocal article/podcast links.

The repeatable publishing requirements are documented in `SEO-GEO-PUBLISHING.md`.

## Content notes

- The first three podcast entries have dedicated episode pages with transcripts, related reading, and a floating conversion rail. Add production audio to those pages when it is ready.
- The remaining podcast topics are marked as planned on the podcast directory and should be linked to their final episode pages when published.
- Private Research and Start Here are retained as noindex fallback routes, but are hidden from public navigation and the sitemap.
- The Who We Are portraits are intentionally marked placeholders. Replace them with approved photos of Chris and Johnny before launch.
- Keep the disclosure in every footer.
- Figures and projections must remain sourced and clearly labeled as illustrative where applicable.
