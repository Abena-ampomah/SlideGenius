'use server';
/**
 * @fileOverview An AI-driven FAQ section that answers user questions based on input data and previous queries.
 *
 * - answerUserQuestion - A function that answers user questions using AI.
 * - AnswerUserQuestionInput - The input type for the answerUserQuestion function.
 * - AnswerUserQuestionOutput - The return type for the answerUserQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerUserQuestionInputSchema = z.object({
  question: z.string().describe('The user question.'),
  contextData: z.string().optional().describe('Context data to help answer the question.'),
  previousQueries: z.array(z.object({question: z.string(), answer: z.string()})).optional().describe('Previous user queries and AI answers.'),
});
export type AnswerUserQuestionInput = z.infer<typeof AnswerUserQuestionInputSchema>;

const AnswerUserQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user question.'),
});
export type AnswerUserQuestionOutput = z.infer<typeof AnswerUserQuestionOutputSchema>;

export async function answerUserQuestion(input: AnswerUserQuestionInput): Promise<AnswerUserQuestionOutput> {
  return answerUserQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerUserQuestionPrompt',
  input: {schema: AnswerUserQuestionInputSchema},
  output: {schema: AnswerUserQuestionOutputSchema},
  prompt: `You are an AI assistant designed to answer user questions based on provided context data and previous queries.

Context Data: {{{contextData}}}

Previous Queries:
{{#each previousQueries}}
  Question: {{{this.question}}}
  Answer: {{{this.answer}}}
{{/each}}

Question: {{{question}}}

Answer:`,
});

const answerUserQuestionFlow = ai.defineFlow(
  {
    name: 'answerUserQuestionFlow',
    inputSchema: AnswerUserQuestionInputSchema,
    outputSchema: AnswerUserQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
