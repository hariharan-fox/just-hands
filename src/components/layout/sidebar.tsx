'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Building, MessagesSquare, Settings, LogOut, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/logo';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/ngos', label: 'NGOs', icon: Building },
  { href: '/forum', label: 'Forum', icon: MessagesSquare },
  { href: '/learning', label: 'Learning', icon: Lightbulb },
];

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden border-r bg-card md:block sticky top-0 h-screen">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-16 items-center border-b px-6">
                    <Logo />
                </div>
                <div className="flex-1 py-4 overflow-y-auto">
                    <nav className="grid items-start gap-1 px-2 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent',
                                    isActive && 'bg-accent text-primary font-semibold'
                                    )}
                                >
                                    <link.icon className="h-4 w-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="mt-auto p-4 border-t">
                    <div className="grid gap-2">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="#">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                           <LogOut className="mr-2 h-4 w-4" />
                           Logout
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
