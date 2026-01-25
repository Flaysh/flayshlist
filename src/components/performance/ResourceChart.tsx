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
  Media: 'bg-rose-500',
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
