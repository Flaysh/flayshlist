import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { put } from '@vercel/blob';
import { checkRateLimit, getClientIP } from '@/lib/ratelimit';
import { saveAsset } from '@/lib/gallery';
import { getModelById, calculateDimensions, DEFAULT_MODEL_ID, AI_MODELS } from '@/lib/ai-models';
import type { GeneratedAsset, GenerateImageResponse, AspectRatio, Resolution } from '@/types/ai';

export async function POST(request: NextRequest): Promise<NextResponse<GenerateImageResponse>> {
  try {
    // Parse request body
    const body = await request.json();
    const {
      prompt,
      negativePrompt,
      model: requestedModel,
      aspectRatio = '1:1' as AspectRatio,
      resolution = '1080p' as Resolution,
      guidanceScale,
    } = body;

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

    // Validate and get model configuration
    const modelId = requestedModel || DEFAULT_MODEL_ID;
    const modelConfig = getModelById(modelId);

    if (!modelConfig) {
      return NextResponse.json(
        { success: false, error: `Invalid model: ${modelId}. Available models: ${AI_MODELS.map(m => m.name).join(', ')}` },
        { status: 400 }
      );
    }

    // Calculate dimensions based on aspect ratio and resolution
    const dimensions = calculateDimensions(aspectRatio, resolution);

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

    // Build model-specific input parameters
    const replicateInput = buildReplicateInput(
      modelId,
      trimmedPrompt,
      aspectRatio,
      dimensions,
      negativePrompt,
      guidanceScale,
      modelConfig
    );

    // Generate image with Replicate
    const output = await replicate.run(modelId as `${string}/${string}`, {
      input: replicateInput,
    });

    // Get the image URL from the output
    const outputArray = Array.isArray(output) ? output : [output];
    if (!outputArray || outputArray.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    const replicateImageUrl = outputArray[0] as string;

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
      negativePrompt: negativePrompt?.trim() || undefined,
      model: modelId,
      aspect: aspectRatio,
      width: dimensions.width,
      height: dimensions.height,
      imageUrl: blobResult.url,
      createdAt: new Date().toISOString(),
      source: 'replicate',
      guidanceScale: modelConfig.supportsGuidanceScale ? (guidanceScale ?? modelConfig.defaultGuidanceScale) : undefined,
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

// Build Replicate input based on model-specific requirements
function buildReplicateInput(
  modelId: string,
  prompt: string,
  aspectRatio: AspectRatio,
  dimensions: { width: number; height: number },
  negativePrompt?: string,
  guidanceScale?: number,
  modelConfig?: ReturnType<typeof getModelById>
): Record<string, unknown> {
  // Base input common to most models
  const baseInput: Record<string, unknown> = {
    prompt,
    num_outputs: 1,
    output_format: 'webp',
    output_quality: 90,
  };

  // FLUX models use aspect_ratio string
  if (modelId.includes('flux')) {
    return {
      ...baseInput,
      aspect_ratio: aspectRatio,
      ...(modelConfig?.supportsGuidanceScale && guidanceScale !== undefined && {
        guidance: guidanceScale,
      }),
    };
  }

  // Stable Diffusion 3 uses width/height and has different param names
  if (modelId.includes('stable-diffusion')) {
    return {
      prompt,
      width: dimensions.width,
      height: dimensions.height,
      output_format: 'webp',
      ...(modelConfig?.supportsNegativePrompt && negativePrompt && {
        negative_prompt: negativePrompt.trim(),
      }),
      ...(modelConfig?.supportsGuidanceScale && {
        cfg_scale: guidanceScale ?? modelConfig.defaultGuidanceScale,
      }),
    };
  }

  // Default fallback
  return {
    ...baseInput,
    aspect_ratio: aspectRatio,
  };
}
