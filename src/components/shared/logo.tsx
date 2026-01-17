import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("text-sm font-bold font-headline text-primary", className)}>
      <span>ConnectSphere</span>
    </Link>
  );
}
