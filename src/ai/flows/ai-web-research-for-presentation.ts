'use server';

/**
 * @fileOverview An AI agent that performs web research for presentation topics.
 *
 * - aiWebResearchForPresentation - A function that handles the web research process for presentations.
 * - AiWebResearchInput - The input type for the aiWebResearchForPresentation function.
 * - AiWebResearchOutput - The return type for the aiWebResearchForPresentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {searchWeb} from '@/services/search-web';

const AiWebResearchInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic for which to gather data and statistics.'),
});
export type AiWebResearchInput = z.infer<typeof AiWebResearchInputSchema>;

const AiWebResearchOutputSchema = z.object({
  researchData: z
    .string()
    .describe('The relevant data and statistics gathered from the web.'),
});
export type AiWebResearchOutput = z.infer<typeof AiWebResearchOutputSchema>;

export async function aiWebResearchForPresentation(
  input: AiWebResearchInput
): Promise<AiWebResearchOutput> {
  return aiWebResearchFlow(input);
}

const searchTool = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Search the web for information on a given topic.',
    inputSchema: z.object({
      query: z.string(),
    }),
    outputSchema: z.string(),
  },
  async input => {
    return await searchWeb(input.query);
  }
);

const prompt = ai.definePrompt({
  name: 'aiWebResearchPrompt',
  tools: [searchTool],
  input: {schema: AiWebResearchInputSchema},
  output: {schema: AiWebResearchOutputSchema},
  prompt: `You are an AI assistant that researches data and statistics for presentation topics.

  Use the web search tool to find relevant information for the user's topic and then synthesize it into a coherent summary of data and statistics.
  
  Topic: {{{topic}}}`,
});

const aiWebResearchFlow = ai.defineFlow(
  {
    name: 'aiWebResearchFlow',
    inputSchema: AiWebResearchInputSchema,
    outputSchema: AiWebResearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
