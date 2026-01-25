import { Composition } from 'remotion';
import { KenBurns, Fade, Slide, Rotate, Pulse } from '@/components/ai-toolkit/compositions';
import type { AnimationCompositionProps } from '@/types/animation';

export function RemotionRoot() {
  const defaultProps: AnimationCompositionProps = {
    imageUrl: '',
    width: 1024,
    height: 1024,
  };

  return (
    <>
      <Composition
        id="ken-burns"
        component={KenBurns}
        durationInFrames={120}
        fps={30}
        width={1024}
        height={1024}
        defaultProps={defaultProps}
      />
      <Composition
        id="fade"
        component={Fade}
        durationInFrames={120}
        fps={30}
        width={1024}
        height={1024}
        defaultProps={defaultProps}
      />
      <Composition
        id="slide"
        component={Slide}
        durationInFrames={120}
        fps={30}
        width={1024}
        height={1024}
        defaultProps={defaultProps}
      />
      <Composition
        id="rotate"
        component={Rotate}
        durationInFrames={120}
        fps={30}
        width={1024}
        height={1024}
        defaultProps={defaultProps}
      />
      <Composition
        id="pulse"
        component={Pulse}
        durationInFrames={120}
        fps={30}
        width={1024}
        height={1024}
        defaultProps={defaultProps}
      />
    </>
  );
}
