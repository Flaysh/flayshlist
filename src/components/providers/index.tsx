import { type ReactNode } from 'react';
import { PostHogProvider } from '@/components/posthog-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <PostHogProvider>{children}</PostHogProvider>;
};
