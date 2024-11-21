import { expect, test } from 'vitest';
import { categorizeUserByOriginalPosts } from '../../agents/agents';
import { FeedItem } from '../../lib/bluesky';

test('should be "unknown" if there are no posts to analyze', () => {
  expect(categorizeUserByOriginalPosts({ feedItems: [] })).toBe('unknown');
});

test('should be "other" if unsure which type of user this is', () => {
  expect(
    categorizeUserByOriginalPosts({
      feedItems: [
        new FeedItem({
          post: {
            record: { text: 'hello' },
          },
        }),
      ],
    })
  ).toBe('other');
});

// test('should be an "artist"', () => {
//   expect(categorizeUserByOriginalPosts({ feedItems: [] })).toBe('artist');
// });
