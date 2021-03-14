import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '@/config';
import { createUser, getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { LoginReply } from '@/models/user';
import { logger } from '@/utils/logger';

interface SignupParams {
  email?: string;
  password?: string;
}

export const signup: Controller<SignupParams, any> = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== 'string' || typeof password !== 'string') {
    res.sendStatus(500);
    return;
  }

  const foundUser = await getUser({ email: email });
  if (foundUser) {
    res.sendStatus(500);
    return;
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const user = await createUser({
    email,
    hash,
    salt,
  });

  if (!user) {
    res.sendStatus(500);
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
};
