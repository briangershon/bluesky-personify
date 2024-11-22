# bluesky-art-enthusiast

A social media agent that discovers and promotes art and artists on the Bluesky platform.

Features

- TDD development with an LLM
- Integration with Bluesky API

## Local dev

Create a `.env` file with the following:

```
BLUESKY_USERNAME=
BLUESKY_PASSWORD=
ANTHROPIC_API_KEY=
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
