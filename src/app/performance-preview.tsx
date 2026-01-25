'use client'

import Link from 'next/link'
import { Activity, AlertTriangle, ArrowRight, Gauge, Clock, FileCode, Server } from 'lucide-react'
import { artlistAnalysis } from '@/data/performance-data'

export function PerformancePreview() {
  const data = artlistAnalysis
  // Use desktop metrics - more representative of typical user experience
  const scores = data.scores.desktop
  const vitals = data.vitals.desktop
  const jsSize = data.network.resourceBreakdown.find(r => r.type === 'JavaScript')?.size || 0
  const jsSizeMB = (jsSize / 1024 / 1024).toFixed(1)

  return (
    <div className="relative">
      {/* Main Card */}
      <Link
        href="/performance"
        className="block group relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-950/30 via-neutral-900/50 to-neutral-900/50 border border-red-500/20 hover:border-red-500/40 transition-all duration-500"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-full bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-medium text-amber-400">Performance Audit</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Artlist.io Analysis</h3>
              <p className="text-sm text-white/50">I identified critical performance issues on their platform</p>
            </div>
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <Activity className="w-6 h-6 text-red-400" />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-1.5 mb-1">
                <Gauge className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-medium text-red-400 uppercase">Score</span>
              </div>
              <p className="text-2xl font-bold text-red-400">{scores.performance}</p>
              <p className="text-[10px] text-white/40">out of 100</p>
            </div>

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span className="text-[10px] font-medium text-red-400 uppercase">LCP</span>
              </div>
              <p className="text-2xl font-bold text-red-400">{vitals.lcp}</p>
              <p className="text-[10px] text-white/40">target: 2.5s</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 mb-1">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-medium text-amber-400 uppercase">JS Size</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{jsSizeMB}MB</p>
              <p className="text-[10px] text-white/40">excessive</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1.5 mb-1">
                <Server className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-medium text-amber-400 uppercase">Requests</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{data.network.totalRequests}</p>
              <p className="text-[10px] text-white/40">on page load</p>
            </div>
          </div>

          {/* Key Issues */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="text-white/70">Mobile users wait <strong className="text-white">{vitals.interactive}</strong> for interactivity</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-white/70"><strong className="text-white">{data.thirdParties.length} third-party services</strong> with analytics overlap</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/70">Good foundation: Next.js, AVIF images, SEO {scores.seo}/100</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-primary-400 group-hover:text-primary-300 transition-colors">
            <span className="text-sm font-medium">View full analysis & my recommendations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Link>
    </div>
  )
}
