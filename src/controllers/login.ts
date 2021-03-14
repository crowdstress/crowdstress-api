import passport from 'passport';

import { Controller } from '@/models/controller';
import { LoginReply } from '@/models/user';
import { logger } from '@/utils/logger';

interface LoginParams {
  email?: string;
  password?: string;
}


export const login: Controller<LoginParams> = async (req, res) => {
  passport.authenticate('local', (error, user) => {
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.logIn(user, error => {
      if (error) {
        logger.error(error);
        res.sendStatus(500);
        return;
      }

      const data: LoginReply = { user };
      res.send(data);
    });
  })(req, res);
};
