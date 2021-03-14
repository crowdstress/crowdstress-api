import { CreateUserArgs, CreateUserReply, GetUserArgs, GetUserReply } from '@/db/users';
import { pool } from '@/modules/db';
import { logger } from '@/utils/logger';

export const createUser = async ({ email, hash, salt }: CreateUserArgs): Promise<CreateUserReply | null> => {
  const query = 'INSERT INTO users(email, hash, salt) VALUES($1, $2, $3) RETURNING email, pro';
  try {
    const res = await pool.query<CreateUserReply>(query, [email, hash, salt]);
    return res.rows[0] ?? null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getUser = async ({ email }: GetUserArgs): Promise<GetUserReply | null> => {
  const query = 'SELECT * FROM users WHERE email = $1';
  try {
    const res = await pool.query<GetUserReply>(query, [email]);
    return res.rows[0] ?? null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
