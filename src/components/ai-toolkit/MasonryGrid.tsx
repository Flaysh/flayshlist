'use client';

import { useState } from 'react';
import { Image as ImageIcon, RefreshCw, Sparkles } from 'lucide-react';
import type { GeneratedAsset } from '@/types/ai';
import { AssetModal } from './AssetModal';

type MasonryGridProps = {
  assets: GeneratedAsset[];
};

export function MasonryGrid({ assets }: MasonryGridProps) {
  const [selectedAsset, setSelectedAsset] = useState<GeneratedAsset | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/50">
        <Sparkles className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg">No images yet</p>
        <p className="text-sm">Generate your first one below!</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {assets.map((asset, index) => {
          const isLoaded = loadedImages.has(asset.id);
          // Vary heights for visual interest in masonry
          const heightVariants = ['aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[4/3]'];
          const heightClass = asset.source === 'seed'
            ? heightVariants[index % heightVariants.length]
            : 'aspect-square';

          return (
            <div
              key={asset.id}
              className="break-inside-avoid mb-3 group relative cursor-pointer"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-black/50 ${heightClass}`}>
                {/* Skeleton loader */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
                )}

                <img
                  src={asset.imageUrl}
                  alt={asset.prompt}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(asset.id)}
                />

                {/* Model badge - top left */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-medium text-white/90">
                    {asset.source === 'seed' ? 'Sample' : 'FLUX Schnell'}
                  </span>
                </div>

                {/* Type badge - top right */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
                  <ImageIcon className="w-3 h-3 text-white/80" />
                  <span className="text-[11px] font-medium text-white/80">Image</span>
                </div>

                {/* Hover overlay with recreate button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {/* Recreate button */}
                  <button className="absolute bottom-14 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg transition-colors">
                    <RefreshCw className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-medium text-white">Recreate</span>
                  </button>

                  {/* Prompt text */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">{asset.prompt}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </>
  );
}
