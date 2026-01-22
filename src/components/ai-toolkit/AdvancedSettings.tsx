'use client';

import { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, X, Info } from 'lucide-react';
import { getModelById } from '@/lib/ai-models';

type AdvancedSettingsProps = {
  modelId: string;
  negativePrompt: string;
  onNegativePromptChange: (value: string) => void;
  guidanceScale: number;
  onGuidanceScaleChange: (value: number) => void;
  disabled?: boolean;
};

export function AdvancedSettings({
  modelId,
  negativePrompt,
  onNegativePromptChange,
  guidanceScale,
  onGuidanceScaleChange,
  disabled,
}: AdvancedSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const model = getModelById(modelId);
  const supportsNegativePrompt = model?.supportsNegativePrompt ?? false;
  const supportsGuidanceScale = model?.supportsGuidanceScale ?? false;
  const maxGuidance = model?.maxGuidanceScale ?? 10;

  // Check if any advanced features are available for this model
  const hasAdvancedFeatures = supportsNegativePrompt || supportsGuidanceScale;

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // If no advanced features are available, show a disabled button
  if (!hasAdvancedFeatures) {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/30 cursor-not-allowed"
        title="No advanced settings for this model"
      >
        <SlidersHorizontal className="w-3 h-3" />
        Advanced
      </button>
    );
  }

  const hasActiveSettings = (supportsNegativePrompt && negativePrompt.trim()) ||
    (supportsGuidanceScale && guidanceScale !== model?.defaultGuidanceScale);

  return (
    <div ref={panelRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          hasActiveSettings
            ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
            : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60'
        }`}
      >
        <SlidersHorizontal className="w-3 h-3" />
        Advanced
        {hasActiveSettings && (
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-80 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[100]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-medium text-white">Advanced Settings</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Negative Prompt */}
            {supportsNegativePrompt && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-xs font-medium text-white/70">Negative Prompt</label>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-white/40 cursor-help" />
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-[10px] rounded-lg shadow-lg">
                      Describe what you don&apos;t want in the image
                    </div>
                  </div>
                </div>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => onNegativePromptChange(e.target.value)}
                  placeholder="blurry, low quality, distorted..."
                  disabled={disabled}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:border-white/20 disabled:opacity-50"
                />
              </div>
            )}

            {/* Guidance Scale */}
            {supportsGuidanceScale && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-white/70">Guidance Scale</label>
                    <div className="group relative">
                      <Info className="w-3 h-3 text-white/40 cursor-help" />
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black text-white text-[10px] rounded-lg shadow-lg">
                        Higher values follow the prompt more closely
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-white/50 font-mono">{guidanceScale.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max={maxGuidance}
                  step="0.5"
                  value={guidanceScale}
                  onChange={(e) => onGuidanceScaleChange(parseFloat(e.target.value))}
                  disabled={disabled}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer disabled:opacity-50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-white/30">Creative</span>
                  <span className="text-[10px] text-white/30">Precise</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
