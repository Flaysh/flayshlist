'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  List,
} from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import { usePlayerStore } from '@/stores/player-store';
import { Slider } from '@/components/ui';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    queue,
    pause,
    resume,
    stop,
    next,
    previous,
    setVolume,
    setCurrentTime,
    setDuration,
  } = usePlayerStore();

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [setCurrentTime]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [setDuration]);

  const handleEnded = useCallback(() => {
    next();
  }, [next]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.previewUrl;
    audio.load();

    if (isPlaying) {
      audio.play().catch(console.error);
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-sm">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-initial sm:w-64">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-neutral-800">
              {currentTrack.coverImage && (
                <Image
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-100">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-neutral-400">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-1 flex-1 max-w-xl">
            <div className="flex items-center gap-2">
              <button
                onClick={previous}
                className={cn(
                  'rounded-full p-2 text-neutral-400 hover:text-neutral-100 transition-colors',
                  focusRing
                )}
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                onClick={() => (isPlaying ? pause() : resume())}
                className={cn(
                  'rounded-full bg-primary-500 p-2 text-white hover:bg-primary-600 transition-colors',
                  focusRing
                )}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 translate-x-0.5" />
                )}
              </button>
              <button
                onClick={next}
                className={cn(
                  'rounded-full p-2 text-neutral-400 hover:text-neutral-100 transition-colors',
                  focusRing
                )}
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="hidden sm:flex w-full items-center gap-2">
              <span className="text-xs text-neutral-500 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 cursor-pointer appearance-none rounded-full bg-neutral-700 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
                aria-label="Seek"
              />
              <span className="text-xs text-neutral-500 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Volume & Queue */}
          <div className="hidden sm:flex items-center gap-3 w-48 justify-end">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                className={cn(
                  'text-neutral-400 hover:text-neutral-100 transition-colors',
                  focusRing
                )}
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              >
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 cursor-pointer appearance-none rounded-full bg-neutral-700 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-100"
                aria-label="Volume"
              />
            </div>

            {queue.length > 0 && (
              <div className="flex items-center gap-1 text-neutral-400">
                <List className="h-4 w-4" />
                <span className="text-xs">{queue.length}</span>
              </div>
            )}

            <button
              onClick={stop}
              className={cn(
                'rounded-full p-1.5 text-neutral-400 hover:text-neutral-100 transition-colors',
                focusRing
              )}
              aria-label="Close player"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
