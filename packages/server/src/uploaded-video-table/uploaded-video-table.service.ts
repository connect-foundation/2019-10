import { Injectable } from '@nestjs/common';
import { UploadedVideoInfo } from './model/uploaded-video-info';
import { CustomMap } from 'src/custom-map/custom-map';

@Injectable()
export class UploadedVideoTableService extends CustomMap<UploadedVideoInfo> {
  public constructor() {
    super();
  }
}
