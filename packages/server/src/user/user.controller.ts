import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  BadRequestException,
  UnauthorizedException,
  UnprocessableEntityException,
  Res,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { endpoint, GITHUB_USER_DETAIL } from 'common/constants';
import { UserService } from 'user/user.service';
import { UserListQueryPipe } from 'user/pipe/user-list-query-pipe';
import { UserListQueryDto } from 'user/dto/user-list-query.dto';
import { UserListResponseDto } from 'user/dto/user-list-response.dto';
import { SignUpFormDataDto } from 'user/dto/sign-up-user-form.dto';
import { ParsedGithubUserDetail } from 'user/model/parsed-github-user-detail';
import { deleteCookie, setSessionTokenCookie } from 'libs/cookie-setter';
import { errName, errCode } from 'common/errors';
import { UserParamPipe } from 'user/pipe/user-param.pipe';
import { UserResponseDto } from 'user/dto/user-response.dto';
import { VideosResponseDto } from 'user/dto/videos-response.dto';
import { VideoResponseDto } from 'user/dto/video-response.dto';
import { User } from '../../../typeorm/src/entity/user.entity';

@Controller(endpoint.users)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers(
    @Query(null, new UserListQueryPipe()) userListqueryDto: UserListQueryDto,
  ): Promise<UserListResponseDto> {
    const [users, count] = await this.userService.findUsers(userListqueryDto);

    return new UserListResponseDto(users, count);
  }

  @Post()
  // pipe 사용해서 동의 안했으면 요청 거절하게 만들어야함
  public async signUp(
    @Req() request: Request,
    @Res() response: Response,
    @Body() signUpUserFormDto: SignUpFormDataDto,
  ): Promise<Response> {
    try {
      const parsedTokenData = new ParsedGithubUserDetail(
        jwt.verify(request.cookies.GithubUserDetail, process.env.JWT_SECRET),
      );

      const user = await this.userService.registerUser(
        parsedTokenData,
        signUpUserFormDto,
      );

      this.login(response, user);
      deleteCookie(response, GITHUB_USER_DETAIL);

      return response.sendStatus(201);
    } catch (err) {
      if (
        err.name === errName.tokenExpiredError ||
        err.name === errName.jsonWebTokenError
      ) {
        throw new UnauthorizedException(err.message);
      }

      if (err.code === errCode.erDupEntry) {
        throw new UnprocessableEntityException(err.message);
      }

      throw new BadRequestException(err.message);
    }
  }

  private login(response: Response, user: User): void {
    const sessionId = this.userService.instructToSerialize(user);
    setSessionTokenCookie(response, user, sessionId);
  }

  @Get('/:id')
  public async getUser(
    @Param(null, new UserParamPipe()) userParamDto,
  ): Promise<UserResponseDto> {
    const { id } = userParamDto;
    const user = await this.userService.findUser(id);

    if (!user) {
      throw new NotFoundException();
    }

    return new UserResponseDto(user);
  }

  @Get('/:id/videos')
  public async getVideos(
    @Param() videosParamDto,
    @Query() videosQueryDto,
  ): Promise<VideosResponseDto> {
    const { id } = videosParamDto;
    const { page, sort } = videosQueryDto;
    const [videos, count] = await this.userService.findVideosByUser({
      id,
      page,
      sort,
    });

    return {
      count,
      data: videos.map(video => new VideoResponseDto(video)),
    };
  }
}
