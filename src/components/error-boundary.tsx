'use client';

import { Component, type ReactNode } from 'react';
import { Button, Card, CardContent } from '@/components/ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you could send to Sentry here
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { extra: errorInfo });
    // }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-neutral-100">Something went wrong</h2>
              <p className="mt-2 text-neutral-400">
                An unexpected error occurred. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <pre className="mt-4 p-3 bg-neutral-800 rounded text-left text-xs text-red-400 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              )}
              <Button
                onClick={() => window.location.reload()}
                className="mt-6"
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
