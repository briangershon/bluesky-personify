import { categorizeUserByOriginalPosts } from '../agents/agents';
import { AtpAgent } from '@atproto/api';
import {
  isReasonRepost,
  ReasonPin,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';

const BLUESKY_DID = 'did:plc:7n7er6ofqzvrzm53yz6zihiw';

const agent = new AtpAgent({
  service: 'https://bsky.social',
});

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

export async function categorizeAuthorFeed(actor: string) {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  // const { data: profile } = await agent.getProfile({
  //   actor: BLUESKY_DID,
  // });
  // console.log('profile', profile);

  // TODO: ADD CURSOR PAGINATION TO RETRIEVE ALL POSTS
  const { data } = await agent.getAuthorFeed({
    actor: 'ambercarr.bsky.social',
    limit: 50,
  });
  const feedItems = data.feed.map((item) => new FeedItem(item));
  const category = categorizeUserByOriginalPosts({ feedItems });
  return category;
}
