import 'dotenv/config';
import express, { Request, Response } from 'express';
import { categorizeAuthorFeed } from '../lib/bluesky';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const actor = 'ambercarr.bsky.social';
  const category = await categorizeAuthorFeed(actor);
  res.json({ actor, category });
});

export default app;
