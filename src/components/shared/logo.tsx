import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-1 text-sm font-bold font-headline text-primary", className)}>
      <HandHeart className="h-3.5 w-3.5" />
      <span>ConnectSphere</span>
    </Link>
  );
}
