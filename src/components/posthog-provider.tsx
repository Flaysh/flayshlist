'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    const isDebug = process.env.NEXT_PUBLIC_POSTHOG_DEBUG === 'true';
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Don't initialize in development unless debug mode is enabled
    if (isDevelopment && !isDebug) {
      console.log('[PostHog] Disabled in development mode. Set NEXT_PUBLIC_POSTHOG_DEBUG=true to enable.');
      return;
    }

    if (!posthogKey || !posthogHost) {
      if (isDevelopment || isDebug) {
        console.warn('[PostHog] Missing NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_HOST');
      }
      return;
    }

    try {
      // Initialize PostHog
      posthog.init(posthogKey, {
        api_host: posthogHost,

        // Session recording configuration
        session_recording: {
          // Minimal masking - only password inputs and elements with .ph-no-capture class
          maskAllInputs: false,
          maskInputOptions: {
            password: true,
          },
        },

        // Capture page views
        capture_pageview: true,
        capture_pageleave: true,

        // Load asynchronously after page interactive
        loaded: (ph) => {
          if (isDevelopment || isDebug) {
            console.log('[PostHog] Initialized successfully');
            ph.debug();
          }
        },
      });

      if (isDevelopment || isDebug) {
        console.log('[PostHog] Configuration:', {
          host: posthogHost,
          sessionRecording: 'enabled',
          capturePageview: true,
          capturePageleave: true,
        });
      }
    } catch (error) {
      // Graceful degradation - app continues if PostHog fails
      console.error('[PostHog] Failed to initialize:', error);
    }
  }, []);

  return <>{children}</>;
}
