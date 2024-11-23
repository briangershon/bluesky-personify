import { anthropic } from '@ai-sdk/anthropic';
import { generateText, LanguageModelUsage } from 'ai';
import 'dotenv/config';

export interface ResultText {
  input: string;
  result: string;
  usage: LanguageModelUsage | null;
}

export interface PersonaResult {
  prompt: string;
  persona: string;
  usage: LanguageModelUsage | null;
}

export async function describeOnePost(post: string): Promise<ResultText> {
  const { text, usage } = await generateText({
    model: anthropic('claude-3-5-haiku-20241022'),
    prompt:
      'What is the meaning of this post and summarize in two sentences: ' +
      post,
  });
  console.info({ post, result: text, usage });
  return { input: post, result: text, usage };
}

export async function isReasonableSummaryForOnePost({
  post,
  summary,
}: {
  post: string;
  summary: string;
}): Promise<boolean> {
  const prompt = `Classify if this summary adequately describes this post. Only return "pass" if it does, otherwise return "fail".

      Post: ${post}

      Summary: ${summary}'`;

  const { text, usage } = await generateText({
    model: anthropic('claude-3-haiku-20240307'),
    prompt,
  });

  console.info('isAReasonableSummaryForOnePost', {
    input: post,
    summary,
    result: text,
    usage,
  });
  return text.includes('pass');
}

export async function createPersonaFromPosts(
  feedContent: string[]
): Promise<PersonaResult> {
  const prompt = `First summarize the following posts, then create a persona based on that summary.
  A persona should have a summary section, estimated age, personality traits, interests, communication style, goals and potential challenges.
        
        Posts: ${feedContent.join('\n')}`;
  const { text: persona, usage } = await generateText({
    model: anthropic('claude-3-5-haiku-20241022'),
    prompt,
  });
  console.info({ prompt, persona, usage });
  return { prompt, persona, usage };
}
