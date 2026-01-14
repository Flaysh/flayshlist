'use client';

import { type ReactNode } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider } from './query-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NuqsAdapter>
      <QueryProvider>
          {children}
      </QueryProvider>
    </NuqsAdapter>
  );
};
