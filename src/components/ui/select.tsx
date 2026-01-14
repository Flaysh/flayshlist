'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn, focusRing } from '@/lib/design-system';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, hasError, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'flex h-10 w-full appearance-none rounded-lg border bg-neutral-900 px-3 py-2 pr-8 text-sm text-neutral-100',
            'border-neutral-700 hover:border-neutral-600',
            'transition-colors',
            focusRing,
            hasError && 'border-error',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = 'Select';
