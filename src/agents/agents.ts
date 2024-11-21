import { FeedItem } from '../lib/bluesky';

export function categorizeUserByOriginalPosts({
  feedItems,
}: {
  feedItems: FeedItem[];
}): 'artist' | 'other' | 'unknown' {
  if (feedItems.length === 0) {
    return 'unknown';
  }

  for (const feedItem of feedItems) {
    if (feedItem.isRepost) {
      console.log('Repost:', feedItem.content);
      console.log('Reposted by:', feedItem.repostDisplayName);
    } else {
      console.log('Original post:', feedItem.content);
    }
  }

  // TODO: Implement categorization logic
  // IDEA: Are they selling their wares on a know marketplace or platform?

  return 'other';
}
