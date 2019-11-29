import { User } from '../../../../typeorm/src/entity/user.entity';

export class TokenizableUserDetail {
  public constructor(userEntity: User) {
    this.userId = userEntity.id;
    this.email = userEntity.email;
    this.username = userEntity.username;
    this.githubAccessToken = userEntity.githubAccessToken;
    this.avatar = userEntity.avatar;
  }

  public readonly userId: number;
  public readonly githubAccessToken: string;
  public readonly email: string;
  public readonly username: string;
  public readonly avatar: string;
}
