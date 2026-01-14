'use client';

import { useState, useMemo, useCallback } from 'react';
import { useAssets } from '@/hooks/use-assets';
import { SearchFilters } from './search-filters';
import { AssetList } from './asset-list';
import { assetTypes } from '@/data/content';

interface CatalogPageProps {
  type: keyof typeof assetTypes;
}

export const CatalogPage = ({ type }: CatalogPageProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({
    type,
  });

  const { data, isLoading, error } = useAssets(filters);

  const config = assetTypes[type];
  const availableFilters = [...config.filters] as string[];

  const handleFiltersChange = useCallback((newFilters: Record<string, string>) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-100">{config.label}</h1>
        <p className="mt-2 text-neutral-400">{config.description}</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8">
        <SearchFilters
          type={type}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          availableFilters={availableFilters}
        />
      </div>

      {/* Results Count */}
      {data && (
        <div className="mb-4 text-sm text-neutral-400">
          {data.total} {data.total === 1 ? 'result' : 'results'}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="rounded-lg border border-red-800 bg-red-900/20 p-4 text-red-400">
          Failed to load assets. Please try again.
        </div>
      )}

      {/* Asset List */}
      <AssetList assets={data?.assets ?? []} isLoading={isLoading} />
    </div>
  );
};
