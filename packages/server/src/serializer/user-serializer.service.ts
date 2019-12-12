import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';

import { User } from '../../entity/user.entity';
import { UserSessionService } from '../user-session/user-session.service';
import { UserToken } from '../user-session/model/user-session-token';

@Injectable()
export class UserSerializerService {
  public constructor(private readonly userSessionService: UserSessionService) {}

  public serializeUser(userEntity: User): string {
    const sessionId = v1();
    const userToken = new UserToken(userEntity);

    this.userSessionService.insert(sessionId, userToken);

    return sessionId;
  }
}
