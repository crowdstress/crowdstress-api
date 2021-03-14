import { Pool } from 'pg';

import { DB_SERVICE_ENDPOINT } from '@/config';

export const pool = new Pool({
  database: 'docker',
  host: DB_SERVICE_ENDPOINT,
  password: 'docker',
  port: 5432,
  user: 'docker',
});
