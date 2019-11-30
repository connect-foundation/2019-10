import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 } from 'uuid';
import * as jwt from 'jsonwebtoken';

import { GithubApiService } from 'src/third-party-api/github-api/github-api.service';
import { UserSessionService } from 'src/user-session/user-session.service';
import { User } from '../../../typeorm/src/entity/user.entity';
import { GithubOauthCodeDto } from 'src/third-party-api/github-api/dto/github-oauth-code.dto';
import { GithubUserDetail } from 'src/third-party-api/model/github-user-detail';
import { UserToken } from 'src/user-session/model/user-session-token';
import { TokenizableUserDetail } from './model/tokenizable-user-detail';
import { UserPublicInfo } from './model/user-public-info';
import { ONE_DAY_SECONDS, ONE_HOUR_SECONDS } from 'src/constants';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly userSessionService: UserSessionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getGithubUserDetail(
    codeDto: GithubOauthCodeDto,
  ): Promise<GithubUserDetail> {
    const { code } = codeDto;

    const accessToken = await this.githubApiService.requestAccessToken(code);
    const userDetail = await this.githubApiService.requestUserDetail(
      accessToken,
    );
    userDetail.setAccessToken(accessToken);

    return userDetail;
  }

  public async findRegisterdGithubUser(githubId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { githubId },
    });

    return user;
  }

  public serializeUser(userEntity: User): string {
    const tokenizableUserDetail = new TokenizableUserDetail(userEntity);

    const uuid = v1();
    const userToken = new UserToken(tokenizableUserDetail);
    this.userSessionService.insert(uuid, userToken);

    return uuid;
  }

  public async updateUserGithubAccessToken(
    userEntity: User,
    accessToken: string,
  ) {
    userEntity.githubAccessToken = accessToken;
    this.userRepository.save(userEntity);
  }

  public makGithubUserJWT(githubUserDetail: GithubUserDetail): string {
    const githubAccessTokenJWT = jwt.sign(
      {
        avatar: githubUserDetail.avatar,
        email: githubUserDetail.email,
        githubId: githubUserDetail.githubId,
        githubAccessToken: githubUserDetail.getAccessToken(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: ONE_HOUR_SECONDS,
      },
    );

    return githubAccessTokenJWT;
  }

  public makeSessionJWT(sessionId: string, userEntity: User): string {
    const userPublicInfo = new UserPublicInfo(userEntity);

    const sessionJWT = jwt.sign(
      {
        data: { sessionId, userPublicInfo },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 30 * ONE_DAY_SECONDS,
      },
    );

    return sessionJWT;
  }
}
