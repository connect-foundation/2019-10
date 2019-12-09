import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entity/tag.entity';
import { Repository } from 'typeorm';

import * as Redis from 'ioredis';

@Controller()
export class AppController {
  private redis;
  private redis2;

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

  @Get('redis')
  public async redisTest() {
    // await this.redis.set('framework', 'AngularJS');
    const ret = await this.redis.get('framework');

    return ret;
  }

  @Get('redis2')
  public async redisTest2() {
    await this.redis2.set('java', 'JAVA');
    const ret = await this.redis2.get('java');

    return ret;
  }
}
