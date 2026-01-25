'use client'

import { cn } from '@/lib/design-system/utils'
import type { ThirdPartyService } from '@/types/performance'

type ThirdPartyListProps = {
  services: ThirdPartyService[]
  className?: string
}

const categoryColors: Record<ThirdPartyService['category'], string> = {
  analytics: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  marketing: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'error-tracking': 'bg-red-500/20 text-red-400 border-red-500/30',
  'feature-flags': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  cdn: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  auth: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  other: 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30',
}

const categoryLabels: Record<ThirdPartyService['category'], string> = {
  analytics: 'Analytics',
  marketing: 'Marketing',
  'error-tracking': 'Error Tracking',
  'feature-flags': 'Feature Flags',
  cdn: 'CDN',
  auth: 'Auth',
  other: 'Other',
}

export function ThirdPartyList({ services, className }: ThirdPartyListProps) {
  const grouped = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = []
    acc[service.category].push(service)
    return acc
  }, {} as Record<ThirdPartyService['category'], ThirdPartyService[]>)

  return (
    <div className={cn('space-y-4', className)}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full border',
              categoryColors[category as ThirdPartyService['category']]
            )}>
              {categoryLabels[category as ThirdPartyService['category']]}
            </span>
            <span className="text-xs text-white/40">{items.length} services</span>
          </div>
          <div className="grid gap-2">
            {items.map((service) => (
              <div
                key={service.domain}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-white/90">{service.name}</p>
                  <p className="text-xs text-white/40 font-mono">{service.domain}</p>
                </div>
                <p className="text-xs text-white/50 max-w-[200px] text-right">{service.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
