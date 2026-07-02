# Client Brief — Anchor Wealth Planning (THE CLEAN PRINT — Kindred recipe, Anchor brand)
> Build EXACTLY as the Kindred cold-builds were built: ONE coherent pass from
> `templates/packs/warm-premium.pack.md` (v1.4) + this brief. The Pack governs every section's
> composition, numbers, systems (§1–§9). This brief supplies ONLY brand + copy + the hero-variant
> addendum. Where this brief and the Pack conflict, the PACK wins except §HERO-VARIANTS below.

## Output
`projects/awp/build/home-v3.html` — complete homepage, self-contained.

## Brand tokens (into Pack §2 roles — AA rules per §9)
```
--ground:#F5F0E6; --ground-alt:#EDE7D9; --card-pale:#ffffff;
--dark:#142840;   --dark-2:#1e395a;
--ink:#1b2a3c;    --ink-body:#4b5b6e;
--on-dark:#F7F3EB; --on-dark-mute:rgba(247,243,235,.76);
--accent:#c9a24b; --accent-soft:#dcc07e; --accent-ink:#7d5f26; --accent-deep:#6d5122;
--accent-rgb:201,162,75; --border:rgba(20,40,64,.14);
```
Fonts (Pack roles): `--sans:'Nunito Sans'` (300;400;600;700 — 300 is display) ·
`--serif:'EB Garamond'` (italic accent only).

## HERO-VARIANTS (the one addendum to the Pack hero — Alex reviews options)
Pack §4 HERO composition + §6 imagery + scrim/veil law (scrim = minimum; AA over ACTUAL photo
pixels wins — add a copy-side veil if needed). FIVE variants, review switcher (bottom-left chip
rail `Hero A·B·C·D·E`, `body[data-hero]`, hash persistence, `<!-- REVIEW-ONLY -->`):
- **A — Living-plan document shuffle carousel** (typographic split hero, no photo): the artifact
  frame (radius 12, the ONE floating-frame shadow) cycles 4 documents via physical SHUFFLE (top
  card slides off x+rotate, next rises; back-peek = always the next doc's REAL content).
  **DOC CONTENT (v2, Chris verdict 2026-07-02 — Pack §8.5 governs; mechanism/timing unchanged):**
  each doc = a TYPESET PLAN PAGE, never app UI. NO status pills/chips, NO button-shaped
  non-interactive elements, NO dashboard rows. Letterhead top (kicker + serif title + hairline),
  ruled hairline tables with a serif figures column, margin annotations, dated/initialed footer
  line ("Reviewed with your CPA — Oct 14" class). **Every figure REDACTED** (`$ ——,———` /
  `▓▓▓▓` / blur span) beside a REAL specific label — never a fabricated readable number.
  **Each page ≥80% visually occupied** — dense like a real document, zero dead whitespace.
  Sequence narrates the mechanism as ICP vignettes: 1 Living Plan cover/overview (the one
  document, all three professionals initialed) → 2 CPA year-end memo (RSU sale timed before the
  December blackout; loss-harvest schedule — redacted figures) → 3 attorney trust-review memo
  (funding status vs. current assets; re-title after the ranch purchase class) → 4 CONVERSION DOC
  "Where does your plan stand?" (3 visitor questions + gold `Take the 4-Question Fit Check →`
  btn in the doc footer — the ONE real button allowed). Auto 4.5s, doc-4 holds 7s, hover=pause +
  dot rail **CENTERED under the doc frame** (Chris, 2026-07-02 — never bottom-left orphaned),
  LED-011 guards, no-JS = doc 1 static.
  **[VERIFY — compliance]:** the sample-plan artifact itself (even fully redacted) needs Alex's
  compliance sign-off before launch; approved as CONCEPT only for now (Chris, 2026-07-02). Ship
  question rides in COPY_DOC Part 1 disclosures.
- **B — Photo hero:** full-bleed `assets/hero-family.jpg`, Pack scrim numbers + veil-if-needed.
- **C — Video hero:** B's composition, Primitive-5 video (poster=hero-family.jpg, demo
  `data-src` https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4
  `[VERIFY real footage]`), lazy only when variant active.
- **D — Rotating ambient videos:** 2 clips crossfading 1.2s every ~8s (demo clip 1 = the flower;
  clip 2 slot labeled `[VERIFY — oil pumpjack in a Texas field, Alex b-roll]` shipping as poster
  `assets/hero-oilfield.jpg` until real). Per-clip lazy; Primitive-5 contracts.
- **E — Light typographic (Chris ask, 2026-07-02: "non-image, lighter alternative to the blue"):**
  variant A's split composition on the LIGHT register — `--ground` hero (no photo, no video, no
  navy), same copy/CTAs/artifact carousel. Solve the light-ground translation properly: ink display
  (`--ink`) + serif-italic accent phrase in `--accent-ink` (AA on ground), underline-draw stays
  `--accent`; the white doc frame needs a defined edge on cream (hairline `--border` + the
  floating shadow, verify it doesn't wash out); dot rail recolors for light ground; eyebrow =
  `--accent-ink` not `--accent-soft` (LED-003 class). **NAV translation (executor-found gap,
  2026-07-02): any light hero variant must recolor the fixed nav's unscrolled ink**
  (`nav:not(.scrolled)` brand + links → `--ink`) — the global nav assumes a dark hero; scrolled
  state keeps the dark glass bg + on-dark text. Cred bar unchanged below. A timid retint
  fails the ambition floor — this must read as its own deliberate light direction, not A minus
  the navy.
All variants: eyebrow `For Houston Executives, Owners & Families` · H1 `You've become the project
manager of` + own-line em `your own wealth.` (underline-draw) · sub `Anchor coordinates your
investments, taxes, and estate with your CPA and attorney into one living plan — so you can stop
being the glue.` · CTAs side-by-side: `Schedule a 30-Minute Conversation →` (primary) +
`Take the 4-Question Fit Check` (outline). Cred bar under hero (Pack §4 has no analog — band on
ground-alt): `10+ YEARS AT MERRILL LYNCH [VERIFY]` chip · `HOUSTON, TX` · `COORDINATED PLANNING
FOR EXECUTIVES, OWNERS & FAMILIES`.

## Section copy (Pack §4 composition per section — copy verbatim)
**PAIN** head `You're holding it all together. <em>That's the problem.</em>` — 4 cards:
1 "My CPA, my advisor, and my attorney never talk to each other. I'm the one playing phone tag between all of them." / Three excellent professionals, none aware of the others — and you're paying for the gaps in between.
2 "My RSUs vest, I take a tax hit I didn't plan for, and the window to act closes before I do." / Vesting, deferred comp, and blackout periods create a tax-timing problem generalists don't understand.
3 "We have a trust from years ago. I'm honestly not sure it's funded right, or that it still fits what we own." / Your net worth has grown. Your estate documents haven't.
4 "I know my business inside and out — but I don't know what I'd actually walk away with after taxes if I sold." / If an offer arrived tomorrow, you wouldn't have a team ready.
**WHY ANCHOR** (dark) head `One advisor who sees <em>the whole picture.</em>` — 4 icon cards:
Coordinated, not siloed (joint planning meetings; one living document all three work from) ·
A decade of institutional training (Alex Miller, 10+ years at Merrill Lynch [VERIFY], now
independent, Houston) · Built for complexity (equity comp, deferred income, business transitions,
multi-generational estates) · Houston, not a coastal afterthought (Permian Basin to Eagle Ford).
NO fiduciary/fee/regulatory claims.
**ALEX'S STORY** (light, after Why — 16:9 click-to-play §8.4.2, poster assets/hero-oilfield.jpg
[VERIFY]) head `From Merrill Lynch to <em>your side of the table.</em>` + 2 short [VERIFY]-toned
paragraphs (institutional discipline → founded Anchor to coordinate the whole picture; no
regulatory claims) + `Read the full story →` (#about).
**WHO WE SERVE** head `We specialize. <em>Generalists are everywhere.</em>` — 3 photo cards
[VERIFY imagery]: Oil & Gas Executives (RSUs, NQDC, blackout periods, 10b5-1, commodity cycle;
photo https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1100&auto=format&fit=crop) ·
Business Owners (exit-readiness years before the LOI; photo
https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=80) ·
High-Net-Worth Families (trusts funded right, beneficiaries current; photo
https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=80).
**FIT CHECK** (Pack mini-hero + diagram labels YOUR CPA / YOUR ATTORNEY / YOUR PORTFOLIO →
ONE LIVING PLAN) copy `Are we the right fit <em>for you?</em>` / `Four questions. Two minutes.
We'll tell you honestly whether we can help — and if we can't, we'll point you to someone who can.`
Wizard steps/options/micro = as in the reference copy block: situation (O&G exec w/ equity comp /
owner considering transition / coordinating across professionals / something else) → assets
($500K–$2M / $2M–$5M / $5M–$10M / $10M+) → concern (tax coordination / equity comp / estate &
legacy / business transition) → email `Get My Fit Assessment →` + `No spam. No sales pitch. Just
an honest answer about whether we're a match.`
**SERVICES** (Pack bento, closer hosts CTA `Start with the Fit Check →`) head `One plan. <em>Your
CPA and attorney both work from it.</em>` — Coordinated Planning [flagship dark] · Investment
Management · Tax Strategy & Coordination · Equity Compensation · Estate & Legacy · Business Owner
Planning [dark closer]. Pain-lines + bodies as the established copy (translator / vesting-aware
portfolio / CPA before year-end / 10b5-1 / trusts funded / 3–5 years before the LOI).
**PROCESS** head `Here's what working with us <em>actually looks like.</em>` — 01 Discovery
(30 min · no obligation) · 02 Assessment (written either way · 1–2 weeks) · 03 The Plan (you keep
this document) · 04 Partnership (proactive, not reactive).
**PROOF** (accent-deep) head `What it sounds like when <em>the pieces finally fit.</em>` —
illustrative quote "For the first time, my CPA and my advisor are actually talking to each other —
I finally feel like someone sees the whole picture." + disclosure note [VERIFY regime] · stats
`10+` yrs Merrill [VERIFY, count-up] · `3→1` professionals (static) · `1` living document
(count-up) · `Quarterly` reviews (static).
**FINAL CTA** head `You've been the project manager <em>long enough.</em>` + thirty-minutes-no-
pitch sub + dual CTAs.
**INSIGHTS** (featured split; featured = video-slot comment) — RSU Tax-Timing Trap (featured) ·
Coordinated Planning podcast · Exit Conversation article + illustrative note.
**REELS** (Pack §8.4.5, after Insights) head eyebrow `Sixty seconds with Alex` / `Straight answers,
<em>no appointment needed.</em>` — 3 vertical cards (posters
https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop ·
https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop ·
https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop, all
[VERIFY], captions: CPA+advisor should talk · The RSU window · What "one living plan" means) +
dark CTA closer card `Twenty minutes with Alex beats sixty seconds.` + `Book a Call →`.
**FOOTER** per Pack: serif brand + tagline `"Charting the course toward your financial legacy."`,
Explore/Specialties/Contact ([VERIFY] chips), entity+disclosures placeholder, educational
disclaimer, © 2026.

## Video budget: hero C/D ambient + story + reels = the page's moments; insights stays a slot.
## Gauntlet: Pack §9 + hero-variant checks (switcher, per-variant lazy contracts, veil AA over
actual pixels) + LED-013 check (neutralize animations, force .in, census opacity<0.05 = 0 hidden).
Browser-verify everything; report numbers.
