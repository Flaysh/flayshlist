import { NextRequest, NextResponse } from 'next/server';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { put } from '@vercel/blob';
import { checkAnimationRateLimit, getClientIP } from '@/lib/ratelimit';
import type { AnimateResponse, AnimationPreset, AnimationCompositionProps } from '@/types/animation';
import path from 'path';
import fs from 'fs';
import os from 'os';

const VALID_PRESETS: AnimationPreset[] = ['ken-burns', 'fade', 'slide', 'rotate', 'pulse'];

export async function POST(request: NextRequest): Promise<NextResponse<AnimateResponse>> {
  const tempDir = path.join(os.tmpdir(), `remotion-${Date.now()}`);

  try {
    const body = await request.json();
    const { imageUrl, preset, width, height } = body;

    // Validate inputs
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      );
    }

    if (!preset || !VALID_PRESETS.includes(preset)) {
      return NextResponse.json(
        { success: false, error: `Invalid preset. Valid options: ${VALID_PRESETS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!width || !height || typeof width !== 'number' || typeof height !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Width and height are required' },
        { status: 400 }
      );
    }

    // Check rate limit
    const clientIP = await getClientIP();
    const rateLimitResult = await checkAnimationRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const message = rateLimitResult.reason === 'hourly'
        ? 'Rate limit exceeded. You can render up to 3 animations per hour.'
        : 'Daily limit exceeded. You can render up to 10 animations per day.';

      return NextResponse.json(
        { success: false, error: message, retryAfter: rateLimitResult.retryAfter },
        { status: 429 }
      );
    }

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Bundle the Remotion project
    const bundleLocation = await bundle({
      entryPoint: path.join(process.cwd(), 'src/remotion/index.ts'),
      outDir: path.join(tempDir, 'bundle'),
    });

    // Map preset to composition ID
    const compositionId = preset;

    // Select the composition
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: { imageUrl, width, height } as AnimationCompositionProps,
    });

    // Render the video
    const outputPath = path.join(tempDir, 'output.mp4');

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { imageUrl, width, height } as AnimationCompositionProps,
    });

    // Read the rendered file
    const videoBuffer = fs.readFileSync(outputPath);

    // Upload to Vercel Blob
    const videoId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const blobResult = await put(`animations/${videoId}.mp4`, videoBuffer, {
      access: 'public',
      contentType: 'video/mp4',
    });

    return NextResponse.json({ success: true, videoUrl: blobResult.url });
  } catch (error) {
    console.error('Animation render error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to render animation' },
      { status: 500 }
    );
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch {
      // Ignore cleanup errors
    }
  }
}
