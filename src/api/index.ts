import { AtpAgent } from '@atproto/api';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { categorizeUserByOriginalPosts } from '../agents/agents';

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
  const feedItems = data.feed;
  const category = categorizeUserByOriginalPosts({ feedItems });
  res.json(feedItems);
});

export default app;
