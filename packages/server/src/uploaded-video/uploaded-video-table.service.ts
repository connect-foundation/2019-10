import { Injectable } from '@nestjs/common';
import { UploadedVideoInfo } from './dto/uploaded-video-info.dto';

@Injectable()
export class UploadedVideoTableService {
  public readonly table: Map<string, UploadedVideoInfo>;

  public constructor() {
    this.table = new Map<string, UploadedVideoInfo>();
  }

  public insert(id: string, value: UploadedVideoInfo) {
    return this.table.set(id, value);
  }

  public find(id: string): UploadedVideoInfo {
    return this.table.get(id);
  }

  public remove(id: string): boolean {
    return this.table.delete(id);
  }

  public contains(id: string): boolean {
    return this.table.has(id);
  }
}
