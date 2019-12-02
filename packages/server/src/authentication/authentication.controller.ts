import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { endpoint, clientPath, ONE_DAY_MILLISECONDS } from 'src/constants';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import { AuthenticationService } from './authentication.service';
import { GithubUserDetail } from 'src/third-party-api/model/github-user-detail';
import { OnlyGuestGuard } from 'src/common/guards/only-guest.guard';
import { makeTokenCookie, setSessionTokenCookie } from 'src/set-cookie';

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

    response = setSessionTokenCookie(response, user, sessionId);

    return response.redirect(clientPath.main);
  }

  private setAccessTokenCookie(
    response: Response,
    userDetail: GithubUserDetail,
  ) {
    const githubUserJWT = this.authenticationService.makeGithubUserJWT(
      userDetail,
    );

    response = makeTokenCookie(response, 'githubUserDetail', githubUserJWT, {
      maxAge: ONE_DAY_MILLISECONDS,
      httpOnly: true,
    });

    return response;
  }
}
