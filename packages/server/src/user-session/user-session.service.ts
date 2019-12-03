import { Injectable } from '@nestjs/common';

import { CustomMap } from 'libs/custom-map';
import { UserToken } from 'user-session/model/user-session-token';

@Injectable()
export class UserSessionService extends CustomMap<UserToken> {
  public constructor() {
    super();
  }
}
