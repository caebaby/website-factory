# Anchor AI handoff notes

Use this file as the media-placement source of truth when Johnny asks Replit AI to add or replace a picture, video, audio file, or social image.

## AI operating rules

1. Match the request to a `MEDIA-##` item below before editing.
2. Put production files in `assets/` using the preferred filename. Preserve existing dimensions, aspect ratios, and responsive behavior.
3. Update every listed page and selector. `index.html` and `home-v6.html` must remain identical.
4. Add accurate alt text for meaningful images. Decorative images use empty alt text. Spoken video needs captions and a transcript.
5. Record source, owner, license, approval date, and use in `assets/SOURCES.md`.
6. Run `npm run preflight`, then visually test 390px, 820px, and 1440px.
7. Do not remove `noindex,nofollow`, `[VERIFY]`, or compliance-pending language based on an AI request alone.

## Waiting media placement map

| ID | Status | What Johnny supplies | Exact placement | Current placeholder / preferred production file | Installation notes |
|---|---|---|---|---|---|
| `MEDIA-01` | WAITING | Alex's approved filmed origin story, preferably 16:9 H.264 MP4 | `index.html` and `home-v6.html`, `#alex-story .story-video-wrap video` | Replace `assets/hero-business-loop.mp4` with `assets/alex-story.mp4` | Update the `<source data-src>`. If the video has speech, remove `muted`, retain native controls, add a WebVTT captions track, and link the approved transcript. |
| `MEDIA-02` | WAITING | Approved 16:9 poster frame from Alex's story | Same pages, `#alex-story .story-video-wrap video[poster]` | Replace `assets/hero-business-poster.png` with `assets/alex-story-poster.jpg` | Export at least 1600x900. Update the caption duration and remove preview language only after approval. |
| `MEDIA-03` | WAITING | Approved headshots for Alex Miller, Haley Johnson, Dawn Cooper, and Derek Morris | `team.html`, the four `.team-row .portrait` elements; plus `index.html` and `home-v6.html`, `#proof .alex-block > div:first-child` for Alex | Add `assets/team-alex-miller.jpg`, `team-haley-johnson.jpg`, `team-dawn-cooper.jpg`, and `team-derek-morris.jpg` | Replace initials with `<img>` elements. Use matching 4:5 crops and name-specific alt text on Team. Reuse Alex's approved source in the homepage's existing circular wrapper with `object-fit: cover`; preserve its 120x120 geometry. Bios and Axiom wording require separate compliance approval. |
| `MEDIA-04` | WAITING | Five approved vertical Alex clips matching the visible Insights titles | `index.html` and `home-v6.html`, `#insights .reel[data-reel="0".."4"] video` | Current hero loops are layout previews | Preferred files: `insight-families.mp4`, `insight-rsu-timing.mp4`, `insight-business-exit.mp4`, `insight-concentrated-wealth.mp4`, `insight-estate-legacy.mp4`. Export 9:16, H.264, silent preview-safe. If speech is retained, add captions/transcripts and accessible play controls. |
| `MEDIA-05` | WAITING | Poster for each vertical clip | Same five `#insights` videos | Create matching `.jpg` files beside the five MP4s | Export 1080x1920 or a proportional web derivative. Keep focal faces and text-safe zones inside the center 70 percent. |
| `MEDIA-06` | WAITING | Final Anchor Wealth Podcast cover artwork | `podcast-template.html`, `.episode-art`; optionally reuse in `resources.html` podcast feature | Add `assets/anchor-wealth-podcast-cover.jpg` | Replace the text-only cover block with an image while preserving the accessible series name. Also create 1200x1200 podcast-platform art if required. |
| `MEDIA-07` | WAITING | Real episode audio, duration, episode number, platform URLs, and approved transcript | `podcast-template.html`, `.episode-action` and episode schema; `resources.html`, latest-episode links | Add `assets/podcast/<episode-slug>.mp3` or an approved feed URL | Add a real audio player only when the file/feed exists. Update `PodcastEpisode` JSON-LD, platform links, transcript, and directory entry together. |
| `MEDIA-08` | WAITING | Final social/share images | Every page `<head>` using `og:image` and `twitter:image` | Add page-specific raster images under `assets/social/` | Minimum 1200x630. Article may derive from `rsu-timing-map.svg`, but social metadata should use an absolute production URL after domain connection. Create distinct homepage, article, podcast, and directory cards. |
| `MEDIA-09` | WAITING | Browser favicon, Apple touch icon, and production app/social mark | Every page `<head>` | Add `assets/icons/favicon.ico`, `icon-192.png`, and `apple-touch-icon.png` | Use the approved Anchor mark. Add the same icon links to all pages. Do not redraw or distort the client-supplied logo. |

## Installed review media that needs approval, not automatic replacement

| Area | Current assets | Approval still needed |
|---|---|---|
| Family hero and family previews | `hero-family-modern-kitchen.mp4`, desktop poster, mobile cover video/poster | Client and compliance approval of the Pexels footage and AI-assisted family card derivative. |
| Oil and gas hero/previews | `pumpjack.mp4`, `pumpjack-alt.mp4`, `hero-oilfield.jpg`, `hero-oil-card-portrait.jpg` | Confirm the two project-generated oil images and final commercial-use record. |
| Business-owner hero/previews | `hero-business-vlada-meeting.mp4`, poster, and card portrait | Client and compliance approval of the Pexels footage and crop. |
| Navigation and watermarks | Three `awp-logo-*.png` files | Already sourced from the supplied brand kit; preserve geometry and colors. |

## When a media request is ambiguous

Do not guess. Ask Johnny which `MEDIA-##` item he means, whether the file is client/compliance approved, and whether it replaces a review asset or only adds a production variant.
