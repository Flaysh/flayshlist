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
