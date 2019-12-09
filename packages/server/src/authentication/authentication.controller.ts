import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import {
  endpoint,
  clientPath,
  GITHUB_USER_DETAIL,
  ONE_MINUTE_MILLISECONDS,
} from '../common/constants';
import { AuthenticationService } from './authentication.service';
import { OnlyGuestGuard } from '../common/guards/only-guest.guard';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import {
  setSessionTokenCookie,
  setTokenOnResponseCookie,
} from '../libs/cookie-setter';
import { GithubUserDetail } from '../third-party-api/model/github-user-detail';

@Controller(endpoint.auth)
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get(endpoint.githubLogin)
  @UseGuards(OnlyGuestGuard)
  public async login(
    @Query() codeDto: GithubOauthCodeDto,
    @Res() response: Response,
  ): Promise<void> {
    const userDetail = await this.authenticationService.getGithubUserDetail(
      codeDto,
    );

    const user = await this.authenticationService.findRegisterdGithubUser(
      userDetail.githubId,
    );

    if (!user) {
      this.setAccessTokenCookie(response, userDetail);
      return response.redirect(clientPath.signUp);
    }

    await this.authenticationService.updateUserGithubAccessToken(
      user,
      userDetail.getAccessToken(),
    );

    const sessionId = this.authenticationService.instructToSerialize(user);

    setSessionTokenCookie(response, user, sessionId);

    return response.redirect(clientPath.main);
  }

  private setAccessTokenCookie(
    response: Response,
    userDetail: GithubUserDetail,
  ) {
    const githubUserJWT = this.authenticationService.makeGithubUserJWT(
      userDetail,
    );

    setTokenOnResponseCookie(response, GITHUB_USER_DETAIL, githubUserJWT, {
      maxAge: ONE_MINUTE_MILLISECONDS * 15,
      httpOnly: true,
    });
  }
}
