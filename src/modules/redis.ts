import { createClient } from 'redis';

export const redisClient = createClient({
  host: '127.0.0.1',
  password: 'docker',
  port: 6379,
});
