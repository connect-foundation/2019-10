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
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserService } from './user.service';
import { IdParserPipe } from 'src/common/pipes/id-parser/id-parser.pipe';
import { SignUpFormDataDto } from './dto/sign-up-user-form.dto';
import { ParsedGithubUserDetail } from './model/parsed-github-user-detail';
import { errName, errCode } from 'src/error';
import { endpoint, clientPath } from 'src/constants';
import { setSessionTokenCookie } from 'src/set-cookie';
import { User } from '../../../typeorm/src/entity/user.entity';

@Controller(endpoint.users)
export class UserController {
  public constructor(private readonly userService: UserService) {}

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
        jwt.verify(request.cookies.githubUserDetail, process.env.JWT_SECRET),
      );

      const user = await this.userService.registerUser(
        parsedTokenData,
        signUpUserFormDto,
      );

      response = this.login(response, user);
      response.header('Access-Control-Allow-Credentials', 'true');

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

  private login(response: Response, user: User): Response {
    const sessionId = this.userService.instructToSerialize(user);
    response = setSessionTokenCookie(response, user, sessionId);

    return response;
  }
}
