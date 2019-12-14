import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Video } from '../../entity/video.entity';
import { UploadedVideoTableModule } from '../uploaded-video-table/uploaded-video-table.module';
import { CommentModule } from '../comment/comment.module';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    UploadedVideoTableModule,
    CommentModule,
  ],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
