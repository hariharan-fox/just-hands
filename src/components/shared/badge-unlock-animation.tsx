'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { BadgeVisual } from '@/components/shared/badge-visual';
import type { Certificate } from '@/lib/types';
import { X } from 'lucide-react';

const ConfettiPiece = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute h-2 w-1 rounded-full"
    style={style}
  />
);

export default function BadgeUnlockAnimation({ badge, onClose }: { badge: Certificate; onClose: () => void }) {
    const confetti = Array.from({ length: 50 }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animation: `confetti-rain ${Math.random() * 2 + 3}s linear ${Math.random() * 2}s infinite`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        };
        return <ConfettiPiece key={i} style={style} />;
    });

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in-0">
      <div className="absolute inset-0 overflow-hidden">
        {confetti}
      </div>

      <div className="relative w-full max-w-md m-4 bg-background/80 backdrop-blur-lg rounded-2xl border border-border/50 shadow-2xl p-8 text-center animate-scale-in">
        <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-muted-foreground"
            onClick={onClose}
        >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </Button>

        <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">New Achievement Unlocked!</h2>
        
        <div className="my-8 flex justify-center">
            <div className="relative">
                <BadgeVisual badge={{...badge, isEarned: true}} size="large" />
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    <div className="absolute -top-4 -left-8 h-24 w-48 bg-white/30 transform -rotate-45 animate-shine"></div>
                </div>
            </div>
        </div>

        <h3 className="text-xl font-bold">{badge.name}</h3>
        <p className="text-muted-foreground mt-2 text-sm">{badge.description}</p>
        
        <Button onClick={onClose} className="mt-8">
            Continue
        </Button>
      </div>
    </div>
  );
}
