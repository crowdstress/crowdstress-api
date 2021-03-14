import { User } from '@/models/user';

export interface CreateUserArgs {
  email: string;
  hash: string;
  salt: string;
}
export type CreateUserReply = User;

export interface GetUserArgs {
  email: string;
}
export type GetUserReply = User & {
  hash: string;
  id: number;
  salt: string;
}
