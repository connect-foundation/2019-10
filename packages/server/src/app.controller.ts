import { Controller, Get } from '@nestjs/common';

import * as Redis from 'ioredis';

@Controller()
export class AppController {
  private redis: Redis.Redis;
  private redis2: Redis.Redis;

  public constructor() {
    this.redis = new Redis({
      port: parseInt(process.env.REDIS_VIDEO_TABLE_PORT, 10),
      host: process.env.REDIS_VIDEO_TABLE_HOST,
    });

    this.redis2 = new Redis({
      port: parseInt(process.env.REDIS_USER_TABLE_PORT, 10),
      host: process.env.REDIS_USER_TABLE_HOST,
    });
  }
  @Get()
  public test() {
    return '200 OK';
  }

  @Get('/redis')
  public async redisTest() {
    // await this.redis.set('framework', 'AngularJS');
    const ret = await this.redis.get('framework');

    return ret;
  }

  @Get('/redis2')
  public async redisTest2() {
    await this.redis2.set('java', 'JAVA');
    const ret = await this.redis2.get('java');

    return ret;
  }
}
