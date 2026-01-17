import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("text-xl font-bold font-headline text-primary", className)}
      suppressHydrationWarning
    >
      <h6>ConnectSphere</h6>
    </Link>
  );
}
