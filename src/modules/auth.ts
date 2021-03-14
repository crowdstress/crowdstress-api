import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import { getUser } from '@/db/handlers/users';
import { User } from '@/models/user';

passport.use(new Strategy({
  passwordField: 'password',
  usernameField: 'email',
}, async (email, password, done) => {
  const user = await getUser({ email });
  if (!user) return done(null, false);

  const isEqual = await bcrypt.compare(password, user.hash);
  if (!isEqual) return done(null, false);

  const data: User = {
    email: user.email,
    pro: user.pro,
  };
  return done(null, data);
}));

passport.serializeUser<string>((user, done) => {
  // @ts-ignore
  done(null, user.email);
});

passport.deserializeUser<string>(async (email, done) => {
  const user = await getUser({ email });

  if (!user) return done(null, false);

  const data: User = {
    email: user.email,
    pro: user.pro,
  };
  return done(null, data);
});
