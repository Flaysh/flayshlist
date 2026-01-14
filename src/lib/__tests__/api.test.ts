import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const { fetchAssets, fetchAsset } = await import('../api');

describe('API Client', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('fetchAssets', () => {
    it('should fetch assets without filters', async () => {
      const mockResponse = {
        assets: [{ id: '1', title: 'Test Asset' }],
        total: 1,
        limit: 50,
        offset: 0,
        hasMore: false,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchAssets();

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/assets',
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should fetch assets with filters', async () => {
      const mockResponse = {
        assets: [],
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const filters = {
        type: 'music',
        genre: 'desert-bass',
        mood: 'deep',
      };

      await fetchAssets(filters);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('type=music'),
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('genre=desert-bass'), expect.anything());
      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('mood=deep'), expect.anything());
    });

    it('should throw on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchAssets()).rejects.toThrow('Failed to fetch assets');
    });
  });

  describe('fetchAsset', () => {
    it('should fetch a single asset', async () => {
      const mockAsset = { id: '1', title: 'Test Asset', type: 'music' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAsset,
      });

      const result = await fetchAsset('1');

      expect(mockFetch).toHaveBeenCalledWith(
        '/api/assets/1',
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
      expect(result).toEqual(mockAsset);
    });
  });
});
