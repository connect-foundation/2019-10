import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';
import * as Redis from 'ioredis';

import { UserToken } from './model/user-session-token';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserSessionService {
  private userSessionTable: Redis.Redis;

  public constructor() {
    this.userSessionTable = new Redis({
      port: parseInt(process.env.REDIS_USER_TABLE_PORT, 10),
      host: process.env.REDIS_USER_TABLE_HOST,
    });
  }

  public async serializeUser(userEntity: User): Promise<string> {
    const sessionId = v1();
    const userToken = new UserToken(userEntity);

    await this.insert(sessionId, userToken);

    return sessionId;
  }

  public async deserializeUser(id: string): Promise<UserToken> {
    const userToken = JSON.parse(await this.find(id));
    return userToken;
  }

  private async insert(id: string, userToken: UserToken): Promise<void> {
    await this.userSessionTable.set(id, JSON.stringify(userToken));
  }

  private async find(id: string): Promise<string> {
    // JSON.parse 예외처리
    return this.userSessionTable.get(id);
  }

  public async remove(id: string): Promise<number> {
    const ret = await this.userSessionTable.del(id);
    return ret;
  }
}
