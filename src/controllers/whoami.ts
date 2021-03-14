import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { WhoamiReply } from '@/models/user';

export const whoami: Controller = async (req, res) => {
  // @ts-ignore
  const login = req.session.passport.user as string;

  const user = await getUser({ email: login });
  if (!user) {
    res.sendStatus(500);
    return;
  }

  const { email, pro } = user;
  const data: WhoamiReply = {
    user: {
      email,
      pro,
    },
  };
  res.send(data);
};
