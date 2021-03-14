import { Controller } from '@/models/controller';

export const logout: Controller = async (req, res) => {
  req.logOut();
  res.sendStatus(401);
};
