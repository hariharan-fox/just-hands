'use server';
/**
 * @fileOverview Recommends relevant events and opportunities to volunteers based on their skills.
 *
 * - recommendEventsBasedOnSkills - A function that recommends events based on skills.
 * - RecommendEventsBasedOnSkillsInput - The input type for the recommendEventsBasedOnSkills function.
 * - RecommendEventsBasedOnSkillsOutput - The return type for the recommendEventsBasedOnSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Event } from '@/lib/types';

const RecommendEventsBasedOnSkillsInputSchema = z.object({
  volunteerSkills: z
    .string()
    .describe('A comma separated list of skills the volunteer possesses.'),
  events: z.array(z.any()).describe('The list of all available events to choose from.'),
});
export type RecommendEventsBasedOnSkillsInput = z.infer<typeof RecommendEventsBasedOnSkillsInputSchema>;

const RecommendEventsBasedOnSkillsOutputSchema = z.object({
  recommendedEventIds: z
    .array(z.string())
    .describe('An array of event IDs that are the best match for the user\'s skills. Only return IDs from the provided event list.'),
});
export type RecommendEventsBasedOnSkillsOutput = z.infer<typeof RecommendEventsBasedOnSkillsOutputSchema>;

export async function recommendEventsBasedOnSkills(input: RecommendEventsBasedOnSkillsInput): Promise<RecommendEventsBasedOnSkillsOutput> {
  return recommendEventsBasedOnSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEventsBasedOnSkillsPrompt',
  input: {schema: RecommendEventsBasedOnSkillsInputSchema},
  output: {schema: RecommendEventsBasedOnSkillsOutputSchema},
  prompt: `You are an expert at matching volunteers to events based on their skills.
  You will be given a list of volunteer skills and a JSON array of available events.

  Your task is to analyze the volunteer's skills and compare them against the 'skills' and 'description' required for each event.
  Identify the top 2-3 events that are the most relevant match.

  You MUST return your answer as a JSON object containing a list of the recommended event IDs, using the key "recommendedEventIds".
  Only return IDs for events that exist in the provided list.

  Volunteer Skills: {{{volunteerSkills}}}

  Available Events:
  \`\`\`json
  {{{jsonStringify events}}}
  \`\`\`
  `,
});

const recommendEventsBasedOnSkillsFlow = ai.defineFlow(
  {
    name: 'recommendEventsBasedOnSkillsFlow',
    inputSchema: RecommendEventsBasedOnSkillsInputSchema,
    outputSchema: RecommendEventsBasedOnSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
