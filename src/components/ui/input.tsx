'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn, focusRing } from '@/lib/design-system';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-neutral-900 px-3 py-2 text-sm text-neutral-100',
          'placeholder:text-neutral-500',
          'border-neutral-700 hover:border-neutral-600',
          'transition-colors',
          focusRing,
          hasError && 'border-error',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
