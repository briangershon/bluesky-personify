# bluesky-personify

A social media agent that creates entertaining personas based on Bluesky posts.

Features

- create personas of Bluesky users based on their posts
- provide a way to find users that match your interests

## Run locally for development

Create a `.env` file with the following:

```
BLUESKY_USERNAME=
BLUESKY_PASSWORD=
ANTHROPIC_API_KEY=
API_KEY=
DATABASE_URL=
```

`BLUESKY_USERNAME` and `BLUESKY_PASSWORD` are the credentials for the Bluesky account that calls the Bluesky API.

`ANTHROPIC_API_KEY` is the API key for the Anthropic API.

`API_KEY` is the API key protecting the endpoint that creates personas since that costs money to use the LLM.

`DATABASE_URL` is the URL for the Postgres database.

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

## Run in Production

Hosted on Vercel. Add environment variables from above.

## Create a persona for a Bluesky User

For example, create persona for `brianfive.xyz` via

```bash
curl -i -X POST http://localhost:3000/personify/brianfive.xyz?api_key=123
```
