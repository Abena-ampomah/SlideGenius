
'use server';
import {
  generateImageForSlide,
  GenerateImageForSlideInput,
} from '@/ai/flows/generate-image-for-slide';
import {
  aiWebResearchForPresentation,
  AiWebResearchInput,
} from '@/ai/flows/ai-web-research-for-presentation';
import {
  providePresentationTips,
  ProvidePresentationTipsInput,
} from '@/ai/flows/provide-presentation-tips-with-ai-chatbot';
import {
  answerUserQuestion,
  AnswerUserQuestionInput,
} from '@/ai/flows/answer-user-questions-with-ai';

export async function generateImageAction(input: GenerateImageForSlideInput) {
  try {
    return await generateImageForSlide(input);
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate image. Please try again.' };
  }
}

export async function researchAction(input: AiWebResearchInput) {
  try {
    return await aiWebResearchForPresentation(input);
  } catch (error) {
    console.error(error);
    return { error: 'Failed to perform research. Please try again.' };
  }
}

export async function chatAction(input: ProvidePresentationTipsInput) {
  try {
    return await providePresentationTips(input);
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get a response. Please try again.' };
  }
}

export async function faqAction(input: AnswerUserQuestionInput) {
  try {
    return await answerUserQuestion(input);
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get an answer. Please try again.' };
  }
}
