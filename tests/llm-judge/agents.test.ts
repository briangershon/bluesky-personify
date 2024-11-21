import { expect, test } from 'vitest';
import { categorizeUserByOriginalPosts } from '../../src/agents/agents';

test('should be "unknown" if there are no posts to analyze', () => {
  expect(categorizeUserByOriginalPosts({ posts: [] })).toBe('unknown');
});

test('should be "other" if unsure which type of user this is', () => {
  expect(categorizeUserByOriginalPosts({ posts: [{ text: 'hello' }] })).toBe(
    'other'
  );
});

// test('should be an "artist"', () => {
//   expect(categorizeUserByOriginalPosts({ posts: [] })).toBe('other');
// });
