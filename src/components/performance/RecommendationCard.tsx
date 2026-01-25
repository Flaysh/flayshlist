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
