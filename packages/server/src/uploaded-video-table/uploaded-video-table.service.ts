import { Injectable } from '@nestjs/common';
import { CustomMap } from 'libs/custom-map';
import { UploadedVideoInfo } from 'uploaded-video-table/model/uploaded-video-info';

@Injectable()
export class UploadedVideoTableService extends CustomMap<UploadedVideoInfo> {
  public constructor() {
    super();
  }
}
