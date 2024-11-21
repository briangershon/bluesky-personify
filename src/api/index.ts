import express, { Request, Response } from 'express';
import { BlueskyProvider } from '../lib/bluesky';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const provider = new BlueskyProvider();
  await provider.initAgent();
  const actor = 'ambercarr.bsky.social';
  const category = await provider.categorizeAuthorFeed(actor);
  res.json({ actor, category });
});

export default app;
