'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  Loader2,
  Upload,
  ChevronDown,
  Wand2,
  Ratio,
  MonitorPlay,
  SlidersHorizontal,
} from 'lucide-react';
import type { GeneratedAsset, GenerateImageResponse } from '@/types/ai';

type PromptDockProps = {
  onGenerated: (asset: GeneratedAsset) => void;
};

export function PromptDock({ onGenerated }: PromptDockProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data: GenerateImageResponse = await response.json();

      if (data.success) {
        stopFakeProgress(true);
        setPrompt('');
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Gradient fade above dock */}
      <div className="h-20 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />

      {/* Main dock container */}
      <div className="bg-neutral-950/95 backdrop-blur-xl border-t border-white/5">
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
          <div className="bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden">
            {/* Top row - Input area */}
            <div className="flex items-center gap-3 p-3">
              {/* Left action buttons */}
              <div className="flex items-center gap-1">
                <button
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Upload image"
                >
                  <Upload className="w-4 h-4 text-white/60" />
                </button>
                <button
                  className="p-2.5 bg-white/10 border border-white/20 rounded-xl transition-colors"
                  title="Image mode (active)"
                >
                  <ImageIcon className="w-4 h-4 text-white" />
                </button>
                <button
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors opacity-50"
                  title="Video mode (coming soon)"
                  disabled
                >
                  <Video className="w-4 h-4 text-white/40" />
                </button>
              </div>

              {/* Main prompt input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the image you want to create"
                  disabled={isGenerating}
                  rows={1}
                  className="w-full bg-transparent text-white placeholder-white/40 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2"
                />
              </div>

              {/* Right side - expand toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
              </button>
            </div>

            {/* Bottom row - Settings chips */}
            {isExpanded && (
              <div className="flex items-center justify-between gap-3 px-3 pb-3 border-t border-white/5 pt-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Model selector */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    FLUX Schnell
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </button>

                  {/* Aspect ratio */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors">
                    <Ratio className="w-3 h-3 text-white/60" />
                    1:1
                  </button>

                  {/* Quality */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/80 transition-colors">
                    <MonitorPlay className="w-3 h-3 text-white/60" />
                    1024px
                  </button>

                  {/* Advanced settings */}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white/60 transition-colors">
                    <SlidersHorizontal className="w-3 h-3" />
                    Advanced
                  </button>
                </div>

                {/* Generate button */}
                <button
                  onClick={handleSubmit}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-amber-400 disabled:hover:to-amber-500 whitespace-nowrap shadow-lg shadow-amber-500/20"
                >
                  <Wand2 className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate Free'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
