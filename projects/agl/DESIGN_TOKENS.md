# AGL Web — Design Tokens (v9 system)
The quick palette card for any new AGL web design element. Full rulebook: `v9/DESIGN_SYSTEM.md`
(R1–R34). Print/collateral uses the separate Brand Packet (navy/gold/orange + Inter) — do not mix.

## Color

| Token | Hex / value | Use |
|---|---|---|
| **Accent indigo** | `#4338CA` | THE accent — buttons, links, key numerals, kickers. One accent, used sparingly. |
| Accent hover | `#3730A3` | Button/link hover |
| Accent soft | `rgba(67,56,202,.07)` | Tinted fills, selected states, callout backgrounds |
| **Periwinkle** | `#A5B4FC` / `#C3CCFF` | The accent's voice on dark surfaces (eyebrows, serif words, chips) |
| **Warm gold** | `#F2C782` | Tiny doses only — ticker dot, pulses, event chips. Never large fills. |
| **Ink** | `#0F172A` | Headlines, primary text |
| Body slate | `#334155` | Body copy |
| Muted | `#69768C` | Captions, labels, notes |
| White | `#FFFFFF` | Base surface |
| Grey | `#F1F4F9` | Alternating section surface, cards on white |
| Grey 2 | `#E4E9F1` | Tracks, subtle fills |
| Line | `rgba(15,23,42,.10)` / `.05` | Borders / hairlines |
| **Deep band** | `#0B0F28 → #171E48` (gradient 135–160deg) | The ONE dark band per page + heroes; add glow `rgba(99,102,241,.24)` radial |
| On-deep text | `#E9ECF9` · soft `rgba(226,230,248,.68)` · mute `rgba(200,207,238,.45)` | Dark-surface type ramp |

Section rhythm: white / grey alternating + one deep band per page (R9).

## Typography

- **Schibsted Grotesk** (variable 400–900) — headlines AND body.
  Headlines: weight ~650, tracking −0.03em, line-height ≤1.08. Hero clamp(44→74px), sections clamp(30→44px).
  Emphasis-within-headline: weight 800–850.
- **Newsreader italic 400** — 1–3 accent words per headline only; indigo on light, periwinkle on dark.
- Body: 15.5–17.5px, line-height 1.5–1.65, measure ≤65ch.
- Labels/eyebrows/kickers: 11–12px, weight 640, uppercase, tracking +.12em.
- Numbers: `font-variant-numeric: tabular-nums`.

## Surfaces & shape

- Buttons: **10px radius** (never pills — R3). Primary = solid indigo w/ shadow `0 10px 26px -10px rgba(67,56,202,.55)`; secondary = white w/ line border; on-photo = glass.
- Cards: **16px radius** (large feature cards 18px), 1px line border, layered soft shadows:
  sm `0 1px 2px rgba(15,23,42,.06)` · md `0 12px 32px -16px rgba(15,23,42,.18)` · lg `0 34px 70px -34px rgba(15,23,42,.32)`.
- Glass (over photo/dark): white 8–14% + `backdrop-filter: blur(12–14px) saturate(1.3)` + 1px white/25 border + inset top edge-light + hover sheen sweep (R14).
- Chips: 999 radius, 1px border, tinted at 6% fill.

## Motion

- One easing token everywhere: `cubic-bezier(.21,.86,.36,1)`. Never bare ease/linear (R18).
- Enter: opacity + translateY(14–22px) + slight blur, stagger 90–130ms (R19). Settle <1.5s (R31).
- Animate transform/opacity/filter only; IntersectionObserver reveals; `prefers-reduced-motion` path for everything (R20–R21).
- Data animates as authority: counters tick (easeOutCubic ~1.5s), bars scale from origin, lines draw (R22).
- Signature motifs: constellation canvas (node/link alpha ≤.2, sparse warm-gold pulses) + movement-wire marquee.

## Iconography & imagery

- Icons: custom duotone only — tinted fill `rgba(67,56,202,.16)` + `#4338CA` stroke ~1.8–2.4, drawn per concept, 44px grid (R2). Never generic line-icon packs.
- Photography: one cinematic full-bleed hero with layered scrims + grain + warm glow (R16). No stock scatter.
