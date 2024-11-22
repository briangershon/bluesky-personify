import express, { Request, Response } from 'express';
// import { BlueskyAgent } from '../lib/bluesky';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  res.send('Hello!');
  // const agent = new BlueskyAgent();
  // await agent.init();
  // const actor = ''; // this is the username on bluesky.social
  // const persona = await agent.personifyAuthorFeed(actor);
  // res.json({ actor, persona });
});

export default app;
