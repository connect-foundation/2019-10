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

  // 댓글 작성하기
  public async createComment(
    videoParamDto,
    commentBodyDto,
    userId,
  ): Promise<Comment> {
    // 댓글 리소스 생성하기
    const { content } = commentBodyDto;
    const comment = this.commentRepository.create({
      video: {
        id: videoParamDto.id,
      },
      user: {
        id: userId,
      },
      content,
    });
    await this.commentRepository.save(comment);

    // 비디오의 commentsCount increment 하기
    const video = await this.videoRepository.findOne(videoParamDto.id);
    video.commentsCount = video.commentsCount + 1;
    this.videoRepository.save(video);

    return comment;
  }

  // 답글 작성하기
  public async createReply(
    commentParamDto,
    commentBodyDto,
    userId,
  ): Promise<Comment> {
    // 댓글 리소스 작성하기
    // 부모 댓글과의 관계 설정하기
    const { id: videoId, commentId } = commentParamDto;
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

    // 부모 댓글의 childrenCount를 increment하기
    const parent = await this.commentRepository.findOne(commentId);
    parent.childrenCount = parent.childrenCount + 1;
    await this.commentRepository.save(parent);

    // 비디오의 commentsCount increment 하기
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
