'use client'

import { cn } from '@/lib/design-system/utils'
import { Smartphone, Monitor } from 'lucide-react'
import type { DeviceType } from '@/types/performance'

type DeviceToggleProps = {
  selected: DeviceType
  onSelect: (device: DeviceType) => void
  className?: string
}

export function DeviceToggle({ selected, onSelect, className }: DeviceToggleProps) {
  return (
    <div className={cn('flex gap-1 p-1 bg-white/5 rounded-lg', className)}>
      <button
        onClick={() => onSelect('mobile')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
          selected === 'mobile'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Smartphone className="w-3.5 h-3.5" />
        Mobile
      </button>
      <button
        onClick={() => onSelect('desktop')}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200',
          selected === 'desktop'
            ? 'bg-white/10 text-white'
            : 'text-white/50 hover:text-white/70'
        )}
      >
        <Monitor className="w-3.5 h-3.5" />
        Desktop
      </button>
    </div>
  )
}
