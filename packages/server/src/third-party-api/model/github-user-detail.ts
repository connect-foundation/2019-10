import { GithubUserDetailDto } from '../github-api/dto/github-user-detail-dto';

export class GithubUserDetail {
  public constructor(githubUserDetailDto: GithubUserDetailDto) {
    this.githubId = githubUserDetailDto.githubId;
    this.email = githubUserDetailDto.email;
    this.avatar = githubUserDetailDto.avatar;
    this.location = githubUserDetailDto.location;
    this.reposUrl = githubUserDetailDto.reposUrl;
    this.company = githubUserDetailDto.company;
  }

  public readonly githubId?: number;
  public readonly email: string;
  public readonly avatar: string;
  public readonly location?: string;
  public readonly reposUrl?: string;
  public readonly company?: string;

  private accessToken: string;

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  public getAccessToken() {
    return this.accessToken;
  }
}
