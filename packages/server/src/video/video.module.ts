import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadedVideoTableModule } from 'uploaded-video-table/uploaded-video-table.module';

import { VideoService } from 'video/video.service';
import { VideoController } from 'video/video.controller';
import { CommentModule } from 'comment/comment.module';

import { Video } from '../../../typeorm/src/entity/video.entity';

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
