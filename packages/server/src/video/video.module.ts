import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Tag } from 'entity/tag.entity';
import { VideoService } from './video.service';
import { User } from '../../entity/user.entity';
import { Video } from '../../entity/video.entity';
import { VideoController } from './video.controller';
import { CommentModule } from '../comment/comment.module';
import { UploadedVideoTableModule } from '../uploaded-video-table/uploaded-video-table.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, User, Tag]),
    UploadedVideoTableModule,
    CommentModule,
  ],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
