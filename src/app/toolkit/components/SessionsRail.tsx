'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Clock, Image as ImageIcon, Video } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';
import type { SessionWithAssets, ToolType } from '@/lib/toolkit/types';

interface SessionsRailProps {
  toolType: ToolType;
  refreshTrigger: number;
}

export function SessionsRail({ toolType, refreshTrigger }: SessionsRailProps) {
  const [sessions, setSessions] = useState<SessionWithAssets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/toolkit/sessions?toolType=${toolType}`);
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [toolType]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions, refreshTrigger]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 border-l border-neutral-800 bg-neutral-950/30 backdrop-blur-sm">
      <div className="sticky top-16">
        <div className="border-b border-neutral-800 p-4">
          <h3 className="text-sm font-semibold text-neutral-100 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            History
          </h3>
        </div>

        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg bg-neutral-800/50 animate-pulse h-32" />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              {toolType === 'image' ? (
                <ImageIcon className="h-12 w-12 text-neutral-600 mb-3" />
              ) : (
                <Video className="h-12 w-12 text-neutral-600 mb-3" />
              )}
              <p className="text-sm text-neutral-400">No history yet</p>
              <p className="text-xs text-neutral-500 mt-1">
                Your generations will appear here
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    'group rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 hover:border-primary-500/30 hover:bg-neutral-900 transition-all cursor-pointer',
                    focusRing
                  )}
                >
                  <div className="flex gap-3">
                    {session.assets[0] && (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                        {toolType === 'image' ? (
                          <Image
                            src={session.assets[0].urlWatermarked}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={session.assets[0].urlWatermarked}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-300 line-clamp-2 mb-2">
                        {session.prompt}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                        <span className="bg-neutral-800 px-1.5 py-0.5 rounded">
                          {session.aspectRatio}
                        </span>
                        <span>{formatDate(session.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {hasMore && (
                <div className="text-center pt-2">
                  <p className="text-xs text-neutral-500">Scroll for more...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
