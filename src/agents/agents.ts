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
    if (feedItem.isRepost) {
      console.log('Repost:', feedItem.content);
      console.log('Reposted by:', feedItem.repostDisplayName);
    } else {
      const content = feedItem.content;
      console.log('Original post:', content);
      if (content) {
        contentItems.push(content);
      }
    }
  }

  return (await createPersonaFromPosts(contentItems)).persona;
}
