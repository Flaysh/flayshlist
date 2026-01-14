import Link from 'next/link';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="h-24 w-24 rounded-full bg-neutral-800 flex items-center justify-center mb-6">
        <span className="text-5xl">404</span>
      </div>
      <h1 className="text-2xl font-bold text-neutral-100">Page not found</h1>
      <p className="mt-2 text-neutral-400 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/music">
          <Button variant="outline">Browse Catalog</Button>
        </Link>
      </div>
    </div>
  );
}
