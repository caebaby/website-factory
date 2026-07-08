# AGL Marketing Site — LLM Design Test Prompt

> **How to run this test:** Give the candidate LLM two things:
> 1. Everything below the line as its prompt.
> 2. The file `reference-v8.html` (paste or attach its contents) — this is the PREVIOUS
>    iteration of the site, the same starting material Claude had.
>
> Do NOT show it the answer key in `../v9-claude/`. It must write a single HTML file
> using the three asset placeholder tokens (`[[FONT_SCHIBSTED]]`, `[[FONT_NEWSREADER]]`,
> `[[IMG_HERO]]`) instead of real base64. When it's done, run `python3 build.py its-file.html`
> to inject the assets and open the `-final.html` result in a browser.
>
> If running in a browser chat, also append this line to the prompt:
> *"Output the complete HTML in code blocks. If you approach your output limit, end with
> `<!--CONTINUE-->` and I'll say 'continue' — resume exactly where you stopped, mid-line if
> necessary, with no repeated content."*

---

You are designing and building the new marketing website for Advisor Growth Lab (AGL) — replacing advisorgrowthlab.com. Do this as a single autonomous build pass: reason through the positioning first, commit to it, then build the whole site to express it. Make the calls yourself; don't hand me a menu.

## WHO WE ARE

AGL is an AI-powered firm that helps financial advisors decide whether/how to move firms — and, when it genuinely fits, introduces them to our partner RIA platform, Axiom. An advisor who was cold-emailed lands on this site, feels understood, sees we have authority no recruiter has, and books a private call (or takes an assessment that leads to one). Business goal: turn an anonymous visitor into an MQL (opts in / takes the assessment) then an SQL (books a call).

## OUR UNFAIR ADVANTAGE: THE DATA (this is the whole point)

Behind AGL is a platform that tracks the entire US advisor universe — ~725,000 advisors from SEC / BrokerCheck / FINRA public data. In aggregate we know which firms advisors are leaving and joining, WHY they transition, WHEN they tend to move, what their books are worth, what deals look like by move type, and how any one advisor compares to peers. When an advisor opts in, we instantly match them to their public record — firm, tenure, credentials, disclosures, movement history, a pre-computed fit score.

Advisors are analytical and risk-averse; a move is the biggest, most opaque decision of their career. So the emotional promise is: a PRIVATE, DATA-BACKED ROOM to assess your options — the whole industry's data behind you, an honest guide beside you, zero recruiter pressure. Use the data two ways: (1) aggregate, anonymized authority on the public pages ("we see the whole board"), and (2) a personal "we already found you" moment in the assessment. Don't dump raw data or expose individuals — position it as authority + safety. Tasteful animated data viz is welcome (analytical audience responds to it); fabricated numbers are not — anything specific must be phrasable as "based on N advisors / public filings," and any economics are illustrative ranges (FINRA-sensitive).

## POSITIONING: decide this, then commit

The fork: (A) an advisor-first intelligence firm that openly discloses Axiom and introduces advisors when it fits, or (B) openly a recruiting on-ramp to Axiom. My lean is A — more trust, wider top-of-funnel, conversion lives in the human guide layer. Reason it through, pick one, write a short rationale, and build the site to express it.

## DESIGN DIRECTION: ELEVATE, don't restart

We already have a direction I love — keep it and push it further. **The current build is supplied
alongside this prompt as `reference-v8.html`** (a full working page: markup, CSS, copy, with the
same asset tokens you'll use). Study it first — its hero treatment, glass elements, color tokens,
section rhythm, and copy voice are the baseline you're elevating, not replacing.

The locked look to preserve:

- Cinematic rolling-hills dawn/sunrise photo hero (Mercury.com quality) = "new day / new beginning." The photo is supplied as an asset (see BUILD CONSTRAINTS).
- Translucent GLASS elements (chip, buttons, audience toggle) over the photo — keep the glass, make it feel real (subtle refraction/shimmer, edge light).
- Indigo buttons #4338CA with Slate #334155 as the cool neutral. No purple-gradient AI cliché.
- Fonts: Schibsted Grotesk (headlines + body; weight ~600–650 for confident headlines) + Newsreader italic for accent words. Both supplied as assets.
- White + light-grey alternating sections; a dark "Intelligence" band. Editorial "how we help" — NOT a 3-icon-card grid; custom duotone icons, never generic line icons (they read as AI).
- Sharp ~10px button radius (not pills). Heavy confident headlines, tight tracking.
- Audience toggle up top: "I'm an advisor" / "I lead a firm" — swaps the hero offer/headline/CTA. Advisor is the primary funnel.

Why 6 prior iterations "looked like AI slop," so you avoid it: the AI look was generic STRUCTURE + placeholder CONTENT + stock ICONS, not color. Antidotes that worked: real cinematic photography, sharp ~10px buttons, heavy confident headlines, custom duotone iconography, the dark band, the white/grey section rhythm. Hold that bar.

## THE MAIN ASK: much more MOTION

Elevate the motion design substantially and tastefully (nothing template-y):

- Hero: Ken-Burns zoom + sun-glow pulse + drifting light; add scroll parallax and glass that subtly refracts.
- Scroll-triggered reveals (IntersectionObserver) — sections and stats rise/fade as they enter.
- Animated data as authority: counters that tick up (advisors tracked, moves this quarter), a live "move tracker" ticker, firm net-flow bars that draw on scroll, a comp/deal-range chart that animates in — all aggregate + anonymized.
- Consider a signature motif that literally represents the data: a subtle animated network/constellation of advisor nodes + transition edges behind the hero or Intelligence band — "we know what everyone's doing." Only if it stays elegant, not busy.
- Micro-interactions on buttons, the toggle, cards.
- Everything gated behind `prefers-reduced-motion`.

## COPY: speak to the advisor

Lead with their problem and pain, earn authority with the data, then offer the safe path. Arc: you're being recruited by everyone and can't tell signal from pitch → the decision is huge and opaque → here's what we actually see across the whole industry → assess your options privately, on the data, with a guide → book a call. Real copy, no lorem. Value-prop spine: promise · proof (data) · differentiator (data + guide, not a recruiter) · the human guide · honesty (Axiom disclosed).

## CONVERSION

Primary CTA: book a private call with a guide. Secondary path that also captures data: a Transition Readiness Assessment → a Transition Readiness Report (5 sections: your firm decoded / what you're worth / you vs peers / what advisors like you did next / your readiness) with a "we already found you" pre-fill from the public record. MQL = opt-in/assessment; SQL = books the call. Build the report/result screen too (clearly labeled as a fictional sample).

## BUILD CONSTRAINTS

- One self-contained HTML file: all CSS/JS inline. No external requests of any kind (strict CSP).
- Two screens in that one file: the home page and the Transition Readiness Report result screen, switched with JS (e.g. a `#report` hash / buttons).
- **Assets are supplied — do not fetch anything.** Write these exact placeholder tokens where base64 belongs; a build script replaces them afterward:
  - `[[FONT_SCHIBSTED]]` → Schibsted Grotesk **variable** woff2, weights 400–900, normal style. Declare as `@font-face { font-family:'Schibsted Grotesk'; font-weight:400 900; src:url(data:font/woff2;base64,[[FONT_SCHIBSTED]]) format('woff2'); }`
  - `[[FONT_NEWSREADER]]` → Newsreader **italic 400** static woff2.
  - `[[IMG_HERO]]` → dawn rolling-hills JPEG for the hero: `url(data:image/jpeg;base64,[[IMG_HERO]])`.
- No fabricated stats; label authority numbers as illustrative / "based on public filings." No income promises or guarantees (FINRA/SEC/FTC). The ~725,000 advisor universe from public filings is a real, usable claim.
- Include a plain-language Axiom disclosure and a compliance footer.

## MOTION & CRAFT STANDARDS (hold this bar)

- Every animation needs a purpose — feedback, orientation, or continuity. No decorative motion added "for polish," no looping attention-seekers (pulsing dots, breathing CTAs). Ambient cinematic layers in the hero (Ken Burns, light drift) are the sanctioned exception.
- Never bare `ease` / `ease-in-out`. Use a custom cubic-bezier (e.g. `cubic-bezier(.21,.86,.36,1)`) or spring-like curves. One easing token reused everywhere reads as a system.
- Enter = opacity + small translateY + slight blur. Exits subtler than enters. Stagger siblings with delays. One orchestrated hero load-in beats scattered effects.
- Animate only `transform`, `opacity`, `filter`. Never width/height/top/left.
- `prefers-reduced-motion` handling on every single animation — CSS keyframes gated behind the media query, JS effects behind a `matchMedia` check, counters/gauges jump to final values.
- UI micro-interactions 200–500ms; ambient/cinematic layers can run long (30s+).
- For generative/decorative graphics (the constellation), use `<canvas>` — DPR-aware, paused when offscreen, static single frame under reduced motion.
- Typography: headlines at weight ~600–650 with tight tracking (`letter-spacing: -.03em`), `text-wrap: balance` on headings, body ~65ch max, `font-variant-numeric: tabular-nums` wherever digits align.
- Write real copy everywhere. Words are design material: specific beats clever, and every number gets its "illustrative / from public filings" footing.

## DELIVERABLE

1. The single HTML file (with the three placeholder tokens).
2. Your positioning rationale (A vs B and why), short.
3. A 3-line note on the motion/design system you chose.

Work autonomously at high effort — one build pass, take the time to get it right. Make the design decisions; don't ask me to choose mid-build.
