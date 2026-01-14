import { Skeleton } from '@/components/ui';

export default function AssetLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="mb-6 h-5 w-24" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="aspect-video rounded-xl" />
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
