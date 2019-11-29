import { Controller, Get, Query, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { endpoint, clientPath, ONE_DAY } from 'src/constants';
import { GithubOauthCodeDto } from '../third-party-api/github-api/dto/github-oauth-code.dto';
import { AuthenticationService } from './authentication.service';
import { GithubApiService } from 'src/third-party-api/github-api/github-api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserSessionService } from 'src/user-session/user-session.service';
import { TokenizableUserDetail } from './model/tokenizable-user-detail';
import { UserPublicInfo } from './model/user-info-cookie';

@Controller(endpoint.auth)
export class AuthenticationController {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly userSessionService: UserSessionService,
    private readonly authenticationService: AuthenticationService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

    user.githubAccessToken = userDetail.getAccessToken();
    this.userRepository.save(user);

    const tokenizableUserDetail = new TokenizableUserDetail(user);
    const id = this.authenticationService.serializeUser(tokenizableUserDetail);
    const userPublicInfo = new UserPublicInfo(user);

    console.log(this.userSessionService.table);
    console.log(userDetail.getAccessToken());

    const idJwt = jwt.sign(
      {
        data: id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    const userPublicInfoJwt = jwt.sign(
      {
        data: userPublicInfo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    console.log(idJwt);
    console.log(userPublicInfoJwt);

    response.cookie('SSID', idJwt, {
      maxAge: 15 * ONE_DAY,
      httpOnly: true,
    });
    response.cookie('public-info', userPublicInfoJwt, {
      maxAge: 15 * ONE_DAY,
      httpOnly: true,
    });

    return response.redirect(clientPath.main);
  }
}
