import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { UploadedVideoTableModule } from '../uploaded-video/uploaded-video-table.module';
import { CommentModule } from '../comment/comment.module';

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
