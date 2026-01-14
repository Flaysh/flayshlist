import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { AssetDetail } from './asset-detail';

interface AssetPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: AssetPageProps) {
  const { id } = await params;
  const asset = await db.asset.findUnique({ where: { id } });

  if (!asset) {
    return { title: 'Asset Not Found - FlayshList' };
  }

  return {
    title: `${asset.title} - FlayshList`,
    description: asset.description || `${asset.title} by ${asset.artist}`,
  };
}

export default async function AssetPage({ params }: AssetPageProps) {
  const { id } = await params;

  const asset = await db.asset.findUnique({
    where: { id },
  });

  if (!asset) {
    notFound();
  }

  // Fetch related assets (same type, same genre/mood)
  const relatedAssets = await db.asset.findMany({
    where: {
      id: { not: asset.id },
      type: asset.type,
      OR: [
        { genre: asset.genre },
        { mood: asset.mood },
      ],
    },
    take: 4,
  });

  return <AssetDetail asset={asset} relatedAssets={relatedAssets} />;
}
