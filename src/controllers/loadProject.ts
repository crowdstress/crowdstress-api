import { getProjectById } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { User } from '@/models/user';

interface LoadProjectQueryParams {
  id?: string;
}

export const loadProject: Controller<{}, {}, LoadProjectQueryParams> = async (req, res) => {
  const requestedUser = req.user;
  if (!requestedUser) {
    res.sendStatus(401);
    return;
  }

  const { email } = requestedUser as User;
  const user = await getUser({ email });
  if (!user) {
    res.sendStatus(401);
    return;
  }
  const { id } = user;

  const { id: _id } = req.params;
  if (!_id) {
    res.sendStatus(500);
    return;
  }
  const parsedId = parseInt(_id, 10);
  if (isNaN(parsedId)) {
    res.sendStatus(500);
    return;
  }

  const project = await getProjectById({ id: parsedId });
  if (!project) {
    res.sendStatus(404);
    return;
  }
  const { owner } = project;
  if (id !== owner) {
    res.sendStatus(401);
    return;
  }

  res.send(project);
};
