import { AtpAgent } from '@atproto/api';
import {
  isReasonRepost,
  ReasonPin,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import 'dotenv/config';
import { categorizeUserByOriginalPosts } from '../agents/agents';
import { categorizeOnePost, describeOnePost } from './ai';

const BLUESKY_DID = 'did:plc:7n7er6ofqzvrzm53yz6zihiw';

interface PartialFeedViewPost {
  post: {
    record?: {
      text?: string;
    };
  };
  reason?: ReasonRepost | ReasonPin | { $type: string; [k: string]: unknown };
}

export class FeedItem {
  feedItem: PartialFeedViewPost;

  constructor(feedItem: PartialFeedViewPost) {
    this.feedItem = feedItem;
  }

  get content() {
    const post = this.feedItem.post;
    if (!post.record) {
      return '';
    }
    const record = post.record;
    return record.text;
  }

  get repostDisplayName() {
    if (this.isRepost) {
      const by = this.feedItem?.reason?.by as { displayName: string };
      return by.displayName;
    }
    return '';
  }

  get isRepost() {
    return isReasonRepost(this.feedItem.reason);
  }
}

export class BlueskyAgent {
  agent: AtpAgent | undefined;

  async init() {
    this.agent = new AtpAgent({
      service: 'https://bsky.social',
    });

    await this.agent.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });
  }

  async categorizeAuthorFeed(actor: string) {
    if (!this.agent) {
      throw new Error('BlueskyAgent not logged in?');
    }

    // TODO: ADD CURSOR PAGINATION TO RETRIEVE ALL POSTS
    const { data } = await this.agent.getAuthorFeed({
      actor,
      limit: 10, //50
    });
    const feedItems = data.feed.map((item) => new FeedItem(item));
    const category = categorizeUserByOriginalPosts({ feedItems });

    console.log({ feedItems });
    const content = feedItems
      .filter((item) => !item.isRepost)
      .map((item) => item.content);

    console.log({ content });

    for (let i = 0; i < content.length; i++) {
      const item = content[i] ?? '';
      const response = await describeOnePost(item);
      const category = await categorizeOnePost(item);
      console.log({ item, response, category });
    }

    // const cat = await categorize(content);
    // console.log({ cat });

    return category;
  }
}

// const { data: profile } = await agent.getProfile({
//   actor: BLUESKY_DID,
// });
// console.log('profile', profile);
