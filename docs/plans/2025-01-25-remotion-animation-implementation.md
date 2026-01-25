# Remotion Animation Feature - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add animation capabilities to the AI Toolkit using Remotion - users can animate gallery images with presets, preview in-browser, and download as MP4.

**Architecture:** Client-side preview using @remotion/player for instant feedback. Server-side rendering via @remotion/renderer for MP4 downloads. Animation compositions are React components with interpolated transforms.

**Tech Stack:** Remotion, @remotion/player, @remotion/bundler, @remotion/renderer, React 19, Next.js 16

---

## Task 1: Install Remotion Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Remotion packages**

Run:
```bash
cd /Users/itayflaysher/code/flayshlist/.worktrees/feature-remotion-animation && pnpm add remotion @remotion/player @remotion/bundler @remotion/renderer
```

**Step 2: Verify installation**

Run:
```bash
pnpm list remotion
```

Expected: Shows remotion and related packages installed

**Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add remotion dependencies for animation feature"
```

---

## Task 2: Create Animation Types

**Files:**
- Create: `src/types/animation.ts`

**Step 1: Create the types file**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/types/animation.ts
git commit -m "feat(animation): add animation types and preset configs"
```

---

## Task 3: Create Ken Burns Composition

**Files:**
- Create: `src/components/ai-toolkit/compositions/KenBurns.tsx`

**Step 1: Create the composition**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/KenBurns.tsx
git commit -m "feat(animation): add Ken Burns composition"
```

---

## Task 4: Create Fade Composition

**Files:**
- Create: `src/components/ai-toolkit/compositions/Fade.tsx`

**Step 1: Create the composition**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/Fade.tsx
git commit -m "feat(animation): add Fade composition"
```

---

## Task 5: Create Slide Composition

**Files:**
- Create: `src/components/ai-toolkit/compositions/Slide.tsx`

**Step 1: Create the composition**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/Slide.tsx
git commit -m "feat(animation): add Slide composition"
```

---

## Task 6: Create Rotate Composition

**Files:**
- Create: `src/components/ai-toolkit/compositions/Rotate.tsx`

**Step 1: Create the composition**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/Rotate.tsx
git commit -m "feat(animation): add Rotate composition"
```

---

## Task 7: Create Pulse Composition

**Files:**
- Create: `src/components/ai-toolkit/compositions/Pulse.tsx`

**Step 1: Create the composition**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/Pulse.tsx
git commit -m "feat(animation): add Pulse composition"
```

---

## Task 8: Create Compositions Index

**Files:**
- Create: `src/components/ai-toolkit/compositions/index.ts`

**Step 1: Create the index file**

```typescript
export { KenBurns } from './KenBurns';
export { Fade } from './Fade';
export { Slide } from './Slide';
export { Rotate } from './Rotate';
export { Pulse } from './Pulse';
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/compositions/index.ts
git commit -m "feat(animation): add compositions barrel export"
```

---

## Task 9: Create Animation Preview Component

**Files:**
- Create: `src/components/ai-toolkit/AnimationPreview.tsx`

**Step 1: Create the preview component**

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/AnimationPreview.tsx
git commit -m "feat(animation): add AnimationPreview component with Remotion Player"
```

---

## Task 10: Create Animate Panel Component

**Files:**
- Create: `src/components/ai-toolkit/AnimatePanel.tsx`

**Step 1: Create the panel component**

```typescript
'use client';

import { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { AnimationPreview } from './AnimationPreview';
import { ANIMATION_PRESETS, type AnimationPreset } from '@/types/animation';

type AnimatePanelProps = {
  imageUrl: string;
  width: number;
  height: number;
  onClose: () => void;
};

export function AnimatePanel({ imageUrl, width, height, onClose }: AnimatePanelProps) {
  const [preset, setPreset] = useState<AnimationPreset>('ken-burns');
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsRendering(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, preset, width, height }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to render animation');
        return;
      }

      // Trigger download
      const a = document.createElement('a');
      a.href = data.videoUrl;
      a.download = `animation-${preset}-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to render animation');
      console.error('Animation render error:', err);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-neutral-900/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Animate</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 flex justify-center bg-black/50">
          <AnimationPreview
            imageUrl={imageUrl}
            width={width}
            height={height}
            preset={preset}
          />
        </div>

        {/* Preset selector */}
        <div className="p-4 space-y-3">
          <label className="text-sm font-medium text-white/70">Style</label>
          <div className="flex flex-wrap gap-2">
            {ANIMATION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  preset === p.id
                    ? 'bg-amber-500 border-amber-500 text-neutral-900 font-medium'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
                title={p.description}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Download button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleDownload}
            disabled={isRendering}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:from-amber-400/50 disabled:to-amber-500/50 text-neutral-900 font-semibold rounded-xl transition-all"
          >
            {isRendering ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Rendering...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download MP4
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/AnimatePanel.tsx
git commit -m "feat(animation): add AnimatePanel component with preset selector"
```

---

## Task 11: Update AI Toolkit Index Exports

**Files:**
- Modify: `src/components/ai-toolkit/index.ts`

**Step 1: Add new exports**

Replace the file content with:

```typescript
export { AssetModal } from './AssetModal';
export { MasonryGrid } from './MasonryGrid';
export { PromptDock } from './PromptDock';
export { ModelSelector } from './ModelSelector';
export { AspectRatioSelector } from './AspectRatioSelector';
export { AdvancedSettings } from './AdvancedSettings';
export { AnimatePanel } from './AnimatePanel';
export { AnimationPreview } from './AnimationPreview';
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 3: Commit**

```bash
git add src/components/ai-toolkit/index.ts
git commit -m "feat(animation): export animation components from index"
```

---

## Task 12: Add Animate Button to AssetModal

**Files:**
- Modify: `src/components/ai-toolkit/AssetModal.tsx`

**Step 1: Add import for Play icon and state**

At the top of the file, update imports:

```typescript
'use client';

import { useEffect, useCallback, useState } from 'react';
import { X, Image as ImageIcon, Clock, Sparkles, Square, Download, RefreshCw, Copy, Check, ExternalLink, SlidersHorizontal, Ban, Play } from 'lucide-react';
import type { GeneratedAsset } from '@/types/ai';
import { getModelDisplayName } from '@/lib/ai-models';
import { AnimatePanel } from './AnimatePanel';
```

**Step 2: Add state for animate panel**

Inside the component, after the existing `copied` state:

```typescript
const [showAnimatePanel, setShowAnimatePanel] = useState(false);
```

**Step 3: Add Animate button after the Download button**

Find the action buttons section (around line 99-114) and add the Animate button:

```typescript
{/* Action buttons */}
<div className="flex gap-2">
  <button
    onClick={handleDownload}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-900 font-semibold rounded-xl transition-all"
  >
    <Download className="w-4 h-4" />
    Download
  </button>
  <button
    onClick={() => setShowAnimatePanel(true)}
    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
    title="Animate image"
  >
    <Play className="w-4 h-4 text-white/70" />
  </button>
  <button
    onClick={() => window.open(asset.imageUrl, '_blank')}
    className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
    title="Open in new tab"
  >
    <ExternalLink className="w-4 h-4 text-white/70" />
  </button>
</div>
```

**Step 4: Add AnimatePanel render**

At the end of the component, before the final closing `</div>`, add:

```typescript
{/* Animate Panel */}
{showAnimatePanel && (
  <AnimatePanel
    imageUrl={asset.imageUrl}
    width={asset.width}
    height={asset.height}
    onClose={() => setShowAnimatePanel(false)}
  />
)}
```

**Step 5: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 6: Commit**

```bash
git add src/components/ai-toolkit/AssetModal.tsx
git commit -m "feat(animation): add Animate button to AssetModal"
```

---

## Task 13: Create Animation Rate Limiter

**Files:**
- Modify: `src/lib/ratelimit.ts`

**Step 1: Add animation rate limiters**

After the existing `dailyLimiter` (around line 16), add:

```typescript
// Animation rendering rate limiters (more restrictive - CPU heavy)
const animationHourlyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix: 'ratelimit:animation:hourly',
});

const animationDailyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '24 h'),
  prefix: 'ratelimit:animation:daily',
});
```

**Step 2: Add animation rate limit function**

After the existing `checkRateLimit` function, add:

```typescript
export async function checkAnimationRateLimit(identifier: string): Promise<RateLimitResult> {
  // Skip rate limiting for localhost/development
  const isLocalhost = identifier === '127.0.0.1' || identifier === '::1' || identifier === 'localhost' || identifier === 'anonymous';
  if (isLocalhost && process.env.NODE_ENV === 'development') {
    return {
      allowed: true,
      remaining: 999,
    };
  }

  // Check hourly limit first
  const hourlyResult = await animationHourlyLimiter.limit(identifier);
  if (!hourlyResult.success) {
    const retryAfter = Math.ceil((hourlyResult.reset - Date.now()) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      reason: 'hourly',
    };
  }

  // Check daily limit
  const dailyResult = await animationDailyLimiter.limit(identifier);
  if (!dailyResult.success) {
    const retryAfter = Math.ceil((dailyResult.reset - Date.now()) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      reason: 'daily',
    };
  }

  return {
    allowed: true,
    remaining: Math.min(hourlyResult.remaining, dailyResult.remaining),
  };
}
```

**Step 3: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 4: Commit**

```bash
git add src/lib/ratelimit.ts
git commit -m "feat(animation): add animation-specific rate limiting (3/hr, 10/day)"
```

---

## Task 14: Create Animation API Route

**Files:**
- Create: `src/app/api/ai/animate/route.ts`

**Step 1: Create the API route**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { put } from '@vercel/blob';
import { checkAnimationRateLimit, getClientIP } from '@/lib/ratelimit';
import type { AnimateResponse, AnimationPreset, AnimationCompositionProps } from '@/types/animation';
import path from 'path';
import fs from 'fs';
import os from 'os';

const VALID_PRESETS: AnimationPreset[] = ['ken-burns', 'fade', 'slide', 'rotate', 'pulse'];

export async function POST(request: NextRequest): Promise<NextResponse<AnimateResponse>> {
  const tempDir = path.join(os.tmpdir(), `remotion-${Date.now()}`);

  try {
    const body = await request.json();
    const { imageUrl, preset, width, height } = body;

    // Validate inputs
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      );
    }

    if (!preset || !VALID_PRESETS.includes(preset)) {
      return NextResponse.json(
        { success: false, error: `Invalid preset. Valid options: ${VALID_PRESETS.join(', ')}` },
        { status: 400 }
      );
    }

    if (!width || !height || typeof width !== 'number' || typeof height !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Width and height are required' },
        { status: 400 }
      );
    }

    // Check rate limit
    const clientIP = await getClientIP();
    const rateLimitResult = await checkAnimationRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      const message = rateLimitResult.reason === 'hourly'
        ? 'Rate limit exceeded. You can render up to 3 animations per hour.'
        : 'Daily limit exceeded. You can render up to 10 animations per day.';

      return NextResponse.json(
        { success: false, error: message, retryAfter: rateLimitResult.retryAfter },
        { status: 429 }
      );
    }

    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });

    // Bundle the Remotion project
    const bundleLocation = await bundle({
      entryPoint: path.join(process.cwd(), 'src/remotion/index.ts'),
      outDir: path.join(tempDir, 'bundle'),
    });

    // Map preset to composition ID
    const compositionId = preset;

    // Select the composition
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compositionId,
      inputProps: { imageUrl, width, height } as AnimationCompositionProps,
    });

    // Render the video
    const outputPath = path.join(tempDir, 'output.mp4');

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { imageUrl, width, height } as AnimationCompositionProps,
    });

    // Read the rendered file
    const videoBuffer = fs.readFileSync(outputPath);

    // Upload to Vercel Blob
    const videoId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const blobResult = await put(`animations/${videoId}.mp4`, videoBuffer, {
      access: 'public',
      contentType: 'video/mp4',
    });

    return NextResponse.json({ success: true, videoUrl: blobResult.url });
  } catch (error) {
    console.error('Animation render error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to render animation' },
      { status: 500 }
    );
  } finally {
    // Cleanup temp directory
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch {
      // Ignore cleanup errors
    }
  }
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: May show errors about missing remotion entry point (we'll create it next)

**Step 3: Commit**

```bash
git add src/app/api/ai/animate/route.ts
git commit -m "feat(animation): add animation rendering API route"
```

---

## Task 15: Create Remotion Entry Point

**Files:**
- Create: `src/remotion/index.ts`

**Step 1: Create the Remotion entry point**

```typescript
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

**Step 2: Create Root.tsx**

Create file `src/remotion/Root.tsx`:

```typescript
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
```

**Step 3: Verify TypeScript compiles**

Run:
```bash
pnpm typecheck
```

Expected: No new errors

**Step 4: Commit**

```bash
git add src/remotion/index.ts src/remotion/Root.tsx
git commit -m "feat(animation): add Remotion entry point and composition registry"
```

---

## Task 16: Verify Build and Run Dev Server

**Step 1: Run lint**

Run:
```bash
pnpm lint
```

Expected: Only pre-existing warnings about `<img>` tags

**Step 2: Run typecheck**

Run:
```bash
pnpm typecheck
```

Expected: No errors

**Step 3: Run build**

Run:
```bash
pnpm build
```

Expected: Build completes successfully

**Step 4: Test dev server**

Run:
```bash
pnpm dev
```

Then manually test:
1. Go to http://localhost:3000/ai-toolkit
2. Click on any gallery image
3. Click the Play button (Animate)
4. Verify preview plays with Ken Burns effect
5. Try switching presets
6. Click Download MP4 (verify it starts rendering)

**Step 5: Commit final verification**

```bash
git add -A
git commit -m "feat(animation): complete Remotion animation feature

- 5 animation presets: Ken Burns, Fade, Slide, Rotate, Pulse
- In-browser preview via @remotion/player
- Server-rendered MP4 download via @remotion/renderer
- Animation-specific rate limiting (3/hr, 10/day)
- Works with all gallery images including seeds"
```

---

## Summary

| Task | Description | Estimated Complexity |
|------|-------------|---------------------|
| 1 | Install dependencies | Simple |
| 2 | Create animation types | Simple |
| 3-7 | Create 5 compositions | Simple each |
| 8 | Create compositions index | Simple |
| 9 | Create AnimationPreview | Medium |
| 10 | Create AnimatePanel | Medium |
| 11 | Update exports | Simple |
| 12 | Add Animate button to AssetModal | Medium |
| 13 | Add animation rate limiting | Simple |
| 14 | Create animation API route | Complex |
| 15 | Create Remotion entry point | Medium |
| 16 | Verify and test | Medium |

Total: 16 tasks
