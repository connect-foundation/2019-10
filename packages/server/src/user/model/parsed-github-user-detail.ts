export class ParsedGithubUserDetail {
  public constructor(data) {
    this.avatar = data.avatar;
    this.email = data.email;
    this.githubId = data.githubId;
    this.githubAccessToken = data.githubAccessToken;
  }

  public readonly avatar: string;
  public readonly email: string;
  public readonly githubId: number;
  public readonly githubAccessToken: string;
}
