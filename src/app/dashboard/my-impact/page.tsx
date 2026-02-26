'use client';

import { useState } from 'react';
import { allCertificates } from '@/lib/placeholder-data';
import type { Certificate } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Share2, Linkedin, Twitter } from 'lucide-react';

const levelBorderColors: { [key: string]: string } = {
  Bronze: 'border-yellow-600/60',
  Silver: 'border-slate-400/60',
  Gold: 'border-amber-400/60',
  Platinum: 'border-cyan-400/60',
};

const levelIconColors: { [key:string]: string } = {
    Bronze: 'text-yellow-600',
    Silver: 'text-slate-400',
    Gold: 'text-amber-400',
    Platinum: 'text-cyan-400',
};

export default function BadgesPage() {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const earnedBadges = allCertificates.filter((c) => c.isEarned);
  const unearnedBadges = allCertificates.filter((c) => !c.isEarned);
  
  const handleBadgeClick = (badge: Certificate) => {
    if (badge.isEarned) {
      setSelectedBadge(badge);
      setShareDialogOpen(true);
    }
  };

  const copyToClipboard = () => {
    if (!selectedBadge) return;
    const shareText = `I just earned the "${selectedBadge.name} (${selectedBadge.level})" badge on Just Hands for my volunteer work! #JustHands #Volunteering #MakingADifference`;
    navigator.clipboard.writeText(shareText);
    toast({
      title: 'Link Copied!',
      description: 'You can now share your achievement.',
    });
    setShareDialogOpen(false);
  };

  const BadgeIcon = ({ badge }: { badge: Certificate }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={() => handleBadgeClick(badge)}
          className={cn(
            'transition-transform hover:scale-110',
            badge.isEarned ? 'cursor-pointer' : 'cursor-default'
          )}
        >
          <div
            className={cn(
              'flex items-center justify-center h-24 w-24 rounded-full border-4 bg-card shadow-md',
              badge.isEarned
                ? levelBorderColors[badge.level || 'Bronze']
                : 'border-muted',
              !badge.isEarned && 'grayscale opacity-50'
            )}
          >
            <badge.icon
              className={cn(
                'h-12 w-12',
                badge.isEarned
                  ? levelIconColors[badge.level || 'Bronze']
                  : 'text-muted-foreground'
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">{badge.name} {badge.level && `(${badge.level})`}</p>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-12">
        <div>
          <h1 className="text-xl font-bold">My Badges</h1>
          <p className="text-muted-foreground text-sm">
            Recognizing your dedication and impact. Keep up the great work!
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold mb-6">
            Earned Badges ({earnedBadges.length})
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center sm:justify-start">
            {earnedBadges.map((badge) => (
              <BadgeIcon key={badge.id} badge={badge} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-6">
            Badges to Unlock ({unearnedBadges.length})
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-8 justify-center sm:justify-start">
            {unearnedBadges.map((badge) => (
              <BadgeIcon key={badge.id} badge={badge} />
            ))}
          </div>
        </section>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Achievement!</DialogTitle>
            <DialogDescription>
              You've earned the "{selectedBadge?.name}" badge. Share your success with your network.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <Button variant="outline">
              <Twitter className="mr-2 h-4 w-4" />
              Share on X
            </Button>
            <Button variant="outline">
              <Linkedin className="mr-2 h-4 w-4" />
              Share on LinkedIn
            </Button>
            <Button onClick={copyToClipboard}>
              <Share2 className="mr-2 h-4 w-4" />
              Copy Share Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
