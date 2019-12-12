import { User } from './User';

export interface Token {
  data: {
    sessionId: string;
    userPublicInfo: User;
  };
  iat: number;
  exp: number;
}
