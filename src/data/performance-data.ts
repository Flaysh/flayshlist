import type { PlatformAnalysis, ThirdPartyService } from '@/types/performance'

const artlistThirdParties: ThirdPartyService[] = [
  { name: 'Google Tag Manager', domain: 'googletagmanager.com', category: 'analytics', purpose: 'Tag management & analytics orchestration' },
  { name: 'Google Analytics', domain: 'analytics.google.com', category: 'analytics', purpose: 'Web analytics' },
  { name: 'Segment', domain: 'cdn.segment.com', category: 'analytics', purpose: 'Customer data platform' },
  { name: 'Hotjar', domain: 'hotjar.com', category: 'analytics', purpose: 'Heatmaps & session recordings' },
  { name: 'Microsoft Clarity', domain: 'clarity.ms', category: 'analytics', purpose: 'Behavioral analytics' },
  { name: 'Sentry', domain: 'sentry.io', category: 'error-tracking', purpose: 'Error monitoring & reporting' },
  { name: 'DataDog', domain: 'datadoghq.com', category: 'error-tracking', purpose: 'Application performance monitoring' },
  { name: 'Split.io', domain: 'split.io', category: 'feature-flags', purpose: 'Feature flag management' },
  { name: 'Braze', domain: 'braze.eu', category: 'marketing', purpose: 'Customer engagement platform' },
  { name: 'Google Ads', domain: 'googleads.g.doubleclick.net', category: 'marketing', purpose: 'Advertising & remarketing' },
  { name: 'LinkedIn Ads', domain: 'ads.linkedin.com', category: 'marketing', purpose: 'Advertising pixel' },
  { name: 'Snapchat Ads', domain: 'snapchat.com', category: 'marketing', purpose: 'Advertising pixel' },
  { name: 'Bing Ads', domain: 'bat.bing.com', category: 'marketing', purpose: 'Advertising pixel' },
  { name: 'Imgix', domain: 'imgix.net', category: 'cdn', purpose: 'Image CDN & optimization' },
  { name: 'Font Awesome', domain: 'fontawesome.com', category: 'cdn', purpose: 'Icon font library' },
  { name: 'Cookie Script', domain: 'cookie-script.com', category: 'other', purpose: 'Cookie consent management' },
]

const toolkitThirdParties: ThirdPartyService[] = [
  { name: 'Google Tag Manager', domain: 'googletagmanager.com', category: 'analytics', purpose: 'Tag management & analytics orchestration' },
  { name: 'Segment', domain: 'cdn.segment.com', category: 'analytics', purpose: 'Customer data platform' },
  { name: 'Sentry', domain: 'sentry.io', category: 'error-tracking', purpose: 'Error monitoring & reporting' },
  { name: 'DataDog', domain: 'datadoghq.com', category: 'error-tracking', purpose: 'Application performance monitoring' },
  { name: 'Imgix', domain: 'imgix.net', category: 'cdn', purpose: 'Image CDN & optimization' },
]

// Data extracted from actual Lighthouse reports and HAR files (January 2026)
export const artlistAnalysis: PlatformAnalysis = {
  platform: 'artlist',
  url: 'https://artlist.io',
  fetchTime: 'January 25, 2026',
  scores: {
    // Desktop scores (more representative of typical user experience)
    desktop: { performance: 36, accessibility: 80, bestPractices: 96, seo: 91 },
    // Mobile scores (Lighthouse simulated: 4x CPU throttle, slow 4G)
    mobile: { performance: 26, accessibility: 68, bestPractices: 77, seo: 100 },
  },
  vitals: {
    desktop: {
      fcp: '1.8 s',
      lcp: '8.5 s',
      tbt: '250 ms',
      cls: '0.277',
      speedIndex: '4.8 s',
      interactive: '8.8 s',
    },
    mobile: {
      fcp: '7.5 s',
      lcp: '36.1 s',
      tbt: '2,800 ms',
      cls: '0',
      speedIndex: '18.7 s',
      interactive: '41.7 s',
    },
  },
  network: {
    totalRequests: 431,
    totalSize: 18076399, // ~17.2 MB
    resourceBreakdown: [
      { type: 'JavaScript', count: 144, size: 14086008 }, // 13.5MB app JS + 0.6MB text/js
      { type: 'CSS', count: 8, size: 1389214 },
      { type: 'Fonts', count: 28, size: 1386311 },
      { type: 'Images', count: 27, size: 545165 }, // AVIF + icons
      { type: 'HTML', count: 60, size: 405615 },
      { type: 'JSON/API', count: 64, size: 255610 },
      { type: 'Other', count: 100, size: 8476 },
    ],
    slowestRequests: [
      { url: 'googletagmanager.com/gtm.js', time: 337, size: 658389 },
      { url: 'auth.split.io/api/v2/auth', time: 308, size: 696 },
      { url: 'googletagmanager.com/gtag/destination', time: 269, size: 398422 },
      { url: 'artlist.io/api/team-invitation', time: 286, size: 42 },
    ],
  },
  thirdParties: artlistThirdParties,
  techStack: [
    'Next.js (App Router)',
    'React 18+',
    'TypeScript',
    'Tailwind CSS',
    'Imgix CDN',
    'Vercel',
  ],
  recommendations: [
    {
      title: 'Reduce JavaScript bundle size',
      impact: 'high',
      category: 'javascript',
      description: '14MB of JavaScript is loaded on initial page load. Implement aggressive code splitting, lazy loading for below-fold components, and tree shaking to reduce initial bundle by 50-70%.',
      savings: 'Potential 7-10MB reduction',
    },
    {
      title: 'Consolidate analytics tools',
      impact: 'high',
      category: 'third-party',
      description: 'Running Hotjar, Clarity, Segment, and GTM simultaneously creates significant overhead. Hotjar and Clarity have overlapping functionality - consider keeping only one.',
      savings: '~500KB + reduced CPU overhead',
    },
    {
      title: 'Defer non-critical third-party scripts',
      impact: 'high',
      category: 'third-party',
      description: '16 third-party services load during page initialization. Defer marketing pixels (LinkedIn, Snapchat, Bing) until after user interaction.',
    },
    {
      title: 'Optimize LCP element',
      impact: 'high',
      category: 'rendering',
      description: 'LCP of 8.5s on desktop indicates the main content loads too late. Add fetchpriority="high" to hero images and preload critical assets.',
      savings: 'Target: < 2.5s LCP',
    },
    {
      title: 'Fix CLS issues',
      impact: 'medium',
      category: 'rendering',
      description: 'CLS of 0.277 on desktop exceeds the 0.1 threshold. Reserve space for images and dynamic content to prevent layout shifts.',
    },
  ],
}

export const toolkitAnalysis: PlatformAnalysis = {
  platform: 'toolkit',
  url: 'https://toolkit.artlist.io',
  fetchTime: 'January 25, 2026',
  scores: {
    desktop: { performance: 60, accessibility: 93, bestPractices: 96, seo: 63 },
    mobile: { performance: 41, accessibility: 94, bestPractices: 77, seo: 63 },
  },
  vitals: {
    desktop: {
      fcp: '0.5 s',
      lcp: '5.5 s',
      tbt: '40 ms',
      cls: '0.225',
      speedIndex: '2.4 s',
      interactive: '5.5 s',
    },
    mobile: {
      fcp: '6.7 s',
      lcp: '28.0 s',
      tbt: '620 ms',
      cls: '0.038',
      speedIndex: '8.4 s',
      interactive: '28.0 s',
    },
  },
  network: {
    totalRequests: 189,
    totalSize: 23411167, // ~22.3 MB (includes media assets)
    resourceBreakdown: [
      { type: 'Media', count: 1, size: 10224234 }, // Video/media content
      { type: 'Images', count: 51, size: 5983455 }, // AVIF images
      { type: 'JavaScript', count: 33, size: 4749634 },
      { type: 'JSON/API', count: 19, size: 2057561 },
      { type: 'HTML', count: 2, size: 198617 },
      { type: 'Fonts', count: 2, size: 118176 },
      { type: 'Other', count: 81, size: 79490 },
    ],
    slowestRequests: [
      { url: 'Media content upload', time: 890, size: 10224234 },
      { url: 'googletagmanager.com/gtm.js', time: 312, size: 658389 },
      { url: 'API responses', time: 245, size: 2057561 },
    ],
  },
  thirdParties: toolkitThirdParties,
  techStack: [
    'Next.js (App Router)',
    'React 18+',
    'TypeScript',
    'Tailwind CSS',
    'Replicate API (AI)',
    'Imgix CDN',
    'Vercel',
  ],
  recommendations: [
    {
      title: 'Lazy load AI model interfaces',
      impact: 'high',
      category: 'javascript',
      description: 'AI toolkit scripts could load on-demand when user selects a model, rather than all upfront. This reduces initial JS payload.',
      savings: 'Potential 2-3MB reduction',
    },
    {
      title: 'Optimize image gallery loading',
      impact: 'medium',
      category: 'images',
      description: '6MB of AVIF images load. Implement virtualized gallery with intersection observer to load images only when in viewport.',
    },
    {
      title: 'Fix CLS on desktop',
      impact: 'medium',
      category: 'rendering',
      description: 'CLS of 0.225 on desktop. Reserve space for generated images and model selection UI to prevent layout shifts.',
    },
    {
      title: 'Improve SEO score',
      impact: 'low',
      category: 'network',
      description: 'SEO score of 63 suggests missing meta tags or structured data. Add proper Open Graph tags and JSON-LD for AI tools.',
    },
  ],
}

export const platformData: Record<string, PlatformAnalysis> = {
  artlist: artlistAnalysis,
  toolkit: toolkitAnalysis,
}
