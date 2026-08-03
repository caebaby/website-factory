# Anchor Replit launch checklist

## 1. Import and review

- [ ] Upload the contents of this handoff folder into the root of a new Replit App.
- [ ] Click **Run**; no build or install command is required.
- [ ] Run `npm run check` in the Replit Shell.
- [ ] Open every route listed in `README.md` and confirm navigation, footer links, images, and video playback.
- [ ] Confirm `Client Login` opens Investor360 in a new tab from both navigation and footer.

## 2. Complete production inputs

- [ ] Supply the exact legal entity name, registration status, and compliance-approved disclosure.
- [ ] Obtain compliance approval for Alex's title, biography, 19 years, APMA®, and CRPC®.
- [ ] Resolve the missing `$5M–$10M` Fit Check band.
- [ ] Connect the Fit Check result to the approved CRM/scheduling workflow and confirm the one-business-day response promise is operational.
- [ ] Add approved team biographies/headshots and final wording for the Axiom relationship.
- [ ] Replace review story/podcast media notes with approved production media, duration, audio URLs, and platform links.
- [ ] Confirm final photography/video approvals against `assets/SOURCES.md`.

Do not place private keys in HTML or JavaScript. Any future server-side connection must use Replit Secrets.

## 3. Mobile and interaction check

- [ ] At 390px, open/close the navigation on every page and confirm no horizontal scrolling.
- [ ] At 390px, confirm the family hero video fills the viewport without borders or blurred bands.
- [ ] At 390px, confirm all six Fit Check need choices are readable and selectable; complete the full auto-advance flow.
- [ ] At 820px, confirm the collapsed homepage navigation opens and closes correctly.
- [ ] At 1440px, confirm all three hero videos cover the hero and the audience-card crops keep their subjects centered.
- [ ] Test keyboard focus, reduced motion, pause/play controls, the resource filters, and the podcast/article links.

## 4. Production domain and search readiness

- [ ] Connect the approved canonical domain in Replit Publishing.
- [ ] Replace relative canonical URLs with absolute URLs on the final domain.
- [ ] Change `noindex,nofollow` only after compliance and content approval.
- [ ] Replace the review `robots.txt` with the approved production crawler policy.
- [ ] Create `sitemap.xml` with every indexable route and accurate modification dates.
- [ ] Add final Open Graph images and absolute social URLs.
- [ ] Validate article and podcast structured data and add real podcast media fields only when audio exists.
- [ ] Run `npm run check` again, then test the live custom-domain pages on phone and desktop.

## 5. Handoff record

- [ ] Record the Replit App owner and editor access.
- [ ] Record the domain/DNS owner.
- [ ] Record the CRM, scheduling, and podcast-platform owners.
- [ ] Record the launch date and Git commit used for deployment.
