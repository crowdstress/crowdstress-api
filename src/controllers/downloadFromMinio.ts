import { Readable } from 'stream';

import { BUCKET_NAME } from '@/config';
import { minioClient } from '@/modules/minio';
import { logger } from '@/utils/logger';

export const downloadFromMinio = async (id: string): Promise<Readable | null> => {
  const isBucketExists = await minioClient.bucketExists(BUCKET_NAME);
  if (!isBucketExists) return null;

  try {
    return await minioClient.getObject(BUCKET_NAME, id);
  } catch (error) {
    logger.error(error);
    return null;
  }
};
