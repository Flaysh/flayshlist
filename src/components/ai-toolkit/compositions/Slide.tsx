import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import type { AnimationCompositionProps } from '@/types/animation';

export function Slide({ imageUrl, width, height }: AnimationCompositionProps) {
  const frame = useCurrentFrame();

  const translateX = interpolate(frame, [0, 120], [-10, 10], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Img
        src={imageUrl}
        style={{
          width,
          height,
          objectFit: 'cover',
          transform: `translateX(${translateX}%) scale(1.1)`,
        }}
      />
    </AbsoluteFill>
  );
}
