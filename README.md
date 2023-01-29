## Installation

```bash
pnpm install
```

## Running the app

```bash
# start database
docker-compose up -d postgres

# or (if you are not using docker)
psql postgres
# Next line is the PSQL CLI command
CREATE DATABASE cms_api WITH OWNER postgres;

# development
pnpm start

# watch mode
pnpm start:dev

# production mode
pnpm start:prod
```

## Test

```bash
# unit tests
pnpm test:unit

# e2e tests
pnpm test:e2e
```
