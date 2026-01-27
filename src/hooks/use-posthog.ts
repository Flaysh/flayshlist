import posthog from 'posthog-js';

/**
 * Type-safe wrapper for PostHog tracking
 */
export function usePostHog() {
  const capture = (eventName: string, properties?: Record<string, string | number | boolean | undefined>) => {
    try {
      if (typeof window !== 'undefined') {
        posthog.capture(eventName, properties);
      }
    } catch (error) {
      // Silently fail - analytics should never break the app
      console.error('[PostHog] Failed to capture event:', eventName, error);
    }
  };

  return { capture };
}
