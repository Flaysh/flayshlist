# Remotion Animation Feature Design

## Overview

Add animation capabilities to the AI Toolkit using Remotion. Users can animate any gallery image (including seed images) with preset effects, preview in-browser, and download as MP4.

## User Flow

```
User clicks image → AssetModal opens → Clicks "Animate" button
    ↓
Animation Panel opens:
    - 5 preset options: Ken Burns, Fade, Slide, Rotate, Pulse
    - Ken Burns selected by default
    - Live preview via RemotionPlayer
    ↓
User selects preset → Preview updates instantly
    ↓
User clicks "Download" → Server renders MP4 → Download starts
```

## Output Specs

- **Duration**: 4 seconds (seamless loop)
- **Format**: MP4 (H.264)
- **Frame rate**: 30fps
- **Resolution**: Matches source image
- **File size**: ~1-3MB typical

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  CLIENT                                                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ AssetModal   │───▶│ AnimatePanel │───▶│ RemotionPlayer   │  │
│  │ + Animate    │    │ (5 presets)  │    │ (live preview)   │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  SERVER                                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ /api/ai/animate                                           │  │
│  │ - Input: imageUrl, preset                                 │  │
│  │ - Render MP4 via Remotion bundler                         │  │
│  │ - Upload to Vercel Blob → Return download URL             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Animation Presets

| Preset | Effect | Implementation |
|--------|--------|----------------|
| **Ken Burns** | Slow zoom in + subtle pan | `scale: 1 → 1.15`, `translateX: 0 → -3%` |
| **Fade** | Fade in, hold, fade out | `opacity: 0 → 1 → 1 → 0` with slight scale |
| **Slide** | Horizontal slide across | `translateX: -10% → 10%` |
| **Rotate** | Slow rotation with zoom | `rotate: -3° → 3°`, `scale: 1.05 → 1.1` |
| **Pulse** | Rhythmic breathing | `scale: 1 → 1.08 → 1` (loops twice) |

## Component Structure

### New Components

```
src/components/ai-toolkit/
├── AnimatePanel.tsx       # Preset selector + preview/download buttons
├── AnimationPreview.tsx   # Wrapper around RemotionPlayer
└── compositions/
    ├── index.ts           # Exports all compositions
    ├── KenBurns.tsx       # Pan & zoom animation
    ├── Fade.tsx           # Fade in/out with subtle scale
    ├── Slide.tsx          # Slide across frame
    ├── Rotate.tsx         # Slow rotation with zoom
    └── Pulse.tsx          # Rhythmic scale pulse
```

### AnimatePanel UI

```
┌─────────────────────────────────────────────────┐
│  Animate                                    ✕   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │                                         │   │
│  │         [Remotion Player]               │   │
│  │         Live preview here               │   │
│  │                                         │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  Style:                                         │
│  ┌────────┐┌────────┐┌────────┐┌────────┐┌───┐│
│  │Ken Burns││ Fade   ││ Slide  ││ Rotate ││...││
│  └────────┘└────────┘└────────┘└────────┘└───┘│
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │           ⬇ Download MP4                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

## API Endpoint

### POST `/api/ai/animate`

**Request**
```typescript
{
  imageUrl: string,   // Source image from Vercel Blob
  preset: "ken-burns" | "fade" | "slide" | "rotate" | "pulse"
}
```

**Response (success)**
```typescript
{ success: true, videoUrl: string }
```

**Response (error)**
```typescript
{ success: false, error: string }
```

### Render Flow

1. Validate request + check rate limit
2. Bundle the composition with the image
3. Render to MP4 (4s, 30fps, H.264)
4. Upload MP4 to Vercel Blob
5. Return CDN URL

## File Structure

### New Files

```
src/
├── app/api/ai/animate/
│   └── route.ts              # POST endpoint for MP4 rendering
├── components/ai-toolkit/
│   ├── AnimatePanel.tsx      # UI: preset selector + buttons
│   ├── AnimationPreview.tsx  # RemotionPlayer wrapper
│   └── compositions/
│       ├── index.ts
│       ├── KenBurns.tsx
│       ├── Fade.tsx
│       ├── Slide.tsx
│       ├── Rotate.tsx
│       └── Pulse.tsx
├── lib/
│   └── animation-presets.ts  # Preset configs & types
└── types/
    └── animation.ts          # AnimationPreset, AnimateRequest types
```

### Modified Files

```
src/components/ai-toolkit/
├── AssetModal.tsx            # Add "Animate" button
└── index.ts                  # Export new components
```

## Dependencies

```bash
pnpm add remotion @remotion/player @remotion/bundler @remotion/renderer
```

## Rate Limiting

Reuse existing Upstash setup with tighter limits for CPU-heavy rendering:
- 3 downloads per hour
- 10 downloads per day
- Development bypass for localhost

## Scope

| Feature | Included |
|---------|----------|
| 5 animation presets | Yes |
| Live in-browser preview | Yes |
| Server-rendered MP4 download | Yes |
| Works on all gallery images | Yes |
| Rate limiting (3/hr, 10/day) | Yes |
| Prompt-based AI suggestions | No |
