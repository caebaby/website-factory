# Alex copy implementation audit — 2026-08-03

Source of truth: `projects/awp/copy/client-feedback/2026-08-03_Alex_Returned_Copy_Review.docx`, plus Alex's direct instruction to lead with High-Net-Worth Families and place Oil & Gas Executives second.

## Result

- **No missed approved copy changes found.**
- **21 response-bearing workbook decisions checked.** Every `Keep` item remains present, and every explicit replacement/order instruction is represented in the nine-page review build.
- **Three items remain intentionally unresolved because Alex did not provide launch-ready facts:** the legal entity/RIA disclosure, the missing `$5M–$10M` Fit Check band, and team biographies/headshots. These are not treated as approved copy.
- **One response was ambiguous rather than an explicit deletion:** Alex omitted the RSU resource title when restating the directory list. The live directory retains it because the article itself was separately approved with `keep`.
- **Podcast direction is implemented as a complete preview/template.** Final audio, duration, platform URLs, and compliance workflow remain production inputs.

An independent pre-push verifier initially blocked release on four discrepancies. The final build now restores Alex's exact Why Anchor promise, the retained `Investment strategy` and `Not sure` Fit Check choices, the approved one-business-day response promise, and the approved Fit Check-first CTA hierarchy.

## Change-by-change check

| Alex decision | Implementation evidence | Status |
|---|---|---|
| Position the firm for executives, business owners, and high-net-worth families | Homepage metadata/footer and content-page descriptions use the broader executive/family positioning; High-Net-Worth Families lead the ordered audience language | Applied |
| `VERIFY: Alex Miller is a registered investment advisor` | The build retains `[VERIFY: RIA entity name]` and does not convert the unverified statement into a fact | Correctly held |
| Use Alex's Financial Advisor and Managing Partner title and supplied biography direction | `home-v6.html`, `about.html`, and `team.html` use the supplied title, 19-year experience, comprehensive planning/investment-management focus, family legacy, estate/wealth planning, retirement strategies, and personal/approachable framing | Applied, compliance pending |
| Replace credential placeholders with 19 years, APMA®, and CRPC®; remove empty accolade | Homepage and About show all three supplied items and no accolade placeholder | Applied, compliance pending |
| Add Haley Johnson, Dawn Cooper, and Derek Morris with supplied roles | `team.html` includes all three; Dawn and Derek explicitly identify Axiom | Applied; biographies/headshots pending |
| Keep the six service descriptions | Homepage service section retains all six approved service areas | Preserved |
| Remove `Other / not sure` from Fit Check situation choices | First Fit Check step contains only family, executive, and business-owner choices | Applied |
| Keep the remaining Fit Check wording and promise | Four-question promise, referral language, needs, and review-only result remain | Preserved; `$5M–$10M` still unresolved |
| Keep all three hero messages | Family, oil and gas, and business-owner hero copy remain in the rotation | Preserved |
| Make High-Net-Worth Families first; Oil & Gas Executives second | Hero slides, selector, Who We Serve cards, Fit Check, Insights, footer specialties, metadata, and review materials follow Family → Oil & Gas → Business Owners | Applied sitewide |
| Change Why Anchor to “A dedicated advisor who sees the whole picture” and retain three pillars | Homepage uses the new headline and exactly three pillars: Coordinated, not siloed; One accountable lead; Built for complexity | Applied |
| Remove Houston fluency as a fourth Why Anchor pillar | No fourth pillar remains | Applied |
| Move High-Net-Worth Families to the top of Who We Serve | First audience card is High-Net-Worth Families | Applied |
| Replace exclusionary fit language with an invitation and honest-fit opinion | Homepage uses the supplied inclusive introduction/fit framing | Applied |
| Keep Fit Check first, 30-minute secondary path | CTA sequence and wording remain | Preserved |
| Replace the family pain statement with legacy/second-opinion language | Homepage family pain card uses the supplied meaning, lightly edited for punctuation | Applied |
| Keep the client process and quarterly rhythm | Four-step process remains | Preserved |
| Keep Anchor Wealth Podcast/content direction | Resources and podcast routes use Anchor Wealth Podcast, Alex as host, transcript/episode structure, and Fit Check conversion paths | Preserved |
| Keep homepage, oil and gas, business-owner, family, and article supporting copy | Corresponding sections/routes retain the approved messages | Preserved |
| Retain the RSU resource and article | RSU directory card and the approved article template remain | Retained; workbook omission was not an explicit deletion |
| “Need this type of content” for the podcast | Podcast preview includes opening message, episode notes, four practical takeaways, transcript, related links, and Fit Check conversion | Applied as preview/template |

## Still needed before production launch

1. Exact legal entity name, registration status, and compliance-approved disclosure.
2. Decision on the missing `$5M–$10M` investable-assets band.
3. Approved team biographies/headshots and public wording for the Axiom relationship.
4. Compliance approval for title, biography, 19 years, APMA®, and CRPC®.
5. Final scheduling/contact routing, story video, podcast audio/duration/platform links, and media approvals.
