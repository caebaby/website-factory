# BUILD BRIEF — verdant · hero (scope 1 of N) · vector v1

> **FICTIONAL TEST CLIENT.** All proof illustrative, must render clearly labeled. Never deploy as a real business.
> **Delivery cadence:** this is the HERO scope only. Build → Chris reacts at the direction gate → subsequent section briefs follow. A wrong direction costs one section, not a site.

## 1. Output
- **File:** `projects/verdant/build/hero.html`
- **Self-contained** single HTML file, no build step. Scope = frosted nav + hero (through the primary CTA and the signature Transformation Reveal). Everything below the hero fold is out of scope for this brief — stub the page end after the hero so the file renders and scrolls clean.

## 2. Tokens (`:root` — paste verbatim)
```css
:root{
  /* GROUND / SURFACE — forest register */
  --ground:#1D3B2A;              --ground-rgb:29,59,42;      /* page base */
  --surface:#234634;             --surface-rgb:35,70,52;     /* raised panels, +6% L over ground */
  --surface-2:#2C5340;           --surface-2-rgb:44,83,64;   /* nested / hover */
  --line:rgba(250,243,227,.14);  /* hairline dividers on forest */
  --line-strong:rgba(250,243,227,.24);

  /* CREAM — primary reading color on forest */
  --cream:#FAF3E3;               --cream-rgb:250,243,227;
  --cream-70:rgba(250,243,227,.72);  /* secondary text — alpha-blends to ~rgb(188,191,175), 6.5:1 on --ground ✓AA */
  --cream-45:rgba(250,243,227,.45);  /* eyebrow/labels ONLY at ≥14px 600, decorative otherwise */

  /* GOLD — single accent, disciplined */
  --gold:#C9A24B;                --gold-rgb:201,162,75;
  --gold-soft:rgba(201,162,75,.16);  /* wash/glow only */

  /* INK — text when a CREAM panel is used */
  --ink:#1D3B2A;                 --ink-rgb:29,59,42;         /* forest text on cream = 11.1:1 ✓AAA */

  /* TYPE */
  --serif:"DM Serif Display",Georgia,serif;
  --sans:"Source Sans 3",system-ui,-apple-system,sans-serif;

  /* SPACE (8pt) */
  --s1:.5rem; --s2:1rem; --s3:1.5rem; --s4:2rem; --s5:3rem; --s6:4.5rem; --s7:7rem;

  /* RADII */
  --r-sm:8px; --r-md:14px; --r-lg:22px; --r-pill:999px;

  /* MOTION */
  --ease-out:cubic-bezier(.22,1,.36,1);
  --ease-io:cubic-bezier(.65,0,.35,1);
}
```
**AA math (verified for this scope — enforce, don't re-derive):**
- Cream `#FAF3E3` on `--ground` = **11.1:1** ✓ AAA (headline, body).
- `--cream-70` alpha-blends over `--ground` → ~`rgb(188,191,175)` = **6.5:1** ✓ AA (subhead, secondary).
- Gold `#C9A24B` on `--ground` = **5.12:1** ✓ AA for normal text and any accent/large display.
- Gold on cream = **2.17:1** ✗ — gold on a cream surface is **GRAPHICAL / large-display only, never body copy**. If a cream panel needs an accent text color, use `--ink`.
- Any text placed over the photographic/texture side of the reveal: cream must clear **4.5:1 against the actual lightest pixel it covers** (pre-flight; add a `--ground`-tinted scrim, AA law wins — see §4 FORBIDDEN).

## 3. Fonts
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
```
- **DM Serif Display** — hero headline + the pull word only. High-contrast serif = the "printed-object, proven" register. Use the *italic* cut for the emphasized clause (`proves it, not performs it`).
- **Source Sans 3** — everything else. 300 for large subhead, 600 for eyebrow/labels/CTA, 400 body. True humanist range = warmth without slop.

## 4. Pattern per section (this scope)

### Frosted nav
Pattern: **fixed frosted bar over forest.** INVARIANTS: height 72px; `backdrop-filter:blur(14px)` over `rgba(var(--ground-rgb),.62)`; bottom `--line`; wordmark left in `--serif` 20px cream; nav links `--sans` 600 15px `--cream-70`, hover→`--cream`; right-side pill CTA `Book Brand Assessment` bg `--gold`, text `--ink`, `--r-pill`, 14px 600. Nav links: `Brand Assessment`, `Portfolio`, `Our Process`, `About Us` (match §6 anchor vocabulary; hero-scope anchors resolve to `#assessment` for the CTA, others may be `#` stubs this scope). On scroll >40px the bar gains `--line-strong` + slightly higher blur. No layout shift on the state change.
EXECUTION LATITUDE: exact wordmark treatment, link spacing, whether a thin gold underline animates in on hover.
FORBIDDEN: full-opacity solid nav bar; centered logo "startup template" symmetry; hamburger on desktop; leaf/globe mark in the wordmark.

### Hero — "The Transformation Reveal" (the signature; see §5)
Pattern: **asymmetric split editorial — left copy column (≈42% at ≥1024px), right interactive artifact (≈58%).** INVARIANTS:
- Headline `--serif` clamp(2.6rem, 5.4vw, 4.6rem), line-height 1.02, tracking -0.01em, color `--cream`; the emphasized clause in `--serif` *italic* `--gold`. **Measure cap the headline at ~13 words per line max; never set the copy column `max-width` in `em` (em-trap) — use a `ch`/`rem` measure: `max-width:16ch` on the headline, `38ch` on the subhead.**
- Eyebrow `--sans` 600 13px, letter-spacing .14em, uppercase, `--cream-70`, with a 24px gold rule to its left.
- Subhead `--sans` 300 clamp(1.05rem,1.5vw,1.35rem), lh 1.5, `--cream-70`, margin-top `--s3`.
- CTA row margin-top `--s4`: primary solid gold pill (`Book Brand Assessment`), secondary text-link with gold arrow (`See Our Process`).
- Vertical rhythm: hero min-height `100svh`, content vertically centered, top padding clears the 72px nav; column gap `--s6` desktop, stack to single column <900px with the artifact BELOW copy at ≤120% viewport-safe height.
- Contrast floors as §2. Motion guards per §7.
EXECUTION LATITUDE: geometry of the artifact frame (radius, shadow depth, botanical-shadow dressing), the exact grid ratio within the stated band, decorative gold hairline flourishes, background grain intensity within DESIGN.md floor.
FORBIDDEN (slop tells + stamp-avoidance): centered hero with a single button under centered text; sage-green gradient background; leaf/seedling/globe/hands iconography; stock "diverse team" photo; a plain before/after slider that just swaps two stock photos (the reveal must be a *branded artifact* transforming, not a photo wipe — see §5); pill buttons with default blue focus rings (style focus to gold); emoji.

## 5. Signature moment — "The Transformation Reveal" (bespoke; generate fresh)
**Intent (derived from the mechanism — what Verdant actually does):** Verdant turns a generic eco-brand into a premium, proven one. The hero *performs that transformation live* on a single fictional brand artifact so the visitor sees the mechanism before reading a word about it.

**Ambition floor — this is a $50K-team flagship interaction, spec it fully:**
- The right column holds ONE brand artifact rendered as a **printed physical object** (a fictional sustainable-CPG package/label, e.g. a "GRØN" or placeholder botanical-goods carton — mark all brand marks as `[PLACEHOLDER — illustrative]`). Build the artifact in **HTML/CSS/SVG**, not an image, so both states are real vector layers (no stock photo swap).
- The artifact exists in TWO fully-designed states of the *same* object:
  - **GENERIC state:** the kraft-paper trap — flat sage `#9CAF88`-ish fill, a clichéd leaf glyph, a system-sans wordmark, weak centered layout, "eco template" energy.
  - **VERDANT state:** forest/cream/gold palette, `--serif` wordmark, gold foil accent, botanical drop-shadow, printed-texture grain, confident asymmetric label.
- A **draggable vertical divider** with a gold circular handle scrubs between the two states (clip-path reveal on the Verdant layer). Handle is keyboard-operable (`role="slider"`, arrow keys, `aria-valuenow`) and pointer/touch draggable. A thin gold seam sits on the divider; a tiny label rides each side: `TEMPLATE` (left, `--cream-45`) and `VERDANT` (right, `--gold`).
- **On load (once):** the divider auto-demos — sweeps from 62%→18%→settles at 50% on the `--ease-io` over ~1.4s so the visitor immediately understands it's interactive, then hands control to the user. Respect reduced-motion (see §7).
- **CONVERSION LAW — the interaction resolves toward the conversion event:** when the user drags the reveal past ~85% toward full-Verdant, the transformed artifact "settles" (subtle scale 1→1.015 + gold glow bloom) and a caption resolves beneath it: **"Three weeks, start to shelf."** `[VERIFY duration]` with the primary CTA echoing a soft gold pulse — the *endpoint of the interaction is the invitation to book.* The last frame of the signature IS a conversion affordance; it is never decorative.
- **No-JS / failure state:** the Verdant (aspirational, converting) state renders fully at 100% with the divider hidden — the page never blanks and always shows the better state.

## 6. Copy (verbatim slots — [VERIFY] flags inline)
- **Eyebrow:** `BRAND DESIGN FOR CLIMATE-CONSCIOUS STARTUPS`
- **Headline (recommended #1):** `Your climate leadership deserves a brand that ` + *italic gold clause* `proves it, not performs it.`
- **Subhead:** `The Brand Assessment: how to prove your climate leadership through design that converts conscious consumers.`
- **Primary CTA:** `Book Brand Assessment` → `#assessment`
- **Secondary CTA:** `See Our Process` → `#process` (stub anchor this scope) — with trailing gold arrow `→`
- **Reveal labels:** left `TEMPLATE` · right `VERDANT`
- **Reveal resolve caption:** `Three weeks, start to shelf.` `[VERIFY — illustrative timeframe]`
- **Optional trust line under CTAs (illustrative, must read as such):** `40+ sustainable brands transformed from generic to premium.` `[VERIFY — illustrative capability stat, render clearly labeled or drop]`
- **Artifact brand marks:** `[PLACEHOLDER — fictional brand, illustrative only]`

## 7. Motion budget
Permitted moments ONLY:
1. Nav frosted-state transition on scroll (opacity/blur, no reflow).
2. Hero load-in: headline SplitText **line** reveal (mask + y, stagger 90ms), eyebrow → subhead → CTA cascade. **CTA is visible and clickable immediately — it never waits on JS, fonts, or the animation.**
3. The signature auto-demo sweep (once) + user-driven scrub + endpoint bloom (§5).
4. Lenis smooth scroll (1.3.25).
Libraries: GSAP 3.13 + ScrollTrigger + SplitText, Lenis 1.3.25, via CDN. Nothing else.
**Guards (LED-011/012):** transform/opacity/clip-path only — zero animated layout properties; `will-change` scoped to the animating node and removed on complete; no CLS from load animation (reserve space); `prefers-reduced-motion:reduce` → no auto-demo, no load cascade (content renders in final state), reveal defaults to a static 50% split fully operable by drag/keys; kill/cleanup GSAP tweens on the reveal handle to avoid leaks.

## 8. Gauntlet checklist (fresh Agent 05 verifies)
- [ ] Geometry: no horizontal scroll at 390 / 768 / 1280; hero fits `100svh` without clipping the CTA; artifact stacks below copy <900px.
- [ ] Measure: headline ≤ ~13 words/line, `max-width` in `ch`/`rem` (no em on any container).
- [ ] AA w/ alpha-blend math: cream 11.1:1, `--cream-70` 6.5:1, gold-on-forest 5.12:1 all hold as rendered; **no gold text on any cream surface**; any cream over the reveal artifact clears 4.5:1 vs its lightest covered pixel (scrim if not).
- [ ] Signature: BOTH states are real HTML/CSS/SVG (not a photo swap); divider drags AND keyboard-operates with correct `aria-valuenow`; auto-demo fires once; endpoint bloom + caption + CTA pulse resolve toward booking.
- [ ] Reduced-motion: no cascade/auto-demo; static 50% split; still operable.
- [ ] No-JS: kill JS → Verdant state renders full, page visible, CTA clickable, nothing blank.
- [ ] Console: zero errors/warnings on load and after one full drag cycle.
- [ ] Focus states styled gold (no default blue ring); tab order = nav → CTA → reveal handle.
- [ ] Anti-slop: no leaf/globe/seedling/hands iconography; no sage-green gradient; no centered-template hero; grain/shimmer/shadow meet DESIGN.md floor.
- [ ] Fictional-client discipline: all brand marks + stats render as `[PLACEHOLDER]`/`[VERIFY]` and read as illustrative; language obeys strategy kill-list (no "eco-friendly/green/natural/save the planet").

## 9. Verification duty by tier
- **Opus/Sonnet+ (design-critical — this hero IS design-critical, use the best available):** browser-verify the full §8 gauntlet at all three breakpoints, drag the reveal end-to-end, toggle reduced-motion and JS-off, before returning. Return with the checklist ticked and any residual defect named.
- **Haiku:** not permitted for this scope without the full external QA loop; if used, return unverified and mandate the external render/inspect/critique loop.
