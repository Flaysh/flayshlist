'use client';

import { Image, Video } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import type { ToolType } from '@/lib/toolkit/types';

interface ToolkitSidebarProps {
  activeTool: ToolType;
  onToolChange: (tool: ToolType) => void;
}

const tools = [
  { id: 'image' as const, label: 'AI Image', icon: Image },
  { id: 'video' as const, label: 'AI Video', icon: Video },
];

export function ToolkitSidebar({ activeTool, onToolChange }: ToolkitSidebarProps) {
  return (
    <div className="w-64 border-r border-neutral-800 bg-neutral-950/50">
      <div className="sticky top-16 p-4 space-y-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onToolChange(tool.id)}
              className={cn(
                'w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all',
                activeTool === tool.id
                  ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-neutral-100 shadow-lg border border-primary-500/30'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50',
                focusRing
              )}
            >
              <Icon className="h-5 w-5" />
              {tool.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
