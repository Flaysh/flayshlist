import type { AIModel, AspectRatio, Resolution } from '@/types/ai';

// Available AI models for image generation
export const AI_MODELS: AIModel[] = [
  {
    id: 'black-forest-labs/flux-schnell',
    name: 'FLUX Schnell',
    description: 'Fast generation, great for quick iterations',
    supportsNegativePrompt: false,
    supportsGuidanceScale: false,
  },
  {
    id: 'black-forest-labs/flux-1.1-pro',
    name: 'FLUX Pro',
    description: 'Higher quality, more detailed outputs',
    supportsNegativePrompt: false,
    supportsGuidanceScale: true,
    defaultGuidanceScale: 3.5,
    maxGuidanceScale: 5,
  },
  {
    id: 'stability-ai/stable-diffusion-3',
    name: 'SD3',
    description: 'Stable Diffusion 3 with negative prompts',
    supportsNegativePrompt: true,
    supportsGuidanceScale: true,
    defaultGuidanceScale: 7,
    maxGuidanceScale: 20,
  },
];

// Default model ID
export const DEFAULT_MODEL_ID = 'black-forest-labs/flux-schnell';

// Get a model by its ID
export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}

// Get display name for a model ID
export function getModelDisplayName(modelId: string): string {
  const model = getModelById(modelId);
  return model?.name ?? 'Unknown Model';
}

// Aspect ratio configurations with base dimensions
export const ASPECT_RATIOS: Record<AspectRatio, { label: string; width: number; height: number }> = {
  '1:1': { label: 'Square', width: 1, height: 1 },
  '16:9': { label: 'Landscape', width: 16, height: 9 },
  '9:16': { label: 'Portrait', width: 9, height: 16 },
  '4:3': { label: 'Standard', width: 4, height: 3 },
  '3:4': { label: 'Portrait 4:3', width: 3, height: 4 },
};

// Resolution multipliers for calculating pixel dimensions
export const RESOLUTIONS: Record<Resolution, { label: string; baseSize: number }> = {
  '720p': { label: '720p', baseSize: 720 },
  '1080p': { label: '1080p', baseSize: 1024 },
};

// Calculate pixel dimensions based on aspect ratio and resolution
export function calculateDimensions(
  aspectRatio: AspectRatio,
  resolution: Resolution
): { width: number; height: number } {
  const aspect = ASPECT_RATIOS[aspectRatio];
  const res = RESOLUTIONS[resolution];

  // Calculate based on the larger dimension fitting the base size
  const aspectValue = aspect.width / aspect.height;

  let width: number;
  let height: number;

  if (aspectValue >= 1) {
    // Landscape or square: width is the base
    width = res.baseSize;
    height = Math.round(res.baseSize / aspectValue);
  } else {
    // Portrait: height is the base
    height = res.baseSize;
    width = Math.round(res.baseSize * aspectValue);
  }

  // Ensure dimensions are multiples of 8 for better model compatibility
  width = Math.round(width / 8) * 8;
  height = Math.round(height / 8) * 8;

  return { width, height };
}

// Get the aspect ratio class for CSS grid/masonry display
export function getAspectClass(aspect: AspectRatio): string {
  switch (aspect) {
    case '1:1':
      return 'aspect-square';
    case '16:9':
      return 'aspect-video';
    case '9:16':
      return 'aspect-[9/16]';
    case '4:3':
      return 'aspect-[4/3]';
    case '3:4':
      return 'aspect-[3/4]';
    default:
      return 'aspect-square';
  }
}
