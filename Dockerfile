FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --verbose --no-optional --frozen-lockfile

COPY . .

RUN pnpm build


FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --verbose --prod --no-optional --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]
