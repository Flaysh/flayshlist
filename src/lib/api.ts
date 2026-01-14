// API client functions with types

export interface Asset {
  id: string;
  type: string;
  title: string;
  description: string | null;
  tags: string;
  bpm: number | null;
  durationSec: number | null;
  key: string | null;
  resolution: string | null;
  fps: number | null;
  artist: string;
  previewUrl: string;
  sourceUrl: string;
  coverImage: string;
  mood: string | null;
  genre: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface AssetsResponse {
  assets: Asset[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface AssetFilters {
  type?: string;
  query?: string;
  genre?: string;
  mood?: string;
  bpm?: string;
  sort?: 'relevance' | 'newest' | 'duration';
  limit?: number;
  offset?: number;
}

export const fetchAssets = async (filters: AssetFilters = {}): Promise<AssetsResponse> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`/api/assets?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
};

export const fetchAsset = async (id: string): Promise<Asset> => {
  const response = await fetch(`/api/assets/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch asset');
  }
  return response.json();
};
