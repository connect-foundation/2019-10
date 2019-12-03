import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { GithubApiService } from 'third-party-api/github-api/github-api.service';
import { GithubOauthCodeDto } from 'third-party-api/github-api/dto/github-oauth-code.dto';
import { GithubUserDetail } from 'third-party-api/model/github-user-detail';
import { UserSerializerService } from 'serializer/user-serializer.service';

import { ONE_HOUR_SECONDS } from 'common/constants';

import { User } from '../../../typeorm/src/entity/user.entity';

@Injectable()
export class AuthenticationService {
  public constructor(
    private readonly githubApiService: GithubApiService,
    private readonly userSerializerService: UserSerializerService,
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

  public instructToSerialize(userEntity: User): string {
    const tokenId = this.userSerializerService.serializeUser(userEntity);

    return tokenId;
  }

  public async updateUserGithubAccessToken(
    userEntity: User,
    accessToken: string,
  ) {
    userEntity.githubAccessToken = accessToken;
    await this.userRepository.save(userEntity);
  }

  public makeGithubUserJWT(githubUserDetail: GithubUserDetail): string {
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
}
