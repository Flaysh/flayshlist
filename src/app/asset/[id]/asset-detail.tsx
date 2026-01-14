'use client';

import Link from 'next/link';
import {
  ExternalLink,
  Share2,
  Clock,
  Music,
  Tag,
  User,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { Button, Badge, Card, CardContent, useToast } from '@/components/ui';
import { AssetCard } from '@/components/catalog';
import type { Asset } from '@/lib/api';

interface AssetDetailProps {
  asset: Asset;
  relatedAssets: Asset[];
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return 'N/A';
  if (seconds >= 3600) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const AssetDetail = ({ asset, relatedAssets }: AssetDetailProps) => {
  const { addToast } = useToast();

  const tags = (() => {
    try {
      return JSON.parse(asset.tags) as string[];
    } catch {
      return [];
    }
  })();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({
      title: 'Link copied',
      description: 'Asset link copied to clipboard.',
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pb-32">
      <Link
        href="/music"
        className={cn(
          'mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors',
          focusRing
        )}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Music
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <iframe
                width="100%"
                height="300"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(asset.sourceUrl)}&color=%230c8ce9&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`}
                title={asset.title}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-100">{asset.title}</h1>
              <p className="mt-1 text-lg text-neutral-400">{asset.artist}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <a
                href={asset.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in SoundCloud
                </Button>
              </a>
            </div>
          </div>

          {asset.description && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-100 mb-2">Description</h2>
              <p className="text-neutral-400">{asset.description}</p>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-100 mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-semibold text-neutral-100">Track Details</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-neutral-500" />
                  <span className="text-neutral-400">Duration:</span>
                  <span className="text-neutral-100">{formatDuration(asset.durationSec)}</span>
                </div>

                {asset.bpm && (
                  <div className="flex items-center gap-3">
                    <Music className="h-4 w-4 text-neutral-500" />
                    <span className="text-neutral-400">BPM:</span>
                    <span className="text-neutral-100">{asset.bpm}</span>
                  </div>
                )}

                {asset.genre && (
                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-neutral-500" />
                    <span className="text-neutral-400">Genre:</span>
                    <span className="text-neutral-100 capitalize">{asset.genre}</span>
                  </div>
                )}

                {asset.mood && (
                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-neutral-500" />
                    <span className="text-neutral-400">Mood:</span>
                    <span className="text-neutral-100 capitalize">{asset.mood}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-neutral-500" />
                  <span className="text-neutral-400">Artist:</span>
                  <span className="text-neutral-100">{asset.artist}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-neutral-500" />
                  <span className="text-neutral-400">Added:</span>
                  <span className="text-neutral-100">{formatDate(asset.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary-900/30 to-accent-900/30">
            <CardContent className="p-4 text-center">
              <Music className="h-8 w-8 text-primary-400 mx-auto mb-3" />
              <h3 className="font-semibold text-neutral-100">Stream This Track</h3>
              <p className="mt-1 text-sm text-neutral-400">
                Listen on SoundCloud
              </p>
              <a
                href={asset.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block"
              >
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedAssets.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-neutral-100 mb-6">Related Tracks</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedAssets.map((related) => (
              <AssetCard key={related.id} asset={related} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
