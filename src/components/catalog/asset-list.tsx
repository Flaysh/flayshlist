'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { AssetCard } from './asset-card';
import { Skeleton } from '@/components/ui';
import type { Asset } from '@/lib/api';

interface AssetListProps {
  assets: Asset[];
  isLoading?: boolean;
}

export const AssetList = ({ assets, isLoading }: AssetListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Calculate number of columns based on container width
  const getColumnCount = () => {
    if (typeof window === 'undefined') return 4;
    const width = parentRef.current?.offsetWidth || 1200;
    if (width < 640) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const columnCount = getColumnCount();
  const rowCount = Math.ceil(assets.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 2,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-16 w-16 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-medium text-neutral-100">No assets found</h3>
        <p className="mt-1 text-neutral-400">Try adjusting your filters or search query</p>
      </div>
    );
  }

  // For smaller lists, use simple grid
  if (assets.length <= 20) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    );
  }

  // For larger lists, use virtualization
  return (
    <div
      ref={parentRef}
      className="h-[800px] overflow-auto"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const rowAssets = assets.slice(startIndex, startIndex + columnCount);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pr-4">
                {rowAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
