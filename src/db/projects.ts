import { Project } from '@/models/project';

export type WithID<T> = T & { id: number };

export type CreateProjectArgs = Omit<Project, 'id' | 'updatedAt'>;
export type CreateProjectReply = WithID<Pick<Project, 'name' | 'updatedAt'>>;

export interface GetProjectByIdArgs {
  id: number;
}
export type GetProjectByIdReply = Project;

export interface GetProjectByUserArgs {
  id: number;
  name?: string;
}
export type GetProjectByUserReply = WithID<Pick<Project, 'name' | 'updatedAt'>>;

export type UpdateProjectArgs = WithID<Omit<Project, 'owner' | 'updatedAt'>>;
export type UpdateProjectReply = Pick<Project, 'updatedAt'>;
