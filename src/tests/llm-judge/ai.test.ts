import {
  createPersonaFromPosts,
  describeOnePost,
  testIsReasonableSummaryForOnePost,
} from '../../lib/ai';
import { describe, expect, test } from 'vitest';

describe('testIsReasonableSummaryForOnePost', () => {
  test('painting may have a romantic or nostalgic theme', async () => {
    const post =
      'Love me Tender ❤️‍🩹\n' +
      'Original oil painting sold, but prints are available \n';
    const result = await describeOnePost(post);
    expect(
      await testIsReasonableSummaryForOnePost({ post, summary: result.result })
    ).toBeTruthy();
  });

  test('Unable to generate a summary due to insufficient content', async () => {
    const post = 'Work in progress babyyyy';
    const result = await describeOnePost(post);
    expect(result.result).toBe('');
  });

  test('post has been anthropomorphized', async () => {
    const post =
      'They need to stop giving things faces because how am I supposed to just throw her in the trash 😟';
    const result = await describeOnePost(post);
    expect(
      await testIsReasonableSummaryForOnePost({
        post,
        summary: result.result,
      })
    ).toBeTruthy();
  });
});

describe('createPersonaFromPosts', () => {
  test('persona has all the expected pieces', async () => {
    const posts = [
      'I love this painting!',
      'My trip to Italy was amazing!',
      'I am currently working on a new project.',
      'A cyclone is coming!',
    ];
    const { prompt, persona } = await createPersonaFromPosts(posts);

    // does the prompt exist?
    expect(prompt).toContain(
      'Analyze the following social media posts and create a comprehensive user profile in two parts'
    );

    // does the prompt include all the posts?
    for (const post of posts) {
      expect(prompt).toContain(post);
    }

    // does the persona have all the expected pieces?
    expect(persona.toLowerCase()).toContain('overview');
    expect(persona.toLowerCase()).toContain('demographics');
    expect(persona.toLowerCase()).toContain('estimated age range');
    expect(persona.toLowerCase()).toContain('personality profile');
    expect(persona.toLowerCase()).toContain('interests & behaviors');
    expect(persona.toLowerCase()).toContain('goals & motivations');
    expect(persona.toLowerCase()).toContain('challenges & pain points');
    expect(persona.toLowerCase()).toContain('communication preferences');
  });
});
