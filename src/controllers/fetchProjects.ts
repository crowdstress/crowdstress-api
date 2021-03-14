import { getProjectsByUser } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { User } from '@/models/user';

interface FetchProjectsQueryParams {
  name?: string;
}

export const fetchProjects: Controller<{}, {}, {}, FetchProjectsQueryParams> = async (req, res) => {
  const { name } = req.query;

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

  const projects = await getProjectsByUser({
    id,
    name,
  });
  res.send(projects);
};
