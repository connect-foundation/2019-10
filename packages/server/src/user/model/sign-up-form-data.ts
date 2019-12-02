import { SignUpFormDataDto } from '../dto/sign-up-user-form.dto';
import { ParsedGithubUserDetail } from './parsed-github-user-detail';

export class SignUpUserData {
  public constructor(
    parsedGithubUserDetail: ParsedGithubUserDetail,
    signUpFormDataDto: SignUpFormDataDto,
  ) {
    this.username = signUpFormDataDto.username;
    this.description = signUpFormDataDto.description;
    this.avatar = parsedGithubUserDetail.avatar;
    this.email = parsedGithubUserDetail.email;
    this.githubId = parsedGithubUserDetail.githubId;
    this.githubAccessToken = parsedGithubUserDetail.githubAccessToken;
  }

  public readonly username: string;
  public readonly description: string;
  public readonly avatar: string;
  public readonly email: string;
  public readonly githubId: number;
  public readonly githubAccessToken: string;
}
