import { Client } from 'minio';

export const minioClient = new Client({
  accessKey: 'access_123',
  endPoint: 'localhost',
  port: 9000,
  secretKey: 'secret_123',
  useSSL: false,
});
