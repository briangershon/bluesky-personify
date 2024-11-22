import { categorizeOnePost } from '../../lib/ai';
import { describe, expect, test } from 'vitest';

describe('categorize as art related', () => {
  test('oil painting', async () => {
    const post =
      'Love me Tender ❤️‍🩹\n' +
      'Original oil painting sold, but prints are available \n';
    const result = await categorizeOnePost(post);
    expect(result.result).toBe('artist');
  });

  test('work in progress', async () => {
    const post = 'Work in progress babyyyy';
    const result = await categorizeOnePost(post);
    expect(result.result).toBe('artist');
  });
});

describe('categorize as other', () => {
  test('trash', async () => {
    const post =
      'They need to stop giving things faces because how am I supposed to just throw her in the trash 😟';
    const result = await categorizeOnePost(post);
    expect(result.result).toBe('other');
  });
});
