import { anthropic } from '@ai-sdk/anthropic';
import { generateObject, generateText, LanguageModelUsage } from 'ai';
import 'dotenv/config';

export type UserCategory = 'artist' | 'other' | 'unknown';

export interface ResultCategory {
  input: string;
  result: UserCategory;
  usage: LanguageModelUsage | null;
}

export interface ResultText {
  input: string;
  result: string;
  usage: LanguageModelUsage | null;
}

export async function describeOnePost(item: string): Promise<ResultText> {
  const { text, usage } = await generateText({
    model: anthropic('claude-3-opus-20240229'),
    prompt: 'Is this post discussing art? Post: ' + item,
  });
  console.info({ input: item, result: text, usage });
  return { input: item, result: text, usage };
}

export async function categorizeOnePost(item: string): Promise<ResultCategory> {
  const prompt =
    'Classify this post as either an "artist" or "other". If post is discussing art or referring to art, we should classify as an artist. Post: ' +
    item;

  try {
    const { object, usage } = await generateObject({
      model: anthropic('claude-3-opus-20240229'),
      output: 'enum',
      enum: ['artist', 'other'],
      prompt,
    });
    console.info({ input: item, result: object, usage });
    return { input: item, result: object, usage };
  } catch (e) {
    return { input: item, result: 'unknown', usage: null };
  }
}
