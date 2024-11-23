# bluesky-personify

A social media agent that creates fun personas based on Bluesky posts.

Features

- Create a persona based on a Bluesky user

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

Run the fast and non-LLM tests:

```bash
yarn test
```

Run the slow and expensive LLM tests:

```bash
yarn test-llm
```

Run them all:

```bash
yarn test-all
```

## Production

Hosted on Vercel. Add environment variables from above.
