'use client';

import { useState, useRef, useEffect } from 'react';
import { Ratio, Check } from 'lucide-react';
import { ASPECT_RATIOS, calculateDimensions } from '@/lib/ai-models';
import type { AspectRatio, Resolution } from '@/types/ai';

type AspectRatioSelectorProps = {
  value: AspectRatio;
  resolution: Resolution;
  onChange: (ratio: AspectRatio) => void;
  disabled?: boolean;
};

const ASPECT_RATIO_ORDER: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export function AspectRatioSelector({ value, resolution, onChange, disabled }: AspectRatioSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (ratio: AspectRatio) => {
    onChange(ratio);
    setIsOpen(false);
  };

  const currentDimensions = calculateDimensions(value, resolution);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Ratio className="w-3 h-3 text-white/60" />
        {value}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 min-w-[220px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[100]">
          <div className="p-2 space-y-1">
            {ASPECT_RATIO_ORDER.map((ratio) => {
              const config = ASPECT_RATIOS[ratio];
              const dims = calculateDimensions(ratio, resolution);
              const isSelected = ratio === value;

              return (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => handleSelect(ratio)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-white/10 border border-emerald-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Visual ratio indicator */}
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div
                      className={`border-2 rounded-sm ${
                        isSelected ? 'border-emerald-400' : 'border-white/30'
                      }`}
                      style={{
                        width: `${Math.min(24, 24 * (config.width / Math.max(config.width, config.height)))}px`,
                        height: `${Math.min(24, 24 * (config.height / Math.max(config.width, config.height)))}px`,
                      }}
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{ratio}</span>
                      <span className="text-xs text-white/40">{config.label}</span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-emerald-400 ml-auto" />
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 mt-0.5">
                      {dims.width} x {dims.height}px
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tooltip showing current dimensions */}
      <div className="hidden group-hover:block absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded whitespace-nowrap">
        {currentDimensions.width} x {currentDimensions.height}
      </div>
    </div>
  );
}
