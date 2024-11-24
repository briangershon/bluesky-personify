import { AtpAgent } from '@atproto/api';
import {
  isReasonRepost,
  ReasonPin,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import 'dotenv/config';

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

export class Bluesky {
  bluesky: AtpAgent | undefined;

  async init() {
    this.bluesky = new AtpAgent({
      service: 'https://bsky.social',
    });

    await this.bluesky.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });
  }

  async retrieveAuthorFeed(actor: string): Promise<FeedItem[]> {
    if (!this.bluesky) {
      throw new Error('Bluesky not logged in?');
    }

    const feedItems: FeedItem[] = [];

    let cursor: string | undefined = undefined;

    do {
      const { data } = await this.bluesky.getAuthorFeed({
        actor,
        limit: 50,
        cursor,
      });

      for (const post of data.feed) {
        feedItems.push(new FeedItem(post));
      }

      cursor = data.cursor;
    } while (cursor);

    return feedItems;
  }
}

// const { data: profile } = await bluesky.getProfile({
//   actor: BLUESKY_DID,
// });
// console.log('profile', profile);
