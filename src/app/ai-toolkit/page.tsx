import { Metadata } from 'next';
import { getLatestAssets, generateSeedAssets } from '@/lib/gallery';
import { AIToolkitClient } from './client';

export const metadata: Metadata = {
  title: 'AI Toolkit | FLAYSH',
  description: 'Generate stunning AI images with FLAYSH AI Toolkit. Powered by FLUX Schnell.',
  openGraph: {
    title: 'AI Toolkit | FLAYSH',
    description: 'Generate stunning AI images with FLAYSH AI Toolkit.',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AIToolkitPage() {
  // Fetch assets from KV
  let assets = await getLatestAssets(60);

  // If we have fewer than 12 assets, fill with seed images
  if (assets.length < 12) {
    const seedCount = 12 - assets.length;
    const seedAssets = generateSeedAssets(seedCount);
    assets = [...assets, ...seedAssets];
  }

  return <AIToolkitClient initialAssets={assets} />;
}
