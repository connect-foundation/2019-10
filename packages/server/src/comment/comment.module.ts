import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService } from 'comment/comment.service';

import { Comment } from '../../../typeorm/src/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
