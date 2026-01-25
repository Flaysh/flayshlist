'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Sparkles, Play } from 'lucide-react';

type PreviewAsset = {
  id: string;
  prompt: string;
  imageUrl: string;
  modelName: string;
};

type AIToolkitPreviewProps = {
  assets: PreviewAsset[];
};

export function AIToolkitPreview({ assets }: AIToolkitPreviewProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <div className="relative">
      {/* Masonry-like grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
        {assets.slice(0, 6).map((asset, index) => {
          const isLoaded = loadedImages.has(asset.id);
          // Artlist-style varied heights
          const heights = [
            'aspect-[3/4]',
            'aspect-square',
            'aspect-[4/5]',
            'aspect-[5/4]',
            'aspect-square',
            'aspect-[3/4]',
          ];
          const heightClass = heights[index % heights.length];

          return (
            <Link
              key={asset.id}
              href="/ai-toolkit"
              className={`group relative ${heightClass} rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10`}
            >
              {/* Skeleton loader */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              )}

              <img
                src={asset.imageUrl}
                alt={asset.prompt}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => handleImageLoad(asset.id)}
              />

              {/* Model badge - top left */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-[10px] font-medium text-white/90">
                  {asset.modelName}
                </span>
              </div>

              {/* Type badge - top right */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full opacity-90 group-hover:opacity-100 transition-opacity">
                <ImageIcon className="w-3 h-3 text-white/80" />
                <span className="text-[10px] font-medium text-white/80">Image</span>
              </div>

              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Play/view indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>

                {/* Prompt preview at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white/90 text-xs line-clamp-2 leading-relaxed">
                    {asset.prompt}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* "See more" indicator */}
      <div className="mt-8 text-center">
        <Link
          href="/ai-toolkit"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-sm text-white/70 hover:text-white transition-all"
        >
          <span>Explore the full toolkit</span>
          <span className="text-amber-400">→</span>
        </Link>
      </div>
    </div>
  );
}
