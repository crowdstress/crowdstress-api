import { createClient } from 'redis';

import { REDIS_SERVICE_ENDPOINT } from '@/config';

export const redisClient = createClient({
  host: REDIS_SERVICE_ENDPOINT,
  password: 'docker',
  port: 6379,
});
