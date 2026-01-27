'use client';

import { usePostHog } from '@/hooks/use-posthog';

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  context?: string;
  onClick?: () => void;
};

/**
 * External link component that tracks clicks to external destinations
 */
export function TrackedLink({
  href,
  children,
  className,
  target = '_blank',
  rel = 'noopener noreferrer',
  context,
  onClick,
}: TrackedLinkProps) {
  const { capture } = usePostHog();

  const handleClick = () => {
    // Track external link click
    capture('external_link_clicked', {
      destination: href,
      context: context || 'unknown',
      platform: extractPlatform(href),
    });

    onClick?.();
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

/**
 * Extract platform name from URL
 */
function extractPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();

    if (hostname.includes('soundcloud')) return 'soundcloud';
    if (hostname.includes('spotify')) return 'spotify';
    if (hostname.includes('instagram')) return 'instagram';
    if (hostname.includes('github')) return 'github';
    if (hostname.includes('linkedin')) return 'linkedin';
    if (hostname.includes('youtube')) return 'youtube';

    return hostname;
  } catch {
    return 'unknown';
  }
}
