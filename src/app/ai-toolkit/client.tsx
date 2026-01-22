'use client';

import { useState, useCallback } from 'react';
import { MasonryGrid, PromptDock } from '@/components/ai-toolkit';
import type { GeneratedAsset, RecreateSettings } from '@/types/ai';

type AIToolkitClientProps = {
  initialAssets: GeneratedAsset[];
};

export function AIToolkitClient({ initialAssets }: AIToolkitClientProps) {
  const [assets, setAssets] = useState<GeneratedAsset[]>(initialAssets);
  const [settingsToRecreate, setSettingsToRecreate] = useState<RecreateSettings | null>(null);

  const handleGenerated = (newAsset: GeneratedAsset) => {
    // Add new asset at the beginning, keep all existing assets (including samples)
    setAssets((prev) => [newAsset, ...prev]);
  };

  const handleRecreate = useCallback((settings: RecreateSettings) => {
    setSettingsToRecreate(settings);
    // Scroll to bottom to show the dock
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const handleSettingsCleared = useCallback(() => {
    setSettingsToRecreate(null);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 relative">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900/50 to-neutral-950 pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {/* Gallery Grid */}
        <div className="px-3 pt-4 pb-52">
          <MasonryGrid assets={assets} onRecreate={handleRecreate} />
        </div>

        {/* Prompt Dock */}
        <PromptDock
          onGenerated={handleGenerated}
          initialSettings={settingsToRecreate}
          onSettingsCleared={handleSettingsCleared}
        />
      </div>
    </div>
  );
}
