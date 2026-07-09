# BUILD BRIEF — Mukit Mahdin · home (single page) · vector v1

*(Stage 2.5 · Agent 00 Director. Self-contained: the executor reads ONLY this. Register = `dark-confident` pack, retinted for a technical/AI engineer.)*

## 1. Output
`projects/mukit/build/index.html` — single self-contained HTML file. Scope = full single-page portfolio:
Hero → Ticker → Impact → Selected Work → Capabilities → Signature (pipeline) → Experience → Recognition → Contact → Footer.

## 2. Tokens (`:root` — paste verbatim; dark-confident retinted)
Retint: greige stays as the committed neutral; add ONE ≤3-place micro-accent electric cyan `#5EE6D0` for the signature diagram's active node + link hovers only (pack §1.3 allowance).
```css
:root{
  --black:#0C0C0C; --black-2:#161616; --black-3:#1e1e1e;
  --paper:#F2EDE5; --paper-2:#E8E1D4; --card-pale:#ffffff;
  --greige:#E0D7CE; --greige-deep:#8f8377;
  --ink:#111111; --ink-body:#3d3a36;
  --on-dark:#F5F1EA; --on-dark-mute:rgba(245,241,234,.78);
  --greige-rgb:224,215,206;
  --accent:#5EE6D0; --accent-ink:#0c6b5c;   /* micro-accent, ≤3 places; AA on dark ok, accent-ink for light */
  --accent-rgb:94,230,208;
  --border-dark:rgba(245,241,234,.16); --border-light:rgba(17,17,17,.16);
  --maxw:1240px; --gutter:clamp(20px,4vw,72px); --radius:0px;
  --btn-pad-sm:17.8px 23.7px; --btn-fs-sm:11.9px; --btn-track-sm:.95px;
  --btn-pad-md:20.9px 27.9px; --btn-fs-md:13.9px; --btn-track-md:.7px;
  --btn-pad-lg:28.8px 38.4px; --btn-fs-lg:19.2px; --btn-track-lg:1.5px;
  --dur:.12s; --ease:linear; --dur-soft:.5s; --ease-soft:cubic-bezier(.16,1,.3,1);
  --display:'Oswald','Arial Narrow',sans-serif;
  --label:'Poppins','Helvetica Neue',sans-serif;
  --mono:'JetBrains Mono','SFMono-Regular',ui-monospace,monospace;
}
```
AA notes: `--on-dark-mute` ≥4.5:1 on both `--black` and `--black-2` ✓. `--accent` `#5EE6D0` on `--black` ≈ 12:1 ✓ (use only for small text/strokes). `--accent-ink` for any accent text on light. ink on `--greige` ✓.

## 3. Fonts
- Oswald (display) 300/400/500 — condensed display, ALL headings + numerals.
- Poppins (label/body) 400/500/600 — UI, body, buttons, eyebrows.
- JetBrains Mono (mono) 400/500 — tech tags, code-flavored labels, the pipeline diagram labels (this is the "engineer" tell; use sparingly).
Google Fonts `<link>`. Preconnect.

## 4. Pattern per section
- **HERO** (`bg-black`): centered condensed H1 white with a **cycling-word slot** in `--accent` ("I build ___ that ship" → systems / pipelines / AI products). Uppercase greige eyebrow above; sub ≤56ch `--on-dark-mute`; dual square buttons (fill `Get in touch` + ghost `Download résumé`). `min-height:clamp(600px,88svh,900px)`. Barely-there greige radial + a faint mono "coordinate" grid at ≤.04 alpha (NO heavy overlay graphics). CTA above fold.
  EXECUTION LATITUDE: exact grid texture, cycle timing (~2s). FORBIDDEN: gradient text, particles, photo hero, icon-chip.
- **TICKER** (`bg-black`, ~44px pad, hairline top+bottom): single quiet marquee/row — "SHIPPING AT" KAZ Software · Advisor Growth Lab (US) · mADestic — then a mono stack strip (ASP.NET · FastAPI · React · Python · AWS Lambda · Pinecone). Proof before pitch.
- ⚑ **IMPACT** (`bg-paper`): the quantified-proof row. 3 `--card-pale` square cards + a 4th wide closer. Each = mono tag + **big Oswald numeral (`clamp(44px,4.8vw,64px)`/400, `--ink`)** + one-line outcome + tiny source caption. Numbers: $20K+/mo · $10K+/mo · 800+ hrs/mo, closer row: 400+ articles/hr, 72K+ articles, 40 Lacs BDT/yr, 2 papers. Count-up on reveal (LED-011 setTimeout guard). NOT the same skeleton as any neighbor.
  FORBIDDEN: uniform 4-card grid identical to Selected Work; drop shadows on the light cards (border only).
- ⚑ **SELECTED WORK** (`bg-black`): 4 project rows (NOT cards-grid — rhythm law vs Impact). Each row = big index numeral (01–04 greige), project name (Oswald 24–28px white) + client tag, one-line what-it-is, mono tech strip, and 2–3 result chips. Row hover: bg `--black-2`, accent left-border grows. Projects: RegPlus, TaxIntel AI, ErrumBD, Echo AI. Link "View →" where a live link exists ([VERIFY] URLs).
- **CAPABILITIES** (`bg-paper-2`): ICP self-sort — 3 wide lanes (Backend at scale · Applied & Agentic AI · Full-stack delivery), each = tracked-caps label + Oswald one-liner + 3 mono sub-skills + hairline divider. Hover dips to `--paper`.
- ⚑ **SIGNATURE — the pipeline** (`bg-black`): **bespoke flagship interaction.** An interactive horizontal **system pipeline diagram** literalizing his mechanism: `REQUEST → INGEST → AI PROCESS → VECTOR STORE → CALLBACK → OUTPUT`. Nodes are square (radius 0), connected by hairlines; a single `--accent` "packet" pulse travels left→right on a loop, lighting each node's mono label as it passes; the **final node is `HIRE ME` / resolves into the contact CTA** (CONVERSION LAW — the packet's last stop IS a button to #contact). Clicking any node reveals a one-line mono caption of what he built at that stage (factory/resolver, AWS Lambda + webhooks, Pinecone ingestion, versioned prompt store). SVG strokes, `stroke-dashoffset` draw on scroll (DrawSVG-class, or CSS), reduced-motion = fully drawn static + packet parked on HIRE ME. This is the $50K-team moment — build it fully, no timid version.
- **EXPERIENCE** (`bg-paper`): vertical timeline / process stepper — 3 roles (KAZ Assoc. SWE, Advisor Growth Lab contract, mADestic Eng. Manager) + education (IUT). greige-deep numerals/dates, ink Oswald role heads, hairline connector.
- **RECOGNITION** (`bg-greige` — THE drench, climax): ink Oswald heading; 2 publication cards (`--card-pale` square) + awards list (Hult Prize champion, Blockchain Olympiad finalist). All-ink on greige, verify ≥4.5:1. No fabricated testimonial — this section carries the third-party proof instead.
- **CONTACT / FINAL CTA** (`bg-black`): centered Oswald line "Let's build something that ships." + email (big, mono, copy-on-click), dual btn-lg (`Email me` fill + `GitHub` ghost). Barely-there greige radial.
- **FOOTER** (`bg-black`): columns — wordmark MM, nav anchors, links (email/GitHub/LinkedIn), "Built with the Website Factory pipeline" micro-note, © 2026.

## 5. Signature moment (restated, one sentence)
An interactive request-pipeline diagram — the exact class of system he builds for a living — whose traveling data packet resolves on a `HIRE ME` node wired to the contact CTA.

## 6. Copy
Verbatim slots live in `../copy/COPY_ALL.md`. Use them exactly; keep every `[VERIFY]`.

## 7. Motion budget
Hero cycle-word (~2s), count-ups (Impact, LED-011 guard), staggered reveals (90ms), signature pipeline draw + looping packet, row hover states (≤.15s). Everything collapses to static-visible under `prefers-reduced-motion`. No float/glow/particles. Never blank the page if JS fails (no-JS = `.rise` visible, packet parked).

## 8. Gauntlet checklist
Geometry clean at 390/768/1280, CTA above fold; ALTERNATION LAW (≥4 light-ground sections, max two darks in a row — sequence above satisfies it); square everything (radius 0); AA with alpha-blend math; count-up guard; reduced-motion + no-JS static; zero console errors; zero slop tells (no gradient text, no #000, no shadowed white cards, no Inter-as-display); real numbers only.

## 9. Verification duty
Opus-tier executor: browser-verify at 3 widths + run `node qa/run-checks.js` before returning. Builder does NOT grade own work — a fresh pass re-verifies.
