import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '../../../typeorm/src/entity/comment.entity';

import { POPULAR } from '../video/constants';
import {
  COMMENT_ITEMS_PER_PAGE,
  COMMENT_QUERY_SELECT_COLUMNS,
} from './constants';
import { getOffset } from '../common/utils/get-offset';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async findComment(id) {
    return await this.commentRepository
      .createQueryBuilder()
      .select('Comment')
      .where({ id })
      .getOne();
  }

  public async findCommentsByVideo({
    videoId,
    page,
    sort,
  }): Promise<Comment[]> {
    const offset = getOffset(page, COMMENT_ITEMS_PER_PAGE);

    const qb = this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .select(COMMENT_QUERY_SELECT_COLUMNS)
      .addSelect(['User.id', 'User.username', 'User.avatar'])
      .limit(COMMENT_ITEMS_PER_PAGE)
      .offset(offset)
      .where({
        parent: {
          id: null,
        },
        video: {
          id: videoId,
        },
      });

    if (sort === POPULAR) {
      return qb.orderBy('Comment_popularity', 'DESC').getMany();
    }

    return qb.orderBy('Comment_createdAt', 'DESC').getMany();
  }

  public async findReplies({ id, videoId, page }): Promise<Comment[]> {
    const offset = getOffset(page, COMMENT_ITEMS_PER_PAGE);

    return await this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .select(COMMENT_QUERY_SELECT_COLUMNS)
      .addSelect(['User.id', 'User.username', 'User.avatar'])
      .limit(COMMENT_ITEMS_PER_PAGE)
      .offset(offset)
      .where({
        parent: {
          id,
        },
        video: {
          id: videoId,
        },
      })
      .orderBy('Comment_createdAt', 'ASC')
      .getMany();
  }
}
