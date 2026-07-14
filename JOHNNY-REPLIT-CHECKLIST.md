# Johnny's Replit launch checklist

This is the production handoff for the Advisor Growth Lab website. The design, responsive layouts, internal links, assessment routing, article and podcast templates, sitemap, RSS feed, and SEO/GEO markup are already in place.

Complete the unchecked items below in Replit before pointing the public domain at the site.

## 1. Import and run the package

- [ ] Open the [Replit-ready GitHub branch](https://github.com/caebaby/website-factory/tree/agl-replit-handoff) or [download its ZIP archive](https://github.com/caebaby/website-factory/archive/refs/heads/agl-replit-handoff.zip). The repository is private, so Chris must either add you as a GitHub collaborator or download the ZIP and send it to you.
- [ ] Unzip it, then upload the **contents of the handoff folder** into the root of a new Replit App. The root must contain `.replit`, `package.json`, `server.js`, and `index.html`—do not place them inside another folder.
- [ ] In Replit, click **Run**. Replit should use `npm start`; no build command or dependency installation is required.
- [ ] Open the preview and confirm the homepage, `/resources/`, `/resources/articles/`, `/resources/podcast/`, `/who-we-are/`, `/evidence/`, and `/schedule/` all load.
- [ ] In the Replit Shell, run `npm run check`. Do not publish until both the link check and SEO/GEO check pass.

Official reference: [Import a project into Replit](https://docs.replit.com/build/import-from-providers).

## 2. Complete the five production connections

Search the Replit codebase for `data-verify`. Each result marks an intentional launch-time connection.

### Item 1 — Connect Calendly

- [ ] Open `schedule/index.html`.
- [ ] Replace `https://calendly.com/YOUR_LINK` with the final Advisor Growth Lab Calendly event URL.
- [ ] Test the assessment's **Yes—show me available times** path and at least one **Book a private conversation** link. Both should open `/schedule/`, display live availability, and complete a test booking.

### Item 2 — Connect the assessment follow-up to the CRM

There are two versions of the same research follow-up form so the assessment works on the homepage and from the site-wide drawer.

- [ ] Replace `action="#"` on the form marked `data-verify="lead-form-endpoint"` in `index.html`.
- [ ] Replace `action="#"` on the form marked `data-verify="lead-form-endpoint"` in `assets/assessment-drawer.js`.
- [ ] Point both forms to the same approved GHL, CRM, or server-side form-handler endpoint.
- [ ] Confirm the handler receives `first_name`, `email`, the six assessment answers, and `redirect_url`.
- [ ] Preserve the supplied `redirect_url` after capture so a person who is not ready to talk lands on the article matched to their answers.
- [ ] Submit one test lead from the homepage and one from an interior page. Confirm both records reach the CRM and redirect correctly.

Do not put private API keys in HTML or JavaScript. Secrets belong in Replit Secrets and must be used only by server-side code.

### Item 3 — Connect the daily briefing form

- [ ] Open `resources/podcast/index.html`.
- [ ] Replace `action="#"` on the form marked `data-verify="newsletter-endpoint"` with the approved email-platform, GHL, or server-side form-handler endpoint.
- [ ] Confirm the email field maps to the correct list and that consent/source data is recorded.
- [ ] Submit a test email and confirm the contact reaches the correct list and receives the intended confirmation or welcome email.

### Item 4 — Add approved team photos and final bios

- [ ] Add optimized WebP portraits for Chris and Johnny to `assets/`. Use descriptive names such as `chris-evans.webp` and `johnny-lastname.webp`.
- [ ] In `who-we-are/index.html`, replace both initial-based portrait placeholders with responsive `<img>` elements that have accurate alt text, explicit width and height, and `loading="lazy"`.
- [ ] Confirm Johnny's full public name, title, and bio.
- [ ] Have Chris and Johnny approve both bios and photos.

Recommended portrait export: 1200 × 1500 pixels, WebP, ideally below 250 KB each.

### Item 5 — Add privacy and data-handling copy

- [ ] Have qualified counsel approve the privacy language before collecting personal information. This checklist is operational guidance, not legal advice.
- [ ] Create `privacy/index.html` using an existing content-page header/footer so it remains visually consistent.
- [ ] Explain what the assessment, CRM form, newsletter form, analytics, and Calendly collect; why the data is collected; who processes it; how long it is retained; and how someone can request access or deletion.
- [ ] Add a visible **Privacy** link to the footer of every public page and to the assessment/newsletter capture areas.
- [ ] Add the final privacy URL to `sitemap.xml`, then run `npm run check` again.

## 3. Publish on the canonical domain

The site is configured around one canonical origin: `https://advisorgrowthlab.com` (no `www`). The server redirects `www.advisorgrowthlab.com` to that origin and prevents Replit preview domains from being indexed.

- [ ] Publish the Replit App.
- [ ] In Replit's Publishing tool, connect `advisorgrowthlab.com` as the custom domain and apply the DNS records Replit provides.
- [ ] If `www.advisorgrowthlab.com` is also connected, confirm it redirects to `https://advisorgrowthlab.com`.
- [ ] Confirm HTTPS works without a certificate warning.
- [ ] Keep the `.replit.app` preview URL out of marketing and do not submit it to search engines.

Official reference: [Connect a custom domain in Replit](https://docs.replit.com/features/publishing/custom-domains).

## 4. Live-site quality check

- [ ] Run `npm run check` one final time in Replit.
- [ ] Test the live homepage and navigation on a phone and desktop.
- [ ] Complete both assessment outcomes: **Yes** should reach live Calendly; **Not yet** should capture the lead and show the matched article.
- [ ] Submit the newsletter form and confirm delivery to the intended platform.
- [ ] Confirm these production files return a successful page, not a Replit error:
  - `https://advisorgrowthlab.com/robots.txt`
  - `https://advisorgrowthlab.com/sitemap.xml`
  - `https://advisorgrowthlab.com/feed.xml`
- [ ] Confirm the private utility pages (`/start-here/`, `/private-research/`, `/schedule/`, and `/hero-options.html`) remain absent from `sitemap.xml`.
- [ ] Check at least one article in [Google's Rich Results Test](https://search.google.com/test/rich-results) and resolve any errors. Warnings can be reviewed case by case.

## 5. Submit the sitemap to Google and Bing

Do this only after the custom domain is live and the live-site quality check passes.

### Google Search Console

- [ ] Add and verify the Domain property `advisorgrowthlab.com` in [Google Search Console](https://search.google.com/search-console/). DNS verification is preferred because it covers all protocols and subdomains.
- [ ] Use URL Inspection to confirm `https://advisorgrowthlab.com/` is publicly fetchable.
- [ ] Open **Sitemaps**, submit `https://advisorgrowthlab.com/sitemap.xml`, and confirm the status becomes **Success**.
- [ ] Request indexing for the homepage and the most important resource pages after the sitemap is accepted.

Official reference: [Google Search Console Sitemaps report](https://support.google.com/webmasters/answer/7451001).

### Bing Webmaster Tools

- [ ] Add and verify `https://advisorgrowthlab.com` in [Bing Webmaster Tools](https://www.bing.com/webmasters/). Importing the verified Google Search Console property is acceptable if offered.
- [ ] Open **Sitemaps**, submit `https://advisorgrowthlab.com/sitemap.xml`, and confirm it is accepted without errors.
- [ ] Run Bing's Site Scan after the first crawl and resolve material errors.

Official reference: [Bing Webmaster Tools sitemap guidance](https://www.bing.com/webmasters/help/Sitemaps-3b5cf6ed).

## 6. Final handoff record

- [ ] Record the Replit App owner and editor access.
- [ ] Record the domain/DNS owner.
- [ ] Record the Calendly event owner.
- [ ] Record the CRM and newsletter list names.
- [ ] Record who owns Google Search Console and Bing Webmaster Tools.
- [ ] Save the launch date and the GitHub commit used for launch.

## Publishing new articles and podcast episodes

Follow `SEO-GEO-PUBLISHING.md` every time a new page is added. At minimum, update the page metadata and JSON-LD, add the URL to `sitemap.xml`, add it to `feed.xml`, link it from the relevant directory, add contextual links from related pages, and run `npm run check` before publishing.
