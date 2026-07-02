# BUILD BRIEF — Anchor Wealth Planning · FULL HOMEPAGE · vector v2
*Director-issued 2026-07-02. Read THIS file + `HERO_BRIEF.md` (same folder) — nothing else in the
repo. HERO_BRIEF governs nav/hero/cred-bar (v2.2 shuffle behavior); this file governs everything
after the cred bar. Fresh executions inside invariants — never a stamp.*

## 1. Output
`projects/awp/build/home-v2.html` — one self-contained HTML file, the complete homepage:
nav → hero → cred bar (per HERO_BRIEF) → PAIN → WHY ANCHOR → WHO WE SERVE → FIT CHECK →
SERVICES → PROCESS → PROOF → FINAL CTA → INSIGHTS → FOOTER.

## 2. Tokens / fonts
Exactly as HERO_BRIEF §2–3, plus:
```css
--accent-deep:#6d5122; /* PROOF ground role — carries LIGHT text only */
```

## 3. Global systems (apply site-wide)
- Section rhythm: `.pad{padding:clamp(80px,9vw,120px) 0}` default; FIT + INSIGHTS use
  `.pad-sm{padding:clamp(56px,7vw,88px) 0}` (rhythm must vary — uniform padding is a defect).
- Reveal: `.rise` CSS-class transitions (IO adds `.in`); grids use `.stagger` on the GRID
  (children animate 90ms apart via `animation … backwards`; hover transitions must survive).
  NEVER rAF/JS-gated visibility (content visible with JS off). `prefers-reduced-motion` = all static.
- Cards: flat fills, radius 8, NO box-shadow (sole exception: the hero artifact's floating frame).
  Interactive cards lift on hover: `translateY(-4px)` + one background step, `.4s` soft.
- Every text/background pair ≥4.5:1 body / ≥3:1 large, alpha-blended math. Report computed numbers.
- Eyebrows: 12/600 caps 1px tracking; `--accent-ink` on light, `--accent-soft` on dark grounds.
- Section H2s: sans 300 `clamp(30px,4.4vw,60px)` lh 1.05, ONE serif-italic phrase per H2.

## 4. Sections (ground · pattern invariants · latitude)

### PAIN (`--ground`)
H2: `You're holding it all together. <em>That's the problem.</em>` Intro ≤60ch.
2-col grid of 4 flat `--ground-alt` cards radius 8: accent dot 10px top-right, numeral 300-weight
`clamp(40px,4.4vw,58px)` `--accent-ink`, serif-italic quote `--dark`, caption ≤52ch.
COPY (verbatim quotes + captions):
1. "My CPA, my advisor, and my attorney never talk to each other. I'm the one playing phone tag between all of them." / Your financial life has outgrown the siloed model. Three excellent professionals, none aware of the others — and you're paying for the gaps in between.
2. "My RSUs vest, I take a tax hit I didn't plan for, and the window to act closes before I do." / Equity compensation is how the energy industry pays its leaders. Vesting, deferred comp, and blackout periods create a tax-timing problem generalist advisors don't understand.
3. "We have a trust from years ago. I'm honestly not sure it's funded right, or that it still fits what we own." / Your net worth has grown. Your estate documents haven't. The gap widens every year no one is watching the whole.
4. "I know my business inside and out — but I don't know what I'd actually walk away with after taxes if I sold." / Your net worth is locked inside an illiquid entity. If an offer arrived tomorrow, you wouldn't have a team ready.
LATITUDE: card internals arrangement; hover treatment.

### WHY ANCHOR (`--dark`, on-dark text)
H2: `One advisor who sees <em>the whole picture.</em>`
4 flat `--dark-2` cards (elevation = lighter fill), 34px single-weight line icons (1.6px stroke,
round caps, `--accent-soft`), sans-600 white h3, muted body.
COPY: Coordinated, not siloed (joint planning meetings w/ CPA + estate attorney; one living
document all three work from) · A decade of institutional training (Alex Miller, 10+ years at
Merrill Lynch `[VERIFY exact]`, now independent, Houston families) · Built for complexity (equity
comp, deferred income, business transitions, multi-generational estates) · Houston, not a coastal
afterthought (energy capital; Permian Basin to Eagle Ford). NO fiduciary/fee/regulatory claims.
LATITUDE: icon designs; card arrangement.

### WHO WE SERVE (`--ground`)
H2: `We specialize. <em>Generalists are everywhere.</em>`
3 photo cards radius 8, min-height `clamp(400px,42vw,480px)`, bottom→up scrim, accent dot badge
w/ soft ring, white h3, caption, `--accent-soft` link "See how we work with you →", hover -5px.
Photos (each `<!-- [VERIFY] licensed imagery -->`): oil-gas exec
https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1100&auto=format&fit=crop ·
business owner https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1100&q=80 ·
family https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=80
COPY: Oil & Gas Executives (RSUs, NQDC elections, blackout periods, 10b5-1 plans, commodity-cycle
exposure) · Business Owners (exit-readiness years before the LOI — valuation, entity structure,
earnout, personal/business separation) · High-Net-Worth Families (multi-generational wealth, trust
funding, stepped-up basis, beneficiaries current).

### FIT CHECK — THE MINI-HERO (`--ground` section, `.pad-sm`)
Full-width `--dark` panel radius 12, radial accent glow top-right (`rgba(var(--accent-rgb),.16)`).
2-col `.9fr 1.1fr`: LEFT = accent-soft eyebrow `Fit Check`, H2 white
`Are we the right fit <em>for you?</em>`, sub (`Four questions. Two minutes. We'll tell you
honestly whether we can help — and if we can't, we'll point you to someone who can.`),
3-item reassurance row (20px line icons + 15/500: Two minutes, nothing to prepare · No pitch, no
pressure, no spam · An honest answer either way), then the SIGNATURE DIAGRAM: labeled convergence
SVG — three thin strands (YOUR CPA / YOUR ATTORNEY / YOUR PORTFOLIO, 10px caps labels) converging
to a gold node labeled ONE LIVING PLAN; strands draw on panel reveal (pathLength=1 CSS trick),
small dots ride the strands via SMIL `animateMotion` (7/9.5/12s), node ring breathes 4.5s.
RIGHT = white form card radius 8: step numeral `01` 300-weight `clamp(34px,3vw,44px)` accent-ink +
"OF 04" label + 4 segmented 3px progress bars (accent fills) · legend sans-300
`clamp(21px,2.2vw,28px)` · 4-step wizard (flat option buttons: `--ground` fill, 1.5px border,
radius 4, 15.5/600, hover accent tint):
  Step1 `What best describes your situation?`: Oil & gas executive with equity comp / Business
  owner thinking about a transition / Coordinating wealth across multiple professionals / Something else.
  Step2 `Your approximate investable assets?`: $500K–$2M / $2M–$5M / $5M–$10M / $10M+.
  Step3 `Your biggest concern right now?`: Tax coordination — CPA and advisor aren't aligned /
  Equity comp — RSUs, deferred comp, concentration / Estate & legacy / Business transition.
  Step4 email + submit `Get My Fit Assessment →` + micro `No spam. No sales pitch. Just an honest
  answer about whether we're a match.`
Back buttons steps 2–4. Submit → thank-you state (demo note). 2-cycle gold ring pulse
(box-shadow, transient) on the card when panel reveals. NO-JS: all steps visible as one form,
wizard chrome hidden, submit kept.

### SERVICES (`--ground`)
H2: `One plan. <em>Your CPA and attorney both work from it.</em>`
6-cell bento on 6-col grid (two span-3, three span-2, one span-6 closer). EXACTLY 2 dark cells:
the flagship (first span-3) + the full-width closer, which HOSTS the section CTA
(`Start with the Fit Check →` gold btn — strongest contrast moment). Never two darks adjacent.
Each cell: tag caps 11.5/600 · sans-600 h3 · serif-italic pain-line · body.
COPY: Coordinated Planning [dark, flagship] ("No one sees the full picture." / joint meetings,
one living document, you stop being the translator) · Investment Management ("My portfolio doesn't
fit my actual life." / built around vesting schedules, blackout periods, concentration — managed
with your tax strategy) · Tax Strategy & Coordination ("Every bonus season feels like a tax trap."
/ we sit with your CPA before year-end) · Equity Compensation ("My RSUs feel like a trap." /
vesting modeling, NQDC elections, 10b5-1, blackout strategy) · Estate & Legacy ("Real wealth, no
plan for after." / trusts reviewed against current net worth, funded correctly) · Business Owner
Planning [dark closer] ("I don't know what I'd walk away with." / exit conversation starts 3–5
years before the LOI).
LATITUDE: which three get span-2; cell internals.

### PROCESS (`--ground-alt`)
H2: `Here's what working with us <em>actually looks like.</em>`
4-col stepper: 9px accent dot on each hairline top-border, numeral 300-weight
`clamp(44px,4.6vw,60px)` in `color-mix(in srgb, var(--accent) 40%, var(--accent-ink))`
(≥3:1 on --ground-alt — verify), sans-600 h3, body, serif-italic "when" note.
COPY: 01 Discovery (30-min conversation; we listen, tell you honestly / "30 minutes · no
obligation") · 02 Assessment (full picture review — investments, returns, equity docs, estate,
business; written assessment either way / "usually 1–2 weeks") · 03 The Plan (the living document;
we walk your CPA + attorney through it / "you keep this document") · 04 Partnership (quarterly;
vesting + cycles already modeled / "proactive, not reactive").

### PROOF (`--accent-deep` gradient — THE one saturated moment)
Ground: `linear-gradient(155deg, color-mix(in srgb,var(--accent-deep) 78%,var(--accent)) 0%,
var(--accent-deep) 52%, color-mix(in srgb,var(--accent-deep) 82%,#000) 100%)`.
ALL text solid `--on-dark`-class (verify ≥4.5:1 on the LIGHTEST stop; eyebrow solid on-dark).
H2 white: `What it sounds like when <em>the pieces finally fit.</em>`
Pale `--card` testimonial card: serif-italic quote `"For the first time, my CPA and my advisor are
actually talking to each other — I finally feel like someone sees the whole picture."` + note
`Illustrative — real, disclosure-compliant client testimonials added before launch.` +
`<!-- [VERIFY] SEC Marketing Rule vs FINRA 2210 per Alex's registration -->`.
Stats row over `rgba(on-dark,.25)` hairline: `10+` Years at Merrill Lynch `[VERIFY]` (count-up) ·
`3→1` Professionals coordinated (static) · `1` Living document (count-up) · `Quarterly` Reviews
(static). Count-up = rAF + blur-to-sharp + **mandatory setTimeout force-finish guard**; unverified
numbers NEVER get data-count.

### FINAL CTA (`--ground`, light close)
Soft radial accent glow behind. Centered eyebrow `The first call is just a conversation`,
H2 `You've been the project manager <em>long enough.</em>`, sub (`If your CPA and your advisor
aren't reading from the same plan, you're doing the work your wealth manager should be doing.
Thirty minutes. No pitch.`), dual CTAs (same pair as hero).

### INSIGHTS (`--ground-alt`, `.pad-sm`)
H2 (smaller, `clamp(26px,3.4vw,42px)`): `Not ready to talk yet? <em>Start here.</em>`
FEATURED SPLIT `1.55fr/1fr`: featured card (3px accent top bar, tag `Featured · Article`,
serif-italic title `clamp(24px,2.4vw,32px)` ≤24ch, 2-sentence excerpt) + 2 compact stacked cards.
COPY: featured = How RSU Vesting Creates a Tax-Timing Trap (equity comp is how the energy industry
pays its leaders — and how generalist advisors miss the timing; the window most executives discover
after it closes) · Podcast: What "Coordinated Planning" Actually Looks Like · Article: The Exit
Conversation Should Start Years Before the LOI. Footer note: `Illustrative topics — Anchor's
content library launches with real articles and episodes before the site goes live.`
Reserve the featured card as a VIDEO slot: comment `<!-- video episode slot: poster+play per
§video when real footage exists [VERIFY] -->`.

### FOOTER (near-black navy `#0d1c2e`)
Brand (serif "Anchor" + italic tagline `"Charting the course toward your financial legacy."`) +
Houston line · Explore / Specialties / Contact columns (Contact = `[VERIFY]` phone/email chips +
Houston, TX) · legal block: `<span>[Entity name] — VERIFY registration & required disclosures.</span>
Information presented is for educational purposes only and does not constitute an offer or
solicitation to buy or sell any security or investment strategy. Investments involve risk and are
not guaranteed. Past performance is not a guarantee of future results.` + © 2026.

## 4b. ADDENDUM v2.2 (Chris, 2026-07-02 — Alex will review multiple versions)

### THREE HERO VARIANTS + review switcher
Same page, same body — three hero treatments, switchable:
- **Hero A — Artifact shuffle carousel** (as built; unchanged).
- **Hero B — Kindred-style photo hero:** full-bleed photo (`assets/hero-family.jpg`, exists in the
  output folder), deep copy-side scrim `linear-gradient(96deg, rgba(20,40,64,.88) 0%, .64 30%,
  .26 58%, 0 80%)` + soft top/bottom bands, same H1/sub/CTAs (accent phrase own line + underline
  draw, `text-shadow:0 2px 26px rgba(8,16,28,.34)`), on-dark text, eyebrow `--accent-soft`,
  tracked-caps image label bottom-right `ONE LIVING PLAN`. NO overlay graphics.
- **Hero C — Video hero:** identical composition to B but the media is `<video muted loop
  playsinline preload="none" poster="assets/hero-family.jpg">` with source
  `data-src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"`
  `<!-- [VERIFY] demo clip — Alex's real footage replaces this -->`; IO lazy-load near viewport,
  autoplay muted; reduced-motion/no-JS = poster only. A failed video IS Hero B.
**Switcher (review-only):** small fixed bottom-left chip rail `Hero: A · B · C` (10px caps,
`--card` pill, subtle) — click swaps `<body data-hero="a|b|c">`; CSS shows exactly one hero.
Default = A. Persist choice in the URL hash (`#hero-b`) so links are shareable. Mark the switcher
`<!-- REVIEW-ONLY: strip for production -->`. Nav CTA row unaffected.

### NEW SECTION — "ALEX'S STORY" (place directly AFTER Why Anchor, ground `--ground`, `.pad`)
2-col `1.1fr .9fr`, centered: LEFT = 16:9 click-to-play video card (§ video-testimonial pattern:
poster `assets/hero-oilfield.jpg` `<!-- [VERIFY] real Alex intro footage -->`, 74px accent circle
play button, duration chip `[VERIFY]`, native controls after click, zero bytes before click,
demo source = the CC0 clip). RIGHT = eyebrow `Alex's Story` · H2 `From Merrill Lynch to
<em>your side of the table.</em>` · 2 short paragraphs: a decade+ at Merrill Lynch [VERIFY exact]
learning institutional discipline; founded Anchor to coordinate the whole picture for Houston
families — no product quotas, no siloes [VERIFY tone w/ Alex — zero regulatory/fee claims] ·
text link `Read the full story →` (dead `#about` for now).
Adjacency check: Why Anchor (dark) → Story (light, split w/ media) → Who We Serve (photo cards) —
three different skeletons ✓.

### NEW SECTION — VERTICAL REELS (place AFTER Insights, before footer; ground `--ground`, `.pad-sm`)
Head: eyebrow `Sixty seconds with Alex` + H2 (smaller scale, `clamp(24px,3vw,38px)`):
`Straight answers, <em>no appointment needed.</em>`
Row of FOUR 9:16 cards (radius 8): three video cards + one CTA closer card:
1. `Why your CPA and advisor should talk` · 2. `The RSU window most executives miss` ·
3. `What "one living plan" actually means` — each: vertical poster (use
https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop ,
https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop ,
https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop
`<!-- [VERIFY] Alex's real vertical clips -->`), duration chip `0:xx [VERIFY]`, caption line under
card (14px), demo `data-src` = the CC0 clip.
**Behavior:** desktop hover/focus = autoplay MUTED + scale(1.02); leave = pause+reset. No-hover
devices: tap toggles, visible play glyph idle. Poster-first, zero bytes till interaction.
Reduced-motion/no-JS: static posters. Row = grid at ≥1024px, horizontal scroll-snap below.
4. CTA card: `--dark` fill 9:16, centered: sans-300 `Twenty minutes with Alex beats sixty seconds.`
+ gold `btn-sm` `Book a Call →` (#fit). (Conversion law: the row ends at the conversion.)
Adjacency: Insights (featured split) → Reels (vertical row) → footer ✓.

## 5. FORBIDDEN (site-wide)
Photography in the hero · decorative overlay graphics on media · gradient text · shadowed cards
(except the hero artifact frame) · pure #000 · Inter/Arial display · fabricated stats, names,
credentials, fiduciary/fee/regulatory claims · uniform section padding · two adjacent sections
sharing a layout skeleton · any interactive element that doesn't resolve toward the fit check.

## 6. Gauntlet (browser-verify ALL before returning — you are Sonnet-tier)
- 0 horizontal overflow at 390/768/1280 · hero CTAs above fold at 1280×800
- All AA pairs computed w/ alpha-blend, incl. proof lightest stop + process numeral mix — report numbers
- Wizard: advance/back/segments/numeral/submit · carousel: shuffle/pause/rail/doc-4 CTA
- Diagram draws on reveal; dots ride; no-JS + reduced-motion static-visible everywhere; console clean
- Tonal map check: mostly light — exactly one full-dark section (Why) + one dark panel (Fit) +
  one accent-deep moment (Proof) + dark footer
Report: path · gauntlet numbers · latitude choices · anything in this brief that was ambiguous.
