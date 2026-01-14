import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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

    // Build where clause
    const where: Record<string, unknown> = {};

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
      where.fps = parseInt(fps);
    }

    // BPM range filter
    if (bpm) {
      const [minBpm, maxBpm] = bpm.split('-').map(Number);
      if (bpm.endsWith('+')) {
        where.bpm = { gte: parseInt(bpm) };
      } else if (minBpm && maxBpm) {
        where.bpm = { gte: minBpm, lte: maxBpm };
      }
    }

    // Duration range filter
    if (duration) {
      const [minDuration, maxDuration] = duration.split('-').map(Number);
      if (duration.endsWith('+')) {
        where.durationSec = { gte: parseInt(duration) };
      } else if (minDuration && maxDuration) {
        where.durationSec = { gte: minDuration, lte: maxDuration };
      }
    }

    // Query search (title, description, tags)
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { tags: { contains: query } },
        { artist: { contains: query } },
      ];
    }

    // Sort order
    const orderBy: Record<string, 'asc' | 'desc'>[] = [];
    switch (sort) {
      case 'newest':
        orderBy.push({ createdAt: 'desc' });
        break;
      case 'duration':
        orderBy.push({ durationSec: 'desc' });
        break;
      default:
        orderBy.push({ createdAt: 'desc' });
    }

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
