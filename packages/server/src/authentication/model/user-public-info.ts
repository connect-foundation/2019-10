import { User } from '../../../entity/user.entity';

export class UserPublicInfo {
  public constructor(userEntity: User) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.username = userEntity.username;
    this.avatar = userEntity.avatar;
  }

  public readonly id: number;
  public readonly email: string;
  public readonly username: string;
  public readonly avatar: string;
}
