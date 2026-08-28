# Atlas Global Resilience Corp. — Website

A bilingual (French/English) corporate website with a full admin dashboard for **Atlas Global Resilience Corp.**, an international strategic advisory firm operating at the intersection of Canada, Africa and their global partners.

---

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, Framer Motion, Wouter, TanStack Query
- **Backend**: Node.js, Express 5, Drizzle ORM
- **Database**: PostgreSQL
- **Package Manager**: pnpm (monorepo with workspaces)

---

## Project Structure

```
Atlas-Global-Hub/
├── frontend/
│   └── atlas/          # React frontend (Vite)
├── backend/
│   └── api-server/     # Express REST API
├── shared/
│   ├── db/             # Drizzle ORM schema + migrations
│   ├── api-spec/       # API type definitions
│   ├── api-zod/        # Zod validation schemas
│   └── api-client-react/ # Typed API client
└── tools/
    └── scripts/        # Utility scripts
```

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **pnpm** v9 or higher — install with:
  ```powershell
  npm install -g pnpm
  ```
- **PostgreSQL** running locally or a hosted connection string

---

## Environment Setup

### Backend

Create `backend/api-server/.env`:

```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/atlas_db
NODE_ENV=development
```

### Database

Create `shared/db/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/atlas_db
```

---

## Installation

Install all workspace dependencies from the root:

```powershell
pnpm install
```

---

## Database Setup

Push the schema to your PostgreSQL database:

```powershell
pnpm --filter @workspace/db run push
```

Optionally seed with sample data:

```powershell
pnpm --filter @workspace/db run seed
```

---

## Running the Project

You need to run the **backend** and **frontend** in separate terminals.

### Terminal 1 — Backend API (port 5000)

```powershell
pnpm --filter @workspace/api-server run dev
```

### Terminal 2 — Frontend (port 5174)

```powershell
pnpm --filter @workspace/atlas run dev
```

Then open your browser:

| URL | Description |
|-----|-------------|
| `http://localhost:5174` | Public website |
| `http://localhost:5174/admin/login` | Admin login |
| `http://localhost:5000/api/health` | API health check |

---

## Admin Dashboard

Access the admin panel at `http://localhost:5174/admin/login`

**Demo credentials:**
- Email: `admin@atlas.com`
- Password: `admin123`

The admin dashboard allows you to manage:
- **Services** — Create, edit, delete services
- **Projects** — Manage project portfolio
- **Insights** — Publish articles and insights
- **Sectors** — Manage geographic corridors and sectors

---

## Building for Production

```powershell
# Build entire workspace
pnpm run build

# Build frontend only
pnpm --filter @workspace/atlas run build

# Build backend only
pnpm --filter @workspace/api-server run build
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm --filter @workspace/atlas run dev` | Start frontend dev server |
| `pnpm --filter @workspace/api-server run dev` | Start backend dev server |
| `pnpm --filter @workspace/db run push` | Push DB schema |
| `pnpm --filter @workspace/db run seed` | Seed the database |
| `pnpm run typecheck` | Run TypeScript checks across all packages |
| `pnpm run build` | Build all packages for production |

---

## Website Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/sectors` | Sectors / Corridors |
| `/projects` | Projects |
| `/insights` | Insights |
| `/contact` | Contact |
| `/admin` | Admin Dashboard |

---

## Languages

The website is fully bilingual. Toggle between **Français** and **English** using the language switcher in the navigation bar.

---

## Logo

The logo file is located at `frontend/atlas/public/logo.png`. It is used across the navbar, footer, admin dashboard, and as the site favicon.
