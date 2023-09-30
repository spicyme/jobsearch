FROM node:18.16.0-alpine

RUN mkdir -p /usr/src/job-search && chown -R node:node /usr/src/job-search

WORKDIR /usr/src/job-search

COPY package.json yarn.lock ./

USER node

# RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
