FROM node:slim AS builder
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM node:slim AS bundler
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
RUN npm install -g pm2
