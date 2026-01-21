'use client';

import { useState } from 'react';
import { ToolkitSidebar } from './ToolkitSidebar';
import { ToolkitTabs } from './ToolkitTabs';
import { ExploreGallery } from './ExploreGallery';
import { CreateImagePanel } from './CreateImagePanel';
import { CreateVideoPanel } from './CreateVideoPanel';
import { SessionsRail } from './SessionsRail';
import type { ToolType } from '@/lib/toolkit/types';

type TabType = 'explore' | 'create';

export function ToolkitShell() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [activeTool, setActiveTool] = useState<ToolType>('image');
  const [refreshSessions, setRefreshSessions] = useState(0);

  const handleGenerationComplete = () => {
    setRefreshSessions((prev) => prev + 1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-950">
      <div className="mx-auto max-w-[1920px]">
        <div className="flex">
          <ToolkitSidebar activeTool={activeTool} onToolChange={setActiveTool} />

          <div className="flex-1 flex">
            <div className="flex-1 border-r border-neutral-800">
              <div className="sticky top-16 z-10 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-sm">
                <div className="px-6 py-4">
                  <h1 className="text-2xl font-bold text-neutral-100 mb-1">
                    {activeTool === 'image' ? 'AI Image Generator' : 'AI Video Generator'}
                  </h1>
                  <p className="text-sm text-neutral-400">
                    {activeTool === 'image'
                      ? 'Create stunning images with AI. 2 generations per day.'
                      : 'Generate short videos with AI. 1 generation per day.'}
                  </p>
                </div>
                <ToolkitTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

              <div className="p-6">
                {activeTab === 'explore' ? (
                  <ExploreGallery
                    toolType={activeTool}
                    onUsePrompt={() => {
                      setActiveTab('create');
                    }}
                  />
                ) : activeTool === 'image' ? (
                  <CreateImagePanel onGenerationComplete={handleGenerationComplete} />
                ) : (
                  <CreateVideoPanel onGenerationComplete={handleGenerationComplete} />
                )}
              </div>
            </div>

            <SessionsRail toolType={activeTool} refreshTrigger={refreshSessions} />
          </div>
        </div>
      </div>

      <footer className="border-t border-neutral-800 bg-neutral-950/50 backdrop-blur-sm mt-16">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="text-center text-xs text-neutral-500">
            Made with creativity by{' '}
            <span className="text-neutral-300 font-medium">FLAYSH</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
