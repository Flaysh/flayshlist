'use client'

import { cn } from '@/lib/design-system/utils'

type ScoreCardProps = {
  label: string
  score: number
  size?: 'sm' | 'lg'
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400'
  if (score >= 50) return 'text-amber-400'
  return 'text-red-400'
}

function getScoreBg(score: number): string {
  if (score >= 90) return 'bg-emerald-500/20 border-emerald-500/30'
  if (score >= 50) return 'bg-amber-500/20 border-amber-500/30'
  return 'bg-red-500/20 border-red-500/30'
}

export function ScoreCard({ label, score, size = 'sm' }: ScoreCardProps) {
  return (
    <div className={cn(
      'rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]',
      getScoreBg(score),
      size === 'lg' && 'p-6'
    )}>
      <p className="text-xs font-medium text-white/60 uppercase tracking-wider">{label}</p>
      <p className={cn(
        'font-bold mt-1',
        getScoreColor(score),
        size === 'lg' ? 'text-4xl' : 'text-2xl'
      )}>
        {score}
      </p>
      {size === 'lg' && (
        <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', getScoreColor(score).replace('text-', 'bg-'))}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  )
}
