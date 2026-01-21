import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { put } from '@vercel/blob';
import { checkRateLimit, getClientIP } from '@/lib/ratelimit';
import { saveAsset } from '@/lib/gallery';
import type { GeneratedAsset, GenerateImageResponse } from '@/types/ai';

const MODEL_ID = 'black-forest-labs/flux-schnell';

export async function POST(request: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  try {
    // Parse request body
    const body = await request.json();
    const { prompt } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length < 3 || trimmedPrompt.length > 400) {
      return NextResponse.json(
        { success: false, error: 'Prompt must be between 3 and 400 characters' },
        { status: 400 }
      );
    }

    // Check rate limit
    const clientIP = await getClientIP();
    const rateLimitResult = await checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const message = rateLimitResult.reason === 'hourly'
        ? 'Rate limit exceeded. You can generate up to 5 images per hour.'
        : 'Daily limit exceeded. You can generate up to 20 images per day.';

      return NextResponse.json(
        {
          success: false,
          error: message,
          retryAfter: rateLimitResult.retryAfter,
        },
        { status: 429 }
      );
    }

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Generate image with Replicate
    const output = await replicate.run(MODEL_ID, {
      input: {
        prompt: trimmedPrompt,
        aspect_ratio: '1:1',
        num_outputs: 1,
        output_format: 'webp',
        output_quality: 90,
      },
    });

    // Get the image URL from the output
    const outputArray = output as string[];
    if (!outputArray || outputArray.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    const replicateImageUrl = outputArray[0];

    // Download the image
    const imageResponse = await fetch(replicateImageUrl);
    if (!imageResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to download generated image' },
        { status: 500 }
      );
    }

    const imageBlob = await imageResponse.blob();

    // Generate unique ID
    const assetId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Upload to Vercel Blob
    const blobResult = await put(`ai-toolkit/${assetId}.webp`, imageBlob, {
      access: 'public',
      contentType: 'image/webp',
    });

    // Create asset object
    const asset: GeneratedAsset = {
      id: assetId,
      kind: 'image',
      prompt: trimmedPrompt,
      model: MODEL_ID,
      aspect: '1:1',
      width: 1024,
      height: 1024,
      imageUrl: blobResult.url,
      createdAt: new Date().toISOString(),
      source: 'replicate',
    };

    // Save to KV
    await saveAsset(asset);

    return NextResponse.json({ success: true, asset });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
