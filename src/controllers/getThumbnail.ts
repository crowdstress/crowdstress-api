import { downloadFromMinio } from '@/controllers/downloadFromMinio';
import { Controller } from '@/models/controller';

interface GetThumbnailQueryParams {
  id?: string;
}

export const getThumbnail: Controller<{}, {}, GetThumbnailQueryParams> = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.sendStatus(400);
    return;
  }

  const stream = await downloadFromMinio(id);
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
