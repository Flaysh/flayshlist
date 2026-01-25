'use client'

import { useState } from 'react'
import { Globe, Gauge, Lightbulb, Layers, ExternalLink, AlertTriangle, Zap, FileCode, Clock, Server } from 'lucide-react'
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

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function PerformanceDashboardClient() {
  const [platform, setPlatform] = useState<Platform>('artlist')
  const [device, setDevice] = useState<DeviceType>('desktop') // Default to desktop - more representative

  const data = platformData[platform]
  const scores = data.scores[device]
  const vitals = data.vitals[device]
  const jsSize = data.network.resourceBreakdown.find(r => r.type === 'JavaScript')?.size || 0

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section with Clear Context */}
      <section className="relative py-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Context Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-400">External Performance Audit</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Artlist.io Performance Analysis
          </h1>

          <p className="text-lg text-white/50 max-w-3xl mb-4">
            I analyzed <span className="text-white font-medium">artlist.io</span> and <span className="text-white font-medium">toolkit.artlist.io</span> using
            Lighthouse, Chrome DevTools, and HAR file analysis to identify performance bottlenecks and optimization opportunities.
          </p>

          <p className="text-sm text-white/40 mb-8">
            Data collected on {data.fetchTime} &bull; This is an independent technical audit, not affiliated with Artlist
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <PlatformSelector selected={platform} onSelect={setPlatform} />
            <DeviceToggle selected={device} onSelect={setDevice} />
          </div>
        </div>
      </section>

      {/* Executive Summary - The Most Important Findings First */}
      <section className="py-12 bg-gradient-to-b from-red-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Key Findings</h2>
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">Critical</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Performance Score */}
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-red-400" />
                <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Performance</span>
              </div>
              <p className="text-4xl font-bold text-red-400">{scores.performance}</p>
              <p className="text-xs text-white/40 mt-1">out of 100 (poor)</p>
            </div>

            {/* LCP */}
            <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-xs font-medium text-red-400 uppercase tracking-wider">LCP</span>
              </div>
              <p className="text-4xl font-bold text-red-400">{vitals.lcp}</p>
              <p className="text-xs text-white/40 mt-1">should be &lt; 2.5s</p>
            </div>

            {/* JavaScript Size */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">JavaScript</span>
              </div>
              <p className="text-4xl font-bold text-amber-400">{formatBytes(jsSize)}</p>
              <p className="text-xs text-white/40 mt-1">excessive bundle size</p>
            </div>

            {/* Total Requests */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Server className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">Requests</span>
              </div>
              <p className="text-4xl font-bold text-amber-400">{data.network.totalRequests}</p>
              <p className="text-xs text-white/40 mt-1">network requests on load</p>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-3">Summary</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">Mobile users wait {vitals.interactive}</strong> before the page becomes interactive - users on slower connections likely abandon</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">•</span>
                <span><strong className="text-white">{formatBytes(jsSize)} of JavaScript</strong> loaded - most users only need a fraction of this on initial load</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span><strong className="text-white">{data.thirdParties.length} third-party services</strong> detected - analytics overlap (Hotjar + Clarity + Segment) adds unnecessary overhead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span><strong className="text-white">Good foundation:</strong> Next.js App Router, modern image formats (AVIF), proper SEO score ({scores.seo}/100)</span>
              </li>
            </ul>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-white/70">Core Web Vitals ({device})</h3>
              {device === 'mobile' && (
                <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded">
                  Simulated: 4x CPU throttle + slow 4G
                </span>
              )}
            </div>
            <MetricDisplay vitals={vitals} />
          </div>
        </div>
      </section>

      {/* What I Would Fix - Recommendations moved up */}
      <section className="py-12 border-t border-white/5 bg-gradient-to-b from-primary-950/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold text-white">What I Would Fix</h2>
          </div>
          <p className="text-sm text-white/50 mb-6">Prioritized optimization opportunities based on impact</p>

          <RecommendationCard recommendations={data.recommendations} />
        </div>
      </section>

      {/* Network Analysis */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-white/60" />
            <h2 className="text-xl font-semibold text-white">Network Analysis</h2>
            <span className="ml-auto text-sm text-white/40">
              {data.network.totalRequests} requests &middot; {formatBytes(data.network.totalSize)} total
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
                <p className="text-xs text-white/40 mt-4">
                  Detected via network analysis, script patterns, and response headers
                </p>
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

      {/* Footer CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            I Can Implement These Optimizations
          </h2>
          <p className="text-white/60 mb-6">
            As a senior frontend engineer specializing in Next.js and performance optimization,
            I have hands-on experience reducing bundle sizes by 60%+, improving Core Web Vitals,
            and implementing efficient third-party script loading strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:itay@flaysh.io"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                'bg-primary-500 hover:bg-primary-600 text-white font-medium',
                'transition-all duration-200 hover:scale-105'
              )}
            >
              Let&apos;s Talk
            </a>
            <a
              href="/about"
              className={cn(
                'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl',
                'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium border border-white/10',
                'transition-all duration-200'
              )}
            >
              View My Experience
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
