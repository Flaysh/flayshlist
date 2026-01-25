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

export function AnimationPreview({ imageUrl, width, height, preset }: AnimationPreviewProps) {
  const Component = COMPOSITIONS[preset];

  const inputProps: AnimationCompositionProps = useMemo(
    () => ({ imageUrl, width, height }),
    [imageUrl, width, height]
  );

  // Calculate preview dimensions (max 400px wide, maintain aspect ratio)
  const previewWidth = Math.min(400, width);
  const previewHeight = Math.round((previewWidth / width) * height);

  return (
    <Player
      component={Component}
      inputProps={inputProps}
      durationInFrames={120}
      fps={30}
      compositionWidth={width}
      compositionHeight={height}
      style={{ width: previewWidth, height: previewHeight }}
      controls
      loop
      autoPlay
    />
  );
}
