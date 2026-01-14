'use client';

import { useEffect } from 'react';
import { Button, Card, CardContent } from '@/components/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="max-w-md">
        <CardContent className="p-6 text-center">
          <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-neutral-100">Something went wrong</h2>
          <p className="mt-2 text-neutral-400">
            An error occurred while loading this page.
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={reset}>Try Again</Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
