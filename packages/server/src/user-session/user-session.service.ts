import { Injectable } from '@nestjs/common';

import { UserToken } from './model/user-session-token';
import { CustomMap } from 'src/libs/custom-map/custom-map';

@Injectable()
export class UserSessionService extends CustomMap<UserToken> {
  public constructor() {
    super();
  }
}
