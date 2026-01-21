import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/toolkit/db';
import { getClientIp, hashIp } from '@/lib/toolkit/ip';
import type { SessionsResponse } from '@/lib/toolkit/types';

const PAGE_SIZE = 20;

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    if (!ip) {
      return NextResponse.json({ error: 'Cannot identify client' }, { status: 400 });
    }

    const ipHash = hashIp(ip);
    const { searchParams } = new URL(request.url);
    const toolType = searchParams.get('toolType') as 'image' | 'video' | null;
    const cursor = searchParams.get('cursor');

    let cursorDate: Date | undefined;
    let cursorId: string | undefined;

    if (cursor) {
      const [dateStr, id] = cursor.split('_');
      cursorDate = new Date(dateStr);
      cursorId = id;
    }

    const whereClause: any = {
      ipHash,
    };

    if (toolType) {
      whereClause.toolType = toolType;
    }

    if (cursorDate && cursorId) {
      whereClause.OR = [
        {
          createdAt: {
            lt: cursorDate,
          },
        },
        {
          createdAt: cursorDate,
          id: {
            lt: cursorId,
          },
        },
      ] as unknown as typeof whereClause.OR;
    }

    const sessions = await prisma.toolkitSession.findMany({
      where: whereClause,
      include: {
        assets: {
          select: {
            id: true,
            kind: true,
            width: true,
            height: true,
            durationSec: true,
            urlWatermarked: true,
            createdAt: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      take: PAGE_SIZE + 1,
    });

    const hasMore = sessions.length > PAGE_SIZE;
    const items = hasMore ? sessions.slice(0, PAGE_SIZE) : sessions;

    let nextCursor: string | undefined;
    if (hasMore) {
      const lastItem = items[items.length - 1];
      nextCursor = `${lastItem.createdAt.toISOString()}_${lastItem.id}`;
    }

    const response: SessionsResponse = {
      sessions: items.map((session) => ({
        id: session.id,
        toolType: session.toolType as 'image' | 'video',
        prompt: session.prompt,
        modelId: session.modelId,
        aspectRatio: session.aspectRatio,
        variations: session.variations ?? undefined,
        durationSec: session.durationSec ?? undefined,
        resolution: session.resolution ?? undefined,
        createdAt: session.createdAt.toISOString(),
        assets: session.assets.map((asset) => ({
          id: asset.id,
          kind: asset.kind,
          width: asset.width ?? undefined,
          height: asset.height ?? undefined,
          durationSec: asset.durationSec ?? undefined,
          urlWatermarked: asset.urlWatermarked,
          createdAt: asset.createdAt.toISOString(),
        })),
      })),
      nextCursor,
      hasMore,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Sessions fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
