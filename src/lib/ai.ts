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
    prompt: `If this text contains enough meaningful content for summarization, write a clear, two-sentence summary that captures both its key message and supporting context. The summary should be self-contained and preserve the original tone. If the text is empty, contains only formatting/markup, or lacks sufficient meaningful content for a proper summary, respond with an empty string ("").

Post: ${post}

Respond with only the summary or an empty string - no additional text, labels or explanations.`,
  });
  console.info({ post, result: text, usage });
  return { input: post, result: text, usage };
}

export async function testIsReasonableSummaryForOnePost({
  post,
  summary,
}: {
  post: string;
  summary: string;
}): Promise<boolean> {
  const prompt = `Review the following post and its summary, then evaluate if the summary accurately captures the main points and key details of the original post. Please explain answer and also Respond with exactly one word:
      - "pass" - if the summary effectively conveys the essential information and main message
      - "fail" - if the summary is incomplete, inaccurate, or misses crucial details
      
      Original Post:
      ${post}
      
      Proposed Summary:
      ${summary}
      
      Response:`;

  const { text, usage } = await generateText({
    model: anthropic('claude-3-haiku-20240307'),
    prompt,
  });

  console.info('testIsReasonableSummaryForOnePost', {
    input: post,
    summary,
    result: text,
    usage,
  });
  return text.toLowerCase().includes('pass');
}

export async function createPersonaFromPosts(
  feedContent: string[]
): Promise<PersonaResult> {
  const model = anthropic('claude-3-5-haiku-20241022');
  const maxTokensForModel = 4096;
  const estimatedTokensForPrompt = 400;
  const maxData = maxTokensForModel - estimatedTokensForPrompt;
  const content = feedContent.join('\n');

  // Truncate postContent to fit within the model's token limit
  let truncatedContent = content;
  if (content.length > maxData) {
    truncatedContent = content.substring(0, maxData);
    console.warn(
      `Truncated input content to fit within model's token limit. Original length: ${content.length}, Truncated length: ${truncatedContent.length}`
    );
  }

  const prompt = `Analyze the following social media posts and create a comprehensive user profile in two parts:

Part 1 - Content Analysis
Create a concise summary of the key themes, topics, and patterns found in these posts:
${truncatedContent}

Part 2 - Detailed Persona Profile
Based on the above analysis, construct a detailed persona with the following elements:

1. Overview
- Brief biographical summary
- Key characteristics and defining traits

2. Demographics
- Estimated age range
- Likely life stage
- Potential occupation/professional background

3. Personality Profile
- Dominant personality traits
- Communication style and tone
- Values and beliefs
- Decision-making patterns

4. Interests & Behaviors
- Primary interests and hobbies
- Content preferences
- Social media usage patterns
- Brand affinities (if apparent)

5. Goals & Motivations
- Short-term objectives
- Long-term aspirations
- Key motivating factors
- What drives their decisions

6. Challenges & Pain Points
- Current obstacles
- Potential frustrations
- Areas of concern

7. Communication Preferences
- Preferred tone and style
- Content consumption habits
- Response patterns
- Platform preferences

Format all sections clearly and provide specific examples from the posts to support your analysis where relevant.`;

  const { text: persona, usage } = await generateText({
    model,
    prompt,
  });
  console.info('createPersonaFromPosts', { prompt, persona, usage });
  return { prompt, persona, usage };
}
