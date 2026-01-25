import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import type { AnimationCompositionProps } from '@/types/animation';

export function KenBurns({ imageUrl, width, height }: AnimationCompositionProps) {
  const frame = useCurrentFrame();

  // 4 seconds at 30fps = 120 frames
  const scale = interpolate(frame, [0, 120], [1, 1.15], {
    extrapolateRight: 'clamp',
  });

  const translateX = interpolate(frame, [0, 120], [0, -3], {
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
          transform: `scale(${scale}) translateX(${translateX}%)`,
        }}
      />
    </AbsoluteFill>
  );
}
