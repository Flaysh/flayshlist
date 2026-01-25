// Animation preset identifiers
export type AnimationPreset = 'ken-burns' | 'fade' | 'slide' | 'rotate' | 'pulse';

// Configuration for each preset
export type AnimationPresetConfig = {
  id: AnimationPreset;
  name: string;
  description: string;
};

// Props passed to Remotion compositions
export type AnimationCompositionProps = {
  imageUrl: string;
  width: number;
  height: number;
};

// Request payload for animation rendering
export type AnimateRequest = {
  imageUrl: string;
  preset: AnimationPreset;
  width: number;
  height: number;
};

// Response from animation API
export type AnimateResponse =
  | { success: true; videoUrl: string }
  | { success: false; error: string; retryAfter?: number };

// All available presets
export const ANIMATION_PRESETS: AnimationPresetConfig[] = [
  { id: 'ken-burns', name: 'Ken Burns', description: 'Slow zoom with pan' },
  { id: 'fade', name: 'Fade', description: 'Fade in and out' },
  { id: 'slide', name: 'Slide', description: 'Slide across frame' },
  { id: 'rotate', name: 'Rotate', description: 'Gentle rotation' },
  { id: 'pulse', name: 'Pulse', description: 'Rhythmic breathing' },
];
