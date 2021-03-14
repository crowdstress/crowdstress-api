import { Client } from 'minio';

import { MINIO_SERVICE_ENDPOINT } from '@/config';

export const minioClient = new Client({
  accessKey: 'access_123',
  endPoint: MINIO_SERVICE_ENDPOINT,
  port: 9000,
  secretKey: 'secret_123',
  useSSL: false,
});
