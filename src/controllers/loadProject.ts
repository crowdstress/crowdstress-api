import { getProjectById } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { User } from '@/models/user';

interface LoadProjectQueryParams {
  id?: string;
}

export const loadProject: Controller<{}, {}, LoadProjectQueryParams> = async (req, res) => {
  /* Get user id */
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
  const { id: userId } = user;

  /* Parse project id */
  const { id: projectId } = req.params;
  if (!projectId) {
    res.sendStatus(400);
    return;
  }
  const parsedId = parseInt(projectId, 10);
  if (isNaN(parsedId)) {
    res.sendStatus(500);
    return;
  }

  /* Get project */
  const project = await getProjectById({ id: parsedId });
  if (!project) {
    res.sendStatus(404);
    return;
  }
  const { owner } = project;

  /* Check if user is project owner */
  if (userId !== owner) {
    res.sendStatus(401);
    return;
  }

  res.send(project);
};
