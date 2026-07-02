# Anchor Wealth Planning — Full-Site Architecture
**Modeled on the LongView Planning Partners site** (`~/Documents/advisor-sites/longview/` — Chris's
instruction: "AWP will be something very similar"). Mapped 2026-07-02 (overnight session).
Design language: whichever Pack Chris picks from `previews/index.html`; the architecture is
Pack-agnostic. Homepage is already built (`build/maven-home.html`, warm-premium v1.2).

## The LongView model → Anchor mapping

| LongView page | Anchor equivalent | Phase | Notes |
|---|---|---|---|
| homepage_v8 | `/` ✅ built | 1 | conversion machine — done |
| who-we-serve (hub) | `/who-we-serve` | 1 | 3 ICP cards → deep pages |
| icp-earlycareer / icp-laterstage / icp-diy | `/who-we-serve/oil-gas-executives` · `/business-owners` · `/families` | 1 | **the LongView move the old SITEMAP missed: one DEEP page per ICP**, each with its own pain language, services emphasis, and fit-check CTA |
| services | `/services` | 1 | outcomes-first, 6 offerings, each tied to a pain |
| process | `/process` | 1 | 4 steps + "what happens when you reach out" friction removal |
| team + advisor-profile ×3 | `/about` (Alex profile) | 1 | solo practice → one page: story, Merrill arc `[VERIFY years]`, philosophy, photo `[VERIFY]`, credentials `[VERIFY]` |
| book ("Schedule a Clarity Call") | `/book` | 1 | dedicated scheduling page (Calendly/embed `[VERIFY tool]`) — every CTA's destination |
| **post-assessment ("Your Assessment Results")** | `/fit-results` | 1 | **the MQL→SQL bridge — LongView's smartest page.** Fit-check completers land here: personalized-feeling result + the booking CTA while intent is hot. Without it the fit check dead-ends at "we'll email you." |
| blog + 6 posts | `/insights` hub + 3 launch articles | 2 | topics per homepage teasers (RSU timing / coordinated planning / exit readiness); format `[VERIFY with Alex — article vs podcast vs VIDEO]` — video-first per Chris 2026-07-01 (Pack §8.4 video insight cards) |
| landing-pslf (campaign LP) | `/lp/rsu-tax-review` (or similar) | 2 | campaign-specific landing page pattern, one per ad angle |
| licensing | `/disclosures` | 1 | regulatory/licensing page — CONTENT BLOCKED on Alex's registration `[VERIFY — decides SEC Marketing Rule vs FINRA 2210]` |

## Per-page section orders (Phase 1)
Follows `templates/editorial-luxury/PAGE_SYSTEM.md` inner-page architecture + the chosen Pack's language.

- **/who-we-serve:** hero (short, typographic) → "if you see yourself, we should talk" framing → 3 ICP
  deep-links (photo cards) → shared pains strip → fit-check mini-hero → footer.
- **/who-we-serve/[icp] ×3:** ICP-named hero → their exact pains (4, in their words) → what we do for
  them specifically (3–4 services emphasized) → relevant proof `[VERIFY]` → process preview → fit-check
  mini-hero (pre-filtered to their segment) → footer.
- **/services:** hero → 6 services, each = pain quote + outcome + what's included → "the core: coordinated
  planning" feature block → fit-check mini-hero → footer.
- **/process:** hero → 4 steps expanded (what you bring, what happens, what you get, timeline each) →
  "the first call is just a conversation" de-risk block → book CTA → footer.
- **/about:** hero (Alex, real photo `[VERIFY]`) → the arc (Merrill → independent, WHY — no fabricated
  backstory, `[VERIFY]` all specifics) → philosophy/how he works → credentials `[VERIFY]` → Houston
  grounding → book CTA → footer.
- **/book:** minimal — headline + expectation-setting (30 min, no pitch, what to have handy) + embed
  `[VERIFY tool]` + fallback phone/email `[VERIFY]`.
- **/fit-results:** result framing by segment (no fake scoring — honest "here's what your answers suggest
  we'd look at first") → the 2–3 priorities for their profile → book CTA (primary conversion) →
  what-happens-next strip.
- **/disclosures:** entity, registration, fees `[ALL VERIFY — blocked on Alex]`.

## Build order (once Chris picks the design language)
1. `/fit-results` (closes the conversion loop on the EXISTING homepage — highest leverage)
2. `/who-we-serve` + 3 ICP pages (SEO + ad-landing surface)
3. `/services`, `/process`, `/about`, `/book`
4. `/disclosures` (as soon as Alex confirms registration)
5. Phase 2: `/insights` + content, campaign LPs

## Video note (Chris, 2026-07-01)
Sites ship with real video content. Slots reserved: homepage hero loop (ambient), video testimonial in
Proof, featured video insight, `/about` intro video of Alex. All Pack §8.4 rules apply (poster-first,
click-to-play except ambient hero, real footage only — `[VERIFY]` until assets exist).
