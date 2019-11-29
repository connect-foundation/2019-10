import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 } from 'uuid';

import { GithubApiService } from 'src/third-party-api/github-api/github-api.service';
import { UserSessionService } from 'src/user-session/user-session.service';
import { User } from '../../../typeorm/src/entity/user.entity';
import { GithubOauthCodeDto } from 'src/third-party-api/github-api/dto/github-oauth-code.dto';
import { GithubUserDetail } from 'src/third-party-api/model/github-user-detail';
import { UserToken } from 'src/user-session/model/user-session-token';
import { TokenizableUserDetail } from './model/tokenizable-user-detail';

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

  public serializeUser(tokenizableUserDetail: TokenizableUserDetail): string {
    // make jwt
    const uuid = v1();
    const userToken = new UserToken(tokenizableUserDetail);
    this.userSessionService.insert(uuid, userToken);

    return uuid;
  }
}
