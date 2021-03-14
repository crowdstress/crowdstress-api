import { Pool } from 'pg';

export const pool = new Pool({
  database: 'docker',
  host: '127.0.0.1',
  password: 'docker',
  port: 5432,
  user: 'docker',
});
