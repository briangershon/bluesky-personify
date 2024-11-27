import {
  createPersonaFromPosts,
  describeOnePost,
  PersonaResult,
} from './lib/ai';
import { Bluesky } from './lib/bluesky';

export class Agent {
  bluesky: Bluesky;

  constructor(bluesky: Bluesky) {
    this.bluesky = bluesky;
  }

  async personifyAuthorFeed(actor: string): Promise<PersonaResult> {
    const feedItems = await this.bluesky.retrieveAuthorFeed({ actor });

    if (feedItems.length === 0) {
      throw new Error('No posts to analyze');
    }

    const contentItems: string[] = [];

    for (const feedItem of feedItems) {
      // only include original posts
      if (!feedItem.isRepost) {
        const content = feedItem.content;
        if (content) {
          const hydratedPostResult = await describeOnePost(content);
          if (hydratedPostResult.result) {
            contentItems.push(hydratedPostResult.result);
          }
        }
      }
    }

    if (contentItems.length === 0) {
      throw new Error(
        'No posts to analyze. User may have zero posts, or may have only reposted content.'
      );
    }

    return await createPersonaFromPosts(contentItems);
  }
}
