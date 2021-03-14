export interface User {
  email: string;
  pro: boolean;
}

export interface WhoamiReply {
  user: User;
}

export interface LoginReply {
  user: User;
}

export interface SignupReply {
  user: User;
}
