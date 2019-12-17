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
import { endpoint, GITHUB_USER_DETAIL } from '../common/constants';
import { UserService } from '../user/user.service';
import { UserListQueryPipe } from '../user/pipe/user-list-query-pipe';
import { UserListQueryDto } from '../user/dto/user-list-query.dto';
import { UserListResponseDto } from '../user/dto/user-list-response.dto';
import { SignUpFormDataDto } from '../user/dto/sign-up-user-form.dto';
import { ParsedGithubUserDetail } from '../user/model/parsed-github-user-detail';
import { deleteCookie, setSessionTokenCookie } from '../libs/cookie-setter';
import { errName, errCode } from '../common/errors';
import { UserParamPipe } from '../user/pipe/user-param.pipe';
import { UserParamDto } from '../user/dto/user-param.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { UserVideoListParamPipe } from '../user/pipe/user-video-list-param.pipe';
import { UserVideoListParamDto } from '../user/dto/user-video-list-param.dto';
import { UserVideoListQueryDto } from '../user/dto/user-video-list-query.dto';
import { UserVideoListResponseDto } from '../user/dto/user-video-list-response.dto';
import { User } from '../../entity/user.entity';

@Controller(endpoint.users)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/')
  public async getUsers(
    @Query(null, new UserListQueryPipe()) userListqueryDto: UserListQueryDto,
  ): Promise<UserListResponseDto> {
    try {
      const [users, count] = await this.userService.findUsers(userListqueryDto);
      return new UserListResponseDto(users, count);
    } catch (err) {
      throw new BadRequestException();
    }
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
    @Param(null, new UserParamPipe()) userParamDto: UserParamDto,
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
    @Param(null, new UserVideoListParamPipe())
    userVideoListParamDto: UserVideoListParamDto,
    @Query() userVideoListQueryDto: UserVideoListQueryDto,
  ): Promise<UserVideoListResponseDto> {
    const { id } = userVideoListParamDto;
    const { page, sort } = userVideoListQueryDto;
    const [videos, count] = await this.userService.findVideosByUser({
      id,
      page,
      sort,
    });

    return new UserVideoListResponseDto(videos, count);
  }
}
