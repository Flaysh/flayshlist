<p align="center">
  <img width="200" height="200" alt="FlayshList Logo" src="https://github.com/user-attachments/assets/e6559ede-9999-4415-ae49-8ff8c3b06283" />
</p>

<h1 align="center">FlayshList</h1>

<p align="center">
  <strong>A production-grade portfolio built with Next.js 16, React 19, and TypeScript</strong>
</p>

<p align="center">
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript 5" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css" alt="Tailwind CSS 4" /></a>
  <a href="#testing"><img src="https://img.shields.io/badge/E2E-Playwright-45ba4b?logo=playwright" alt="Playwright" /></a>
</p>

---

## Overview

FlayshList is a meticulously architected portfolio application demonstrating modern frontend engineering practices. Built with a focus on performance, accessibility, and maintainability, this project showcases production-ready patterns while maintaining intentional simplicity.

**Live Demo**: [artlist.flaysh.com](https://artlist.flaysh.com)

### Key Engineering Highlights

- **Server-First Architecture** — Leverages React Server Components by default, minimizing client-side JavaScript
- **Type-Safe Throughout** — Strict TypeScript configuration with full type coverage
- **Comprehensive Testing** — E2E tests with Playwright
- **Automated CI/CD** — GitHub Actions pipeline with parallel lint, type-check, e2e, and build jobs
- **Performance Optimized** — Aggressive caching, image optimization, and minimal bundle size
- **Accessibility First** — WCAG-compliant with full keyboard navigation and semantic HTML

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS, Custom Design System |
| **Database** | PostgreSQL (Vercel Postgres/Neon), Prisma ORM |
| **Storage** | Vercel Blob Storage |
| **AI/ML** | Replicate API (FLUX, LTX Video) |
| **Testing** | Playwright (E2E) |
| **Quality** | ESLint 9, TypeScript Strict Mode |
| **CI/CD** | GitHub Actions, Vercel |
| **Package Manager** | pnpm 9 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │  Home   │ │  Music  │ │ Visuals │ │  About  │ │   Chat  │   │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                     Component Layer                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Design System: Button, Card, Badge, Input, Select       │  │
│  │  Layout: Header (responsive nav), Footer                 │  │
│  │  Embeds: Spotify, SoundCloud, Instagram                  │  │
│  └──────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                       Data Layer                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Centralized Content Store (/data/content.ts)            │  │
│  │  Type-safe data structures for CV, social, media         │  │
│  └──────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                     Quality Gates                               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │   ESLint    │ │  TypeScript │ │   Testing   │               │
│  │   + Rules   │ │   Strict    │ │     E2E     │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
└─────────────────────────────────────────────────────────────────┘
```

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| **No external database** | Static content eliminates unnecessary complexity and infrastructure costs |
| **Local AI knowledge base** | Demonstrates pattern matching without API dependencies or costs |
| **Minimal client components** | Server components by default reduce bundle size and improve performance |
| **Centralized data store** | Single source of truth enables consistent content management |
| **Custom design system** | Composable primitives ensure visual consistency without library bloat |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with hero + navigation
│   ├── music/page.tsx            # Music catalog with embeds
│   ├── reels/page.tsx            # Visual portfolio (Instagram)
│   ├── about/page.tsx            # Professional CV/resume
│   ├── chat/                     # AI chat interface
│   │   ├── page.tsx
│   │   └── ai-chat.tsx
│   ├── tools/page.tsx            # Technical architecture showcase
│   ├── layout.tsx                # Root layout with providers
│   ├── error.tsx                 # Error boundary
│   └── not-found.tsx             # 404 handling
│
├── components/
│   ├── ui/                       # Design system primitives
│   │   ├── button.tsx            # 4 variants, 3 sizes
│   │   ├── card.tsx              # Flexible card family
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── embed-container.tsx   # Responsive iframe wrapper
│   │
│   └── layout/
│       ├── header.tsx            # Responsive navigation
│       └── footer.tsx
│
├── data/
│   └── content.ts                # Centralized content store
│
├── lib/
│   └── design-system/
│       └── utils.ts              # cn() utility + focus ring
│
└── hooks/                        # Custom React hooks

e2e/
└── smoke.spec.ts                 # Critical path E2E tests
```

---

## Features

### Server-First Rendering
Uses React Server Components throughout, with `'use client'` directives only where interactivity is required (navigation menu, chat interface). This approach minimizes JavaScript sent to the client.

### Responsive Design System
Custom component library built on Tailwind CSS 4 with consistent design tokens:
- **Primary**: Blues (`#0c8ce9`)
- **Accent**: Orange (`#ff7a0f`)
- **Neutral**: Grays (dark-first palette)

### Third-Party Integrations
Production-grade embed handling for:
- **Spotify** — Artist player widgets
- **SoundCloud** — Track and playlist embeds
- **Instagram** — Dynamic script injection with `instgrm.Embeds.process()`

### Accessibility
- Semantic HTML structure
- Focus ring management
- ARIA labels and roles
- Keyboard navigation support
- Mobile-responsive touch targets

---

## Testing

### E2E Tests (Playwright)
```bash
pnpm e2e
```

14+ test cases covering:
- Navigation flows across all pages
- Content rendering verification
- AI chat interaction
- Mobile responsive behavior
- Accessibility compliance (heading hierarchy, keyboard nav)

---

## CI/CD Pipeline

GitHub Actions workflow with three parallel jobs:

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ lint+typecheck  │  │      e2e        │  │      build      │
│ (ESLint + TSC)  │  │  (Playwright)   │  │   (Next.js)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## Performance & Security

### Caching Strategy
- Static assets: `max-age=31536000, immutable`
- Next.js automatic optimization for images and fonts

### Security Headers
```
X-DNS-Prefetch-Control: on
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Image Optimization
- Next.js `<Image>` component with responsive `sizes`
- WebP/WebM formats for media assets
- Lazy loading for below-fold content

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/itayflaysher/flayshlist.git
cd flayshlist

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript compiler |
| `pnpm e2e` | Run E2E tests |
| `pnpm prisma generate` | Generate Prisma client |
| `pnpm prisma migrate dev` | Run database migrations (dev) |

---

## FLAYSH AI Toolkit

The **FLAYSH AI Toolkit** is a production-ready AI generation feature that demonstrates enterprise-level architecture with Artlist.io's toolkit aesthetic. Built with cost-effective AI providers, robust rate limiting, and watermarked outputs.

### Features

- **AI Image Generation** — Create stunning images with FLUX models (2 generations/day)
- **AI Video Generation** — Generate short videos with LTX Video (1 generation/day)
- **Explore Gallery** — Curated presets with copy-to-create workflow
- **History Rail** — Session-based history with asset previews
- **Watermarking** — Automated watermark application on all outputs
- **Rate Limiting** — IP-based quotas with burst protection
- **Glass UI** — Premium dark theme with glassmorphism and subtle animations

### Setup Instructions

#### 1. Database Setup (Vercel Postgres)

Add PostgreSQL database via Vercel dashboard:

```bash
# In your Vercel project dashboard:
# Storage → Add → Postgres (Neon-backed)
# This will automatically add DATABASE_URL to your environment variables
```

Pull environment variables locally:

```bash
vercel env pull .env.local
```

#### 2. Blob Storage Setup

Add Vercel Blob storage:

```bash
# In your Vercel project dashboard:
# Storage → Add → Blob Store
# This will add BLOB_READ_WRITE_TOKEN to your environment
```

#### 3. Environment Variables

Create/update `.env.local` with:

```bash
# Database (from Vercel Postgres)
DATABASE_URL=postgres://user:password@host:5432/dbname

# Vercel Blob Storage (from Vercel Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxx

# Replicate API (sign up at replicate.com)
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# IP Hashing Salt (generate a random string)
IP_HASH_SALT=your-random-secure-salt-here
```

#### 4. Database Migrations

Run Prisma migrations to create tables:

```bash
# Generate Prisma client
pnpm prisma generate

# Create and apply migrations (development)
pnpm prisma migrate dev --name init

# For production (Vercel automatically runs migrations)
# Set this in Vercel project settings:
# Build Command: prisma migrate deploy && next build
```

#### 5. Replicate API Setup

1. Sign up at [replicate.com](https://replicate.com)
2. Get your API token from Account Settings
3. Add `REPLICATE_API_TOKEN` to `.env.local`

### Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    FLAYSH AI Toolkit                         │
├──────────────────────────────────────────────────────────────┤
│  Frontend (Next.js App Router)                               │
│  ├─ /toolkit/page.tsx (Main page)                            │
│  ├─ ToolkitShell (Layout + state management)                 │
│  ├─ Sidebar (Image/Video tool selector)                      │
│  ├─ Tabs (Explore/Create)                                    │
│  ├─ ExploreGallery (Curated presets)                         │
│  ├─ CreatePanels (Image/Video forms)                         │
│  ├─ ResultsGrid (Generated assets)                           │
│  └─ SessionsRail (History sidebar)                           │
├──────────────────────────────────────────────────────────────┤
│  API Routes                                                   │
│  ├─ POST /api/toolkit/image                                  │
│  ├─ POST /api/toolkit/video                                  │
│  └─ GET  /api/toolkit/sessions                               │
├──────────────────────────────────────────────────────────────┤
│  Server-Side Logic                                            │
│  ├─ IP hashing (privacy-first user identification)           │
│  ├─ Rate limiting (quotas + burst protection)                │
│  ├─ Replicate integration (FLUX, LTX Video)                  │
│  ├─ Watermarking (sharp for images, ffmpeg for videos)       │
│  └─ Blob storage (Vercel Blob for assets)                    │
├──────────────────────────────────────────────────────────────┤
│  Database (PostgreSQL via Prisma)                            │
│  ├─ toolkit_usage (quotas tracking)                          │
│  ├─ toolkit_session (generation sessions)                    │
│  └─ toolkit_asset (generated outputs)                        │
└──────────────────────────────────────────────────────────────┘
```

### Quotas & Rate Limiting

**Daily Quotas (per IP address):**
- Image generations: 2 sessions/day
- Video generations: 1 session/day

**Burst Protection:**
- Max 3 requests per 30 seconds

**Privacy:**
- Raw IPs are never stored
- All tracking uses SHA-256 hashed IPs with salt

### Tech Decisions

| Decision | Rationale |
|----------|-----------|
| **Replicate API** | Cost-effective, serverless-friendly, no GPU infrastructure needed |
| **IP-based quotas** | No authentication required, maintains public access |
| **Hashed IPs** | Privacy-compliant user tracking without storing PII |
| **Vercel Blob** | Simple, scalable asset storage with CDN |
| **Server-side watermarking** | Prevents circumvention, ensures brand protection |
| **Prisma ORM** | Type-safe database queries, great DX |

### Cost Optimization

- **FLUX Schnell** — Fast, budget-friendly image model
- **LTX Video** — Efficient short-form video generation
- **480p default** — Balances quality and generation cost
- **Vercel Blob** — Pay-per-use storage (first 100GB free)
- **Quotas** — Prevents abuse and controls costs

### File Structure

```
src/
├── app/
│   ├── api/toolkit/
│   │   ├── image/route.ts          # Image generation endpoint
│   │   ├── video/route.ts          # Video generation endpoint
│   │   └── sessions/route.ts       # History fetch endpoint
│   └── toolkit/
│       ├── page.tsx                # Main toolkit page
│       ├── components/             # UI components
│       └── data/                   # Curated presets (JSON)
├── lib/toolkit/
│   ├── db.ts                       # Prisma client singleton
│   ├── ip.ts                       # IP hashing utilities
│   ├── rate-limit.ts               # Quota enforcement
│   ├── watermark-image.ts          # Image watermarking (sharp)
│   ├── watermark-video.ts          # Video watermarking (ffmpeg)
│   └── types.ts                    # TypeScript definitions
└── prisma/
    └── schema.prisma               # Database schema
```

### Deployment Checklist

- [ ] Add Vercel Postgres integration
- [ ] Add Vercel Blob storage
- [ ] Set all environment variables in Vercel
- [ ] Run database migrations
- [ ] Test image generation (check watermark)
- [ ] Test video generation (check watermark)
- [ ] Verify rate limiting works
- [ ] Confirm quotas reset daily

### Future Enhancements

- Add user authentication for higher quotas
- Implement credit system for power users
- Add more AI models (Stable Diffusion XL, etc.)
- Support custom watermarks
- Add generation queue for async processing
- Implement webhook notifications
