import { describe, expect, test } from 'vitest';
import { FeedItem } from '../../lib/bluesky';

describe('each post', () => {
  test('a post should have content', () => {
    const feedItem = new FeedItem({
      post: {
        record: {
          text: 'Hello world',
        },
      },
    });
    expect(feedItem.content).toBe('Hello world');
  });

  test('if no "record", content should be empty string', () => {
    const feedItem = new FeedItem({
      post: {},
    });
    expect(feedItem.content).toBe('');
  });
});

describe('an original post', () => {
  test('should identify an "original" post', () => {
    const feedItem = new FeedItem({
      post: {
        record: {
          text: 'Hello world',
        },
      },
    });
    expect(feedItem.isRepost).toBe(false);
  });
});

describe('a repost', () => {
  test('should identify a "repost"', () => {
    const feedItem = new FeedItem({
      post: {
        record: {
          text: 'Hello world',
        },
      },
      reason: {
        $type: 'app.bsky.feed.defs#reasonRepost',
        by: {
          displayName: 'Poster',
        },
      },
    });
    expect(feedItem.isRepost).toBe(true);
  });
});
