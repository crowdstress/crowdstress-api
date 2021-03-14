import { Duplex } from 'stream';

import { BUCKET_NAME, BUCKET_REGION } from '@/config';
import { minioClient } from '@/modules/minio';

interface UploadToMinioArgs {
  buffer: Buffer;
  id: number;
}

export const uploadToMinio = async ({ buffer, id }: UploadToMinioArgs): Promise<void> => {
  const isBucketExists = await minioClient.bucketExists(BUCKET_NAME);
  if (!isBucketExists) {
    await minioClient.makeBucket(BUCKET_NAME, BUCKET_REGION);
  }

  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);

  await minioClient.putObject(BUCKET_NAME, `${id}`, stream);
};
