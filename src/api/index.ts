import express, { NextFunction, Request, Response } from 'express';
import { BlueskyAgent } from '../lib/bluesky';

const app = express();

app.use(express.json());

// Middleware to check for API key
const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key is required',
      message: 'Please provide an apiKey query parameter',
    });
  }

  // You could check against valid API keys here
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid',
    });
  }

  next(); // Proceed to the next middleware/route handler
};

app.get('/', async (_req: Request, res: Response) => {
  res.send('Hello!');
});

app.get(
  '/personify/:username',
  checkApiKey,
  async (req: Request, res: Response) => {
    const username = req.params.username;
    const agent = new BlueskyAgent();
    await agent.init();
    const persona = await agent.personifyAuthorFeed(username);
    res.json({ actor: username, persona });
  }
);

export default app;
