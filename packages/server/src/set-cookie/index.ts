import { Response, CookieOptions } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../../typeorm/src/entity/user.entity';
import { ONE_DAY_MILLISECONDS, ONE_DAY_SECONDS } from 'src/constants';
import { UserPublicInfo } from 'src/authentication/model/user-public-info';

export function setSessionTokenCookie(
  response: Response,
  userEntity: User,
  sessionId: string,
): Response {
  const sessionToken = makeSessionJWT(sessionId, userEntity);

  response = this.makeTokenCookie(response, 'SessionToken', sessionToken, {
    maxAge: 30 * ONE_DAY_MILLISECONDS,
    httpOnly: true,
  });

  return response;
}

export function makeTokenCookie(
  response: Response,
  key: string,
  token: string,
  option: CookieOptions,
): Response {
  response.cookie(key, token, option);

  return response;
}

function makeSessionJWT(sessionId: string, userEntity: User): string {
  const userPublicInfo = new UserPublicInfo(userEntity);

  const sessionJWT = jwt.sign(
    {
      data: { sessionId, userPublicInfo },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 30 * ONE_DAY_SECONDS,
    },
  );

  return sessionJWT;
}
