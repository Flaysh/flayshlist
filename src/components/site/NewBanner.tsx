'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BANNER_DISMISSED_KEY = 'flaysh-ai-banner-dismissed-v3';

export function NewBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (!dismissed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Link href="/ai-toolkit" className="block">
      <div className="sticky top-0 z-[110] bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-sm">
          {/* Sparkle icon */}
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />

          {/* Message */}
          <span className="text-white/90">
            <span className="font-semibold">New!</span>
            {' '}All the AI tools you need, organized in one toolkit
          </span>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDismiss();
            }}
            className="absolute right-4 p-1.5 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
    </Link>
  );
}
