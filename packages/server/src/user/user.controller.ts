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
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { endpoint, GITHUB_USER_DETAIL } from '../common/constants';
import { UserService } from './user.service';
import { UserListQueryPipe } from './pipe/user-list-query-pipe';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { UserListResponseDto } from './dto/user-list-response.dto';
import { IdParserPipe } from '../common/pipes/id-parser/id-parser.pipe';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';
import { errName, errCode } from '../common/errors';
import { User } from '../../entity/user.entity';
import { setSessionTokenCookie, deleteCookie } from '../libs/cookie-setter';

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

  @Get('/:id')
  public getUserDetail(@Param(IdParserPipe) userId: number) {
    // console.log(userId);
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
}
