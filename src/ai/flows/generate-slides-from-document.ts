
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating presentation slides from a document.
 *
 * The flow takes document content as input and returns a structured array of slides.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSlidesFromDocumentInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The full text content of the document to be converted into slides.'),
});
export type GenerateSlidesFromDocumentInput = z.infer<
  typeof GenerateSlidesFromDocumentInputSchema
>;

const SlideSchema = z.object({
  title: z.string().describe('The main title of the slide.'),
  content: z.array(z.string()).describe('An array of bullet points or sentences for the slide content.'),
  speakerNotes: z.string().describe('Notes for the presenter for this slide.'),
});

const GenerateSlidesFromDocumentOutputSchema = z.object({
  slides: z
    .array(SlideSchema)
    .describe('An array of slide objects, each with a title, content, and speaker notes.'),
});
export type GenerateSlidesFromDocumentOutput = z.infer<
  typeof GenerateSlidesFromDocumentOutputSchema
>;

/**
 * Generates presentation slides from the given document content.
 * @param input - The input object containing the document content.
 * @returns A promise that resolves to the generated slides.
 */
export async function generateSlidesFromDocument(
  input: GenerateSlidesFromDocumentInput
): Promise<GenerateSlidesFromDocumentOutput> {
  return generateSlidesFromDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSlidesFromDocumentPrompt',
  input: { schema: GenerateSlidesFromDocumentInputSchema },
  output: { schema: GenerateSlidesFromDocumentOutputSchema },
  prompt: `You are an expert at creating concise and engaging presentations.
Analyze the following document content and convert it into a series of presentation slides.
Each slide should have a clear title, a few bullet points summarizing the key information, and some speaker notes.
Break down the content logically.

Document Content:
{{{documentContent}}}
`,
});

const generateSlidesFromDocumentFlow = ai.defineFlow(
  {
    name: 'generateSlidesFromDocumentFlow',
    inputSchema: GenerateSlidesFromDocumentInputSchema,
    outputSchema: GenerateSlidesFromDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate slides from the document.');
    }
    return output;
  }
);
