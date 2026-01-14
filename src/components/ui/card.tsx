import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/design-system';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
}

export const Card = ({ className, variant = 'default', ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-800 bg-neutral-900',
        variant === 'elevated' && 'shadow-lg',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4 pb-0', className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-4 pt-0', className)} {...props} />
);
