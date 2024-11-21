import { FeedViewPost } from '@atproto/api/dist/client/types/app/bsky/feed/defs';

export function categorizeUserByOriginalPosts({
  feedItems,
}: {
  feedItems: FeedViewPost[];
}): 'artist' | 'other' | 'unknown' {
  if (feedItems.length === 0) {
    return 'unknown';
  }

  for (const feedItem of feedItems) {
    const post = feedItem.post;
    const isRepost =
      feedItem.reason?.$type === 'app.bsky.feed.defs#reasonRepost';

    if (isRepost) {
      console.log('Repost:', post.record.text);
      console.log('Reposted by:', feedItem?.reason?.by?.displayName);
    } else {
      console.log('Original post:', post.record.text);
    }
  }

  // TODO: Implement categorization logic
  // IDEA: Are they selling their wares on a know marketplace or platform?

  return 'other';
}
