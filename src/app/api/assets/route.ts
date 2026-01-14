import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { db } from '@/lib/db';

const searchParamsSchema = z.object({
  type: z.string().optional(),
  query: z.string().optional(),
  genre: z.string().optional(),
  mood: z.string().optional(),
  bpm: z.string().optional(),
  duration: z.string().optional(),
  resolution: z.string().optional(),
  fps: z.string().optional(),
  sort: z.enum(['relevance', 'newest', 'duration']).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  offset: z.coerce.number().min(0).optional(),
});

const parseRangeValue = (value: string) => {
  if (value.endsWith('+')) {
    const min = Number.parseInt(value.slice(0, -1), 10);
    return Number.isFinite(min) ? { gte: min } : null;
  }

  const [min, max] = value.split('-').map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { gte: min, lte: max };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = searchParamsSchema.parse(Object.fromEntries(searchParams));

    const {
      type,
      query,
      genre,
      mood,
      bpm,
      duration,
      resolution,
      fps,
      sort = 'newest',
      limit = 50,
      offset = 0,
    } = params;

    const where: Prisma.AssetWhereInput = {};

    if (type) {
      where.type = type;
    }

    if (genre) {
      where.genre = genre;
    }

    if (mood) {
      where.mood = mood;
    }

    if (resolution) {
      where.resolution = resolution;
    }

    if (fps) {
      const fpsValue = Number.parseInt(fps, 10);
      if (Number.isFinite(fpsValue)) {
        where.fps = fpsValue;
      }
    }

    if (bpm) {
      const range = parseRangeValue(bpm);
      if (range) {
        where.bpm = range;
      }
    }

    if (duration) {
      const range = parseRangeValue(duration);
      if (range) {
        where.durationSec = range;
      }
    }

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { contains: query, mode: 'insensitive' } },
        { artist: { contains: query, mode: 'insensitive' } },
      ];
    }

    const orderBy: Prisma.AssetOrderByWithRelationInput[] =
      sort === 'duration' ? [{ durationSec: 'desc' }] : [{ createdAt: 'desc' }];

    const [assets, total] = await Promise.all([
      db.asset.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
      }),
      db.asset.count({ where }),
    ]);

    return NextResponse.json({
      assets,
      total,
      limit,
      offset,
      hasMore: offset + assets.length < total,
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
