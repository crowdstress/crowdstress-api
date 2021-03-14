import { downloadFromMinio } from '@/controllers/downloadFromMinio';
import { getProjectById } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { User } from '@/models/user';

interface GetThumbnailQueryParams {
  id?: string;
}

export const getThumbnail: Controller<{}, {}, GetThumbnailQueryParams> = async (req, res) => {
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

  /* Get project owner */
  const project = await getProjectById({ id: parseInt(projectId) });
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

  const stream = await downloadFromMinio(projectId);
  if (!stream) {
    res.sendStatus(404);
    return;
  }

  stream.on('data', chunk => {
    res.write(chunk);
  });

  stream.on('end', () => {
    res.end();
  });
};
