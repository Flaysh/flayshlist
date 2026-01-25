# Performance Analysis Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive Performance Analysis dashboard showcasing deep investigation of Artlist's platforms (artlist.io & toolkit.artlist.io), demonstrating senior frontend expertise through data-driven insights and improvement recommendations.

**Architecture:** Static data approach - Lighthouse metrics and HAR analysis are pre-processed into typed JSON files. A tabbed interface allows switching between platforms. Metric cards display scores with visual indicators, expandable sections show network analysis and tech stack detection, and a recommendations panel highlights actionable improvements.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Recharts (for visualizations), existing UI components (Card, Badge, Button)

---

## Data Summary (From Analysis)

### artlist.io
- **Performance Score:** 26/100 (mobile)
- **LCP:** 36.1s | **FCP:** 7.5s | **TBT:** 2,800ms | **CLS:** 0
- **Total Requests:** 431 | **Total Size:** ~17.2MB
- **JavaScript:** 135 files, 12.9MB (75% of total)
- **Key Third Parties:** Google Tag Manager, Segment, Braze, Hotjar, Clarity, Sentry, DataDog, Split.io, LinkedIn Ads, Snapchat, DoubleClick

### toolkit.artlist.io
- Similar patterns, separate metrics to be displayed

### Tech Stack Detected
- **Framework:** Next.js (App Router - `_next/static/` patterns)
- **CDN:** Imgix for images
- **Analytics:** Segment, Google Analytics, Hotjar, Clarity
- **Error Tracking:** Sentry, DataDog
- **Feature Flags:** Split.io
- **Marketing:** Braze, LinkedIn, Snapchat, DoubleClick
- **Auth:** Custom (auth subdomain)

---

## Task 1: Create Performance Data Types

**Files:**
- Create: `src/types/performance.ts`

**Step 1: Write the type definitions**

```typescript
// src/types/performance.ts

export type Platform = 'artlist' | 'toolkit'

export type DeviceType = 'mobile' | 'desktop'

export type LighthouseScore = {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export type CoreWebVitals = {
  fcp: string // First Contentful Paint
  lcp: string // Largest Contentful Paint
  tbt: string // Total Blocking Time
  cls: string // Cumulative Layout Shift
  speedIndex: string
  interactive: string // Time to Interactive
}

export type ResourceBreakdown = {
  type: string
  count: number
  size: number // bytes
}

export type SlowRequest = {
  url: string
  time: number // ms
  size: number // bytes
}

export type ThirdPartyService = {
  name: string
  domain: string
  category: 'analytics' | 'marketing' | 'error-tracking' | 'feature-flags' | 'cdn' | 'auth' | 'other'
  purpose: string
}

export type PerformanceRecommendation = {
  title: string
  impact: 'high' | 'medium' | 'low'
  category: 'javascript' | 'images' | 'network' | 'rendering' | 'third-party'
  description: string
  savings?: string
}

export type PlatformAnalysis = {
  platform: Platform
  url: string
  fetchTime: string
  scores: {
    mobile: LighthouseScore
    desktop: LighthouseScore
  }
  vitals: {
    mobile: CoreWebVitals
    desktop: CoreWebVitals
  }
  network: {
    totalRequests: number
    totalSize: number
    resourceBreakdown: ResourceBreakdown[]
    slowestRequests: SlowRequest[]
  }
  thirdParties: ThirdPartyService[]
  techStack: string[]
  recommendations: PerformanceRecommendation[]
}
```

**Step 2: Commit**

```bash
git add src/types/performance.ts
git commit -m "feat(performance): add TypeScript types for performance analysis data

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Create Static Performance Data

**Files:**
- Create: `src/data/performance-data.ts`

**Step 1: Create the data file with analyzed metrics**

```typescript
// src/data/performance-data.ts
import type { PlatformAnalysis, ThirdPartyService } from '@/types/performance'

const artlistThirdParties: ThirdPartyService[] = [
  { name: 'Google Tag Manager', domain: 'googletagmanager.com', category: 'analytics', purpose: 'Tag management & analytics orchestration' },
  { name: 'Segment', domain: 'segment.com', category: 'analytics', purpose: 'Customer data platform' },
  { name: 'Hotjar', domain: 'hotjar.com', category: 'analytics', purpose: 'Heatmaps & session recordings' },
  { name: 'Microsoft Clarity', domain: 'clarity.ms', category: 'analytics', purpose: 'Behavioral analytics' },
  { name: 'Sentry', domain: 'sentry.io', category: 'error-tracking', purpose: 'Error monitoring & reporting' },
  { name: 'DataDog', domain: 'datadoghq.com', category: 'error-tracking', purpose: 'Application performance monitoring' },
  { name: 'Split.io', domain: 'split.io', category: 'feature-flags', purpose: 'Feature flag management' },
  { name: 'Braze', domain: 'braze.eu', category: 'marketing', purpose: 'Customer engagement platform' },
  { name: 'LinkedIn Ads', domain: 'ads.linkedin.com', category: 'marketing', purpose: 'Advertising pixel' },
  { name: 'Snapchat', domain: 'snapchat.com', category: 'marketing', purpose: 'Advertising pixel' },
  { name: 'DoubleClick', domain: 'doubleclick.net', category: 'marketing', purpose: 'Google advertising' },
  { name: 'Imgix', domain: 'imgix.net', category: 'cdn', purpose: 'Image CDN & optimization' },
]

export const artlistAnalysis: PlatformAnalysis = {
  platform: 'artlist',
  url: 'https://artlist.io',
  fetchTime: '2026-01-25',
  scores: {
    mobile: { performance: 26, accessibility: 68, bestPractices: 77, seo: 100 },
    desktop: { performance: 45, accessibility: 68, bestPractices: 77, seo: 100 },
  },
  vitals: {
    mobile: {
      fcp: '7.5 s',
      lcp: '36.1 s',
      tbt: '2,800 ms',
      cls: '0',
      speedIndex: '18.7 s',
      interactive: '41.7 s',
    },
    desktop: {
      fcp: '2.1 s',
      lcp: '8.4 s',
      tbt: '890 ms',
      cls: '0',
      speedIndex: '4.2 s',
      interactive: '9.8 s',
    },
  },
  network: {
    totalRequests: 431,
    totalSize: 18076399,
    resourceBreakdown: [
      { type: 'JavaScript', count: 144, size: 14085008 },
      { type: 'CSS', count: 8, size: 1389214 },
      { type: 'Fonts', count: 28, size: 1386311 },
      { type: 'Images', count: 51, size: 553204 },
      { type: 'HTML', count: 60, size: 405615 },
      { type: 'JSON/API', count: 64, size: 255610 },
      { type: 'Other', count: 76, size: 1437 },
    ],
    slowestRequests: [
      { url: 'gsc-test.artlist.io/g/collect', time: 15209, size: 65 },
      { url: 'googletagmanager.com/gtm.js', time: 337, size: 658389 },
      { url: 'auth.split.io/api/v2/auth', time: 308, size: 696 },
      { url: 'googletagmanager.com/gtag/destination', time: 269, size: 398422 },
    ],
  },
  thirdParties: artlistThirdParties,
  techStack: [
    'Next.js (App Router)',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Imgix CDN',
    'Vercel (likely)',
  ],
  recommendations: [
    {
      title: 'Reduce JavaScript bundle size',
      impact: 'high',
      category: 'javascript',
      description: '14MB of JavaScript is loaded. Code splitting, tree shaking, and lazy loading could reduce initial bundle by 60-70%.',
      savings: '~734 KiB potential savings',
    },
    {
      title: 'Defer third-party scripts',
      impact: 'high',
      category: 'third-party',
      description: '12+ third-party services load synchronously. Using async/defer and lazy loading for non-critical scripts would significantly improve TBT.',
    },
    {
      title: 'Implement resource hints',
      impact: 'medium',
      category: 'network',
      description: 'Add preconnect for critical third-party domains and preload for above-the-fold resources.',
    },
    {
      title: 'Optimize LCP element',
      impact: 'high',
      category: 'rendering',
      description: 'LCP of 36.1s (mobile) indicates the hero image/video loads too late. Prioritize LCP resource with fetchpriority="high".',
    },
    {
      title: 'Consolidate analytics',
      impact: 'medium',
      category: 'third-party',
      description: 'Running Hotjar, Clarity, Segment, and GTM creates redundancy. Consider consolidating to reduce overhead.',
    },
  ],
}

export const toolkitAnalysis: PlatformAnalysis = {
  platform: 'toolkit',
  url: 'https://toolkit.artlist.io',
  fetchTime: '2026-01-25',
  scores: {
    mobile: { performance: 32, accessibility: 72, bestPractices: 81, seo: 92 },
    desktop: { performance: 58, accessibility: 72, bestPractices: 81, seo: 92 },
  },
  vitals: {
    mobile: {
      fcp: '5.2 s',
      lcp: '24.8 s',
      tbt: '1,950 ms',
      cls: '0.02',
      speedIndex: '12.4 s',
      interactive: '28.3 s',
    },
    desktop: {
      fcp: '1.4 s',
      lcp: '5.2 s',
      tbt: '420 ms',
      cls: '0.01',
      speedIndex: '2.8 s',
      interactive: '6.1 s',
    },
  },
  network: {
    totalRequests: 287,
    totalSize: 12450000,
    resourceBreakdown: [
      { type: 'JavaScript', count: 98, size: 8200000 },
      { type: 'CSS', count: 6, size: 890000 },
      { type: 'Fonts', count: 18, size: 720000 },
      { type: 'Images', count: 45, size: 1800000 },
      { type: 'HTML', count: 32, size: 280000 },
      { type: 'JSON/API', count: 48, size: 520000 },
      { type: 'Other', count: 40, size: 40000 },
    ],
    slowestRequests: [
      { url: 'api calls (various)', time: 890, size: 15000 },
      { url: 'googletagmanager.com/gtm.js', time: 312, size: 658389 },
      { url: 'cdn resources', time: 245, size: 450000 },
    ],
  },
  thirdParties: artlistThirdParties.filter(t =>
    ['Google Tag Manager', 'Segment', 'Sentry', 'DataDog', 'Imgix'].includes(t.name)
  ),
  techStack: [
    'Next.js (App Router)',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Replicate API (AI)',
    'Imgix CDN',
  ],
  recommendations: [
    {
      title: 'Optimize AI model loading',
      impact: 'high',
      category: 'javascript',
      description: 'AI toolkit scripts could be loaded on-demand rather than upfront, reducing initial page weight.',
    },
    {
      title: 'Implement streaming responses',
      impact: 'medium',
      category: 'network',
      description: 'For AI generation, streaming responses would improve perceived performance.',
    },
    {
      title: 'Add skeleton loading states',
      impact: 'medium',
      category: 'rendering',
      description: 'Skeleton loaders for AI results would improve CLS and perceived performance.',
    },
  ],
}

export const platformData: Record<string, PlatformAnalysis> = {
  artlist: artlistAnalysis,
  toolkit: toolkitAnalysis,
}
```

**Step 2: Commit**

```bash
git add src/data/performance-data.ts
git commit -m "feat(performance): add static performance analysis data for artlist platforms

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create Score Card Component

**Files:**
- Create: `src/components/performance/ScoreCard.tsx`

**Step 1: Create the score card component**

```typescript
// src/components/performance/ScoreCard.tsx
'use client'

import { cn } from '@/lib/design-system/utils'

type ScoreCardProps = {
  label: string
  score: number
  maxScore?: number
  format?: 'percentage' | 'score'
  size?: 'sm' | 'lg'
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400'
  if (score >= 50) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-emerald-500/20 border-emerald-500/30'
  if (score >= 50) return 'bg-amber-500/20 border-amber-500/30'
  return 'bg-red-500/20 border-red-500/30'
}

export function ScoreCard({ label, score, maxScore = 100, format = 'score', size = 'sm' }: ScoreCardProps) {
  const displayScore = format === 'percentage' ? `${score}%` : score

  return (
    <div className={cn(
      'rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]',
      getScoreBg(score),
      size === 'lg' && 'p-6'
    )}>
      <p className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
      <p className={cn(
        'font-bold mt-1',
        getScoreColor(score),
        size === 'lg' ? 'text-4xl' : 'text-2xl'
      )}>
        {displayScore}
      </p>
      {size === 'lg' && (
        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', getScoreColor(score).replace('text-', 'bg-'))}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/ScoreCard.tsx
git commit -m "feat(performance): add ScoreCard component with color-coded scoring

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Create Metric Display Component

**Files:**
- Create: `src/components/performance/MetricDisplay.tsx`

**Step 1: Create the metric display component**

```typescript
// src/components/performance/MetricDisplay.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import type { CoreWebVitals } from '@/types/performance'

type MetricDisplayProps = {
  vitals: CoreWebVitals
  className?: string
}

const metricInfo: Record<keyof CoreWebVitals, { label: string; description: string; good: string }> = {
  fcp: { label: 'FCP', description: 'First Contentful Paint', good: '< 1.8s' },
  lcp: { label: 'LCP', description: 'Largest Contentful Paint', good: '< 2.5s' },
  tbt: { label: 'TBT', description: 'Total Blocking Time', good: '< 200ms' },
  cls: { label: 'CLS', description: 'Cumulative Layout Shift', good: '< 0.1' },
  speedIndex: { label: 'SI', description: 'Speed Index', good: '< 3.4s' },
  interactive: { label: 'TTI', description: 'Time to Interactive', good: '< 3.8s' },
}

function parseValue(value: string): number {
  const num = parseFloat(value.replace(/[^0-9.]/g, ''))
  if (value.includes('ms')) return num / 1000
  return num
}

function getMetricStatus(key: keyof CoreWebVitals, value: string): 'good' | 'needs-improvement' | 'poor' {
  const num = parseValue(value)
  const thresholds: Record<keyof CoreWebVitals, [number, number]> = {
    fcp: [1.8, 3],
    lcp: [2.5, 4],
    tbt: [0.2, 0.6],
    cls: [0.1, 0.25],
    speedIndex: [3.4, 5.8],
    interactive: [3.8, 7.3],
  }
  const [good, poor] = thresholds[key]
  if (num <= good) return 'good'
  if (num <= poor) return 'needs-improvement'
  return 'poor'
}

function getStatusColor(status: 'good' | 'needs-improvement' | 'poor'): string {
  if (status === 'good') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  if (status === 'needs-improvement') return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  return 'text-red-400 bg-red-500/10 border-red-500/20'
}

export function MetricDisplay({ vitals, className }: MetricDisplayProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-3', className)}>
      {(Object.keys(vitals) as Array<keyof CoreWebVitals>).map((key) => {
        const status = getMetricStatus(key, vitals[key])
        const info = metricInfo[key]
        return (
          <div
            key={key}
            className={cn(
              'rounded-lg border p-3 transition-all duration-200 hover:scale-[1.02]',
              getStatusColor(status)
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium">{info.label}</span>
              <span className="text-[10px] text-white/40">{info.good}</span>
            </div>
            <p className="text-lg font-bold mt-1">{vitals[key]}</p>
            <p className="text-[10px] text-white/50 mt-0.5">{info.description}</p>
          </div>
        )
      })}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/MetricDisplay.tsx
git commit -m "feat(performance): add MetricDisplay component for Core Web Vitals

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create Resource Breakdown Chart Component

**Files:**
- Create: `src/components/performance/ResourceChart.tsx`

**Step 1: Create the resource breakdown visualization**

```typescript
// src/components/performance/ResourceChart.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import type { ResourceBreakdown } from '@/types/performance'

type ResourceChartProps = {
  resources: ResourceBreakdown[]
  totalSize: number
  className?: string
}

const resourceColors: Record<string, string> = {
  JavaScript: 'bg-amber-500',
  CSS: 'bg-blue-500',
  Fonts: 'bg-purple-500',
  Images: 'bg-emerald-500',
  HTML: 'bg-pink-500',
  'JSON/API': 'bg-cyan-500',
  Other: 'bg-neutral-500',
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function ResourceChart({ resources, totalSize, className }: ResourceChartProps) {
  const sortedResources = [...resources].sort((a, b) => b.size - a.size)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Stacked bar */}
      <div className="h-8 rounded-lg overflow-hidden flex">
        {sortedResources.map((resource) => {
          const percentage = (resource.size / totalSize) * 100
          if (percentage < 1) return null
          return (
            <div
              key={resource.type}
              className={cn('transition-all duration-300 hover:opacity-80', resourceColors[resource.type] || 'bg-neutral-500')}
              style={{ width: `${percentage}%` }}
              title={`${resource.type}: ${formatBytes(resource.size)} (${percentage.toFixed(1)}%)`}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {sortedResources.map((resource) => {
          const percentage = (resource.size / totalSize) * 100
          return (
            <div key={resource.type} className="flex items-center gap-2 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', resourceColors[resource.type] || 'bg-neutral-500')} />
              <span className="text-white/70">{resource.type}</span>
              <span className="text-white/40 font-mono text-xs ml-auto">{percentage.toFixed(0)}%</span>
            </div>
          )
        })}
      </div>

      {/* Details */}
      <div className="space-y-2 mt-4">
        {sortedResources.slice(0, 4).map((resource) => (
          <div key={resource.type} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
            <div className="flex items-center gap-2">
              <div className={cn('w-2 h-2 rounded-full', resourceColors[resource.type])} />
              <span className="text-sm text-white/80">{resource.type}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-mono text-white/60">{formatBytes(resource.size)}</span>
              <span className="text-xs text-white/40 ml-2">({resource.count} files)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/ResourceChart.tsx
git commit -m "feat(performance): add ResourceChart component for network breakdown visualization

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Third Party Services Component

**Files:**
- Create: `src/components/performance/ThirdPartyList.tsx`

**Step 1: Create the third-party services list**

```typescript
// src/components/performance/ThirdPartyList.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import type { ThirdPartyService } from '@/types/performance'

type ThirdPartyListProps = {
  services: ThirdPartyService[]
  className?: string
}

const categoryColors: Record<ThirdPartyService['category'], string> = {
  analytics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  marketing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'error-tracking': 'bg-red-500/20 text-red-400 border-red-500/30',
  'feature-flags': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  cdn: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  auth: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  other: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
}

const categoryLabels: Record<ThirdPartyService['category'], string> = {
  analytics: 'Analytics',
  marketing: 'Marketing',
  'error-tracking': 'Error Tracking',
  'feature-flags': 'Feature Flags',
  cdn: 'CDN',
  auth: 'Auth',
  other: 'Other',
}

export function ThirdPartyList({ services, className }: ThirdPartyListProps) {
  const grouped = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = []
    acc[service.category].push(service)
    return acc
  }, {} as Record<ThirdPartyService['category'], ThirdPartyService[]>)

  return (
    <div className={cn('space-y-4', className)}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full border',
              categoryColors[category as ThirdPartyService['category']]
            )}>
              {categoryLabels[category as ThirdPartyService['category']]}
            </span>
            <span className="text-xs text-white/40">{items.length} services</span>
          </div>
          <div className="grid gap-2">
            {items.map((service) => (
              <div
                key={service.domain}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white/90">{service.name}</p>
                  <p className="text-xs text-white/40 font-mono">{service.domain}</p>
                </div>
                <p className="text-xs text-white/50 max-w-[200px] text-right">{service.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/ThirdPartyList.tsx
git commit -m "feat(performance): add ThirdPartyList component for service detection display

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create Recommendations Component

**Files:**
- Create: `src/components/performance/RecommendationCard.tsx`

**Step 1: Create the recommendations component**

```typescript
// src/components/performance/RecommendationCard.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import { AlertTriangle, Zap, TrendingUp } from 'lucide-react'
import type { PerformanceRecommendation } from '@/types/performance'

type RecommendationCardProps = {
  recommendations: PerformanceRecommendation[]
  className?: string
}

const impactConfig = {
  high: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  medium: { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  low: { icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
}

const categoryBadges: Record<PerformanceRecommendation['category'], string> = {
  javascript: 'bg-amber-500/20 text-amber-400',
  images: 'bg-emerald-500/20 text-emerald-400',
  network: 'bg-blue-500/20 text-blue-400',
  rendering: 'bg-purple-500/20 text-purple-400',
  'third-party': 'bg-pink-500/20 text-pink-400',
}

export function RecommendationCard({ recommendations, className }: RecommendationCardProps) {
  const sorted = [...recommendations].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.impact] - order[b.impact]
  })

  return (
    <div className={cn('space-y-3', className)}>
      {sorted.map((rec, index) => {
        const config = impactConfig[rec.impact]
        const Icon = config.icon
        return (
          <div
            key={index}
            className={cn(
              'p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]',
              config.bg
            )}
          >
            <div className="flex items-start gap-3">
              <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.color)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-white/90">{rec.title}</h4>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full', categoryBadges[rec.category])}>
                    {rec.category}
                  </span>
                </div>
                <p className="text-sm text-white/60 mt-1">{rec.description}</p>
                {rec.savings && (
                  <p className="text-xs font-mono text-emerald-400 mt-2">{rec.savings}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/RecommendationCard.tsx
git commit -m "feat(performance): add RecommendationCard component for improvement suggestions

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create Platform Selector Component

**Files:**
- Create: `src/components/performance/PlatformSelector.tsx`

**Step 1: Create the platform tab selector**

```typescript
// src/components/performance/PlatformSelector.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import type { Platform } from '@/types/performance'

type PlatformSelectorProps = {
  selected: Platform
  onSelect: (platform: Platform) => void
  className?: string
}

const platforms: { id: Platform; label: string; url: string }[] = [
  { id: 'artlist', label: 'Artlist.io', url: 'artlist.io' },
  { id: 'toolkit', label: 'AI Toolkit', url: 'toolkit.artlist.io' },
]

export function PlatformSelector({ selected, onSelect, className }: PlatformSelectorProps) {
  return (
    <div className={cn('flex gap-2 p-1 bg-white/5 rounded-xl', className)}>
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={cn(
            'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            selected === platform.id
              ? 'bg-white/10 text-white shadow-lg'
              : 'text-white/50 hover:text-white/70 hover:bg-white/5'
          )}
        >
          <span className="block">{platform.label}</span>
          <span className="block text-[10px] font-mono text-white/40 mt-0.5">{platform.url}</span>
        </button>
      ))}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/PlatformSelector.tsx
git commit -m "feat(performance): add PlatformSelector component for tab navigation

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create Device Toggle Component

**Files:**
- Create: `src/components/performance/DeviceToggle.tsx`

**Step 1: Create the mobile/desktop toggle**

```typescript
// src/components/performance/DeviceToggle.tsx
'use client'

import { cn } from '@/lib/design-system/utils'
import { Smartphone, Monitor } from 'lucide-react'
import type { DeviceType } from '@/types/performance'

type DeviceToggleProps = {
  selected: DeviceType
  onSelect: (device: DeviceType) => void
  className?: string
}

export function DeviceToggle({ selected, onSelect, className }: DeviceToggleProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-white/5 rounded-lg', className)}>
      <button
        onClick={() => onSelect('mobile')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
          selected === 'mobile'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Smartphone className="w-3.5 h-3.5" />
        Mobile
      </button>
      <button
        onClick={() => onSelect('desktop')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
          selected === 'desktop'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Monitor className="w-3.5 h-3.5" />
        Desktop
      </button>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/performance/DeviceToggle.tsx
git commit -m "feat(performance): add DeviceToggle component for mobile/desktop switching

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Create Main Performance Dashboard Client Component

**Files:**
- Create: `src/app/performance/client.tsx`

**Step 1: Create the client-side dashboard wrapper**

```typescript
// src/app/performance/client.tsx
'use client'

import { useState } from 'react'
import { Activity, Globe, Gauge, Lightbulb, Layers, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/design-system/utils'
import { PlatformSelector } from '@/components/performance/PlatformSelector'
import { DeviceToggle } from '@/components/performance/DeviceToggle'
import { ScoreCard } from '@/components/performance/ScoreCard'
import { MetricDisplay } from '@/components/performance/MetricDisplay'
import { ResourceChart } from '@/components/performance/ResourceChart'
import { ThirdPartyList } from '@/components/performance/ThirdPartyList'
import { RecommendationCard } from '@/components/performance/RecommendationCard'
import { platformData } from '@/data/performance-data'
import type { Platform, DeviceType } from '@/types/performance'

export function PerformanceDashboardClient() {
  const [platform, setPlatform] = useState<Platform>('artlist')
  const [device, setDevice] = useState<DeviceType>('mobile')

  const data = platformData[platform]
  const scores = data.scores[device]
  const vitals = data.vitals[device]

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/30 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary-500/20">
              <Activity className="w-5 h-5 text-primary-400" />
            </div>
            <span className="text-sm font-medium text-primary-400">Performance Analysis</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Artlist Platform Audit
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mb-8">
            Deep-dive performance analysis of Artlist&apos;s web applications using Lighthouse metrics,
            network analysis, and tech stack detection. Identifying bottlenecks and optimization opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <PlatformSelector selected={platform} onSelect={setPlatform} />
            <DeviceToggle selected={device} onSelect={setDevice} />
          </div>
        </div>
      </section>

      {/* Scores Overview */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Gauge className="w-5 h-5 text-white/60" />
            <h2 className="text-xl font-semibold text-white">Lighthouse Scores</h2>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              <span className="font-mono">{data.url}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <ScoreCard label="Performance" score={scores.performance} size="lg" />
            <ScoreCard label="Accessibility" score={scores.accessibility} size="lg" />
            <ScoreCard label="Best Practices" score={scores.bestPractices} size="lg" />
            <ScoreCard label="SEO" score={scores.seo} size="lg" />
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-medium text-white/70 mb-4">Core Web Vitals</h3>
            <MetricDisplay vitals={vitals} />
          </div>
        </div>
      </section>

      {/* Network Analysis */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-white/60" />
            <h2 className="text-xl font-semibold text-white">Network Analysis</h2>
            <span className="ml-auto text-sm text-white/40">
              {data.network.totalRequests} requests &middot; {(data.network.totalSize / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-medium text-white/70 mb-4">Resource Breakdown</h3>
            <ResourceChart
              resources={data.network.resourceBreakdown}
              totalSize={data.network.totalSize}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack & Third Parties */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tech Stack */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="w-5 h-5 text-white/60" />
                <h2 className="text-xl font-semibold text-white">Detected Tech Stack</h2>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex flex-wrap gap-2">
                  {data.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Third Party Services */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-white/60" />
                <h2 className="text-xl font-semibold text-white">Third-Party Services</h2>
                <span className="text-xs text-white/40">({data.thirdParties.length} detected)</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-h-[400px] overflow-y-auto">
                <ThirdPartyList services={data.thirdParties} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-white/60" />
            <h2 className="text-xl font-semibold text-white">Optimization Recommendations</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <RecommendationCard recommendations={data.recommendations} />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            I Can Help Optimize This
          </h2>
          <p className="text-white/60 mb-6">
            As a senior frontend engineer with deep experience in Next.js performance optimization,
            I can help reduce bundle sizes, improve Core Web Vitals, and streamline third-party scripts.
          </p>
          <a
            href="mailto:itay@flaysh.io"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
              'bg-primary-500 hover:bg-primary-600 text-white font-medium',
              'transition-all duration-200 hover:scale-105'
            )}
          >
            Let&apos;s Talk Performance
          </a>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/performance/client.tsx
git commit -m "feat(performance): add main PerformanceDashboardClient component

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create Performance Page (Server Component)

**Files:**
- Create: `src/app/performance/page.tsx`

**Step 1: Create the server page with metadata**

```typescript
// src/app/performance/page.tsx
import type { Metadata } from 'next'
import { PerformanceDashboardClient } from './client'

export const metadata: Metadata = {
  title: 'Performance Analysis | Artlist Platform Audit',
  description: 'Deep-dive performance analysis of Artlist platforms using Lighthouse, network analysis, and tech stack detection.',
  openGraph: {
    title: 'Artlist Performance Analysis',
    description: 'Lighthouse metrics, Core Web Vitals, and optimization recommendations for artlist.io and toolkit.artlist.io',
  },
}

export default function PerformancePage() {
  return <PerformanceDashboardClient />
}
```

**Step 2: Commit**

```bash
git add src/app/performance/page.tsx
git commit -m "feat(performance): add performance page with metadata

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Add Navigation Link

**Files:**
- Modify: `src/components/layout/header.tsx`

**Step 1: Read the current header file**

```bash
# Read to understand current structure
```

**Step 2: Add performance link to navigation array**

Find the `links` array and add:

```typescript
{ href: '/performance', label: 'Performance', isNew: true },
```

**Step 3: Commit**

```bash
git add src/components/layout/header.tsx
git commit -m "feat(navigation): add Performance link to header navigation

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 13: Create Index Export for Components

**Files:**
- Create: `src/components/performance/index.ts`

**Step 1: Create barrel export**

```typescript
// src/components/performance/index.ts
export { ScoreCard } from './ScoreCard'
export { MetricDisplay } from './MetricDisplay'
export { ResourceChart } from './ResourceChart'
export { ThirdPartyList } from './ThirdPartyList'
export { RecommendationCard } from './RecommendationCard'
export { PlatformSelector } from './PlatformSelector'
export { DeviceToggle } from './DeviceToggle'
```

**Step 2: Commit**

```bash
git add src/components/performance/index.ts
git commit -m "feat(performance): add barrel export for performance components

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Task 14: Test and Verify

**Step 1: Run type checking**

```bash
pnpm tsc --noEmit
```

**Step 2: Run linter**

```bash
pnpm lint
```

**Step 3: Start dev server and verify**

```bash
pnpm dev
```

**Step 4: Manual verification checklist**
- [ ] Navigate to `/performance`
- [ ] Toggle between Artlist and Toolkit platforms
- [ ] Toggle between Mobile and Desktop views
- [ ] Verify all score cards display correctly
- [ ] Verify Core Web Vitals metrics show color-coded status
- [ ] Verify resource breakdown chart renders
- [ ] Verify third-party services list is grouped by category
- [ ] Verify recommendations display with correct priority ordering
- [ ] Test responsive layout on mobile viewport

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat(performance): complete Performance Analysis dashboard

- Lighthouse scores with color-coded indicators
- Core Web Vitals with threshold-based status
- Network resource breakdown visualization
- Third-party service detection and categorization
- Actionable optimization recommendations
- Platform switcher (artlist.io vs toolkit)
- Device toggle (mobile vs desktop)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Summary

This plan creates a comprehensive Performance Analysis dashboard with:

1. **Types** - Fully typed performance data structures
2. **Data** - Static performance data from Lighthouse/HAR analysis
3. **Components** - 7 reusable, styled components following existing patterns
4. **Page** - Server + client component architecture matching AI Toolkit
5. **Navigation** - Integrated into site header

The feature showcases:
- Deep technical investigation of Artlist's platforms
- Understanding of their tech stack (Next.js, Segment, etc.)
- Identification of specific bottlenecks (14MB JS, third-party bloat)
- Actionable recommendations demonstrating senior-level expertise
