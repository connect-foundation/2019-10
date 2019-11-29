import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { endpoint, clientPath, ONE_DAY_MILLISECONDS } from 'src/constants';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import { AuthenticationService } from './authentication.service';
import { User } from '../../../typeorm/src/entity/user.entity';
import { CookieOptions } from 'express-serve-static-core';

@Controller(endpoint.auth)
export class AuthenticationController {
  public constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get(endpoint.githubLogin)
  public async login(
    @Query() codeDto: GithubOauthCodeDto,
    @Res() response: Response,
  ) {
    const userDetail = await this.authenticationService.getGithubUserDetail(
      codeDto,
    );

    const user = await this.authenticationService.findRegisterdGithubUser(
      userDetail.githubId,
    );

    if (!user) {
      return response.redirect(clientPath.signUp);
    }

    await this.authenticationService.updateUserGithubAccessToken(
      user,
      userDetail.getAccessToken(),
    );

    const sessionId = this.authenticationService.serializeUser(user);

    response = await this.setTokenCookie(response, user, sessionId);

    return response.redirect(clientPath.main);
  }

  private makeTokenCookie(
    response: Response,
    key: string,
    token: string,
    option: CookieOptions,
  ): Response {
    response.cookie(key, token, option);

    return response;
  }

  private async setTokenCookie(
    response: Response,
    userEntity: User,
    sessionId: string,
  ): Promise<Response> {
    const sessionToken = await this.authenticationService.makeSessionToken(
      sessionId,
      userEntity,
    );

    response = this.makeTokenCookie(response, 'SessionToken', sessionToken, {
      maxAge: 30 * ONE_DAY_MILLISECONDS,
      httpOnly: true,
    });

    return response;
  }
}
