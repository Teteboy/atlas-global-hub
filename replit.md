# Atlas Global Resilience Corp.

A bilingual (FR/EN) full-stack corporate website for Atlas Global Resilience Corp. — an international consulting firm bridging Canada, Africa and transatlantic partners in strategic development, digital transformation, climate action, education, and governance.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/atlas run dev` — run the frontend (port 20388)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, Framer Motion, wouter (routing), React Query
- API: Express 5 (served at `/api`)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)
- `lib/db/src/schema/` — Drizzle table definitions (services, projects, insights, sectors, contact_submissions)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/atlas/src/` — React frontend

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → typed React Query hooks + Zod validators
- Bilingual (FR/EN) via a `useLanguage` React context — `t(fr, en)` helper on every visible string, default French
- All 5 service baskets, projects, sectors, insights and contact submissions live in PostgreSQL with full CRUD
- Stats endpoint (`/api/stats`) aggregates counts + featured items for the home page in one call
- Frontend routing with wouter, layout shared via `AppLayout` with `Navbar` and `Footer`

## Product

- Home page: hero, credibility strip, 5 service baskets, Why Atlas pillars, sectors, featured projects, recent insights, CTA
- About: mission, approach, leadership, why the name Atlas
- Services: overview of 5 baskets + detail page per service
- Sectors & Corridors: 4 geographic corridors (Canada–Cameroon, Canada–Nigeria, Regional Africa, Transatlantic)
- Projects/Achievements: 2 featured case studies (REFUS-Carbone, Gouvernance inclusive)
- Insights: 3 strategic articles (corridors, green finance, PMO)
- Contact: validated form wired to backend, 48h response promise

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any schema change: run `pnpm --filter @workspace/db run push` then restart the API server
- After any OpenAPI spec change: run `pnpm --filter @workspace/api-spec run codegen` then restart both servers

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
