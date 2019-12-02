import { UserPublicInfo } from './user-public-info';

export class SessionJWTData {
  public constructor(
    public readonly sessionId: string,
    public readonly userPublicInfo: UserPublicInfo,
  ) {}
}
