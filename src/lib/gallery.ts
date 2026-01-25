import { kv } from '@vercel/kv';
import type { GeneratedAsset } from '@/types/ai';

const GALLERY_KEY = 'ai:gallery';
const ASSET_PREFIX = 'ai:asset:';
const MAX_GALLERY_SIZE = 60;

export async function getLatestAssets(limit: number = 60): Promise<GeneratedAsset[]> {
  try {
    // Get the list of asset IDs (newest first)
    const assetIds = await kv.lrange<string>(GALLERY_KEY, 0, limit - 1);

    if (!assetIds || assetIds.length === 0) {
      return [];
    }

    // Fetch all assets in parallel
    const assets = await Promise.all(
      assetIds.map(async (id) => {
        const asset = await kv.get<GeneratedAsset>(`${ASSET_PREFIX}${id}`);
        return asset;
      })
    );

    // Filter out any null values and return
    return assets.filter((asset): asset is GeneratedAsset => asset !== null);
  } catch (error) {
    console.error('Error fetching gallery assets:', error);
    return [];
  }
}

export async function saveAsset(asset: GeneratedAsset): Promise<void> {
  try {
    // Save the asset data
    await kv.set(`${ASSET_PREFIX}${asset.id}`, asset);

    // Add to the front of the gallery list
    await kv.lpush(GALLERY_KEY, asset.id);

    // Trim the list to maintain max size
    const listLength = await kv.llen(GALLERY_KEY);
    if (listLength > MAX_GALLERY_SIZE) {
      // Get IDs that will be removed
      const oldIds = await kv.lrange<string>(GALLERY_KEY, MAX_GALLERY_SIZE, -1);

      // Trim the list
      await kv.ltrim(GALLERY_KEY, 0, MAX_GALLERY_SIZE - 1);

      // Delete old asset data
      if (oldIds && oldIds.length > 0) {
        await Promise.all(
          oldIds.map((id) => kv.del(`${ASSET_PREFIX}${id}`))
        );
      }
    }
  } catch (error) {
    console.error('Error saving asset:', error);
    throw error;
  }
}

export async function getAssetById(id: string): Promise<GeneratedAsset | null> {
  try {
    return await kv.get<GeneratedAsset>(`${ASSET_PREFIX}${id}`);
  } catch (error) {
    console.error('Error fetching asset:', error);
    return null;
  }
}

// Seed images - high quality images to showcase the gallery
const SEED_IMAGES = [
  { id: 1084, prompt: 'Aerial view of coastal landscape with dramatic cliffs', aspect: '16:9' },
  { id: 1069, prompt: 'Abstract geometric architecture in monochrome', aspect: '1:1' },
  { id: 1080, prompt: 'Neon city lights reflecting on wet streets at night', aspect: '9:16' },
  { id: 1062, prompt: 'Futuristic digital interface with holographic elements', aspect: '1:1' },
  { id: 1059, prompt: 'Crystal formations in underground cave with bioluminescence', aspect: '3:4' },
  { id: 1055, prompt: 'Cinematic mountain landscape at golden hour', aspect: '16:9' },
  { id: 1036, prompt: 'Abstract fluid motion with vibrant colors', aspect: '1:1' },
  { id: 1033, prompt: 'Minimalist modern design with clean lines', aspect: '4:3' },
  { id: 1029, prompt: 'Surreal dreamscape with floating islands', aspect: '9:16' },
  { id: 1025, prompt: 'Atmospheric forest scene with morning mist', aspect: '3:4' },
  { id: 1019, prompt: 'Cosmic galaxy nebula with swirling colors', aspect: '1:1' },
  { id: 1015, prompt: 'Reflective water surface at sunset', aspect: '16:9' },
  { id: 1012, prompt: 'Urban street photography with cinematic lighting', aspect: '9:16' },
  { id: 1009, prompt: 'Desert dunes under starry night sky', aspect: '16:9' },
  { id: 1006, prompt: 'Macro shot of crystalline structures', aspect: '1:1' },
  { id: 1003, prompt: 'Vintage film aesthetic portrait', aspect: '3:4' },
  { id: 1000, prompt: 'Tropical beach paradise aerial view', aspect: '16:9' },
  { id: 997, prompt: 'Cyberpunk cityscape with neon signs', aspect: '9:16' },
  { id: 994, prompt: 'Autumn forest path with golden leaves', aspect: '4:3' },
  { id: 991, prompt: 'Abstract painting with bold brushstrokes', aspect: '1:1' },
  { id: 988, prompt: 'Snowy mountain peak at sunrise', aspect: '16:9' },
  { id: 985, prompt: 'Japanese garden with cherry blossoms', aspect: '3:4' },
  { id: 982, prompt: 'Industrial architecture with dramatic shadows', aspect: '1:1' },
  { id: 979, prompt: 'Ocean waves crashing on rocky shore', aspect: '16:9' },
];

// Get dimensions based on aspect ratio
function getSeedDimensions(aspect: string): { width: number; height: number } {
  switch (aspect) {
    case '16:9': return { width: 1024, height: 576 };
    case '9:16': return { width: 576, height: 1024 };
    case '4:3': return { width: 1024, height: 768 };
    case '3:4': return { width: 768, height: 1024 };
    default: return { width: 1024, height: 1024 };
  }
}

export function generateSeedAssets(count: number): GeneratedAsset[] {
  // Use a fixed base date to avoid hydration mismatches between server and client
  const baseDate = new Date('2026-01-01T00:00:00.000Z');
  return Array.from({ length: count }, (_, i) => {
    const seed = SEED_IMAGES[i % SEED_IMAGES.length];
    const dims = getSeedDimensions(seed.aspect);
    return {
      id: `seed-${i}`,
      kind: 'image' as const,
      prompt: seed.prompt,
      model: 'seed',
      aspect: (seed.aspect || '1:1') as GeneratedAsset['aspect'],
      width: dims.width,
      height: dims.height,
      imageUrl: `https://picsum.photos/id/${seed.id}/${dims.width}/${dims.height}`,
      createdAt: new Date(baseDate.getTime() - i * 60000).toISOString(),
      source: 'seed' as const,
    };
  });
}
