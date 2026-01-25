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
