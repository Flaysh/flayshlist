import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/design-system';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

const variants = {
  default: 'bg-neutral-800 text-neutral-300',
  primary: 'bg-primary-500/20 text-primary-400',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-yellow-500/20 text-yellow-400',
  error: 'bg-red-500/20 text-red-400',
};

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
