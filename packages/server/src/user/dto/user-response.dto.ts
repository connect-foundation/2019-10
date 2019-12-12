import { User } from '../../../entity/user.entity';

export class UserResponseDto {
  public constructor(user: User) {
    this.id = user.id;
    this.avatar = user.avatar;
    this.username = user.username;
    this.description = user.description;
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
  }

  public readonly id: number;
  public readonly avatar: string;
  public readonly username: string;
  public readonly description: string;
  public readonly createdAt: string;
  public readonly updatedAt: string;
}
