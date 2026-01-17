'use server';

import { z } from 'zod';
import { allEvents } from './lib/placeholder-data';
import type { Event } from './lib/types';


const skillSchema = z.object({
  skills: z.string().min(3, 'Please enter at least one skill.'),
});

type RecommendationState = {
  message?: string | null;
  events?: Event[];
  error?: string | null;
}

export async function getRecommendedEvents(
  prevState: RecommendationState,
  formData: FormData
): Promise<RecommendationState> {
  
  const validatedFields = skillSchema.safeParse({
    skills: formData.get('skills'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.skills?.[0] || 'Invalid input.',
    };
  }

  // Simulate API call and return mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
    
  // In a real app, this would be a sophisticated search.
  // For now, we'll return a few mock events that seem related.
  const recommendedEvents = allEvents.slice(0, 2);

  const mockMessage = `Based on your skills in '${validatedFields.data.skills}', we've found a couple of events where you could make a real difference. Check them out!`;

  return { message: mockMessage, events: recommendedEvents };
}
