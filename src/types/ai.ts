// Aspect ratios supported by the AI toolkit
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

// Resolution presets
export type Resolution = '720p' | '1080p';

// AI Model configuration
export type AIModel = {
  id: string;
  name: string;
  description: string;
  supportsNegativePrompt: boolean;
  supportsGuidanceScale: boolean;
  defaultGuidanceScale?: number;
  maxGuidanceScale?: number;
};

// Generated asset stored in gallery
export type GeneratedAsset = {
  id: string;
  kind: 'image' | 'video';
  prompt: string;
  negativePrompt?: string;
  model: string;
  aspect: AspectRatio;
  width: number;
  height: number;
  imageUrl: string;
  createdAt: string;
  source: 'replicate' | 'seed';
  guidanceScale?: number;
};

// Request payload for image generation
export type GenerateImageRequest = {
  prompt: string;
  negativePrompt?: string;
  model?: string;
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
  guidanceScale?: number;
};

// Response from image generation API
export type GenerateImageResponse = {
  success: true;
  asset: GeneratedAsset;
} | {
  success: false;
  error: string;
  retryAfter?: number;
};

// Settings for recreating an image
export type RecreateSettings = {
  prompt: string;
  negativePrompt?: string;
  model: string;
  aspectRatio: AspectRatio;
  guidanceScale?: number;
};
