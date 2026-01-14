<img width="200" height="200" alt="icon" src="https://github.com/user-attachments/assets/e6559ede-9999-4415-ae49-8ff8c3b06283" />

# FlayshList

FlayshList is a purpose-built portfolio that mirrors the creator journey Artlist serves. It combines my senior frontend engineering craft with my lived experience as an audiovisual artist and music producer (FLAYSH). The result is a polished, production-grade Next.js app that showcases how I design, build, and ship for creators.

## Why this exists

I built FlayshList for one reason: to demonstrate how I would contribute at Artlist. I care about creator workflows because I live them. From discovery to playback to presentation, every decision in this project reflects empathy for artists and a high bar for engineering quality.

## Highlights

- Creator-first experience across music, visuals, and a full CV.
- Local AI chat (no external APIs) that answers questions about my background.
- Clean data layer with Prisma + SQLite and a filterable API surface.
- Custom UI components and design tokens for consistent, premium UI.
- Real embeds from Spotify, SoundCloud, and Instagram.
- Comprehensive testing with unit, hook, and E2E coverage.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + custom design system
- Prisma + SQLite (seeded content)
- TanStack Query + nuqs
- Vitest + Testing Library + Playwright

## Architecture overview

- UI: Server and client components in the App Router.
- Design system: shared utility helpers and UI primitives.
- Data: Prisma models + a route handler BFF with Zod validation.
- State: TanStack Query for server state; nuqs for URL state.
- Testing: unit tests for API client and hooks, route handler tests, and E2E navigation coverage.

## Project structure

```
src/
  app/                    # Pages, layouts, route handlers
  components/             # UI + layout components
  data/                   # CV + content data
  hooks/                  # Query hooks
  lib/                    # API + design system + Prisma client
prisma/                   # Schema + seed data
public/                   # Media assets
```

## Getting started

1. Install dependencies

```bash
pnpm install
```

2. Configure the database

Create a `.env` file in the project root:

```
DATABASE_URL="file:./prisma/dev.db"
```

3. Generate Prisma client + seed data

```bash
pnpm db:generate
pnpm db:push
pnpm seed
```

4. Run the app

```bash
pnpm dev
```

## Useful scripts

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm e2e`
- `pnpm build`

## Notes

- The AI chat uses a local rule-based knowledge base in `src/app/chat/ai-chat.tsx`.
- The assets API lives under `src/app/api/assets` and supports filtering, search, and pagination.

## About me

I am a senior frontend engineer with 6+ years shipping production React/Next.js products, and I am also an active audiovisual artist. I build tools for creators because I am one. If you are reading this at Artlist, I would love to join the team and help craft the next generation of creative workflows.

- GitHub: https://github.com/Flaysh
- LinkedIn: https://www.linkedin.com/in/flaysh/
- SoundCloud: https://soundcloud.com/flay5h
- Instagram: https://www.instagram.com/flaysh_/
