import { TokenizableUserDetail } from 'src/authentication/model/tokenizable-user-detail';

export class UserToken {
  public readonly userId: number;
  public readonly email: string;
  public readonly avatar: string;
  public readonly githubAccessToken: string;
  public readonly username: string;

  public constructor(tokenizableUserDetail: TokenizableUserDetail) {
    this.userId = tokenizableUserDetail.userId;
    this.email = tokenizableUserDetail.email;
    this.avatar = tokenizableUserDetail.avatar;
    this.githubAccessToken = tokenizableUserDetail.githubAccessToken;
    this.username = tokenizableUserDetail.username;
  }
}
