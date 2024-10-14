export declare type User = {
  id: string;
  username: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};
export declare type LoginResult = {
  access_token: string;
  refresh_token: string;
  user: User;
};
