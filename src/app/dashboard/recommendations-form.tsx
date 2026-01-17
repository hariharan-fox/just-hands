
'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import { getRecommendedEvents } from '../actions';
import { useToast } from '@/hooks/use-toast';
import EventCard from '@/components/shared/event-card';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export default function RecommendationsForm() {
  const initialState = { message: null, events: [], error: null };
  const [state, dispatch] = useActionState(getRecommendedEvents, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="space-y-6">
      <form action={dispatch} className="space-y-4">
        <Textarea
          name="skills"
          placeholder="e.g., 'Web Development, Event Planning, Public Speaking, Spanish'"
          rows={3}
          className="bg-background"
        />
        <SubmitButton />
      </form>

      {state.message && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>AI Recommendation</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.events && state.events.length > 0 && (
        <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Here are some events you might like:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
