import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService } from './comment.service';
import { Comment } from '../../entity/comment.entity';
import { Video } from '../../entity/video.entity';
import { User } from '../../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Video, User])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
