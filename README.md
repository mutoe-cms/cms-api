## Installation

```bash
pnpm install
```

## Running the app

```bash
# start database
docker-compose up -d postgres

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
