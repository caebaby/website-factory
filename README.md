# Website Factory

End-to-end system for building high-converting websites on demand.

**Input:** Client intake doc  
**Output:** Complete production-ready site, deployed, client-editable

---

## How It Works

```
Client Intake Doc
       ↓
[01 Research Agent]   — ICP deep research, competitor analysis, industry language
       ↓
[02 Strategy Agent]   — Copy framework, headline hierarchy, CTA map
       ↓
[03 Copy Agent]       — All page copy written
       ↓
[04 Build Agent]      — Pages assembled from template library
       ↓
[05 QA Agent]         — Broken links, placeholders, compliance flags
       ↓
Complete site → GitHub → Vercel → Live
```

**Target:** Full site in under 5 hours. Minimal human time after intake doc is complete.

---

## Folder Structure

```
website-factory/
  agents/              ← Agent prompt files (one per phase)
  templates/
    _base/             ← Shared CSS system, components, intake template
    editorial-luxury/  ← Professional services, advisory, law
    clean-craft/       ← Trades, farrier, artisan, agriculture
  projects/            ← One subfolder per client project
  docs/                ← System documentation
```

---

## Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Build | Claude Code + agents | This repo |
| Templates | Vanilla HTML/CSS | Self-contained, no framework |
| Hosting | Vercel | GitHub push → auto-deploy |
| CMS | Sanity.io | Client-editable, compliance-safe draft/publish |
| Forms/CRM | Go High Level | Agency sub-accounts per client |
| Analytics | GA4 + Meta Pixel | Via GTM |

---

## Quick Start (New Client)

1. Client fills out `templates/_base/INTAKE.md`
2. Point Claude to this repo: `cd /path/to/website-factory`
3. Run: `New project: [client name]. Intake doc attached. Run agents 01-05.`
4. Review output in `projects/[client-name]/`
5. Push → Vercel deploys automatically
6. Connect client domain in Vercel (5 min)

---

## Templates

| Template | Best For | Status |
|----------|----------|--------|
| `editorial-luxury` | Financial advisory, law, professional services | 🟡 In progress (LongView reference) |
| `clean-craft` | Trades, farrier, artisan, agriculture | 🔴 Coming soon |

---

## Projects

| Client | Template | Status |
|--------|----------|--------|
| LongView Planning Partners | editorial-luxury | 🟡 Active (separate repo) |
| Farrier Site | clean-craft | 🔴 Next |
