'use client';

import { Player } from '@remotion/player';
import { useMemo } from 'react';
import { KenBurns, Fade, Slide, Rotate, Pulse } from './compositions';
import type { AnimationPreset, AnimationCompositionProps } from '@/types/animation';

type AnimationPreviewProps = {
  imageUrl: string;
  width: number;
  height: number;
  preset: AnimationPreset;
};

const COMPOSITIONS = {
  'ken-burns': KenBurns,
  fade: Fade,
  slide: Slide,
  rotate: Rotate,
  pulse: Pulse,
} as const;

// Max preview size to reduce memory usage
const MAX_PREVIEW_WIDTH = 400;

export function AnimationPreview({ imageUrl, width, height, preset }: AnimationPreviewProps) {
  const Component = COMPOSITIONS[preset];

  // Calculate preview dimensions (max 400px wide, maintain aspect ratio)
  const scale = Math.min(1, MAX_PREVIEW_WIDTH / width);
  const previewWidth = Math.round(width * scale);
  const previewHeight = Math.round(height * scale);

  // Use preview dimensions for composition to reduce memory
  const inputProps: AnimationCompositionProps = useMemo(
    () => ({ imageUrl, width: previewWidth, height: previewHeight }),
    [imageUrl, previewWidth, previewHeight]
  );

  return (
    <Player
      key={preset} // Force remount on preset change for cleanup
      component={Component}
      inputProps={inputProps}
      durationInFrames={120}
      fps={30}
      compositionWidth={previewWidth}
      compositionHeight={previewHeight}
      style={{ width: previewWidth, height: previewHeight }}
      controls
      loop
      autoPlay={false} // Don't auto-play to save resources
    />
  );
}
