import { User } from '../../../entity/user.entity';

export class UserResponseDto {
  public constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.avatar;
  }
  public readonly id: number;
  public readonly username: string;
  public readonly avatar: string;
}
