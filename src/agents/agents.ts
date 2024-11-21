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

    const content = post.record as { text: string };
    const displayName = feedItem?.reason?.by as { displayName: string };
    if (isRepost) {
      console.log('Repost:', content);
      console.log('Reposted by:', displayName);
    } else {
      console.log('Original post:', content);
    }
  }

  // TODO: Implement categorization logic
  // IDEA: Are they selling their wares on a know marketplace or platform?

  return 'other';
}
