import { User } from '../../../../typeorm/src/entity/user.entity';

export class UserDetailDto {
  public constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.description = user.description;
    this.avatar = user.avatar;
  }

  public readonly id: number;
  public readonly username: string;
  public readonly description: string;
  public readonly avatar: string;
}
