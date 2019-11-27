import { UserDetail } from 'src/third-party-api/model/user-detail';

export class UserToken {
  public readonly userId: number;
  public readonly githubId: number;
  public readonly email: string;
  public readonly avatar: string;
  public readonly location: string;
  public readonly reposUrl: string;
  public readonly company: string;

  public constructor(userId: number, userDetail: UserDetail) {
    this.userId = userId;
    this.githubId = userDetail.githubId;
    this.email = userDetail.email;
    this.avatar = userDetail.avatar;
    this.location = userDetail.location;
    this.reposUrl = userDetail.reposUrl;
    this.company = userDetail.company;
  }
}
