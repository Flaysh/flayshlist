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
