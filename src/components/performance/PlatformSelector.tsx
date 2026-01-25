'use client'

import { cn } from '@/lib/design-system/utils'
import type { Platform } from '@/types/performance'

type PlatformSelectorProps = {
  selected: Platform
  onSelect: (platform: Platform) => void
  className?: string
}

const platforms: { id: Platform; label: string; url: string }[] = [
  { id: 'artlist', label: 'Artlist.io', url: 'artlist.io' },
  { id: 'toolkit', label: 'AI Toolkit', url: 'toolkit.artlist.io' },
]

export function PlatformSelector({ selected, onSelect, className }: PlatformSelectorProps) {
  return (
    <div className={cn('flex gap-2 p-1 bg-white/5 rounded-xl', className)}>
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={cn(
            'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            selected === platform.id
              ? 'bg-white/10 text-white shadow-lg'
              : 'text-white/50 hover:text-white/70 hover:bg-white/5'
          )}
        >
          <span className="block">{platform.label}</span>
          <span className="block text-[10px] font-mono text-white/40 mt-0.5">{platform.url}</span>
        </button>
      ))}
    </div>
  )
}
