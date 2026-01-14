import { cn } from '@/lib/design-system';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-800',
        className
      )}
    />
  );
};
