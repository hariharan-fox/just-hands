import Link from 'next/link';
import { HandHeart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-1.5 text-base font-bold font-headline text-primary", className)}>
      <HandHeart className="h-4 w-4" />
      <span>ConnectSphere</span>
    </Link>
  );
}
