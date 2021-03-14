FROM node:slim AS builder
WORKDIR /app
ADD . .
RUN npm install && npm run build

FROM node:alpine AS bundler
WORKDIR /app
COPY --from=builder /app/build .
COPY --from=builder /app/node_modules .
RUN npm install -g pm2
