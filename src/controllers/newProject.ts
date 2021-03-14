import { createProject } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { ProjectData } from '@/models/project';
import { User } from '@/models/user';

interface NewProjectParams {
  name?: string;
}

export const newProject: Controller<NewProjectParams> = async (req, res) => {
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

  const { name } = req.body;
  if (!name) {
    res.sendStatus(500);
    return;
  }

  const emptyData: ProjectData = {
    humans: [],
    objects: [],
  };
  const newProject = await createProject({
    data: emptyData,
    name,
    owner: id,
  });

  if (!newProject) {
    res.sendStatus(500);
    return;
  }

  res.send(newProject);
};
