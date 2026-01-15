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
  <a href="#testing"><img src="https://img.shields.io/badge/Unit-Vitest-729B1B?logo=vitest" alt="Vitest" /></a>
</p>

---

## Overview

FlayshList is a meticulously architected portfolio application demonstrating modern frontend engineering practices. Built with a focus on performance, accessibility, and maintainability, this project showcases production-ready patterns while maintaining intentional simplicity.

**Live Demo**: [flayshlist.vercel.app](https://flayshlist.vercel.app)

### Key Engineering Highlights

- **Server-First Architecture** — Leverages React Server Components by default, minimizing client-side JavaScript
- **Type-Safe Throughout** — Strict TypeScript configuration with full type coverage
- **Comprehensive Testing** — E2E tests with Playwright + unit tests with Vitest
- **Automated CI/CD** — GitHub Actions pipeline with parallel lint, type-check, test, and build jobs
- **Performance Optimized** — Aggressive caching, image optimization, and minimal bundle size
- **Accessibility First** — WCAG-compliant with full keyboard navigation and semantic HTML

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS, Custom Design System |
| **Testing** | Playwright (E2E), Vitest (Unit), Testing Library |
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
│  │   + Rules   │ │   Strict    │ │  E2E + Unit │               │
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

### Unit Tests (Vitest)
```bash
pnpm test
```

Component and utility testing with React Testing Library.

---

## CI/CD Pipeline

GitHub Actions workflow with four parallel jobs:

```
┌─────────────────┐  ┌─────────────────┐
│      lint       │  │   typecheck     │
│    (ESLint)     │  │  (TypeScript)   │
└─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐
│      test       │  │      e2e        │
│    (Vitest)     │  │  (Playwright)   │
└─────────────────┘  └─────────────────┘
         │                    │
         └────────┬───────────┘
                  ▼
         ┌─────────────────┐
         │      build      │
         │   (Next.js)     │
         └─────────────────┘
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
| `pnpm test` | Run unit tests |
| `pnpm e2e` | Run E2E tests |
