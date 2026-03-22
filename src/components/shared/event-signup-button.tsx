'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBadgeUnlock } from '@/lib/badge-unlock-context';
import { allCertificates } from '@/lib/placeholder-data';

export default function EventSignUpButton({ eventId, eventTitle }: { eventId: string; eventTitle: string; }) {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const isRegistered = user?.registeredEventIds?.includes(eventId);
  const isCompleted = user?.completedEventIds?.includes(eventId);

  const handleSignUpClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Prevent re-registration
    if (isRegistered || isCompleted) {
      toast({
        title: "Already Registered",
        description: "You are already signed up for this event.",
      });
      return;
    }

    // In a real app, this would be a server action.
    toast({
      title: "Successfully Registered!",
      description: `You have signed up for "${eventTitle}". It's now in your dashboard.`,
    });
    
    // Update user state: add event to registered list
    const updatedUser = {
      registeredEventIds: [...(user.registeredEventIds || []), eventId],
    };
    
    updateUser(updatedUser);
  };
  
  if (isCompleted) {
    return (
      <Button size="lg" className="w-full text-base" disabled>
        <CheckCircle className="mr-2 h-4 w-4" />
        Event Completed
      </Button>
    );
  }

  if (isRegistered) {
    return (
      <Button size="lg" className="w-full text-base" disabled>
        <CheckCircle className="mr-2 h-4 w-4" />
        Registered
      </Button>
    );
  }

  return (
    <Button size="lg" className="w-full text-base" onClick={handleSignUpClick}>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up for this Event
    </Button>
  );
}
