FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --verbose --ignore-optional --non-interactive --frozen-lockfile

COPY . .

RUN yarn build


FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --verbose --prod --ignore-optional --non-interactive --frozen-lockfile

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]
