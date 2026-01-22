'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Loader2,
  ChevronDown,
  Wand2,
  MonitorPlay,
} from 'lucide-react';
import type { GeneratedAsset, GenerateImageResponse, AspectRatio, Resolution, RecreateSettings } from '@/types/ai';
import { ModelSelector } from './ModelSelector';
import { AspectRatioSelector } from './AspectRatioSelector';
import { AdvancedSettings } from './AdvancedSettings';
import { DEFAULT_MODEL_ID, getModelById, calculateDimensions, RESOLUTIONS } from '@/lib/ai-models';

type PromptDockProps = {
  onGenerated: (asset: GeneratedAsset) => void;
  initialSettings?: RecreateSettings | null;
  onSettingsCleared?: () => void;
};

export function PromptDock({ onGenerated, initialSettings, onSettingsCleared }: PromptDockProps) {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [resolution, setResolution] = useState<Resolution>('1080p');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Apply initial settings when provided (for recreate functionality)
  // This is intentional prop synchronization - the parent passes settings to apply
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (initialSettings) {
      setPrompt(initialSettings.prompt);
      setNegativePrompt(initialSettings.negativePrompt || '');
      setModel(initialSettings.model);
      setAspectRatio(initialSettings.aspectRatio);
      if (initialSettings.guidanceScale !== undefined) {
        setGuidanceScale(initialSettings.guidanceScale);
      }
      // Focus the textarea
      textareaRef.current?.focus();
      // Clear the initial settings after applying
      onSettingsCleared?.();
    }
  }, [initialSettings, onSettingsCleared]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Handle model change - update guidance scale to model default
  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    const modelConfig = getModelById(newModel);
    if (modelConfig?.defaultGuidanceScale !== undefined) {
      setGuidanceScale(modelConfig.defaultGuidanceScale);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 80)}px`;
    }
  }, [prompt]);

  // Cleanup progress interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const startFakeProgress = () => {
    setProgress(0);
    let currentProgress = 0;

    progressIntervalRef.current = setInterval(() => {
      const remaining = 90 - currentProgress;
      const increment = Math.random() * Math.min(remaining * 0.1, 5);
      currentProgress = Math.min(currentProgress + increment, 90);
      setProgress(Math.round(currentProgress));
    }, 200);
  };

  const stopFakeProgress = (success: boolean) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (success) {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        setIsGenerating(false);
      }, 500);
    } else {
      setProgress(0);
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      setError('Please enter a prompt');
      return;
    }

    if (trimmedPrompt.length < 3) {
      setError('Prompt must be at least 3 characters');
      return;
    }

    if (trimmedPrompt.length > 400) {
      setError('Prompt must be under 400 characters');
      return;
    }

    setError(null);
    setIsGenerating(true);
    startFakeProgress();

    try {
      const modelConfig = getModelById(model);

      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          negativePrompt: modelConfig?.supportsNegativePrompt ? negativePrompt.trim() : undefined,
          model,
          aspectRatio,
          resolution,
          guidanceScale: modelConfig?.supportsGuidanceScale ? guidanceScale : undefined,
        }),
      });

      const data: GenerateImageResponse = await response.json();

      if (data.success) {
        stopFakeProgress(true);
        setPrompt('');
        setNegativePrompt('');
        onGenerated(data.asset);
      } else {
        stopFakeProgress(false);
        setError(data.error);
      }
    } catch {
      stopFakeProgress(false);
      setError('Failed to generate image. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const cycleResolution = () => {
    const resolutions: Resolution[] = ['720p', '1080p'];
    const currentIndex = resolutions.indexOf(resolution);
    const nextIndex = (currentIndex + 1) % resolutions.length;
    setResolution(resolutions[nextIndex]);
  };

  const currentDimensions = calculateDimensions(aspectRatio, resolution);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient fade above dock */}
      <div className="h-24 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />

      {/* Main dock container */}
      <div className="bg-neutral-950/98 backdrop-blur-2xl border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4">
          {/* Error message */}
          {error && (
            <div className="mb-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Progress state */}
          {isGenerating && (
            <div className="mb-3 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating your image... ({progress}%)</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Main dock panel */}
          <div className="bg-neutral-900/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50">
            {/* Top row - Input area */}
            <div className="flex items-center gap-3 p-4">
              {/* Left - mode toggle buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/5" role="group" aria-label="Media type">
                <div className="relative group">
                  <button
                    className="p-2 bg-white/10 border border-white/20 rounded-lg transition-colors"
                    aria-label="Image mode"
                    aria-pressed="true"
                  >
                    <ImageIcon className="w-4 h-4 text-white" />
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-white/10 rounded text-[10px] text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Image mode
                  </span>
                </div>
                <div className="relative group">
                  <button
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors opacity-50 cursor-not-allowed"
                    disabled
                    aria-label="Video mode (coming soon)"
                  >
                    <Video className="w-4 h-4 text-white/40" />
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-white/10 rounded text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Video coming soon
                  </span>
                </div>
              </div>

              {/* Vertical separator */}
              <div className="h-8 w-px bg-white/10" />

              {/* Main prompt input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the image you want to create..."
                  disabled={isGenerating}
                  rows={1}
                  className="w-full bg-transparent text-white placeholder-white/40 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2 leading-relaxed pr-16"
                />
                {/* Character count */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className={`text-[10px] tabular-nums ${prompt.length > 350 ? 'text-amber-400' : prompt.length > 400 ? 'text-red-400' : 'text-white/30'}`}>
                    {prompt.length}/400
                  </span>
                </div>
              </div>

              {/* Right side - expand toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title={isExpanded ? 'Hide options' : 'Show options'}
              >
                <ChevronDown className={`w-4 h-4 text-white/60 transition-transform duration-200 ${isExpanded ? '' : 'rotate-180'}`} />
              </button>
            </div>

            {/* Bottom row - Settings chips */}
            {isExpanded && (
              <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Model selector */}
                  <ModelSelector
                    value={model}
                    onChange={handleModelChange}
                    disabled={isGenerating}
                  />

                  {/* Separator dot */}
                  <span className="w-1 h-1 rounded-full bg-white/20" />

                  {/* Aspect ratio selector */}
                  <AspectRatioSelector
                    value={aspectRatio}
                    resolution={resolution}
                    onChange={setAspectRatio}
                    disabled={isGenerating}
                  />

                  {/* Resolution toggle */}
                  <button
                    onClick={cycleResolution}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={`${currentDimensions.width} x ${currentDimensions.height}px`}
                  >
                    <MonitorPlay className="w-3 h-3 text-white/60" />
                    {RESOLUTIONS[resolution].label}
                  </button>

                  {/* Separator dot */}
                  <span className="w-1 h-1 rounded-full bg-white/20" />

                  {/* Advanced settings */}
                  <AdvancedSettings
                    modelId={model}
                    negativePrompt={negativePrompt}
                    onNegativePromptChange={setNegativePrompt}
                    guidanceScale={guidanceScale}
                    onGuidanceScaleChange={setGuidanceScale}
                    disabled={isGenerating}
                  />
                </div>

                {/* Generate button */}
                <div className="relative group">
                  <button
                    onClick={handleSubmit}
                    disabled={isGenerating || !prompt.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-900 font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-amber-400 disabled:hover:to-amber-500 whitespace-nowrap shadow-lg shadow-amber-500/25"
                  >
                    <Wand2 className="w-4 h-4" />
                    {isGenerating ? 'Generating...' : 'Generate Free'}
                  </button>
                  {/* Keyboard shortcut tooltip */}
                  {!isGenerating && prompt.trim() && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-white/10 rounded text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-white/80">Enter</kbd> to generate
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
