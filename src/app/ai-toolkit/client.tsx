'use client';

import { useState } from 'react';
import { MasonryGrid, PromptDock } from '@/components/ai-toolkit';
import type { GeneratedAsset } from '@/types/ai';

type AIToolkitClientProps = {
  initialAssets: GeneratedAsset[];
};

export function AIToolkitClient({ initialAssets }: AIToolkitClientProps) {
  const [assets, setAssets] = useState<GeneratedAsset[]>(initialAssets);

  const handleGenerated = (newAsset: GeneratedAsset) => {
    setAssets((prev) => [newAsset, ...prev.filter((a) => a.source !== 'seed')]);
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900/50 to-neutral-950 pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Gallery Grid */}
        <div className="px-3 pt-4 pb-52">
          <MasonryGrid assets={assets} />
        </div>

        {/* Prompt Dock */}
        <PromptDock onGenerated={handleGenerated} />
      </div>
    </div>
  );
}
