# Anchor Replit launch checklist

This file separates work already verified by the Website Factory from launch items that still require Johnny, Alex, or an authorized compliance reviewer. Do not turn an unchecked compliance item into a claim of approval.

## 0. Factory verification already completed

- [x] Ten-page static package and local-reference check: `npm run check` passes.
- [x] Factory page gate: 0 P0 on every supported route.
- [x] Mobile browser pass at 390px: no horizontal overflow, full-bleed family video, working menu, and complete Fit Check auto-advance.
- [x] Tablet browser pass at 820px: collapsed navigation opens and closes without overflow.
- [x] Desktop browser pass at 1440px: hero videos cover the viewport and navigation is consistent.
- [x] Internal links and fragments resolve across all supported routes.
- [x] External-link preflight was run against Investor360 and the article's official IRS/SEC sources.
- [x] SEO/GEO structural review was run: metadata, canonicals, content templates, visible FAQs, primary-source links, schema, and conversion paths were checked.
- [x] Compliance-oriented content preflight was run against the SEC marketing-rule guide, FINRA Rule 2210, and official MML/MassMutual disclosure language.
- [ ] Formal FINRA/MML/MassMutual principal or compliance approval received and recorded. **Not complete.**
- [ ] Exact SEC/state adviser legal identity and registration language verified against Form ADV/IAPD and approved. **Not complete.**

See `PRELAUNCH-VERIFICATION.md` for evidence and the required approval record.

## 1. Import and review

- [ ] Upload the contents of this handoff folder into the root of a new Replit App.
- [ ] Click **Run**; no build or install command is required.
- [ ] Run `npm run check` in the Replit Shell.
- [ ] Run `npm run preflight` with internet access in the Replit Shell.
- [ ] Open every route listed in `README.md` and confirm navigation, footer links, images, and video playback.
- [ ] Confirm `Client Login` opens Investor360 in a new tab from navigation, mobile navigation, and footer.

## 2. Complete production inputs

- [ ] Supply the exact legal entity name, registration status, and compliance-approved disclosure.
- [ ] Obtain compliance approval for Alex's title, biography, 19 years, APMA®, and CRPC®.
- [ ] Resolve the missing `$5M–$10M` Fit Check band.
- [ ] Connect the Fit Check result to the approved CRM/scheduling workflow and confirm the one-business-day response promise is operational.
- [ ] Add approved team biographies/headshots and final wording for the Axiom relationship.
- [ ] Replace every picture/video item marked `WAITING` in `AI-HANDOFF-NOTES.md`; keep its file/selector map current.
- [ ] Add final podcast audio, duration, episode number, platform links, transcript, and cover/social art.
- [ ] Confirm final photography/video approvals against `assets/SOURCES.md`.

Do not place private keys in HTML or JavaScript. Any server-side connection must use Replit Secrets.

## 3. Mobile and interaction check after Replit import

- [ ] At 390px, open/close navigation on every page and confirm no horizontal scrolling.
- [ ] At 390px, confirm the family hero video fills the viewport without borders or blurred bands.
- [ ] At 390px, confirm all six Fit Check need choices are readable and selectable; complete the auto-advance flow without submitting real personal data.
- [ ] At 820px, confirm the collapsed homepage navigation opens and closes correctly.
- [ ] At 1440px, confirm all three hero videos cover the hero and the audience-card crops keep their subjects centered.
- [ ] Test keyboard focus, reduced motion, pause/play controls, resource filters, and podcast/article links.

## 4. Production domain and search readiness

- [ ] Connect the approved canonical domain in Replit Publishing.
- [ ] Replace relative review canonicals with absolute final-domain URLs.
- [ ] Replace review filenames with clean production slugs.
- [ ] Change `noindex,nofollow` only after content and formal compliance approval.
- [ ] Replace review `robots.txt` with the approved production crawler policy.
- [ ] Create `sitemap.xml` with every indexable route and accurate modification dates.
- [ ] Add final 1200x630 raster Open Graph images and absolute social URLs.
- [ ] Validate article and podcast structured data after final URLs/media exist.
- [ ] Connect Search Console, analytics/consent, and Google Business Profile if approved.
- [ ] Run `npm run preflight` again, then test the live custom-domain pages on phone and desktop.

## 5. Regulatory and firm compliance approval

- [ ] Confirm the legal relationship among Anchor Wealth Planning, Alex Miller, Axiom, MML Investors Services, and MassMutual. Do not infer it from branding or employment history.
- [ ] Insert the exact compliance-approved legal entity, broker-dealer, investment-adviser, FINRA/SIPC, and MassMutual relationship language on every footer.
- [ ] Add the required BrokerCheck link on the initial retail page and every registered-person profile page if FINRA Rule 2210 applies.
- [ ] Add approved Form CRS, Form ADV/IAPD, privacy, terms, and accessibility links.
- [ ] Verify APMA®, CRPC®, title, biography, 19 years, fiduciary wording, and every professional-affiliation statement.
- [ ] Classify and approve the homepage quoted pain statements so they cannot be mistaken for client testimonials or endorsements.
- [ ] Record the approving principal/compliance reviewer, organization, date, approval/ticket ID, exact approved disclosure text, and archived final package hash in `PRELAUNCH-VERIFICATION.md`.
- [ ] Retain the approved communication and review evidence under the applicable firm recordkeeping procedure.
- [ ] Remove every visible `[VERIFY]`, preview note, and `compliance review pending` label only after the approved replacement is installed.

AI review, Website Factory review, and passing automated checks are not regulatory approval.

## 6. Handoff record

- [ ] Record the Replit App owner and editor access.
- [ ] Record the domain/DNS owner.
- [ ] Record the CRM, scheduling, compliance, and podcast-platform owners.
- [ ] Record the launch date and Git commit used for deployment.
