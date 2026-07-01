# Client Brief — Kindred Wealth (COLD-TEST client, fictional)

> This is a **system test**. A fresh agent builds this homepage from `templates/packs/warm-premium.pack.md`
> ONLY — retinting the measured language to the brand tokens below and dropping in this copy. All copy here
> is demo/fictional. Mark any concrete stat/credential/testimonial `[VERIFY]`.

## Brand
- **Name:** Kindred Wealth  ·  **Tagline:** "Wealth care for the people who care for everyone else."
- **Who:** boutique wealth advisory for **physicians, private-practice owners, and physician families.**
- **Register:** warm-premium (this is why `warm-premium.pack` fits).
- **Adjectives:** calm, precise, human, unhurried.  **Anti:** corporate, salesy, clinical-cold, flashy.

## Brand tokens (set these into the Pack §2 `:root` roles — verify AA per §7, darken `--accent-ink` until it passes)
```
--ground:#F4F1E9;  --ground-alt:#E8E3D5;  --card-pale:#ffffff;
--dark:#16302a;    --dark-2:#264d42;                     /* deep forest / mid forest */
--ink:#1b2a25;     --ink-body:#4c5a54;
--on-dark:#F3EFE4; --on-dark-mute:rgba(243,239,228,.74);
--accent:#b8894a;  --accent-soft:#d8b483;  --accent-ink:#6f4e22;  --accent-rgb:184,137,74;
--border:rgba(22,48,42,.14);
```
## Fonts (fit the Pack roles: light-sans display + serif-italic accent — DIFFERENT from the exemplar on purpose)
- `--sans:'Hanken Grotesk'` (load weights 300;400;500;600;700 — 300 is the display weight)
- `--serif:'Newsreader'` (load italic — accent phrase only)

## Conversion skeleton + copy (assemble in the Pack's language)

**HERO** — eyebrow `For Physicians, Practice Owners & Their Families` · H1 (last phrase serif-italic):
"Your income arrived. *The plan didn't.*" · sub: "Kindred coordinates your comp, taxes, practice, and estate
with your CPA and attorney into **one living plan** — so your money isn't one more thing you manage between
patients." · buttons: `Schedule a 20-Minute Call` (fill) + `Take the 4-Question Fit Check` (outline) ·
image-label: `One living plan`

**PAIN** (head: "You out-earn your plan. *That's the problem.*") — 4 cards:
1. "I make great money and still feel behind. Loans, taxes, a mortgage, and no time to figure out the rest."
2. "My comp is a maze — base, RVUs, bonus, a 401(k), a 457, deferred comp — and no one's optimizing across it."
3. "I own the practice, but I have no idea what it's worth or what my buy-out actually looks like."
4. "One malpractice claim scares me more than the market. I don't know if my assets are actually protected."

**WHY KINDRED** (head: "One advisor who sees *the whole chart.*") — 4 cards (icons):
Coordinated, not siloed · Built for physician complexity (comp, PSLF, 457, practice) · Asset & income protection
first · A point person, so you're not managing money between patients.  *(Credentials → `[VERIFY]`.)*

**WHO WE SERVE** (head: "We speak physician. *Generalists don't.*") — 3 photo cards:
- **Attending Physicians** — RVU comp, 401(k)/457/backdoor Roth, PSLF vs refinance, the tax hit no one warned you about.
- **Practice Owners** — practice valuation, buy-in/buy-out, overhead, entity structure, an exit that doesn't gut the practice.
- **Physician Families** — malpractice/asset protection, disability & income protection, estate, education funding.

**FIT CHECK** — 4-question multi-step form (situation / comp band / biggest concern / email). Copy: "Four questions.
Two minutes. We'll tell you honestly whether we can help — and if we can't, we'll point you to someone who can."

**SERVICES** (head: "One plan. *Your CPA and attorney both work from it.*") — 6 bento cards:
Coordinated Planning · Comp & Cash-Flow Strategy · Tax Coordination · Asset & Malpractice Protection ·
Practice & Exit Planning · Estate & Education. (Each: tag + h3 + serif-italic pain-line + 1–2 sentences.)

**PROCESS** (head: "Here's what working with us *actually looks like.*") — 4 steps:
Discovery (20 min, no obligation) · Assessment (1–2 weeks, written either way) · The Plan (one living document; we
brief your CPA & attorney) · Partnership (quarterly; we've already modeled the next contract/vesting).

**PROOF** (the accent moment · head: "What it sounds like when *someone finally has the whole chart.*") —
illustrative testimonial `[VERIFY]` + stats: `[VERIFY]+ yrs` · `3→1` professionals coordinated · `1` living document · `Quarterly` reviews.

**FINAL CTA** (light close · head: "You've been managing money *between patients.*" ) — "Twenty minutes. No pitch.
We'll tell you honestly whether we're a fit." + dual buttons.

**INSIGHTS** — 3 illustrative cards (Article/Podcast/Article), physician-finance topics. Note them illustrative.

**FOOTER** — columns (Explore / Specialties / Contact) + `[VERIFY]` phone/email + compliance disclaimer
(educational only; investments involve risk; past performance not a guarantee) + © Kindred Wealth.
