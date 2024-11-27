import { AtpAgent } from '@atproto/api';
import {
  isReasonRepost,
  ReasonPin,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';
import 'dotenv/config';

interface PartialFeedViewPost {
  post: {
    record?: {
      text?: string;
    };
  };
  reason?: ReasonRepost | ReasonPin | { $type: string; [k: string]: unknown };
}

export class BlueskyFeedItem {
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

  async retrieveProfile(actor: string) {
    if (!this.bluesky) {
      throw new Error('Bluesky not logged in?');
    }

    const { data: profile } = await this.bluesky.getProfile({
      actor,
    });
    return profile;
  }

  async retrieveAuthorFeed({
    actor,
    maxPosts = 50,
  }: {
    actor: string;
    maxPosts?: number;
  }): Promise<BlueskyFeedItem[]> {
    if (!this.bluesky) {
      throw new Error('Bluesky not logged in?');
    }

    const feedItems: BlueskyFeedItem[] = [];

    let cursor: string | undefined = undefined;
    let count = 0;

    do {
      const { data } = await this.bluesky.getAuthorFeed({
        actor,
        limit: 50,
        cursor,
      });

      for (const post of data.feed) {
        feedItems.push(new BlueskyFeedItem(post));
      }

      cursor = data.cursor;
      count += data.feed.length;
    } while (cursor && count < maxPosts);

    return feedItems;
  }
}
