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
import {searchWeb} from '../../services/search-web';

const AiWebResearchInputSchema = z.object({
  topic: z.string().describe('The topic for which to gather data and statistics.'),
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

const AiWebResearchPromptInputSchema = z.object({
  topic: z.string().describe('The topic for which to gather data and statistics.'),
  searchResults: z.string().describe('The web search results for the topic.'),
});


const prompt = ai.definePrompt({
  name: 'aiWebResearchPrompt',
  input: {schema: AiWebResearchPromptInputSchema},
  output: {schema: AiWebResearchOutputSchema},
  prompt: `You are an AI assistant that researches data and statistics for presentation topics.

  You will use the provided web search results to find relevant information and synthesize it into a coherent summary of data and statistics.

  Topic: {{{topic}}}
  
  Search Results:
  {{{searchResults}}}

  Synthesized Research Data:`,
});

const aiWebResearchFlow = ai.defineFlow(
  {
    name: 'aiWebResearchFlow',
    inputSchema: AiWebResearchInputSchema,
    outputSchema: AiWebResearchOutputSchema,
  },
  async input => {
    const searchResults = await searchWeb(input.topic);
    const {output} = await prompt({
      topic: input.topic,
      searchResults,
    });
    return {
      researchData: output!.researchData,
    };
  }
);
