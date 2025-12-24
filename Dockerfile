FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app


COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm config set fetch-retries 5 && \
    pnpm config set fetch-retry-maxtimeout 120000 && \
    pnpm install --registry=https://registry.npmmirror.com

COPY . .

EXPOSE 7006