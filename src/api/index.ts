import express, { Request, Response } from 'express';
import { BlueskyAgent } from '../lib/bluesky';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const agent = new BlueskyAgent();
  await agent.init();
  const actor = 'ambercarr.bsky.social';
  const category = await agent.categorizeAuthorFeed(actor);
  res.json({ actor, category });
});

export default app;
