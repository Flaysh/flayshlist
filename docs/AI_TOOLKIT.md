# AI Toolkit - Technical Documentation

A comprehensive guide to the AI image generation feature, demonstrating production-grade frontend architecture, API design, and state management patterns.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Flow](#data-flow)
3. [Type System](#type-system)
4. [API Layer](#api-layer)
5. [Components](#components)
6. [State Management](#state-management)
7. [Storage Layer](#storage-layer)
8. [Rate Limiting](#rate-limiting)
9. [Model Configuration](#model-configuration)
10. [Key Engineering Decisions](#key-engineering-decisions)

---

## Architecture Overview

The AI Toolkit follows a layered architecture that separates concerns and enables scalability:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Presentation Layer                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │PromptDock   │ │MasonryGrid  │ │AssetModal   │ │SelDectors (Model/Aspect)││
│  │(Input/Gen)  │ │(Gallery)    │ │(Details)    │ │ AdvancedSettings        ││
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────────────┘│
├─────────────────────────────────────────────────────────────────────────────┤
│                            Client State Layer                                │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ AIToolkitClient: Manages assets[], settingsToRecreate, callbacks     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                              API Layer                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │ /api/ai/image: Validation → Rate Limit → Replicate → Blob → KV      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│                            External Services                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                           │
│  │  Replicate  │ │ Vercel Blob │ │  Vercel KV  │                           │
│  │  (AI Gen)   │ │  (Storage)  │ │  (Gallery)  │                           │
│  └─────────────┘ └─────────────┘ └─────────────┘                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Server-First Data Fetching** - Initial gallery loads server-side via React Server Components
2. **Progressive Enhancement** - UI works with minimal JS, enhances with interactivity
3. **Type Safety** - End-to-end TypeScript from API response to UI rendering
4. **Optimistic Updates** - New images appear immediately in gallery
5. **Graceful Degradation** - Rate limits, errors, and loading states all handled

---

## Data Flow

### Generation Flow

```
User Input (PromptDock)
        │
        ▼
┌───────────────────┐
│ Client Validation │ ← Prompt length (3-400 chars)
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  POST /api/ai/image │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Server Validation │ ← Model exists, params valid
└───────────────────┘
        │
        ▼
┌───────────────────┐
│   Rate Limiting   │ ← 5/hour, 20/day (bypassed in dev)
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Replicate API    │ ← Model-specific input params
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Download & Store  │ ← Vercel Blob (WebP, public)
└───────────────────┘
        │
        ▼
┌───────────────────┐
│  Save to KV       │ ← Asset metadata + gallery list
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Return to Client  │ ← GeneratedAsset object
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Update UI State   │ ← Prepend to assets array
└───────────────────┘
```

### Recreate Flow

```
Gallery Item Click
        │
        ▼
┌───────────────────┐
│   Open Modal      │ ← Shows metadata, prompt, settings
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Click "Recreate"  │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Extract Settings  │ ← RecreateSettings type
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Pass to PromptDock│ ← Via parent state lifting
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Apply to Form     │ ← useEffect syncs props to state
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Scroll to Dock    │ ← Auto-scroll + focus textarea
└───────────────────┘
```

---

## Type System

Located in `src/types/ai.ts`, the type system ensures compile-time safety across the entire feature:

### Core Types

```typescript
// Aspect ratios - constrained union type
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

// Resolution presets
export type Resolution = '720p' | '1080p';

// AI Model capability definition
export type AIModel = {
  id: string;                        // Replicate model identifier
  name: string;                      // Display name
  description: string;               // UI description
  supportsNegativePrompt: boolean;   // Feature flag
  supportsGuidanceScale: boolean;    // Feature flag
  defaultGuidanceScale?: number;     // Model-specific default
  maxGuidanceScale?: number;         // UI slider max
};

// Generated asset (stored + displayed)
export type GeneratedAsset = {
  id: string;
  kind: 'image' | 'video';           // Future: video support
  prompt: string;
  negativePrompt?: string;
  model: string;
  aspect: AspectRatio;
  width: number;
  height: number;
  imageUrl: string;                  // Vercel Blob URL
  createdAt: string;                 // ISO timestamp
  source: 'replicate' | 'seed';      // Real vs sample
  guidanceScale?: number;
};
```

### API Types

```typescript
// Request payload - partial, server fills defaults
export type GenerateImageRequest = {
  prompt: string;
  negativePrompt?: string;
  model?: string;
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
  guidanceScale?: number;
};

// Discriminated union for type-safe response handling
export type GenerateImageResponse = {
  success: true;
  asset: GeneratedAsset;
} | {
  success: false;
  error: string;
  retryAfter?: number;   // Rate limit info
};
```

### Benefits

- **Compile-time validation** - Invalid aspect ratios or models caught by TypeScript
- **IntelliSense support** - Autocomplete for all properties
- **Refactoring safety** - Rename model property, TypeScript finds all usages
- **Self-documenting** - Types serve as API contract documentation

---

## API Layer

### Route: `/api/ai/image/route.ts`

The API route follows Next.js 16 App Router conventions with full TypeScript typing:

```typescript
export async function POST(
  request: NextRequest
): Promise<NextResponse<GenerateImageResponse>>
```

### Pipeline Stages

1. **Request Parsing** - Extract and destructure body
2. **Validation** - Prompt length, model existence
3. **Rate Limiting** - IP-based with Upstash
4. **Dimension Calculation** - Aspect ratio + resolution → pixel dimensions
5. **Model-Specific Input Building** - FLUX vs SD3 have different params
6. **Replicate Execution** - Async image generation
7. **Image Download** - Fetch from temporary Replicate URL
8. **Blob Storage** - Upload to Vercel Blob (permanent URL)
9. **KV Storage** - Save metadata and update gallery list
10. **Response** - Return success or typed error

### Model-Specific Handling

```typescript
function buildReplicateInput(modelId, prompt, aspectRatio, dimensions, ...) {
  // FLUX models: use aspect_ratio string
  if (modelId.includes('flux')) {
    return {
      prompt,
      aspect_ratio: aspectRatio,  // "16:9"
      guidance: guidanceScale,    // FLUX param name
    };
  }

  // SD3: uses explicit dimensions
  if (modelId.includes('stable-diffusion')) {
    return {
      prompt,
      width: dimensions.width,     // 1024
      height: dimensions.height,   // 576
      cfg_scale: guidanceScale,    // SD param name
      negative_prompt: negativePrompt,
    };
  }
}
```

---

## Components

### Component Hierarchy

```
AIToolkitPage (Server Component)
└── AIToolkitClient (Client Component - state container)
    ├── MasonryGrid
    │   ├── AssetCard (×N)
    │   └── AssetModal (conditional)
    └── PromptDock
        ├── ModelSelector
        ├── AspectRatioSelector
        └── AdvancedSettings
```

### PromptDock (`src/components/ai-toolkit/PromptDock.tsx`)

The main input interface with 280+ lines of carefully crafted UI logic:

**State Management:**
```typescript
const [prompt, setPrompt] = useState('');
const [negativePrompt, setNegativePrompt] = useState('');
const [model, setModel] = useState(DEFAULT_MODEL_ID);
const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
const [resolution, setResolution] = useState<Resolution>('1080p');
const [guidanceScale, setGuidanceScale] = useState(7.5);
const [isGenerating, setIsGenerating] = useState(false);
const [progress, setProgress] = useState(0);
const [error, setError] = useState<string | null>(null);
```

**Key Features:**
- Auto-resizing textarea (max 80px height)
- Character count with color warnings
- Keyboard shortcut (Enter to generate)
- Fake progress bar (smooth UX while waiting)
- Model-aware settings (hides unsupported options)
- Recreate functionality via prop synchronization

### ModelSelector (`src/components/ai-toolkit/ModelSelector.tsx`)

Dropdown with model capabilities display:
- Shows model name and description
- Visual indicator for current selection
- Click-outside-to-close behavior
- High z-index to render above dock

### AspectRatioSelector (`src/components/ai-toolkit/AspectRatioSelector.tsx`)

Visual ratio picker:
- Mini preview boxes showing aspect shape
- Dimension preview in tooltip
- Resolution-aware calculations

### AdvancedSettings (`src/components/ai-toolkit/AdvancedSettings.tsx`)

Collapsible panel for power users:
- Negative prompt textarea (SD3 only)
- Guidance scale slider with value display
- Model capability awareness (conditional rendering)

### MasonryGrid (`src/components/ai-toolkit/MasonryGrid.tsx`)

Responsive gallery with masonry layout:
- CSS columns-based layout
- Dynamic aspect ratio classes
- Model badge display
- Recreate callback integration

### AssetModal (`src/components/ai-toolkit/AssetModal.tsx`)

Full-screen image viewer:
- Metadata display (model, dimensions, guidance)
- Download functionality
- Recreate button
- Keyboard dismiss (Escape key)
- Click-outside-to-close

---

## State Management

### Pattern: Lifted State with Callbacks

The toolkit uses React's built-in state lifting pattern rather than external state management:

```typescript
// Parent: AIToolkitClient
function AIToolkitClient({ initialAssets }) {
  const [assets, setAssets] = useState(initialAssets);
  const [settingsToRecreate, setSettingsToRecreate] = useState(null);

  const handleGenerated = (newAsset) => {
    setAssets((prev) => [newAsset, ...prev]);  // Prepend
  };

  const handleRecreate = useCallback((settings) => {
    setSettingsToRecreate(settings);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  return (
    <>
      <MasonryGrid assets={assets} onRecreate={handleRecreate} />
      <PromptDock
        onGenerated={handleGenerated}
        initialSettings={settingsToRecreate}
      />
    </>
  );
}
```

### Why This Pattern?

1. **Simplicity** - No Redux/Zustand boilerplate for small feature scope
2. **Colocation** - State lives close to where it's used
3. **Performance** - React batches updates automatically
4. **Testability** - Pure functions, predictable data flow

---

## Storage Layer

### Vercel KV (Gallery Metadata)

Redis-compatible key-value store for fast reads:

```typescript
const GALLERY_KEY = 'ai:gallery';         // List of asset IDs
const ASSET_PREFIX = 'ai:asset:';         // Individual asset data
const MAX_GALLERY_SIZE = 60;              // Auto-cleanup threshold

// Storage operations
await kv.lpush(GALLERY_KEY, asset.id);    // Add to front of list
await kv.set(`${ASSET_PREFIX}${id}`, asset);  // Store asset data
await kv.lrange(GALLERY_KEY, 0, limit);   // Fetch latest N IDs
```

### Vercel Blob (Image Storage)

Permanent, CDN-backed image storage:

```typescript
const blobResult = await put(
  `ai-toolkit/${assetId}.webp`,
  imageBlob,
  {
    access: 'public',
    contentType: 'image/webp',
  }
);
// Returns: { url: 'https://xxx.public.blob.vercel-storage.com/...' }
```

### Auto-Cleanup

Gallery automatically trims old entries:

```typescript
if (listLength > MAX_GALLERY_SIZE) {
  const oldIds = await kv.lrange(GALLERY_KEY, MAX_GALLERY_SIZE, -1);
  await kv.ltrim(GALLERY_KEY, 0, MAX_GALLERY_SIZE - 1);
  await Promise.all(oldIds.map(id => kv.del(`${ASSET_PREFIX}${id}`)));
}
```

---

## Rate Limiting

### Implementation (`src/lib/ratelimit.ts`)

Two-tier rate limiting using Upstash's sliding window algorithm:

```typescript
// Tier 1: Burst protection
const hourlyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 h'),  // 5 per hour
  prefix: 'ratelimit:hourly',
});

// Tier 2: Daily quota
const dailyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, '24 h'),  // 20 per day
  prefix: 'ratelimit:daily',
});
```

### Development Bypass

Local development skips rate limiting for faster iteration:

```typescript
const isLocalhost = identifier === '127.0.0.1' || identifier === '::1';
if (isLocalhost && process.env.NODE_ENV === 'development') {
  return { allowed: true, remaining: 999 };
}
```

### IP Detection

Multi-source IP extraction for accurate client identification:

```typescript
const forwardedFor = headers.get('x-forwarded-for');  // Behind proxy
const realIP = headers.get('x-real-ip');              // Direct
return forwardedFor?.split(',')[0].trim() ?? realIP ?? 'anonymous';
```

---

## Model Configuration

### Available Models (`src/lib/ai-models.ts`)

```typescript
export const AI_MODELS: AIModel[] = [
  {
    id: 'black-forest-labs/flux-schnell',
    name: 'FLUX Schnell',
    description: 'Fast generation, great for quick iterations',
    supportsNegativePrompt: false,
    supportsGuidanceScale: false,
  },
  {
    id: 'black-forest-labs/flux-1.1-pro',
    name: 'FLUX Pro',
    description: 'Higher quality, more detailed outputs',
    supportsNegativePrompt: false,
    supportsGuidanceScale: true,
    defaultGuidanceScale: 3.5,
    maxGuidanceScale: 5,
  },
  {
    id: 'stability-ai/stable-diffusion-3',
    name: 'SD3',
    description: 'Stable Diffusion 3 with negative prompts',
    supportsNegativePrompt: true,
    supportsGuidanceScale: true,
    defaultGuidanceScale: 7,
    maxGuidanceScale: 20,
  },
];
```

### Dimension Calculation

Aspect ratios are calculated to maintain model compatibility:

```typescript
export function calculateDimensions(
  aspectRatio: AspectRatio,
  resolution: Resolution
): { width: number; height: number } {
  const aspect = ASPECT_RATIOS[aspectRatio];
  const res = RESOLUTIONS[resolution];

  // Fit to base size while maintaining ratio
  const aspectValue = aspect.width / aspect.height;

  let width, height;
  if (aspectValue >= 1) {
    width = res.baseSize;
    height = Math.round(res.baseSize / aspectValue);
  } else {
    height = res.baseSize;
    width = Math.round(res.baseSize * aspectValue);
  }

  // Round to multiples of 8 (model requirement)
  return {
    width: Math.round(width / 8) * 8,
    height: Math.round(height / 8) * 8,
  };
}
```

---

## Key Engineering Decisions

### 1. Server Components + Client Boundary

**Decision:** Server-render the page shell, client-render the interactive toolkit

**Rationale:**
- Initial gallery data fetched server-side (fast first paint)
- Interactive components isolated in client boundary
- Minimal JS shipped to browser

```typescript
// Server Component (page.tsx)
export default async function AIToolkitPage() {
  const assets = await getLatestAssets(60);  // Server-side fetch
  return <AIToolkitClient initialAssets={assets} />;
}
```

### 2. Discriminated Union for API Response

**Decision:** Use TypeScript discriminated union for responses

**Rationale:**
- Type narrowing in client code
- Compile-time exhaustiveness checking
- Self-documenting API contract

```typescript
type GenerateImageResponse =
  | { success: true; asset: GeneratedAsset }
  | { success: false; error: string; retryAfter?: number };

// Usage - TypeScript knows the shape after checking success
if (data.success) {
  onGenerated(data.asset);  // asset is typed
} else {
  setError(data.error);     // error is string
}
```

### 3. Fake Progress Bar

**Decision:** Simulate progress during generation

**Rationale:**
- Replicate API doesn't provide progress events
- Static spinner feels slow for 5-15 second generations
- Animated progress bar improves perceived performance

```typescript
const startFakeProgress = () => {
  progressIntervalRef.current = setInterval(() => {
    const remaining = 90 - currentProgress;
    const increment = Math.random() * Math.min(remaining * 0.1, 5);
    currentProgress = Math.min(currentProgress + increment, 90);
    setProgress(Math.round(currentProgress));
  }, 200);
};
```

### 4. Seed Images for Empty State

**Decision:** Pre-populate gallery with sample images

**Rationale:**
- New users see rich gallery immediately
- Demonstrates variety of aspect ratios
- Zero-cost using Picsum service

### 5. Model-Specific Input Building

**Decision:** Centralize model quirks in single function

**Rationale:**
- FLUX uses `aspect_ratio`, SD3 uses `width/height`
- FLUX uses `guidance`, SD3 uses `cfg_scale`
- Single place to update when adding models

---

## File Reference

| File | Purpose |
|------|---------|
| `src/types/ai.ts` | All TypeScript types for the feature |
| `src/lib/ai-models.ts` | Model configs, dimension helpers |
| `src/lib/gallery.ts` | KV storage operations, seed images |
| `src/lib/ratelimit.ts` | Rate limiting with dev bypass |
| `src/app/api/ai/image/route.ts` | Image generation API |
| `src/app/ai-toolkit/page.tsx` | Server component entry |
| `src/app/ai-toolkit/client.tsx` | Client state container |
| `src/components/ai-toolkit/PromptDock.tsx` | Main input interface |
| `src/components/ai-toolkit/ModelSelector.tsx` | Model dropdown |
| `src/components/ai-toolkit/AspectRatioSelector.tsx` | Ratio picker |
| `src/components/ai-toolkit/AdvancedSettings.tsx` | Negative prompt, guidance |
| `src/components/ai-toolkit/MasonryGrid.tsx` | Gallery layout |
| `src/components/ai-toolkit/AssetModal.tsx` | Image detail view |

---

## Running Locally

```bash
# Environment variables needed
REPLICATE_API_TOKEN=r8_xxx
KV_URL=xxx
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
KV_REST_API_READ_ONLY_TOKEN=xxx
BLOB_READ_WRITE_TOKEN=xxx

# Start dev server (rate limits bypassed)
pnpm dev

# Visit
http://localhost:3000/ai-toolkit
```

---

*This documentation reflects the architecture as of January 2026. For the latest implementation details, refer to the source code.*
