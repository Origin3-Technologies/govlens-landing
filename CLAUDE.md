# GovLens Landing — Claude Context

GovLens product marketing page at **govlens.ph**. Targets LGU decision-makers. Pilot application via Formspree. Interactive `/demo` simulates the full GovLens app experience.

## Repo & Branch
- GitHub: `Origin3-Technologies/govlens-landing`
- **Active branch: `main`** — this is what deploys to govlens.ph (`rebrand-2026` was merged into `main` in session 30)
- Local path: `govlens/govlens-landing/`
- Deploy: `vercel --prod` from `govlens/govlens-landing/` (auto-aliases to govlens.ph)

## Stack
- **Next.js 16.2.1** (Turbopack) — component-based, `"use client"` where needed
- **Tailwind CSS v4** + CSS variables (`--gl`, `--glm`, `--navy`, `--surf`, etc.)
- **Formspree** — pilot application form (`https://formspree.io/f/xpwzbbqv`)
- Config: `next.config.mjs` (must be `.mjs` — this Next.js version rejects `.ts`)

## Page Sections (`src/app/page.tsx` + `src/components/`)
| Component | Content |
|-----------|---------|
| `Nav` | Logo + "Apply for Access" CTA only (no nav links) |
| `Hero` | "See your government data clearly." + mockup + inline stats |
| `HowItWorks` | 3 steps — Upload → AI Cleans → Explore |
| `Features` | 3 pillars — Upload & Clean / Instant Dashboards / Ask in Filipino |
| `PilotCTA` | Green section, form, 3 inline FAQ accordion items |
| `Footer` | Logo + email + copyright |
| `ScrollReveal` | IntersectionObserver wrapper for `.reveal` animations |

## `/demo` Route
Interactive GovLens simulation — 8 sections (Home, Datasets, Dashboard, SAI Chat, Table, Graph, Connections, Node Monitor). Generic LGU data, no real client info.
- Shell matches actual GovLens Angular app: dark topbar (`#0F1923`, 44px) + bottom floating pill dock
- All icons are inline SVGs (no emoji)
- Design tokens: `--gl: #0F6E56`, `--glm: #1D9E75`

## Dev Commands
```bash
cd govlens/govlens-landing   # always confirm branch is rebrand-2026
npm run dev                  # http://localhost:3000
vercel --prod                # deploy → govlens.ph
```

## Rules
- GovLens only — never add Origin3 company content, multi-product sections, or SchoolLens/o3-Identity
- For Origin3 company content → use `o3-landing/` instead
