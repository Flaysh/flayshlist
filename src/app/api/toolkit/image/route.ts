import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import Replicate from 'replicate';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/toolkit/db';
import { getClientIp, hashIp } from '@/lib/toolkit/ip';
import { checkAndIncrementQuota } from '@/lib/toolkit/rate-limit';
import { watermarkImage } from '@/lib/toolkit/watermark-image';
import type { GenerationResponse } from '@/lib/toolkit/types';

const requestSchema = z.object({
  prompt: z.string().min(1).max(2000),
  modelId: z.enum(['flux_fast', 'flux_schnell']),
  aspectRatio: z.enum(['1:1', '16:9', '9:16']),
  variations: z.number().int().min(1).max(3),
});

const ASPECT_RATIO_MAP: Record<string, { width: number; height: number }> = {
  '1:1': { width: 1024, height: 1024 },
  '16:9': { width: 1344, height: 768 },
  '9:16': { width: 768, height: 1344 },
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

    const { prompt, modelId, aspectRatio, variations } = validation.data;

    const quotaCheck = await checkAndIncrementQuota(ipHash, 'image');
    if (!quotaCheck.allowed) {
      return NextResponse.json(quotaCheck.error, { status: 429 });
    }

    const session = await prisma.toolkitSession.create({
      data: {
        toolType: 'image',
        prompt,
        modelId,
        aspectRatio,
        variations,
        ipHash,
      },
    });

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const replicateModel =
      modelId === 'flux_fast'
        ? 'black-forest-labs/flux-schnell'
        : 'black-forest-labs/flux-schnell';

    const dimensions = ASPECT_RATIO_MAP[aspectRatio];

    const outputs = await Promise.all(
      Array.from({ length: variations }, async (_, index) => {
        const output = (await replicate.run(replicateModel, {
          input: {
            prompt,
            num_outputs: 1,
            aspect_ratio: aspectRatio,
            output_format: 'png',
            output_quality: 80,
          },
        })) as string[];

        const imageUrl = output[0];
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        const watermarkedBuffer = await watermarkImage(imageBuffer);

        const filename = `toolkit/image/${session.id}/${session.id}-${index}.webp`;
        const blob = await put(filename, watermarkedBuffer, {
          access: 'public',
          contentType: 'image/webp',
        });

        const asset = await prisma.toolkitAsset.create({
          data: {
            sessionId: session.id,
            kind: 'image',
            width: dimensions.width,
            height: dimensions.height,
            urlOriginal: imageUrl,
            urlWatermarked: blob.url,
            metadata: {
              modelId,
              aspectRatio,
              prompt,
            },
          },
        });

        return {
          assetId: asset.id,
          urlWatermarked: asset.urlWatermarked,
          width: asset.width!,
          height: asset.height!,
          prompt,
          modelId,
          aspectRatio,
        };
      })
    );

    const response: GenerationResponse = {
      sessionId: session.id,
      createdAt: session.createdAt.toISOString(),
      items: outputs,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
