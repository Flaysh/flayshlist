<p align="center">
  <img width="200" height="200" alt="FlayshList Logo" src="https://github.com/user-attachments/assets/e6559ede-9999-4415-ae49-8ff8c3b06283" />
</p>

<h1 align="center">FlayshList</h1>

<p align="center">
  <strong>Production-Grade Portfolio with AI Image Generation Toolkit</strong><br/>
  <em>Built by a creator, for creators - showcasing senior-level frontend engineering</em>
</p>

<p align="center">
  <a href="https://artlist.flaysh.com"><img src="https://img.shields.io/badge/Live_Demo-artlist.flaysh.com-0c8ce9?style=for-the-badge" alt="Live Demo" /></a>
</p>

<p align="center">
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js 16" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React 19" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript 5" /></a>
  <a href="#tech-stack"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css" alt="Tailwind CSS 4" /></a>
  <a href="#testing"><img src="https://img.shields.io/badge/E2E-Playwright-45ba4b?logo=playwright" alt="Playwright" /></a>
  <a href="#ai-toolkit"><img src="https://img.shields.io/badge/AI-Replicate-f59e0b" alt="Replicate AI" /></a>
</p>

---

## Why This Project

I'm a **senior frontend engineer** who is also an **audiovisual artist** - I produce music (Neuro-Future DnB), perform as a DJ, and create visual art with TouchDesigner and Resolume. This dual perspective shapes how I approach creator tools.

**I build tools for creators because I am one.**

This portfolio demonstrates production-ready engineering patterns while showcasing my understanding of the audiovisual space - the same space Artlist operates in.

---

## Live Demo

**[artlist.flaysh.com](https://artlist.flaysh.com)**

| Page | Description |
|------|-------------|
| [/ai-toolkit](https://artlist.flaysh.com/ai-toolkit) | Full-stack AI image generation system |
| [/tools](https://artlist.flaysh.com/tools) | Technical deep-dive into the architecture |
| [/performance](https://artlist.flaysh.com/performance) | Lighthouse analysis of artlist.io platform |
| [/music](https://artlist.flaysh.com/music) | My music production portfolio |
| [/reels](https://artlist.flaysh.com/reels) | My VJ/visual art portfolio |

---

## AI Image Generation Toolkit

The flagship feature: a **production-grade AI image generation system** inspired by Artlist's creative tools.

### Capabilities

| Feature | Implementation |
|---------|---------------|
| **Multi-Model Support** | FLUX Schnell (fast), FLUX Pro (quality), Stable Diffusion 3 (creative) |
| **Aspect Ratios** | 1:1, 16:9, 9:16, 4:3, 3:4 with automatic dimension calculation |
| **Resolution Options** | 720p (720 base) and 1080p (1024 base) presets |
| **Advanced Settings** | Negative prompts (SD3), guidance scale (model-specific ranges) |
| **Recreate Workflow** | Click any gallery image to regenerate with identical settings |
| **Rate Limiting** | Two-tier sliding window (5/hour, 20/day) with dev bypass |
| **Persistent Gallery** | Vercel KV storage with 60-image auto-cleanup |

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  UI Layer                                                                        │
│  PromptDock (352 lines) → ModelSelector, AspectRatioSelector, AdvancedSettings  │
├─────────────────────────────────────────────────────────────────────────────────┤
│  State Management                                                                │
│  AIToolkitClient: assets[], settingsToRecreate, lifted callbacks                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│  API Layer (/api/ai/image)                                                       │
│  Request Validation → Rate Limit Check → Replicate API → Vercel Blob Storage    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Infrastructure                                                                  │
│  Replicate (AI) │ Vercel Blob (CDN) │ Vercel KV (Redis) │ Upstash (Rate Limit)  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Key Engineering Patterns

- **Discriminated Union Responses** - Type-safe success/error handling with compile-time exhaustiveness
- **Model Capability Abstraction** - Extensible system via `supportsNegativePrompt`, `supportsGuidanceScale` flags
- **Server/Client Boundary** - Server component fetches data, client manages state
- **Progressive Fake Progress** - Mathematical easing for perceived performance
- **Hydration-Safe Seeds** - Fixed timestamps prevent server/client mismatches

**Full documentation**: [docs/AI_TOOLKIT.md](docs/AI_TOOLKIT.md)

---

## Tech Stack

| Category | Technologies | Details |
|----------|-------------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 | App Router, Server Components, Strict Mode |
| **Styling** | Tailwind CSS 4, PostCSS | Custom design system with CSS variables |
| **AI/ML** | Replicate | FLUX Schnell, FLUX Pro, Stable Diffusion 3 |
| **Storage** | Vercel Blob, Vercel KV | CDN images, Redis-compatible metadata |
| **Rate Limiting** | Upstash Ratelimit | Sliding window (hourly + daily tiers) |
| **Analytics** | Vercel Analytics, Microsoft Clarity | Performance + behavior tracking |
| **Testing** | Playwright | E2E tests with Chromium |
| **Quality** | ESLint 9, TypeScript Strict | Automated linting + type checking |
| **CI/CD** | GitHub Actions, Vercel | 3 parallel jobs, automatic deployment |
| **Package Manager** | pnpm 9 | Fast, disk-efficient |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │   Home   │ │  Music   │ │  Visuals │ │  About   │ │  AI    │ │
│  │          │ │          │ │          │ │          │ │ Toolkit│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     COMPONENT LAYER                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Design System: Button, Card, Badge, Input, Select         │ │
│  │  Layout: Header (responsive), Footer, NewBanner            │ │
│  │  AI Toolkit: PromptDock, MasonryGrid, AssetModal...        │ │
│  │  Embeds: Spotify, SoundCloud, Instagram                    │ │
│  └────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     API & BUSINESS LOGIC                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  /api/ai/image: Generation with validation + rate limiting │ │
│  │  lib/ai-models: Model configs, dimension calculations      │ │
│  │  lib/gallery: KV operations, seed generation, cleanup      │ │
│  │  lib/ratelimit: IP-based two-tier sliding window           │ │
│  └────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                     INFRASTRUCTURE                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │   Replicate  │ │  Vercel Blob │ │  Vercel KV   │             │
│  │   (AI APIs)  │ │  (CDN Store) │ │   (Redis)    │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│                     QUALITY GATES                                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐│
│  │   ESLint    │ │  TypeScript │ │  Playwright │ │  GitHub    ││
│  │   Rules     │ │   Strict    │ │     E2E     │ │  Actions   ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage with hero + AI preview
│   ├── layout.tsx                  # Root layout + metadata + analytics
│   ├── ai-toolkit/
│   │   ├── page.tsx                # Server component (data fetch)
│   │   └── client.tsx              # Client component (state)
│   ├── api/
│   │   └── ai/
│   │       └── image/route.ts      # Generation endpoint (203 lines)
│   ├── performance/                # Artlist platform analysis
│   ├── tools/                      # Technical showcase
│   ├── music/, reels/, about/, chat/
│   ├── error.tsx, not-found.tsx
│   ├── robots.ts, sitemap.ts
│   └── globals.css                 # Design system tokens + animations
│
├── components/
│   ├── ai-toolkit/                 # 1000+ lines of AI feature code
│   │   ├── PromptDock.tsx          # Main interface (352 lines)
│   │   ├── MasonryGrid.tsx         # Gallery with lazy loading
│   │   ├── AssetModal.tsx          # Full-screen viewer
│   │   ├── ModelSelector.tsx       # Model dropdown
│   │   ├── AspectRatioSelector.tsx # Aspect ratio options
│   │   ├── AdvancedSettings.tsx    # Negative prompt, guidance
│   │   └── index.ts
│   ├── ui/                         # Design system primitives
│   ├── layout/                     # Header, Footer
│   ├── site/                       # NewBanner
│   ├── performance/                # Performance dashboard components
│   └── providers/
│
├── lib/
│   ├── ai-models.ts                # Model configs (109 lines)
│   ├── gallery.ts                  # KV operations (131 lines)
│   ├── ratelimit.ts                # Rate limiting (77 lines)
│   └── design-system/
│
├── types/
│   └── ai.ts                       # Discriminated unions (62 lines)
│
└── data/
    ├── content.ts                  # CV data, social links
    └── performance-data.ts         # Lighthouse metrics

docs/
└── AI_TOOLKIT.md                   # Comprehensive documentation

e2e/
└── smoke.spec.ts                   # Playwright E2E tests

.github/workflows/
└── ci.yml                          # 3 parallel CI jobs
```

---

## Engineering Decisions

| Decision | Rationale |
|----------|-----------|
| **Discriminated union responses** | Compile-time exhaustiveness checking. TypeScript forces handling all cases. |
| **Model capability flags** | Adding new AI models requires only adding config, not changing logic. |
| **Server-side gallery fetch** | Fast first paint, SEO-friendly. Client hydrates for interactivity. |
| **Sliding window rate limits** | Smooth limiting vs. abrupt cutoffs. Better UX for creators. |
| **Fake progress animation** | Mathematical easing (slows as it approaches 90%). Perceived performance. |
| **Seed images (24)** | Rich gallery experience even with zero generations. First-visit delight. |
| **Two-tier rate limiting** | Burst protection (hourly) + quota (daily). Cost-conscious infrastructure. |
| **Lifted state pattern** | Predictable data flow. Parent owns state, children get callbacks. |

---

## Performance & Security

### Caching Strategy

| Resource | Cache Policy |
|----------|--------------|
| Static assets | `max-age=31536000, immutable` (1 year) |
| Generated images | Vercel Blob CDN with WebP optimization |
| Gallery metadata | Vercel KV with LRU-style auto-cleanup |

### Security Headers

```
X-DNS-Prefetch-Control: on
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Rate Limiting

IP-based sliding window protection:
- **Hourly**: 5 requests/hour (burst protection)
- **Daily**: 20 requests/24 hours (quota management)
- **Development**: Auto-bypass for localhost/127.0.0.1/::1

---

## Testing

### E2E Tests (Playwright)

14+ test cases covering critical paths:

```bash
pnpm e2e        # Run headless
pnpm e2e:ui     # Interactive UI mode
```

Coverage includes:
- Navigation flows across all pages
- AI Toolkit rendering and state
- Content verification
- Responsive behavior
- Accessibility compliance

---

## CI/CD Pipeline

GitHub Actions with 3 parallel jobs:

```
┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐
│  lint+typecheck   │  │       e2e         │  │       build       │
│                   │  │                   │  │                   │
│  • ESLint 9       │  │  • Build app      │  │  • Next.js build  │
│  • TypeScript     │  │  • Playwright     │  │  • Verify output  │
│    strict mode    │  │  • Upload report  │  │                   │
└───────────────────┘  └───────────────────┘  └───────────────────┘
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
# Clone
git clone https://github.com/itayflaysher/flayshlist.git
cd flayshlist

# Install
pnpm install

# Environment
cp .env.example .env.local
# Add your API keys

# Develop
pnpm dev
```

### Environment Variables

```bash
# Replicate (AI Generation)
REPLICATE_API_TOKEN=r8_xxx

# Vercel KV (Gallery Metadata)
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx

# Vercel Blob (Image Storage)
BLOB_READ_WRITE_TOKEN=xxx
```

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server (rate limits bypassed) |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript compiler |
| `pnpm e2e` | Playwright E2E tests |

---

## Documentation

- **[docs/AI_TOOLKIT.md](docs/AI_TOOLKIT.md)** - Comprehensive AI toolkit documentation
  - Architecture diagrams
  - Type system design
  - API implementation details
  - State management patterns
  - Storage and rate limiting
  - Key engineering decisions

---

## Engineering Philosophy

This project demonstrates senior frontend engineering principles:

1. **Type Safety as Documentation** - Types are living API contracts, not afterthoughts
2. **Composition Over Configuration** - Small, focused components compose into features
3. **Server-First by Default** - `'use client'` only where interactivity requires it
4. **Progressive Enhancement** - Core works, JavaScript enhances
5. **Production Mindset** - Rate limiting, error handling, cleanup from day one
6. **Creator Empathy** - I build tools for creators because I understand their needs

---

## About the Developer

**Itay Flaysher (FLAYSH)**

Senior Frontend Engineer with 6+ years of experience. Also an audiovisual artist:
- Music Producer (Neuro-Future DnB)
- DJ (Desert Bass Festival)
- VJ/Visual Artist (TouchDesigner, Resolume, projection mapping)

This dual perspective - engineer and creator - informs everything I build.

**[LinkedIn](https://linkedin.com/in/itayflaysher)** | **[GitHub](https://github.com/itayflaysher)**

---

## License

MIT

---

<p align="center">
  <em>Built with ruthless simplicity by <a href="https://github.com/itayflaysher">Itay Flaysher</a></em>
</p>
