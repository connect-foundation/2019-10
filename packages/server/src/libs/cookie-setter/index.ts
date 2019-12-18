import { Response, CookieOptions } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from '../../../entity/user.entity';
import { ONE_DAY_MILLISECONDS, ONE_DAY_SECONDS } from '../../common/constants';

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
      domain: 'wedev.tv',
      maxAge: 30 * ONE_DAY_MILLISECONDS,
      httpOnly: true,
      secure: true,
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
  const sessionJWT = jwt.sign(
    {
      data: { sessionId },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 30 * ONE_DAY_SECONDS,
    },
  );

  return sessionJWT;
}
