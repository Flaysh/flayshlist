export type AspectRatio = '1:1' | '16:9' | '9:16';
export type ToolType = 'image' | 'video';
export type ImageModelId = 'flux_fast' | 'flux_schnell';
export type VideoModelId = 'wan_fast';
export type Resolution = '480p' | '720p';
export type DurationSec = 4 | 5 | 8;

export interface ImageGenerationRequest {
  prompt: string;
  modelId: ImageModelId;
  aspectRatio: AspectRatio;
  variations: 1 | 2 | 3;
}

export interface VideoGenerationRequest {
  prompt: string;
  modelId: VideoModelId;
  aspectRatio: AspectRatio;
  durationSec: DurationSec;
  resolution: Resolution;
}

export interface AssetItem {
  assetId: string;
  urlWatermarked: string;
  width?: number;
  height?: number;
  durationSec?: number;
  prompt: string;
  modelId: string;
  aspectRatio: string;
  resolution?: string;
}

export interface GenerationResponse {
  sessionId: string;
  createdAt: string;
  items: AssetItem[];
}

export interface SessionWithAssets {
  id: string;
  toolType: ToolType;
  prompt: string;
  modelId: string;
  aspectRatio: string;
  variations?: number;
  durationSec?: number;
  resolution?: string;
  createdAt: string;
  assets: {
    id: string;
    kind: string;
    width?: number;
    height?: number;
    durationSec?: number;
    urlWatermarked: string;
    createdAt: string;
  }[];
}

export interface SessionsResponse {
  sessions: SessionWithAssets[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface ExploreItem {
  id: string;
  title: string;
  prompt: string;
  modelId: string;
  aspectRatio: AspectRatio;
  thumbnail?: string;
  variations?: number;
  durationSec?: number;
  resolution?: string;
}
