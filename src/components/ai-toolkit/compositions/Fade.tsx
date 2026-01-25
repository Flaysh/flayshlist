import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import type { AnimationCompositionProps } from '@/types/animation';

export function Fade({ imageUrl, width, height }: AnimationCompositionProps) {
  const frame = useCurrentFrame();

  // Fade in (0-30), hold (30-90), fade out (90-120)
  const opacity = interpolate(
    frame,
    [0, 30, 90, 120],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    frame,
    [0, 60, 120],
    [1.02, 1.05, 1.02],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Img
        src={imageUrl}
        style={{
          width,
          height,
          objectFit: 'cover',
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
}
