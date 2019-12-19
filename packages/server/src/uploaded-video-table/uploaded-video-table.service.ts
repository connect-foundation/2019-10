import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

import { UploadedVideoInfo } from './model/uploaded-video-info';

@Injectable()
export class UploadedVideoTableService {
  private uploadedVideoInfoTable: Redis.Redis;

  public constructor() {
    this.uploadedVideoInfoTable = new Redis({
      port: parseInt(process.env.REDIS_VIDEO_TABLE_PORT, 10),
      host: process.env.REDIS_VIDEO_TABLE_HOST,
    });
  }

  public async insert(
    id: string,
    uploadedVideoInfo: UploadedVideoInfo,
  ): Promise<void> {
    await this.uploadedVideoInfoTable.set(
      id,
      JSON.stringify(uploadedVideoInfo),
    );
  }

  // public async find(id: string): Promise<UploadedVideoInfo> {
  public async find(id: string): Promise<UploadedVideoInfo> {
    const result = await this.uploadedVideoInfoTable
      .multi()
      .get(id)
      .del(id)
      .exec();

    const uploadedVideoInfo = result[0][1];

    return JSON.parse(uploadedVideoInfo);
    // return JSON.parse(await this.uploadedVideoInfoTable.get(id));
  }

  public async remove(id: string): Promise<number> {
    return await this.uploadedVideoInfoTable.del(id);
  }
}
