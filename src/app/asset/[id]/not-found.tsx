import Link from 'next/link';
import { Button } from '@/components/ui';

export default function AssetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="h-20 w-20 rounded-full bg-neutral-800 flex items-center justify-center mb-6">
        <span className="text-4xl">🔍</span>
      </div>
      <h1 className="text-2xl font-bold text-neutral-100">Asset not found</h1>
      <p className="mt-2 text-neutral-400">
        The asset you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link href="/music" className="mt-6">
        <Button>Browse Catalog</Button>
      </Link>
    </div>
  );
}
