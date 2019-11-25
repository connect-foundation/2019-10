import { Module } from '@nestjs/common';
import { UploadedVideoTableService } from './uploaded-video-table.service';

@Module({
  providers: [UploadedVideoTableService],
  exports: [UploadedVideoTableService],
})
export class UploadedVideoTableModule {}
