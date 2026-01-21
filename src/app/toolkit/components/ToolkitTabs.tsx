'use client';

import { Sparkles, Wand2 } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';

interface ToolkitTabsProps {
  activeTab: 'explore' | 'create';
  onTabChange: (tab: 'explore' | 'create') => void;
}

const tabs = [
  { id: 'explore' as const, label: 'Explore', icon: Sparkles },
  { id: 'create' as const, label: 'Create', icon: Wand2 },
];

export function ToolkitTabs({ activeTab, onTabChange }: ToolkitTabsProps) {
  return (
    <div className="flex gap-1 px-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all',
              activeTab === tab.id
                ? 'bg-neutral-900 text-neutral-100 border-t border-l border-r border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50',
              focusRing
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
