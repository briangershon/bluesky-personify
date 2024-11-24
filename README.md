# bluesky-personify

A social media agent that creates entertaining personas based on Bluesky posts.

Features

- Create personas of Bluesky users based on their posts
- Provide a way to find users that match your interests

## Local dev

Create a `.env` file with the following:

```
BLUESKY_USERNAME=
BLUESKY_PASSWORD=
ANTHROPIC_API_KEY=
API_KEY=
```

Run:

```bash
yarn
yarn dev
```

## Run tests

Run all tests:

```bash
yarn test
```

Run only the slow and expensive LLM tests:

```bash
yarn test-llm
```

Run only the fast unit tests:

```bash
yarn test-unit
```

## Production

Hosted on Vercel. Add environment variables from above.
