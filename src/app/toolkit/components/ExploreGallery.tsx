'use client';

import { useState } from 'react';
import { Copy, Check, Wand2 } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import type { ExploreItem, ToolType } from '@/lib/toolkit/types';
import imageExploreData from '../data/imageExplore.json';
import videoExploreData from '../data/videoExplore.json';

interface ExploreGalleryProps {
  toolType: ToolType;
  onUsePrompt: (prompt: string, settings: any) => void;
}

export function ExploreGallery({ toolType, onUsePrompt }: ExploreGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const items = (toolType === 'image' ? imageExploreData : videoExploreData) as ExploreItem[];

  const handleCopyPrompt = (item: ExploreItem) => {
    navigator.clipboard.writeText(item.prompt);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={cn(
              'group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-5 text-left transition-all hover:border-primary-500/30 hover:bg-neutral-900',
              focusRing
            )}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-base font-semibold text-neutral-100 group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              <div className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                {item.aspectRatio}
              </div>
            </div>
            <p className="text-sm text-neutral-400 line-clamp-3 mb-4">{item.prompt}</p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="bg-neutral-800 px-2 py-1 rounded">{item.modelId}</span>
              {toolType === 'video' && item.durationSec && (
                <span className="bg-neutral-800 px-2 py-1 rounded">{item.durationSec}s</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className={cn(
                'absolute top-4 right-4 rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800',
                focusRing
              )}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-neutral-100 mb-4">{selectedItem.title}</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-300 mb-2 block">Prompt</label>
                <div className="relative">
                  <p className="bg-neutral-800 rounded-lg p-3 pr-12 text-sm text-neutral-200">
                    {selectedItem.prompt}
                  </p>
                  <button
                    onClick={() => handleCopyPrompt(selectedItem)}
                    className={cn(
                      'absolute top-2 right-2 rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700',
                      focusRing
                    )}
                  >
                    {copiedId === selectedItem.id ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-neutral-400">Model:</span>{' '}
                  <span className="text-neutral-200">{selectedItem.modelId}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Aspect Ratio:</span>{' '}
                  <span className="text-neutral-200">{selectedItem.aspectRatio}</span>
                </div>
                {toolType === 'video' && selectedItem.durationSec && (
                  <div>
                    <span className="text-neutral-400">Duration:</span>{' '}
                    <span className="text-neutral-200">{selectedItem.durationSec}s</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onUsePrompt(selectedItem.prompt, selectedItem);
                  setSelectedItem(null);
                }}
                className={cn(
                  'w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-3 text-sm font-medium text-white hover:from-primary-600 hover:to-accent-600 transition-all',
                  focusRing
                )}
              >
                <Wand2 className="h-4 w-4" />
                Use This Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
