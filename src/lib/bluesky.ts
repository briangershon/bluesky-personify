import {
  isReasonRepost,
  ReasonPin,
  ReasonRepost,
} from '@atproto/api/dist/client/types/app/bsky/feed/defs';

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
