import {
  GetProjectByIdArgs,
  GetProjectByIdReply,
  CreateProjectArgs,
  CreateProjectReply,
  UpdateProjectArgs,
  UpdateProjectReply,
  GetProjectByUserArgs,
  GetProjectByUserReply
} from '@/db/projects';
import { pool } from '@/modules/db';
import { logger } from '@/utils/logger';

export const createProject = async ({ name, owner, data }: CreateProjectArgs): Promise<CreateProjectReply | null> => {
  const query = 'INSERT INTO projects(name, owner, data) VALUES($1, $2, $3) RETURNING "id", "name", "updatedAt"';
  try {
    const res = await pool.query<CreateProjectReply>(query, [name, owner, data]);
    return res.rows[0] ?? null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getProjectById = async ({ id }: GetProjectByIdArgs): Promise<GetProjectByIdReply | null> => {
  const query = 'SELECT "id", "name", "owner", "updatedAt", "data" from projects WHERE id = $1';
  try {
    const res = await pool.query<GetProjectByIdReply>(query, [id]);
    return res.rows[0] ?? null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

export const getProjectsByUser = async ({ id, name = '' }: GetProjectByUserArgs): Promise<GetProjectByUserReply[]> => {
  const query = 'SELECT "id", "name", "updatedAt" FROM projects WHERE "owner" = $1 AND "name" LIKE $2 ORDER BY "updatedAt" DESC';
  try {
    const res = await pool.query<GetProjectByUserReply>(query, [id, `%${name}%`]);
    return res.rows;
  } catch (error) {
    logger.error(error);
    return [];
  }
};

export const updateProject = async ({ id, name, data }: UpdateProjectArgs): Promise<UpdateProjectReply | null> => {
  const query = 'UPDATE projects SET "name" = $2, "updatedAt" = current_timestamp, "data" = $3 WHERE "id" = $1 RETURNING "updatedAt"';
  try {
    const res = await pool.query<UpdateProjectReply>(query, [id,  name, data]);
    return res.rows[0] ?? null;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
