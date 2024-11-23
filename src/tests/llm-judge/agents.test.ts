import { expect, test } from 'vitest';
import { createPersonaBasedOnPosts } from '../../agents/agents';
import { FeedItem } from '../../lib/bluesky';

test('should be "no posts to analyze" if there are no posts', async () => {
  expect(await createPersonaBasedOnPosts({ feedItems: [] })).toBe(
    'no posts to analyze'
  );
});
