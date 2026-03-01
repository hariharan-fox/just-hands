'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EventSignUpButton({ eventId, eventTitle }: { eventId: string; eventTitle: string; }) {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUpClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      // Mock signup action for a logged-in user
      toast({
        title: "Successfully Registered!",
        description: `You have signed up for "${eventTitle}".`,
      });
    }
  };

  return (
    <Button size="lg" className="w-full text-base" onClick={handleSignUpClick}>
      <UserPlus className="mr-2 h-4 w-4" />
      Sign Up for this Event
    </Button>
  );
}
