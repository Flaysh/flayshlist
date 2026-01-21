'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BANNER_DISMISSED_KEY = 'flaysh-ai-banner-dismissed';

export function NewBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem(BANNER_DISMISSED_KEY);
  });

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="sticky top-0 z-[110] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-sm">
        <Sparkles className="w-4 h-4 flex-shrink-0" />
        <span className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-semibold">New!</span>
          <Link href="/ai-toolkit" className="underline underline-offset-2 hover:no-underline">
            FLAYSH AI Toolkit
          </Link>
          <span className="hidden sm:inline">—</span>
          <span className="hidden sm:inline">generate glossy images (video coming soon)</span>
        </span>
        <button
          onClick={handleDismiss}
          className="ml-auto p-1 hover:bg-white/20 rounded transition-colors flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
