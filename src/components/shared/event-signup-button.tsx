'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBadgeUnlock } from '@/lib/badge-unlock-context';
import { allCertificates } from '@/lib/placeholder-data';

export default function EventSignUpButton({ eventId, eventTitle }: { eventId: string; eventTitle: string; }) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { unlockBadge } = useBadgeUnlock();

  const handleSignUpClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      // Mock signup action for a logged-in user
      toast({
        title: "Successfully Registered!",
        description: `You have signed up for "${eventTitle}".`,
      });

      // --- Trigger badge unlock animation ---
      // This is a mock trigger. In a real app, this logic would be
      // based on the user's actual progress.
      // We'll find a badge that is currently unearned and unlock it.
      const badgeToUnlock = allCertificates.find(b => b.id === 'event-3'); // 'Dedicated Volunteer'
      if (badgeToUnlock) {
         setTimeout(() => {
          unlockBadge(badgeToUnlock);
        }, 1000); // Delay for effect
      }
    }
  };

  return (
    <Button size="lg" className="w-full text-base" onClick={handleSignUpClick}>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up for this Event
    </Button>
  );
}
