import { Controller, Get, Query, Res, UseGuards, Req } from '@nestjs/common';
import { Response, Request } from 'express';

import {
  endpoint,
  GITHUB_USER_DETAIL,
  ONE_MINUTE_MILLISECONDS,
  CLIENT_ENDPOINT,
} from '../common/constants';
import { AuthenticationService } from './authentication.service';
import { OnlyGuestGuard } from '../common/guards/only-guest.guard';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import {
  setSessionTokenCookie,
  setTokenOnResponseCookie,
} from '../libs/cookie-setter';
import { GithubUserDetail } from '../third-party-api/model/github-user-detail';
import { OnlyMemberGuard } from '../common/guards/only-member.guard';
import { deleteCookie } from '../libs/cookie-setter';

@Controller(endpoint.auth)
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get(endpoint.LOGOUT)
  @UseGuards(OnlyMemberGuard)
  public async logout(@Req() request: Request, @Res() response: Response) {
    await this.authenticationService.logoutUser(request);

    deleteCookie(response, process.env.JWT_SESSION_TOKEN_KEY);

    response.redirect(
      `${process.env.CLIENT_SERVER_URL}${CLIENT_ENDPOINT.HOTLIST}`,
    );
  }

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
      return response.redirect(
        `${process.env.CLIENT_SERVER_URL}${CLIENT_ENDPOINT.SIGN_UP}`,
      );
    }

    await this.authenticationService.updateUserGithubAccessToken(
      user,
      userDetail.getAccessToken(),
    );

    const sessionId = await this.authenticationService.instructToSerialize(
      user,
    );

    setSessionTokenCookie(response, user, sessionId);

    return response.redirect(process.env.CLIENT_SERVER_URL);
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
