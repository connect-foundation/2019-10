import { Controller, Req, Get } from '@nestjs/common';
import { Request } from 'express';

import { endpoint } from '../common/constants';
import { MyselfService } from './myself.service';
import { UserToken } from '../user-session/model/user-session-token';

@Controller(endpoint.myself)
export class MyselfController {
  public constructor(private readonly myselfService: MyselfService) {}

  @Get()
  public async getCurrentUserInfo(@Req() request: Request): Promise<UserToken> {
    try {
      const authorization = request.headers.authorization;

      // console.log({ authorization });

      if (!authorization) {
        throw new Error('authorization is not provided');
      }

      const user = await this.myselfService.findUserSessionInfo(authorization);

      return user;
    } catch (err) {
      return null;
    }
  }
}
