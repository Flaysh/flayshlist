'use client';

import { useEffect, useCallback, useState } from 'react';
import { X, Image as ImageIcon, Clock, Sparkles, Square, Download, RefreshCw, Copy, Check, ExternalLink, SlidersHorizontal, Ban } from 'lucide-react';
import type { GeneratedAsset } from '@/types/ai';
import { getModelDisplayName } from '@/lib/ai-models';

type AssetModalProps = {
  asset: GeneratedAsset;
  onClose: () => void;
  onRecreate?: () => void;
};

export function AssetModal({ asset, onClose, onRecreate }: AssetModalProps) {
  const [copied, setCopied] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleEscape]);

  const formattedDate = new Date(asset.createdAt).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const modelName = asset.source === 'seed' ? 'Sample' : getModelDisplayName(asset.model);

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(asset.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(asset.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flaysh-ai-${asset.id}.webp`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-neutral-900/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image section - takes most space */}
        <div className="flex-1 relative bg-black/50 flex items-center justify-center p-4 min-h-[300px] lg:min-h-[500px]">
          <img
            src={asset.imageUrl}
            alt={asset.prompt}
            className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl"
          />
          {/* Type badge */}
          <span className="absolute top-6 left-6 px-3 py-1.5 text-xs font-medium bg-black/60 border border-white/20 backdrop-blur-md rounded-full text-white/90 flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            Image
          </span>
        </div>

        {/* Details sidebar */}
        <div className="lg:w-80 p-6 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10 bg-neutral-900/50">
          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-900 font-semibold rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={() => window.open(asset.imageUrl, '_blank')}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Prompt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-white/50 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Prompt
              </h3>
              <button
                onClick={handleCopyPrompt}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title="Copy prompt"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-white/50" />
                )}
              </button>
            </div>
            <p className="text-white/90 text-sm leading-relaxed bg-white/5 border border-white/10 rounded-xl p-3">
              {asset.prompt}
            </p>
          </div>

          {/* Negative Prompt - only show if present */}
          {asset.negativePrompt && (
            <div>
              <h3 className="text-sm font-medium text-white/50 flex items-center gap-2 mb-2">
                <Ban className="w-4 h-4" />
                Negative Prompt
              </h3>
              <p className="text-white/70 text-sm leading-relaxed bg-white/5 border border-white/10 rounded-xl p-3">
                {asset.negativePrompt}
              </p>
            </div>
          )}

          {/* Recreate button - only for non-seed assets */}
          {asset.source !== 'seed' && onRecreate && (
            <button
              onClick={onRecreate}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Recreate
            </button>
          )}

          {/* Metadata */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-white/50">Details</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Model
                </span>
                <span className="text-sm text-white/90">{modelName}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <Square className="w-3.5 h-3.5 text-purple-400" />
                  Ratio
                </span>
                <span className="text-sm text-white/90">{asset.aspect}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  Size
                </span>
                <span className="text-sm text-white/90">{asset.width}x{asset.height}</span>
              </div>
              {asset.guidanceScale !== undefined && (
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-white/50 flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    Guidance
                  </span>
                  <span className="text-sm text-white/90">{asset.guidanceScale.toFixed(1)}</span>
                </div>
              )}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-white/50 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  Created
                </span>
                <span className="text-sm text-white/90">{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
