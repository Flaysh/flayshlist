'use client';

import { useState } from 'react';
import { X, Download, Loader2 } from 'lucide-react';
import { AnimationPreview } from './AnimationPreview';
import { ANIMATION_PRESETS, type AnimationPreset } from '@/types/animation';

type AnimatePanelProps = {
  imageUrl: string;
  width: number;
  height: number;
  onClose: () => void;
};

export function AnimatePanel({ imageUrl, width, height, onClose }: AnimatePanelProps) {
  const [preset, setPreset] = useState<AnimationPreset>('ken-burns');
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsRendering(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, preset, width, height }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to render animation');
        return;
      }

      // Trigger download
      const a = document.createElement('a');
      a.href = data.videoUrl;
      a.download = `animation-${preset}-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to render animation');
      console.error('Animation render error:', err);
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-neutral-900/95 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Animate</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="p-4 flex justify-center bg-black/50">
          <AnimationPreview
            imageUrl={imageUrl}
            width={width}
            height={height}
            preset={preset}
          />
        </div>

        {/* Preset selector */}
        <div className="p-4 space-y-3">
          <label className="text-sm font-medium text-white/70">Style</label>
          <div className="flex flex-wrap gap-2">
            {ANIMATION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  preset === p.id
                    ? 'bg-amber-500 border-amber-500 text-neutral-900 font-medium'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                }`}
                title={p.description}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Download button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleDownload}
            disabled={isRendering}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:from-amber-400/50 disabled:to-amber-500/50 text-neutral-900 font-semibold rounded-xl transition-all"
          >
            {isRendering ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Rendering...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download MP4
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
