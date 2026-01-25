import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion';
import type { AnimationCompositionProps } from '@/types/animation';

export function Rotate({ imageUrl, width, height }: AnimationCompositionProps) {
  const frame = useCurrentFrame();

  const rotate = interpolate(frame, [0, 120], [-3, 3], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [0, 60, 120], [1.05, 1.1, 1.05], {
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
          transform: `rotate(${rotate}deg) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
}
