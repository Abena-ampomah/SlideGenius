'use server';
/**
 * @fileOverview An AI chatbot that provides presentation tips and guidance.
 *
 * - providePresentationTips - A function that handles the presentation tips process.
 * - ProvidePresentationTipsInput - The input type for the providePresentationTips function.
 * - ProvidePresentationTipsOutput - The return type for the providePresentationTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvidePresentationTipsInputSchema = z.object({
  query: z.string().describe('The user query about presentation tips.'),
});
export type ProvidePresentationTipsInput = z.infer<
  typeof ProvidePresentationTipsInputSchema
>;

const ProvidePresentationTipsOutputSchema = z.object({
  response: z.string().describe('The AI chatbot response with presentation tips.'),
});
export type ProvidePresentationTipsOutput = z.infer<
  typeof ProvidePresentationTipsOutputSchema
>;

export async function providePresentationTips(
  input: ProvidePresentationTipsInput
): Promise<ProvidePresentationTipsOutput> {
  return providePresentationTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'providePresentationTipsPrompt',
  input: {schema: ProvidePresentationTipsInputSchema},
  output: {schema: ProvidePresentationTipsOutputSchema},
  prompt: `You are an AI chatbot that provides presentation tips and guidance to users.

  A user has asked the following question:
  {{query}}

  Provide a helpful and informative response with presentation tips.`,
});

const providePresentationTipsFlow = ai.defineFlow(
  {
    name: 'providePresentationTipsFlow',
    inputSchema: ProvidePresentationTipsInputSchema,
    outputSchema: ProvidePresentationTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
