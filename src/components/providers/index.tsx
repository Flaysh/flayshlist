'use client';

import { type ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider } from './query-provider';
import { ToastProvider } from '@/components/ui';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </QueryProvider>
    </NuqsAdapter>
  );
};
