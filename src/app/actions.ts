
'use server';

import { recommendEventsBasedOnSkills as recommendEventsBasedOnSkillsFlow } from '@/ai/flows/recommend-events-based-on-skills';
import { z } from 'zod';
import { PlaceHolderImages } from './lib/placeholder-images';
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

  try {
    const result = await recommendEventsBasedOnSkillsFlow({
      volunteerSkills: validatedFields.data.skills,
    });
    
    // In a real app, this would be a sophisticated search.
    // For now, we'll return a few mock events that seem related.
    const recommendedEvents = allEvents.slice(0, 2);

    return { message: result.recommendedEvents, events: recommendedEvents };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while getting recommendations. Please try again.' };
  }
}
