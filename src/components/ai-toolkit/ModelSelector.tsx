'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, ChevronDown, Check } from 'lucide-react';
import { AI_MODELS } from '@/lib/ai-models';
import type { AIModel } from '@/types/ai';

type ModelSelectorProps = {
  value: string;
  onChange: (modelId: string) => void;
  disabled?: boolean;
};

export function ModelSelector({ value, onChange, disabled }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedModel = AI_MODELS.find((m) => m.id === value) ?? AI_MODELS[0];

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

  const handleSelect = (model: AIModel) => {
    onChange(model.id);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="w-3 h-3 text-emerald-400" />
        {selectedModel.name}
        <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 min-w-[260px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-[100]">
          <div className="p-2 space-y-1">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => handleSelect(model)}
                className={`w-full flex items-start gap-3 p-2.5 rounded-lg transition-colors text-left ${
                  model.id === value
                    ? 'bg-white/10 border border-emerald-500/30'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <Sparkles className={`w-4 h-4 ${model.id === value ? 'text-emerald-400' : 'text-white/40'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{model.name}</span>
                    {model.id === value && (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{model.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {model.supportsNegativePrompt && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">
                        Negative Prompt
                      </span>
                    )}
                    {model.supportsGuidanceScale && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded">
                        Guidance
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
