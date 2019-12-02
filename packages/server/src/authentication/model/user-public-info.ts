import { User } from '../../../../typeorm/src/entity/user.entity';

export class UserPublicInfo {
  public constructor(userEntity: User) {
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.username = userEntity.username;
  }

  public readonly id: number;
  public readonly email: string;
  public readonly username: string;
}
