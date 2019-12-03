import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  POPULAR,
  COMMENT_ITEMS_PER_PAGE,
  COMMENT_QUERY_SELECT_COLUMNS,
  USER_QUERY_SELECT_COLUMNS,
} from 'common/constants';
import { getOffset } from 'libs/get-offset';

import { Comment } from '../../../typeorm/src/entity/comment.entity';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async findComment(id): Promise<Comment> {
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
  }): Promise<[Comment[], number]> {
    const offset = getOffset(page, COMMENT_ITEMS_PER_PAGE);

    const qb = this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .select(COMMENT_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
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
      return qb
        .orderBy('Comment_popularity', 'DESC')
        .addOrderBy('Comment_createdAt', 'DESC')
        .addOrderBy('Comment_id', 'DESC')
        .getManyAndCount();
    }

    return qb
      .orderBy('Comment_createdAt', 'DESC')
      .addOrderBy('Comment_popularity', 'DESC')
      .addOrderBy('Comment_id', 'DESC')
      .getManyAndCount();
  }

  public async findReplies({
    id,
    videoId,
    page,
  }): Promise<[Comment[], number]> {
    const offset = getOffset(page, COMMENT_ITEMS_PER_PAGE);

    return await this.commentRepository
      .createQueryBuilder()
      .leftJoin('Comment.user', 'User')
      .select(COMMENT_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
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
      .orderBy('Comment_popularity', 'DESC')
      .addOrderBy('Comment_createdAt', 'DESC')
      .addOrderBy('Comment_id', 'DESC')
      .getManyAndCount();
  }
}
