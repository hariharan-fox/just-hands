import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { Montserrat, Roboto } from 'next/font/google';

const headlineFont = Montserrat({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-headline',
});

const bodyFont = Roboto({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'ConnectSphere',
  description: 'Connecting volunteers with NGOs for a better world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(headlineFont.variable, bodyFont.variable)} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-body text-foreground/90 antialiased')}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
