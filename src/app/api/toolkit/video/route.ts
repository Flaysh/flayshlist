import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/toolkit/db';
import { getClientIp, hashIp } from '@/lib/toolkit/ip';
import { checkAndIncrementQuota } from '@/lib/toolkit/rate-limit';
import { watermarkVideo } from '@/lib/toolkit/watermark-video';
import type { GenerationResponse } from '@/lib/toolkit/types';

const requestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  modelId: z.enum(['wan_fast']),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']),
  durationSec: z.union([z.literal(4), z.literal(5), z.literal(8)]),
  resolution: z.enum(['480p', '720p']),
});

const ASPECT_RATIO_MAP: Record<string, { width: number; height: number }> = {
  '1:1': { width: 720, height: 720 },
  '16:9': { width: 1280, height: 720 },
  '9:16': { width: 720, height: 1280 },
};

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    if (!ip) {
      return NextResponse.json({ error: 'Cannot identify client' }, { status: 400 });
    }

    const ipHash = hashIp(ip);

    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { prompt, modelId, aspectRatio, durationSec, resolution } = validation.data;

    const quotaCheck = await checkAndIncrementQuota(ipHash, 'video');
    if (!quotaCheck.allowed) {
      return NextResponse.json(quotaCheck.error, { status: 429 });
    }

    const session = await prisma.toolkitSession.create({
      data: {
        toolType: 'video',
        prompt,
        modelId,
        aspectRatio,
        durationSec,
        resolution,
        ipHash,
      },
    });

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const dimensions = ASPECT_RATIO_MAP[aspectRatio];
    const resolutionHeight = resolution === '720p' ? 720 : 480;
    const resolutionWidth = Math.floor((dimensions.width / dimensions.height) * resolutionHeight);

    const output = await replicate.run('lightricks/ltx-video:4e7b34f9346b5fa2c1a8231f5db38c73db9ad178bc1f5d25f0e22e49fa8dd5eb', {
      input: {
        prompt,
        num_frames: Math.floor(durationSec * 25),
        width: resolutionWidth,
        height: resolutionHeight,
        num_inference_steps: 30,
      },
    });

    const videoUrl = typeof output === 'string' ? output : String(output) || '';
    const videoResponse = await fetch(videoUrl);
    const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

    const watermarkedBuffer = await watermarkVideo(videoBuffer);

    const filename = `toolkit/video/${session.id}/${session.id}.mp4`;
    const blob = await put(filename, watermarkedBuffer, {
      access: 'public',
      contentType: 'video/mp4',
    });

    const asset = await prisma.toolkitAsset.create({
      data: {
        sessionId: session.id,
        kind: 'video',
        width: resolutionWidth,
        height: resolutionHeight,
        durationSec,
        urlOriginal: videoUrl,
        urlWatermarked: blob.url,
        metadata: {
          modelId,
          aspectRatio,
          resolution,
          prompt,
        },
      },
    });

    const response: GenerationResponse = {
      sessionId: session.id,
      createdAt: session.createdAt.toISOString(),
      items: [
        {
          assetId: asset.id,
          urlWatermarked: asset.urlWatermarked,
          durationSec: asset.durationSec!,
          prompt,
          modelId,
          aspectRatio,
          resolution,
        },
      ],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
