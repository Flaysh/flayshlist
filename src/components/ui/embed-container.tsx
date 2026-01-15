'use client';

import { type ReactNode, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/design-system';
import { Button } from './button';

interface EmbedContainerProps {
  children: ReactNode;
  title: string;
  fallbackUrl?: string;
  fallbackLabel?: string;
  aspectRatio?: 'video' | 'audio' | 'square' | 'custom';
  className?: string;
}

export const EmbedContainer = ({
  children,
  title,
  fallbackUrl,
  fallbackLabel = 'View on platform',
  aspectRatio = 'custom',
  className,
}: EmbedContainerProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectRatioClasses = {
    video: 'aspect-video',
    audio: 'aspect-[2/1]',
    square: 'aspect-square',
    custom: '',
  };

  if (hasError && fallbackUrl) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-8',
          aspectRatioClasses[aspectRatio],
          className
        )}
      >
        <p className="text-sm text-neutral-400">Unable to load embed</p>
        <a href={fallbackUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            {fallbackLabel}
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-neutral-900',
            aspectRatioClasses[aspectRatio]
          )}
          aria-label={`Loading ${title}`}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-700 border-t-primary-500" />
        </div>
      )}
      <div
        className={cn('h-full w-full', isLoading && 'opacity-0')}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      >
        {children}
      </div>
    </div>
  );
};
