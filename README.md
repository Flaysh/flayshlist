<p align="center">
  <img width="200" height="200" alt="FlayshList Logo" src="https://github.com/user-attachments/assets/e6559ede-9999-4415-ae49-8ff8c3b06283" />
</p>

<h1 align="center">FlayshList</h1>

<p align="center">
  <strong>A production-grade portfolio featuring an AI Image Generation Toolkit</strong><br/>
  <em>Built with Next.js 16, React 19, TypeScript 5, and Tailwind CSS 4</em>
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

FlayshList is a meticulously architected portfolio application demonstrating senior-level frontend engineering practices. The flagship feature is a **full-stack AI Image Generation Toolkit** that showcases production-ready patterns including API design, state management, rate limiting, and multi-service integration.

**Live Demo**: [artlist.flaysh.com](https://artlist.flaysh.com)

### Key Engineering Highlights

- **Full-Stack AI Toolkit** — Multi-model image generation with FLUX and Stable Diffusion 3
- **Server-First Architecture** — React Server Components for optimal performance
- **Type-Safe Throughout** — End-to-end TypeScript with discriminated unions
- **Production Infrastructure** — Vercel KV, Blob storage, Upstash rate limiting
- **Comprehensive Testing** — E2E tests with Playwright
- **Automated CI/CD** — GitHub Actions pipeline with parallel jobs

---

## AI Toolkit

The centerpiece feature: a production-grade AI image generation system inspired by [Artlist's toolkit](https://artlist.io).

### Features

| Feature | Description |
|---------|-------------|
| **Multi-Model Support** | FLUX Schnell (fast), FLUX Pro (quality), SD3 (creative control) |
| **Aspect Ratios** | 1:1, 16:9, 9:16, 4:3, 3:4 with automatic dimension calculation |
| **Resolution Options** | 720p and 1080p presets |
| **Negative Prompts** | Specify what to avoid (SD3 only) |
| **Guidance Scale** | Control prompt adherence with model-specific ranges |
| **Recreate Flow** | Click any gallery image to regenerate with same settings |
| **Rate Limiting** | Two-tier system (5/hour, 20/day) with development bypass |

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  UI Layer: PromptDock → ModelSelector, AspectRatioSelector, AdvancedSettings│
├─────────────────────────────────────────────────────────────────────────────┤
│  State: AIToolkitClient (assets[], settingsToRecreate, callbacks)           │
├─────────────────────────────────────────────────────────────────────────────┤
│  API: /api/ai/image → Validation → Rate Limit → Replicate → Storage        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Infrastructure: Replicate AI | Vercel Blob | Vercel KV | Upstash Ratelimit │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technical Deep-Dive

For comprehensive documentation including data flow diagrams, type system design, and engineering decisions, see **[docs/AI_TOOLKIT.md](docs/AI_TOOLKIT.md)**.

Key engineering patterns demonstrated:
- **Discriminated unions** for type-safe API responses
- **Model capability abstraction** for extensible multi-model support
- **Lifted state with callbacks** for predictable data flow
- **Server/client component boundary** optimization
- **Progressive fake progress** for perceived performance

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS, Custom Design System |
| **AI/ML** | Replicate (FLUX, Stable Diffusion 3) |
| **Storage** | Vercel Blob (images), Vercel KV (metadata) |
| **Rate Limiting** | Upstash Ratelimit (sliding window) |
| **Testing** | Playwright (E2E) |
| **Quality** | ESLint 9, TypeScript Strict Mode |
| **CI/CD** | GitHub Actions, Vercel |
| **Package Manager** | pnpm 9 |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Presentation Layer                          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐ │
│  │  Home   │ │  Music  │ │ Visuals │ │  About  │ │AI Toolkit │ │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     Component Layer                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Design System: Button, Card, Badge, Input, Select       │  │
│  │  Layout: Header (responsive nav), Footer, NewBanner      │  │
│  │  AI Toolkit: PromptDock, MasonryGrid, ModelSelector...   │  │
│  │  Embeds: Spotify, SoundCloud, Instagram                  │  │
│  └──────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                      API & Lib Layer                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  /api/ai/image: Generation endpoint with rate limiting   │  │
│  │  lib/ai-models: Model configs, dimension calculations    │  │
│  │  lib/gallery: KV operations, seed image generation       │  │
│  │  lib/ratelimit: Two-tier rate limiting with IP detection │  │
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
| **Discriminated union responses** | Type-safe error handling with compile-time exhaustiveness |
| **Model capability flags** | Extensible system for adding new AI models |
| **Server-side gallery fetch** | Fast first paint, SEO-friendly initial load |
| **Sliding window rate limits** | Smooth rate limiting without abrupt cutoffs |
| **Fake progress animation** | Improved perceived performance during generation |
| **Seed images** | Rich gallery experience even with no generated content |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage with AI Toolkit hero
│   ├── ai-toolkit/               # AI Image Generation feature
│   │   ├── page.tsx              # Server component (data fetch)
│   │   └── client.tsx            # Client component (state)
│   ├── api/
│   │   └── ai/
│   │       └── image/route.ts    # Generation API endpoint
│   ├── music/page.tsx
│   ├── reels/page.tsx
│   ├── about/page.tsx
│   ├── chat/
│   ├── layout.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── components/
│   ├── ai-toolkit/               # AI Toolkit components
│   │   ├── PromptDock.tsx        # Main input interface (280+ lines)
│   │   ├── ModelSelector.tsx     # Model dropdown
│   │   ├── AspectRatioSelector.tsx
│   │   ├── AdvancedSettings.tsx  # Negative prompt, guidance
│   │   ├── MasonryGrid.tsx       # Gallery with recreate
│   │   ├── AssetModal.tsx        # Full-screen viewer
│   │   └── index.ts              # Barrel export
│   ├── ui/                       # Design system primitives
│   ├── site/                     # Site-wide components
│   │   └── NewBanner.tsx         # Dismissible announcement
│   └── layout/
│
├── lib/
│   ├── ai-models.ts              # Model configs, dimension calc
│   ├── gallery.ts                # KV operations, seeds
│   ├── ratelimit.ts              # Two-tier rate limiting
│   └── design-system/
│
├── types/
│   └── ai.ts                     # Full AI toolkit type system
│
└── hooks/

docs/
└── AI_TOOLKIT.md                 # Comprehensive feature documentation

e2e/
└── smoke.spec.ts
```

---

## Features

### AI Image Generation Toolkit

Production-grade AI image generation with:
- **Three AI models** with different speed/quality tradeoffs
- **Five aspect ratios** with automatic dimension calculation
- **Advanced settings** for power users (negative prompts, guidance)
- **Persistent gallery** with auto-cleanup (60 image limit)
- **Recreate workflow** for iterating on images

### Server-First Rendering

Uses React Server Components throughout, with `'use client'` directives only where interactivity is required. The AI Toolkit page fetches initial gallery data server-side for fast first paint.

### Responsive Design System

Custom component library built on Tailwind CSS 4:
- **Primary**: Blues (`#0c8ce9`)
- **Accent**: Amber (`#f59e0b`) - used for AI Toolkit CTA
- **Neutral**: Dark-first palette

### Third-Party Integrations

- **Replicate** — AI image generation (FLUX, Stable Diffusion)
- **Vercel Blob** — CDN-backed image storage
- **Vercel KV** — Redis-compatible metadata storage
- **Upstash** — Serverless rate limiting
- **Spotify/SoundCloud** — Media embeds
- **Instagram** — Dynamic embed injection

---

## Testing

### E2E Tests (Playwright)

```bash
pnpm e2e
```

14+ test cases covering:
- Navigation flows across all pages
- AI Toolkit rendering and interaction
- Content rendering verification
- Mobile responsive behavior
- Accessibility compliance

---

## CI/CD Pipeline

GitHub Actions workflow with parallel jobs:

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
- Generated images: Vercel Blob CDN with automatic optimization
- Gallery metadata: Vercel KV with LRU-style cleanup

### Security Headers

```
X-DNS-Prefetch-Control: on
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Rate Limiting

IP-based rate limiting protects the AI generation endpoint:
- **Hourly**: 5 requests per hour (burst protection)
- **Daily**: 20 requests per 24 hours (quota)
- **Development**: Automatically bypassed for localhost

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

# Set up environment variables
cp .env.example .env.local
# Add your API keys (Replicate, Vercel KV, Vercel Blob)

# Start development server
pnpm dev
```

### Environment Variables

```bash
# AI Generation (Replicate)
REPLICATE_API_TOKEN=r8_xxx

# Storage (Vercel KV)
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx

# Image Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=xxx
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (rate limits bypassed) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript compiler |
| `pnpm e2e` | Run E2E tests |

---

## Documentation

- **[AI Toolkit Deep-Dive](docs/AI_TOOLKIT.md)** — Comprehensive technical documentation
  - Architecture diagrams and data flow
  - Type system design
  - API layer implementation
  - State management patterns
  - Storage and rate limiting
  - Key engineering decisions

---

## Engineering Philosophy

This project demonstrates several senior frontend engineering principles:

1. **Type Safety as Documentation** — Types serve as living API contracts
2. **Composition Over Configuration** — Small, focused components compose into features
3. **Server-First by Default** — Client code only where interactivity requires it
4. **Progressive Enhancement** — Core functionality works, JS enhances
5. **Production Mindset** — Rate limiting, error handling, cleanup from day one

---

## License

MIT

---

<p align="center">
  <em>Built with care by <a href="https://github.com/itayflaysher">Itay Flaysher</a></em>
</p>
