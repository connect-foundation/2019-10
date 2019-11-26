import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../../../typeorm/src/entity/comment.entity';
import { Video } from '../../../typeorm/src/entity/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
