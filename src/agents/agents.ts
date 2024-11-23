import { createPersonaFromPosts } from '../lib/ai';
import { FeedItem } from '../lib/bluesky';

export async function createPersonaBasedOnPosts({
  feedItems,
}: {
  feedItems: FeedItem[];
}): Promise<string> {
  if (feedItems.length === 0) {
    return 'no posts to analyze';
  }

  const contentItems = [];

  for (const feedItem of feedItems) {
    // only include original posts
    if (!feedItem.isRepost) {
      const content = feedItem.content;
      if (content) {
        contentItems.push(content);
      }
    }
  }

  return (await createPersonaFromPosts(contentItems)).persona;
}
