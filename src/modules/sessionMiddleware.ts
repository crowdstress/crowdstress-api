import connectRedis from 'connect-redis';
import { RequestHandler } from 'express';
import  session from 'express-session';

import { SESSIONS_SECRET } from '@/config';
import { redisClient } from '@/modules/redis';
import { logger } from '@/utils/logger';

const redisStore = connectRedis(session);
export const sessionMiddleware = (): RequestHandler => {
  if (!SESSIONS_SECRET) {
    logger.error('Sessions secret is empty');
    process.exit();
  }

  return session({
    cookie: {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      secure: false,
    },
    name: 'crowdstress',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    secret: SESSIONS_SECRET,
    store: new redisStore({ client: redisClient }),
  });
};
