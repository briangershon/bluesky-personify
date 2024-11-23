import {
  createPersonaFromPosts,
  describeOnePost,
  isReasonableSummaryForOnePost,
} from '../../lib/ai';
import { describe, expect, test } from 'vitest';

describe('isReasonableSummaryForOnePost', () => {
  test('painting may have a romantic or nostalgic theme', async () => {
    const post =
      'Love me Tender ❤️‍🩹\n' +
      'Original oil painting sold, but prints are available \n';
    const result = await describeOnePost(post);
    expect(
      await isReasonableSummaryForOnePost({ post, summary: result.result })
    ).toBeTruthy();
  });

  test('person is currently developing or improving something', async () => {
    const post = 'Work in progress babyyyy';
    const result = await describeOnePost(post);
    expect(
      await isReasonableSummaryForOnePost({ post, summary: result.result })
    ).toBeTruthy();
  });

  test('post has been anthropomorphized', async () => {
    const post =
      'They need to stop giving things faces because how am I supposed to just throw her in the trash 😟';
    const result = await describeOnePost(post);
    expect(
      await isReasonableSummaryForOnePost({
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
      'First summarize the following posts, then create a persona based on that summary.'
    );

    // does the prompt include all the posts?
    for (const post of posts) {
      expect(prompt).toContain(post);
    }

    // does the persona have all the expected pieces?
    expect(persona.toLowerCase()).toContain('summary:');
    expect(persona.toLowerCase()).toContain('estimated age:');
    expect(persona.toLowerCase()).toContain('personality traits:');
    expect(persona.toLowerCase()).toContain('interests:');
    expect(persona.toLowerCase()).toContain('communication style:');
    expect(persona.toLowerCase()).toContain('goals:');
    expect(persona.toLowerCase()).toContain('potential challenges:');
  });
});
