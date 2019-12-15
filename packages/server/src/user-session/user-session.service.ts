import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

import { UserToken } from './model/user-session-token';

@Injectable()
export class UserSessionService {
  private userSessionTable: Redis.Redis;

  public constructor() {
    this.userSessionTable = new Redis({
      port: parseInt(process.env.REDIS_USER_TABLE_PORT, 10),
      host: process.env.REDIS_USER_TABLE_HOST,
    });
  }

  public async insert(id: string, userToken: UserToken): Promise<void> {
    await this.userSessionTable.set(id, JSON.stringify(userToken));
  }

  public async find(id: string): Promise<string> {
    return this.userSessionTable.get(id); // JSON.parse 예외처리
  }

  public async remove(id: string): Promise<number> {
    const ret = await this.userSessionTable.del(id);
    return ret;
  }
}
