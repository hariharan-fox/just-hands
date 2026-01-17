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

const RecommendEventsBasedOnSkillsInputSchema = z.object({
  volunteerSkills: z
    .string()
    .describe('A comma separated list of skills the volunteer possesses.'),
});
export type RecommendEventsBasedOnSkillsInput = z.infer<typeof RecommendEventsBasedOnSkillsInputSchema>;

const RecommendEventsBasedOnSkillsOutputSchema = z.object({
  recommendedEvents: z
    .string()
    .describe('A list of events recommended based on the volunteer skills.'),
});
export type RecommendEventsBasedOnSkillsOutput = z.infer<typeof RecommendEventsBasedOnSkillsOutputSchema>;

export async function recommendEventsBasedOnSkills(input: RecommendEventsBasedOnSkillsInput): Promise<RecommendEventsBasedOnSkillsOutput> {
  return recommendEventsBasedOnSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEventsBasedOnSkillsPrompt',
  input: {schema: RecommendEventsBasedOnSkillsInputSchema},
  output: {schema: RecommendEventsBasedOnSkillsOutputSchema},
  prompt: `You are an expert at matching volunteers to events.

  Based on the volunteer's skills, recommend a list of events that they would be well suited for.

  Skills: {{{volunteerSkills}}}
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
