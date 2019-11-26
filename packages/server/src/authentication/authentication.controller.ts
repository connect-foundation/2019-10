import { Controller, Get, Query, HttpService, Post } from '@nestjs/common';
import { endpoint } from 'src/constants';
import { GithubOauthCodeDto } from './dto/github-oauth-code.dto';
import { AuthenticationService } from './authentication.service';
import { GithubApiService } from 'src/github-api/github-api.service';

@Controller(endpoint.auth)
export class AuthenticationController {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get('/login')
  public async login(@Query() codeDto: GithubOauthCodeDto) {
    const { code } = codeDto;

    const accessToken = await this.githubApiService.requestAccessToken(code);

    // console.log(accessToken);

    const res = await this.githubApiService.requestUserDetail(accessToken);

    // console.log(res);
  }
}
