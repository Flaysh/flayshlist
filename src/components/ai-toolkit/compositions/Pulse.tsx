import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import type { AnimationCompositionProps } from '@/types/animation';

export function Pulse({ imageUrl, width, height }: AnimationCompositionProps) {
  const frame = useCurrentFrame();

  // Two pulse cycles over 120 frames
  const scale = interpolate(
    frame,
    [0, 30, 60, 90, 120],
    [1, 1.08, 1, 1.08, 1],
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
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
}
