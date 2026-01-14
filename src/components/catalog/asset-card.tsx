'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Pause, Clock, Music } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { Badge, Card } from '@/components/ui';
import { usePlayerStore } from '@/stores/player-store';
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
  const { currentTrack, isPlaying, play, pause, resume } = usePlayerStore();
  const isCurrentTrack = currentTrack?.id === asset.id;
  const isAudio = asset.type === 'music' || asset.type === 'sfx';

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentTrack) {
      isPlaying ? pause() : resume();
    } else {
      play({
        id: asset.id,
        title: asset.title,
        artist: asset.artist,
        previewUrl: asset.previewUrl,
        coverImage: asset.coverImage,
        type: asset.type,
      });
    }
  };

  return (
    <Link href={`/asset/${asset.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:border-neutral-700 hover:shadow-lg">
        {/* Cover Image */}
        <div className="relative aspect-square bg-neutral-800">
          <Image
            src={asset.coverImage}
            alt={asset.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
          
          {/* Play Button Overlay (for audio) */}
          {isAudio && (
            <button
              onClick={handlePlayClick}
              className={cn(
                'absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity',
                'group-hover:opacity-100',
                isCurrentTrack && isPlaying && 'opacity-100',
                focusRing
              )}
              aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white transition-transform hover:scale-110">
                {isCurrentTrack && isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6 translate-x-0.5" />
                )}
              </div>
            </button>
          )}

          {/* Duration Badge */}
          {asset.durationSec && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs text-white">
              <Clock className="h-3 w-3" />
              {formatDuration(asset.durationSec)}
            </div>
          )}

          {/* Resolution Badge (for footage) */}
          {asset.resolution && (
            <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
              {asset.resolution}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="truncate font-medium text-neutral-100">{asset.title}</h3>
          <p className="mt-0.5 truncate text-sm text-neutral-400">{asset.artist}</p>

          {/* Metadata Row */}
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
