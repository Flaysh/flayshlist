'use client';

import Image from 'next/image';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn, focusRing } from '@/lib/design-system';
import type { AssetItem, ToolType } from '@/lib/toolkit/types';

interface AssetModalProps {
  asset: AssetItem;
  toolType: ToolType;
  onClose: () => void;
}

export function AssetModal({ asset, toolType, onClose }: AssetModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(asset.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-neutral-700 bg-neutral-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={cn(
            'absolute top-4 right-4 z-10 rounded-lg p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 bg-neutral-900/80 backdrop-blur-sm',
            focusRing
          )}
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative">
          {toolType === 'image' ? (
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={asset.urlWatermarked}
                alt={asset.prompt}
                fill
                className="object-contain bg-neutral-950"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-neutral-950">
              <video
                src={asset.urlWatermarked}
                controls
                className="w-full h-full"
                autoPlay
                loop
              />
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-300">Prompt</label>
              <button
                onClick={handleCopy}
                className={cn(
                  'flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors',
                  focusRing
                )}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-neutral-200 bg-neutral-800 rounded-lg p-3">
              {asset.prompt}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-neutral-400 block mb-1">Model</span>
              <span className="text-neutral-200 font-medium">{asset.modelId}</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">Aspect Ratio</span>
              <span className="text-neutral-200 font-medium">{asset.aspectRatio}</span>
            </div>
            {asset.width && asset.height && (
              <div>
                <span className="text-neutral-400 block mb-1">Dimensions</span>
                <span className="text-neutral-200 font-medium">
                  {asset.width} × {asset.height}
                </span>
              </div>
            )}
            {asset.resolution && (
              <div>
                <span className="text-neutral-400 block mb-1">Resolution</span>
                <span className="text-neutral-200 font-medium">{asset.resolution}</span>
              </div>
            )}
            {asset.durationSec && (
              <div>
                <span className="text-neutral-400 block mb-1">Duration</span>
                <span className="text-neutral-200 font-medium">{asset.durationSec}s</span>
              </div>
            )}
          </div>

          <a
            href={asset.urlWatermarked}
            download
            className={cn(
              'w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-3 text-sm font-medium text-white hover:from-primary-600 hover:to-accent-600 transition-all',
              focusRing
            )}
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
