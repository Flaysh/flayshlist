import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Badge, Card } from '@/components/ui';
import type { Asset } from '@/lib/api';

interface AssetCardProps {
  asset: Asset;
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return null;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AssetCard = ({ asset }: AssetCardProps) => {
  const isAudio = asset.type === 'music' || asset.type === 'sfx';

  return (
    <Link href={`/asset/${asset.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:border-neutral-700 hover:shadow-lg">
        <div className="relative aspect-square bg-neutral-800">
          <Image
            src={asset.coverImage}
            alt={asset.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />

          {isAudio && asset.durationSec && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
              <Clock className="h-3 w-3" />
              {formatDuration(asset.durationSec)}
            </div>
          )}

          {asset.resolution && (
            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
              {asset.resolution}
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="truncate font-medium text-neutral-100">{asset.title}</h3>
          <p className="mt-0.5 truncate text-sm text-neutral-400">{asset.artist}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {asset.bpm && (
              <Badge variant="default" className="text-xs">
                {asset.bpm} BPM
              </Badge>
            )}
            {asset.key && (
              <Badge variant="default" className="text-xs">
                {asset.key}
              </Badge>
            )}
            {asset.genre && (
              <Badge variant="primary" className="text-xs capitalize">
                {asset.genre}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
