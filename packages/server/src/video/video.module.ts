import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { UploadedVideoTableModule } from 'src/uploaded-video-table/uploaded-video-table.module';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), UploadedVideoTableModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
