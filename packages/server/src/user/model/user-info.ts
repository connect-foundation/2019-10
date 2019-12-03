import { User } from '../../../../typeorm/src/entity/user.entity';

export class UserInfo {
  public constructor(userEntity: User) {
    this.id = userEntity.id;
    this.username = userEntity.username;
    this.avatar = userEntity.avatar;
  }
  public readonly id: number;
  public readonly username: string;
  public readonly avatar: string;
}
