'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAssets, fetchAsset, type AssetFilters } from '@/lib/api';

export const useAssets = (filters: AssetFilters = {}) => {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => fetchAssets(filters),
  });
};

export const useAsset = (id: string) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAsset(id),
    enabled: !!id,
  });
};
