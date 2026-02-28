'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  Calendar,
  Building,
  Award,
  PanelLeft,
  Settings,
  LogOut,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notifications, volunteer } from '@/lib/placeholder-data';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/logo';

const navLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/ngos', label: 'NGOs', icon: Building },
    { href: '/dashboard/my-impact', label: 'My Badges', icon: Award },
];

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const volunteerAvatar = PlaceHolderImages.find(p => p.id === 'avatar-priya-sharma');
    const volunteerName = user?.name || volunteer.name;

    const unreadNotifications = notifications.filter(n => !n.isRead).length;

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-lg px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <Sheet>
                  <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                          <PanelLeft className="h-5 w-5" />
                          <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col p-0">
                      <SheetTitle className="sr-only">Menu</SheetTitle>
                      <SheetDescription className="sr-only">Main navigation</SheetDescription>
                      <div className="flex h-16 items-center border-b px-6">
                          <Logo />
                      </div>
                      <nav className="grid gap-2 text-lg font-medium p-4">
                          {navLinks.map((link) => {
                              const isActive = link.href === '/' ? pathname === link.href : pathname.startsWith(link.href);
                              return (
                                  <Link
                                      key={link.href}
                                      href={link.href}
                                      className={cn(
                                          'flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                                          isActive && 'bg-accent text-accent-foreground'
                                      )}
                                  >
                                      <link.icon className="h-5 w-5" />
                                      {link.label}
                                  </Link>
                              );
                          })}
                      </nav>
                      <div className="mt-auto p-4 border-t">
                          <div className="grid gap-2">
                              <Button variant="ghost" className="w-full justify-start" asChild>
                                  <Link href="/settings">
                                      <Settings className="mr-2 h-4 w-4" />
                                      Settings
                                  </Link>
                              </Button>
                              <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                                  <LogOut className="mr-2 h-4 w-4" />
                                  Logout
                              </Button>
                          </div>
                      </div>
                  </SheetContent>
              </Sheet>
              <div className='md:hidden'>
                  <Logo />
              </div>
            </div>

            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full relative">
                            <Bell className="h-5 w-5" />
                            {unreadNotifications > 0 && (
                                <span className="absolute top-1 right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                </span>
                            )}
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 md:w-96" align="end">
                        <div className="grid gap-4 p-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Notifications</h4>
                                { unreadNotifications > 0 && <p className="text-sm text-muted-foreground">
                                    You have {unreadNotifications} unread messages.
                                </p> }
                            </div>
                            <div className="grid gap-2">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className={cn("flex h-2 w-2 translate-y-1.5 rounded-full", !notification.isRead && "bg-primary")} />
                                        <div className="grid gap-1">
                                            <p className="text-sm font-medium leading-none">
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {notification.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            { notifications.length > 0 && <Button variant="outline" size="sm" className="w-full">Mark all as read</Button>}
                        </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            {volunteerAvatar && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={volunteerAvatar.imageUrl} alt={volunteerName} data-ai-hint={volunteerAvatar.imageHint} />
                                    <AvatarFallback>{volunteerName.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{volunteerName}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/settings">Settings</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}