import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { useAssets, useAsset } from '../use-assets';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAssets', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch assets with default filters', async () => {
    const mockData = {
      assets: [{ id: '1', title: 'Test Track', type: 'music' }],
      total: 1,
      limit: 50,
      offset: 0,
      hasMore: false,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useAssets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith('/api/assets?');
  });

  it('should fetch assets with custom filters', async () => {
    const mockData = {
      assets: [],
      total: 0,
      limit: 50,
      offset: 0,
      hasMore: false,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(
      () => useAssets({ type: 'music', genre: 'electronic' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('type=music')
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('genre=electronic')
    );
  });

  it('should handle fetch error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useAssets(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});

describe('useAsset', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should fetch single asset by id', async () => {
    const mockAsset = {
      id: '1',
      title: 'Test Track',
      type: 'music',
      artist: 'FLAYSH',
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockAsset,
    });

    const { result } = renderHook(() => useAsset('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockAsset);
    expect(mockFetch).toHaveBeenCalledWith('/api/assets/1');
  });

  it('should not fetch when id is empty', () => {
    const { result } = renderHook(() => useAsset(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
