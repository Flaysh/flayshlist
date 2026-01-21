'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Sparkles } from 'lucide-react';
import type { GeneratedAsset } from '@/types/ai';

type AIToolkitPreviewProps = {
  assets: GeneratedAsset[];
};

export function AIToolkitPreview({ assets }: AIToolkitPreviewProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 max-w-5xl mx-auto">
      {assets.slice(0, 6).map((asset, index) => {
        const isLoaded = loadedImages.has(asset.id);
        // Vary heights for visual interest
        const heights = ['aspect-square', 'aspect-[4/5]', 'aspect-square', 'aspect-[5/4]', 'aspect-square', 'aspect-[4/5]'];
        const heightClass = heights[index % heights.length];

        return (
          <Link
            key={asset.id}
            href="/ai-toolkit"
            className={`group relative ${heightClass} rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10`}
          >
            {/* Skeleton loader */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
            )}

            <img
              src={asset.imageUrl}
              alt={asset.prompt}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => handleImageLoad(asset.id)}
            />

            {/* Model badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-[10px] font-medium text-white/80">
                {asset.source === 'seed' ? 'Sample' : 'AI'}
              </span>
            </div>

            {/* Type badge */}
            <span className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full">
              <ImageIcon className="w-3 h-3 text-white/80" />
            </span>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        );
      })}
    </div>
  );
}
