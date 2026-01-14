'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/design-system';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex items-center gap-3">
        {label && (
          <label htmlFor={id} className="text-sm text-neutral-400">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type="range"
          className={cn(
            'h-1.5 w-full cursor-pointer appearance-none rounded-full bg-neutral-700',
            '[&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500',
            '[&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:border-0',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
