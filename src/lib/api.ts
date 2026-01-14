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

const buildQueryString = (filters: AssetFilters) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === '') continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : '';
};

const fetchJson = async <T>(input: string, errorMessage: string): Promise<T> => {
  const response = await fetch(input, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchAssets = async (filters: AssetFilters = {}): Promise<AssetsResponse> => {
  const query = buildQueryString(filters);
  return fetchJson<AssetsResponse>(`/api/assets${query}`, 'Failed to fetch assets');
};

export const fetchAsset = async (id: string): Promise<Asset> => {
  const safeId = encodeURIComponent(id);
  return fetchJson<Asset>(`/api/assets/${safeId}`, 'Failed to fetch asset');
};
