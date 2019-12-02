import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserSessionService } from 'src/user-session/user-session.service';
import { SessionJWTData } from 'src/authentication/model/session-jwt-data';

declare global {
  namespace Express {
    interface Request {
      user?: {};
    }
  }
}

@Injectable()
export class DeserializerMiddleware implements NestMiddleware {
  public constructor(private readonly userSessionService: UserSessionService) {}

  public use(request: Request, response: Response, next: () => void): void {
    const sessionToken = request.cookies.SessionToken;

    if (!sessionToken) {
      return next();
    }

    // tslint:disable-next-line: no-any
    const token: any = jwt.verify(sessionToken, process.env.JWT_SECRET);

    const tokenData = new SessionJWTData(
      token.data.sessionId,
      token.data.userPublicInfo,
    );

    if (!tokenData.sessionId) {
      return next();
    }

    const userToken = this.userSessionService.find(tokenData.sessionId);

    if (userToken) {
      request.user = userToken;
    }

    return next();
  }
}
