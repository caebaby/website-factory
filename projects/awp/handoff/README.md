# Anchor Wealth Planning — Replit handoff

Static, Replit-ready client-review site. No build step, framework, dependency installation, or application server is required.

## Import and run

1. Upload the **contents of this folder** into the root of a new Replit App. Do not upload the folder as a nested directory.
2. Confirm the Replit root contains `.replit`, `index.html`, `assets/`, `scripts/`, and the secondary HTML pages.
3. Click **Run**. Replit serves the site with Python on port 3000.
4. Run `npm run check` in the Replit Shell before publishing.

## Site map

```text
/
├── index.html                    Home
├── home-v6.html                  Review-compatible homepage alias
├── about.html                    About
├── team.html                     Team
├── high-net-worth-families.html  High-Net-Worth Families
├── oil-gas-executives.html       Oil & Gas Executives
├── business-owners.html          Business Owners
├── resources.html                Resource directory
├── blog-template.html            Article template
└── podcast-template.html         Podcast episode template
```

All pages use relative links and self-hosted media, so the package works at a Replit preview origin or a custom domain root.

## Review-mode safety

This package intentionally remains out of search while it is in client/compliance review:

- every page includes `noindex,nofollow`;
- `robots.txt` disallows crawling;
- canonicals remain relative review placeholders;
- legal entity, compliance approval, production scheduling, final team media, and podcast media still require completion.

Do not remove review-mode protections until the production domain and launch copy are approved. Follow `REPLIT-LAUNCH-CHECKLIST.md`.

## Mobile contract

The handoff preserves the approved responsive behavior:

- 390px phones: full-bleed family hero video with the mobile pan-and-scan source, collapsed navigation, touch-friendly controls, and no horizontal overflow;
- 820px tablets: collapsed navigation remains functional through the full tablet breakpoint;
- desktop: full-width video hero, three-card audience layout, and consistent publication navigation.

The automated check validates page structure and local references. The final Replit preview must still receive a real phone/tablet/desktop visual pass before the domain is connected.
