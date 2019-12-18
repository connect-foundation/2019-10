import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { UserSessionService } from '../user-session/user-session.service';
import { UserToken } from '../user-session/model/user-session-token';

@Injectable()
export class MyselfService {
  public constructor(private readonly userSessionService: UserSessionService) {}

  public async findUserSessionInfo(authorization: string): Promise<UserToken> {
    const sessionIdJWT = authorization.split(' ')[1];

    // tslint:disable-next-line: no-any
    const sessionToken: any = jwt.verify(sessionIdJWT, process.env.JWT_SECRET);

    const sessionId: string = sessionToken.data.sessionId;

    const user = await this.userSessionService.deserializeUser(sessionId);

    return user;
  }
}
