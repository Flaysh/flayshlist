export type GeneratedAsset = {
  id: string;
  kind: 'image';
  prompt: string;
  model: string;
  aspect: '1:1';
  width: number;
  height: number;
  imageUrl: string;
  createdAt: string;
  source: 'replicate' | 'seed';
};

export type GenerateImageRequest = {
  prompt: string;
};

export type GenerateImageResponse = {
  success: true;
  asset: GeneratedAsset;
} | {
  success: false;
  error: string;
  retryAfter?: number;
};
