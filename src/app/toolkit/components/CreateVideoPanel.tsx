'use client';

import { useState } from 'react';
import { Loader2, Video, AlertCircle } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import type { VideoGenerationRequest, GenerationResponse, AspectRatio, VideoModelId, DurationSec, Resolution } from '@/lib/toolkit/types';
import { ResultsGrid } from './ResultsGrid';

interface CreateVideoPanelProps {
  onGenerationComplete: () => void;
}

export function CreateVideoPanel({ onGenerationComplete }: CreateVideoPanelProps) {
  const [prompt, setPrompt] = useState('');
  const [modelId, setModelId] = useState<VideoModelId>('wan_fast');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [durationSec, setDurationSec] = useState<DurationSec>(5);
  const [resolution, setResolution] = useState<Resolution>('480p');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenerationResponse | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const request: VideoGenerationRequest = {
        prompt: prompt.trim(),
        modelId,
        aspectRatio,
        durationSec,
        resolution,
      };

      const response = await fetch('/api/toolkit/video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Generation failed');
      }

      const data: GenerationResponse = await response.json();
      setResults(data);
      onGenerationComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const charCount = prompt.length;
  const maxChars = 2000;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to create..."
                className={cn(
                  'w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none',
                  focusRing
                )}
                rows={6}
                maxLength={maxChars}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-neutral-500">Describe motion and action</span>
                <span className={cn(
                  'text-xs',
                  charCount > maxChars * 0.9 ? 'text-accent-400' : 'text-neutral-500'
                )}>
                  {charCount}/{maxChars}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">Model</label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value as VideoModelId)}
                className={cn(
                  'w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm text-neutral-100',
                  focusRing
                )}
              >
                <option value="wan_fast">WAN Fast</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1:1', '16:9', '9:16'] as AspectRatio[]).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                      aspectRatio === ratio
                        ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                        : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600',
                      focusRing
                    )}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([4, 5, 8] as DurationSec[]).map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDurationSec(dur)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                      durationSec === dur
                        ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                        : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600',
                      focusRing
                    )}
                  >
                    {dur}s
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">
                Resolution
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['480p', '720p'] as Resolution[]).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={cn(
                      'rounded-lg border px-4 py-2 text-sm font-medium transition-all',
                      resolution === res
                        ? 'border-primary-500 bg-primary-500/10 text-primary-400'
                        : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600',
                      focusRing
                    )}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className={cn(
              'w-full mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all',
              !prompt.trim() || isGenerating
                ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600',
              focusRing
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Video...
              </>
            ) : (
              <>
                <Video className="h-4 w-4" />
                Generate Video
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        {results ? (
          <ResultsGrid results={results} toolType="video" />
        ) : (
          <div className="flex items-center justify-center h-full min-h-[400px] rounded-2xl border-2 border-dashed border-neutral-800 bg-neutral-900/30">
            <div className="text-center p-8">
              <Video className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400">Your generated video will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
