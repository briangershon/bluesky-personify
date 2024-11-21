import { expect, test } from 'vitest';
import { categorizeUserByOriginalPosts } from '../../agents/agents';

test('should be "unknown" if there are no posts to analyze', () => {
  expect(categorizeUserByOriginalPosts({ feedItems: [] })).toBe('unknown');
});

test('should be "other" if unsure which type of user this is', () => {
  expect(
    categorizeUserByOriginalPosts({
      feedItems: [
        {
          post: {
            uri: 'did:plc:7n7er6ofqzvrzm53yz6zihiw',
            cid: 'Qm',
            author: {
              did: 'did:plc:7n7er6ofqzvrzm53yz6zihiw',
              handle: 'yo',
              displayName: 'Yo',
              avatar: 'https://example.com/avatar.png',
            },
            indexedAt: '2021-09-01T00:00:00Z',
            record: { text: 'hello' },
          },
        },
      ],
    })
  ).toBe('other');
});

// test('should be an "artist"', () => {
//   expect(categorizeUserByOriginalPosts({ posts: [] })).toBe('other');
// });
