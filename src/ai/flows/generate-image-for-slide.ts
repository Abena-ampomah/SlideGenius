'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating images for presentation slides using the Gemini API.
 *
 * The flow takes a text prompt as input and returns a data URI representing the generated image.
 *
 * @exports {generateImageForSlide} - The main function to generate an image for a slide.
 * @exports {GenerateImageForSlideInput} - The input type for the generateImageForSlide function.
 * @exports {GenerateImageForSlideOutput} - The output type for the generateImageForSlide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageForSlideInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired image.'),
});
export type GenerateImageForSlideInput = z.infer<typeof GenerateImageForSlideInputSchema>;

const GenerateImageForSlideOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type GenerateImageForSlideOutput = z.infer<typeof GenerateImageForSlideOutputSchema>;

/**
 * Generates an image for a slide based on the given text prompt.
 * @param input - The input object containing the text prompt.
 * @returns The generated image as a data URI.
 */
export async function generateImageForSlide(input: GenerateImageForSlideInput): Promise<GenerateImageForSlideOutput> {
  return generateImageForSlideFlow(input);
}

const generateImageForSlideFlow = ai.defineFlow(
  {
    name: 'generateImageForSlideFlow',
    inputSchema: GenerateImageForSlideInputSchema,
    outputSchema: GenerateImageForSlideOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.prompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageDataUri: media.url};
  }
);
