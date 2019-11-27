import { UserDetailDto } from '../dto/user-detail-dto';

export class UserDetail {
  public constructor(userDetailDto: UserDetailDto) {
    this.githubId = userDetailDto.githubId;
    this.email = userDetailDto.email;
    this.avatar = userDetailDto.avatar;
    this.location = userDetailDto.location;
    this.reposUrl = userDetailDto.reposUrl;
    this.company = userDetailDto.company;
  }

  public readonly githubId?: number;
  public readonly email: string;
  public readonly avatar: string;
  public readonly location?: string;
  public readonly reposUrl?: string;
  public readonly company?: string;
}
