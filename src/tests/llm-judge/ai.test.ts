import { describeOnePost, isReasonableSummaryForOnePost } from '../../lib/ai';
import { describe, expect, test } from 'vitest';

describe('categorize as art related', () => {
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
});

describe('categorize as other', () => {
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
