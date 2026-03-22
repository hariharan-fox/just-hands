'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBadgeUnlock } from '@/lib/badge-unlock-context';
import { allCertificates, allEvents } from '@/lib/placeholder-data';

export default function EventSignUpButton({ eventId, eventTitle }: { eventId: string; eventTitle: string; }) {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { unlockBadge } = useBadgeUnlock();

  const handleSignUpClick = () => {
    if (!user) {
      router.push('/login');
      return;
    } 
    
    // In a real app, this would be a server action.
    // For now, we simulate success and update client state.
    toast({
      title: "Successfully Registered!",
      description: `You have signed up for "${eventTitle}".`,
    });

    // Assume the user 'completes' the event upon signing up for this demo
    // and prevent duplicate processing.
    if (user.completedEventIds?.includes(eventId)) {
        return;
    }
    
    // Determine hours to add (simple mock logic)
    const event = allEvents.find(e => e.id === eventId);
    let hoursToAdd = 4; // Default
    if (event?.time) {
      const timeParts = event.time.split(' - ');
      if (timeParts.length === 2) {
        try {
          const parseTime = (timeStr: string) => {
            const [time, period] = timeStr.split(' ');
            let [hours] = time.split(':').map(Number);
            if (period === 'PM' && hours < 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
            return hours;
          };
          const startHour = parseTime(timeParts[0]);
          const endHour = parseTime(timeParts[1]);
          const duration = endHour - startHour;
          if (duration > 0) hoursToAdd = duration;
        } catch (e) {
          // Time format might be different, use default
        }
      }
    }
    
    // Update user state: add event, add hours.
    const updatedUser = {
      completedEventIds: [...(user.completedEventIds || []), eventId],
      loggedHours: (user.loggedHours || 0) + hoursToAdd,
      earnedBadgeIds: user.earnedBadgeIds || [],
    };
    
    // --- Mock Badge Unlocking Logic ---
    // This would be more sophisticated in a real app, checking various conditions.
    const badgeToUnlock = allCertificates.find(b => b.id === 'event-1'); // Unlock "First Step" badge
    if (badgeToUnlock && !updatedUser.earnedBadgeIds.includes(badgeToUnlock.id)) {
      updatedUser.earnedBadgeIds.push(badgeToUnlock.id);
      setTimeout(() => {
        unlockBadge(badgeToUnlock);
      }, 1000); // Delay for effect
    }
    
    updateUser(updatedUser);
  };

  return (
    <Button size="lg" className="w-full text-base" onClick={handleSignUpClick}>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up for this Event
    </Button>
  );
}
