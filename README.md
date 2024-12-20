# bluesky-personify

An API that creates and retrieves entertaining personas based a user's latest Bluesky posts.

Features

- Create personas of Bluesky users based on their last 50 original posts. Reposts, as well as posts that can't be summarized are excluded.
- Retrieve list of latest 20 personas added.
- Retrieve a persona by username.

Use Cases

- Create a custom GPT on OpenAI that consumes this API and allows one to interact with the personas, ask questions, find connections between personas, generate images, and more.
  - Included is a `openapi.spec.yaml` file that describes the API for OpenAI and LLMs to use.
  - Note that the `/personify` POST endpoint is protected by an API key and not included in the openAPI specification to avoid unbounded LLM costs if it were an open endpoint. Therefore new personas can only be created by trusted users.

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
