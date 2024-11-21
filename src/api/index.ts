import { categorizeUserByOriginalPosts, Post } from '../agents/agents';
import { AtpAgent } from '@atproto/api';
import 'dotenv/config';
import express, { Request, Response } from 'express';

// const BLUESKY_DID = 'did:plc:7n7er6ofqzvrzm53yz6zihiw';

const agent = new AtpAgent({
  service: 'https://bsky.social',
});

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  // const { data: profile } = await agent.getProfile({
  //   actor: BLUESKY_DID,
  // });
  // console.log('profile', profile);

  const { data } = await agent.getAuthorFeed({
    actor: 'ambercarr.bsky.social',
    limit: 50,
  });
  const posts = data.feed.map((post) => post.post.record as Post);
  const category = categorizeUserByOriginalPosts({ posts });
  res.json(posts);
});

export default app;
