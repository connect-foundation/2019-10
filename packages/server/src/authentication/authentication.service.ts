import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v1 } from 'uuid';

import { GithubApiService } from 'src/third-party-api/github-api/github-api.service';
import { UserSessionService } from 'src/user-session/user-session.service';
import { User } from '../../../typeorm/src/entity/user.entity';
import { GithubOauthCodeDto } from 'src/third-party-api/github-api/dto/github-oauth-code.dto';
import { UserDetail } from 'src/third-party-api/model/user-detail';
import { UserToken } from 'src/user-session/model/user-session-token';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly userSessionService: UserSessionService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async getGithubUserDetail(
    codeDto: GithubOauthCodeDto,
  ): Promise<UserDetail> {
    const { code } = codeDto;

    const accessToken = await this.githubApiService.requestAccessToken(code);
    const userDetail = await this.githubApiService.requestUserDetail(
      accessToken,
    );

    return userDetail;
  }

  public async findRegisterdGithubUser(githubId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { githubId },
    });

    return user;
  }

  public serializeUser(userId: number, userDetail: UserDetail): string {
    const uuid = v1();
    const userToken = new UserToken(userId, userDetail);
    this.userSessionService.insert(uuid, userToken);

    // console.log(this.userSessionService.table);

    return uuid;
  }
}
