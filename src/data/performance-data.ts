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
