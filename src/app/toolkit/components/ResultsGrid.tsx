'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Info } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import type { GenerationResponse, ToolType, AssetItem } from '@/lib/toolkit/types';
import { AssetModal } from './AssetModal';

interface ResultsGridProps {
  results: GenerationResponse;
  toolType: ToolType;
}

export function ResultsGrid({ results, toolType }: ResultsGridProps) {
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-100">Results</h3>
          <span className="text-sm text-neutral-400">
            {new Date(results.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {results.items.map((item) => (
            <div
              key={item.assetId}
              className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm overflow-hidden hover:border-primary-500/30 transition-all"
            >
              {toolType === 'image' ? (
                <div className="relative aspect-square">
                  <Image
                    src={item.urlWatermarked}
                    alt={item.prompt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="relative aspect-video">
                  <video
                    src={item.urlWatermarked}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-4">
                <p className="text-sm text-neutral-300 line-clamp-2 mb-3">{item.prompt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-xs text-neutral-500">
                    <span className="bg-neutral-800 px-2 py-1 rounded">{item.aspectRatio}</span>
                    {item.resolution && (
                      <span className="bg-neutral-800 px-2 py-1 rounded">{item.resolution}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={item.urlWatermarked}
                      download
                      className={cn(
                        'rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors',
                        focusRing
                      )}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => setSelectedAsset(item)}
                      className={cn(
                        'rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors',
                        focusRing
                      )}
                      title="View details"
                    >
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          toolType={toolType}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </>
  );
}
