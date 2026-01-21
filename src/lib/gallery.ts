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

// Seed images - high quality AI-generated style images using Picsum with grayscale/blur effects
const SEED_IMAGES = [
  { id: 1084, prompt: 'Aerial view of coastal landscape' },
  { id: 1069, prompt: 'Abstract geometric architecture' },
  { id: 1080, prompt: 'Neon city lights at night' },
  { id: 1062, prompt: 'Futuristic digital interface' },
  { id: 1059, prompt: 'Crystal formations in cave' },
  { id: 1055, prompt: 'Cinematic mountain landscape' },
  { id: 1036, prompt: 'Abstract fluid motion' },
  { id: 1033, prompt: 'Minimalist modern design' },
  { id: 1029, prompt: 'Surreal dreamscape' },
  { id: 1025, prompt: 'Atmospheric forest scene' },
  { id: 1019, prompt: 'Cosmic galaxy nebula' },
  { id: 1015, prompt: 'Reflective water surface' },
];

export function generateSeedAssets(count: number): GeneratedAsset[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = SEED_IMAGES[i % SEED_IMAGES.length];
    return {
      id: `seed-${i}`,
      kind: 'image' as const,
      prompt: seed.prompt,
      model: 'seed',
      aspect: '1:1' as const,
      width: 1024,
      height: 1024,
      imageUrl: `https://picsum.photos/id/${seed.id}/1024/1024`,
      createdAt: new Date(Date.now() - i * 60000).toISOString(),
      source: 'seed' as const,
    };
  });
}
