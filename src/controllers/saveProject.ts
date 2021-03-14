import { uploadToMinio } from '@/controllers/uploadToMinio';
import { getProjectById, updateProject } from '@/db/handlers/projects';
import { getUser } from '@/db/handlers/users';
import { Controller } from '@/models/controller';
import { LayerSize } from '@/models/layer';
import { ProjectData } from '@/models/project';
import { User } from '@/models/user';
import { getProjectThumbnail } from '@/utils/getProjectThumbnail';

interface SaveProjectParams {
  data?: ProjectData;
  layerSize?: LayerSize;
  name?: string;
}

interface SaveProjectQueryParams {
  id?: string;
}

export const saveProject: Controller<SaveProjectParams, any, SaveProjectQueryParams> = async (req, res) => {
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

  const { data, layerSize, name } = req.body;
  if (!data || !layerSize || !name) {
    res.sendStatus(500);
    return;
  }

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

  const buffer = await getProjectThumbnail(data, layerSize);

  await uploadToMinio({
    buffer,
    id: project.id,
  });

  const savedProject = await updateProject({
    data,
    id: parsedId,
    name,
  });
  if (!savedProject) {
    res.sendStatus(500);
    return;
  }

  res.send(savedProject);
};
