'use server';

import { z } from 'zod';
import { allEvents } from '@/lib/placeholder-data';
import type { Event } from '@/lib/types';
import { recommendEventsBasedOnSkills } from '@/ai/flows/recommend-events-based-on-skills';


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

  try {
    const aiResult = await recommendEventsBasedOnSkills({
      volunteerSkills: validatedFields.data.skills,
      events: allEvents,
    });
    
    if (!aiResult.recommendedEventIds || aiResult.recommendedEventIds.length === 0) {
      return {
        message: `We couldn't find any specific event recommendations for '${validatedFields.data.skills}', but here are some popular upcoming events you might be interested in.`,
        events: allEvents.slice(0, 2),
      }
    }
  
    const recommendedEvents = allEvents.filter(event => aiResult.recommendedEventIds.includes(event.id));

    if (recommendedEvents.length === 0) {
       return {
        message: `We couldn't find any specific event recommendations for '${validatedFields.data.skills}', but here are some popular upcoming events you might be interested in.`,
        events: allEvents.slice(0, 2),
      }
    }
  
    const message = `Based on your skills in '${validatedFields.data.skills}', we've found a few events where you could make a real difference. Check them out!`;
  
    return { message, events: recommendedEvents };
  } catch(e: any) {
    console.error(e);
    return {
      error: e.message || "An error occurred while getting recommendations."
    }
  }
}
