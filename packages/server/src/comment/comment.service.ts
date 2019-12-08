import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { getOffset } from '../libs/get-offset';
import {
  COMMENT_ITEMS_PER_PAGE,
  COMMENT_QUERY_SELECT_COLUMNS,
  USER_QUERY_SELECT_COLUMNS,
  POPULAR,
} from '../common/constants';
import { Comment } from '../../entity/comment.entity';
import { Video } from '../../entity/video.entity';

@Injectable()
export class CommentService {
  public constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async createComment(
    videoId: number,
    userId: number,
    commentBodyDto: CommentBodyDto,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      video: {
        id: videoId,
      },
      user: {
        id: userId,
      },
      content: commentBodyDto.content,
    });
    await this.commentRepository.save(comment);

    const video = await this.videoRepository.findOne(videoId);
    video.commentsCount = video.commentsCount + 1;
    this.videoRepository.save(video);

    return comment;
  }

  public async createReply(
    videoId: number,
    commentId: number,
    userId: number,
    commentBodyDto: CommentBodyDto,
  ): Promise<Comment> {
    const { content } = commentBodyDto;
    const reply = await this.commentRepository.create({
      video: {
        id: videoId,
      },
      user: {
        id: userId,
      },
      parent: {
        id: commentId,
      },
      content,
    });
    await this.commentRepository.save(reply);

    const parent = await this.commentRepository.findOne(commentId);
    parent.childrenCount = parent.childrenCount + 1;
    await this.commentRepository.save(parent);

    const video = await this.videoRepository.findOne(videoId);
    video.commentsCount = video.commentsCount + 1;
    await this.videoRepository.save(video);

    return reply;
  }

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
        status: 1,
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
