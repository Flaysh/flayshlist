import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  findMany: vi.fn(),
  count: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    asset: {
      findMany: mocks.findMany,
      count: mocks.count,
    },
  },
}));

const { GET } = await import('../route');

describe('GET /api/assets', () => {
  beforeEach(() => {
    mocks.findMany.mockReset();
    mocks.count.mockReset();
  });

  it('applies filters and returns paginated results', async () => {
    mocks.findMany.mockResolvedValueOnce([]);
    mocks.count.mockResolvedValueOnce(0);

    const request = new NextRequest(
      'http://localhost/api/assets?query=drum&bpm=120-130&duration=30-60&sort=duration&limit=2&offset=0'
    );
    const response = await GET(request);
    const payload = await response.json();

    expect(mocks.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          bpm: { gte: 120, lte: 130 },
          durationSec: { gte: 30, lte: 60 },
          OR: expect.any(Array),
        }),
        orderBy: [{ durationSec: 'desc' }],
        take: 2,
        skip: 0,
      })
    );
    expect(payload).toEqual({
      assets: [],
      total: 0,
      limit: 2,
      offset: 0,
      hasMore: false,
    });
  });

  it('returns 400 for invalid params', async () => {
    const request = new NextRequest('http://localhost/api/assets?limit=0');
    const response = await GET(request);
    const payload = await response.json();

    expect(mocks.findMany).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(payload.error).toBe('Invalid parameters');
  });
});
