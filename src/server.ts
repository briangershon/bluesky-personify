import { PrismaClient } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { Agent } from './agent';
import { Bluesky } from './lib/bluesky';
import { Database } from './lib/database';

const app = express();

app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  res.send('Hello!');
});

app.post(
  '/personify/:username',
  checkApiKey,
  async (req: Request, res: Response) => {
    const username = req.params.username;
    const bluesky = new Bluesky();
    await bluesky.init();

    const agent = new Agent(bluesky);
    const profile = await bluesky.retrieveProfile(username);
    const result = await agent.personifyAuthorFeed(username);

    const prisma = new PrismaClient();
    const db = new Database(prisma);
    const allProfiles = await db.createProfile({
      did: profile.did,
      handle: profile.handle,
      description: profile.description,
      displayname: profile.displayName,
      avatar: profile.avatar,
      postscount: profile.postsCount,
      persona: result.persona,
    });

    res.json({ actor: username, persona: result.persona });
  }
);

app.get('/personify/:username', async (req: Request, res: Response) => {
  const username = req.params.username;
  const bluesky = new Bluesky();
  await bluesky.init();

  const { did } = await bluesky.retrieveProfile(username);

  const prisma = new PrismaClient();
  const db = new Database(prisma);
  const profile = await db.getProfile(did);

  res.json({ actor: username, profile });
});

export default app;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
  console.log(`📝 API endpoint: http://localhost:${port}/`);
});

// Middleware to check for API key
function checkApiKey(req: Request, res: Response, next: NextFunction): void {
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    res.status(401).json({
      error: 'API key is required',
      message: 'Please provide an apiKey query parameter',
    });
  }

  // You could check against valid API keys here
  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid',
    });
  }

  next(); // Proceed to the next middleware/route handler
}
