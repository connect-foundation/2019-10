import { Response, CookieOptions } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../../../typeorm/src/entity/user.entity';
import { ONE_DAY_MILLISECONDS, ONE_DAY_SECONDS } from 'common/constants';
import { UserPublicInfo } from 'authentication/model/user-public-info';

export function deleteCookie(response: Response, name: string): void {
  setTokenOnResponseCookie(response, name, '', {
    maxAge: 0,
    httpOnly: true,
  });
}

export function setSessionTokenCookie(
  response: Response,
  userEntity: User,
  sessionId: string,
): void {
  const sessionToken = makeSessionJWT(sessionId, userEntity);

  setTokenOnResponseCookie(
    response,
    process.env.JWT_SESSION_TOKEN_KEY,
    sessionToken,
    {
      maxAge: 30 * ONE_DAY_MILLISECONDS,
      httpOnly: true,
    },
  );
}

export function setTokenOnResponseCookie(
  response: Response,
  key: string,
  token: string,
  option: CookieOptions,
): void {
  response.cookie(key, token, option);
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
