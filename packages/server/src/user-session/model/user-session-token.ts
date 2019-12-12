import { User } from '../../../entity/user.entity';

export class UserToken {
  public readonly userId: number;
  public readonly email: string;
  public readonly avatar: string;
  public readonly githubAccessToken: string;
  public readonly username: string;

  public constructor(userEntity: User) {
    this.userId = userEntity.id;
    this.email = userEntity.email;
    this.avatar = userEntity.avatar;
    this.githubAccessToken = userEntity.githubAccessToken;
    this.username = userEntity.username;
  }
}
