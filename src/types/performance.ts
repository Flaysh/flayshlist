export type Platform = 'artlist' | 'toolkit'

export type DeviceType = 'mobile' | 'desktop'

export type LighthouseScore = {
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export type CoreWebVitals = {
  fcp: string
  lcp: string
  tbt: string
  cls: string
  speedIndex: string
  interactive: string
}

export type ResourceBreakdown = {
  type: string
  count: number
  size: number
}

export type SlowRequest = {
  url: string
  time: number
  size: number
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
