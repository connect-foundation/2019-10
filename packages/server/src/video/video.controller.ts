import {
  Controller,
  Body,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { endpoint } from 'common/constants';

import { VideoService } from 'video/video.service';
import { CommentService } from 'comment/comment.service';
import { UploadedVideoInfoDto } from 'video/dto/uploaded-video-info.dto';
import { VideoListQueryPipe } from 'video/pipe/video-list-query-pipe';
import { VideoListQueryDto } from 'video/dto/video-list-query.dto';
import { VideoListResponseDto } from 'video/dto/video-list-response.dto';
import { VideoResponseDto } from 'video/dto/video-response.dto';
import { VideoParamPipe } from 'video/pipe/video-param-pipe';
import { VideoParamDto } from 'video/dto/video-param.dto';
import { CommentsParamPipe } from 'video/pipe/comments-param-pipe';
import { CommentsParamDto } from 'video/dto/comments-param.dto';
import { CommentsQueryPipe } from 'video/pipe/comments-query-pipe';
import { CommentsQueryDto } from 'video/dto/comments-query.dto';
import { CommentsResponseDto } from 'video/dto/comments-response.dto';
import { CommentResponseDto } from 'video/dto/comment-response.dto';
import { RepliesParamPipe } from 'video/pipe/replies-param-pipe';
import { RepliesParamDto } from 'video/dto/replies-param.dto';
import { RepliesQueryPipe } from 'video/pipe/replies-query-pipe';
import { RepliesQueryDto } from 'video/dto/replies-query.dto';

@Controller(endpoint.videos)
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly commentService: CommentService,
  ) {}

  @Post('upload')
  public saveVideoInfo(
    @Body() uploadedVideoInfoDto: UploadedVideoInfoDto,
  ): void {
    this.videoService.instructToSerializeVideoInfo(uploadedVideoInfoDto);
  }

  @Get('/')
  public async getVideos(
    @Query(null, new VideoListQueryPipe()) videoListQueryDto: VideoListQueryDto,
  ): Promise<VideoListResponseDto> {
    const [videos, count] = await this.videoService.findVideos(
      videoListQueryDto,
    );

    return new VideoListResponseDto(videos, count);
  }

  @Get('/:id')
  public async getVideo(
    @Param(null, new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const { id } = videoParamDto;
    const video = await this.videoService.findVideo(id);

    if (!video) {
      throw new NotFoundException();
    }

    return new VideoResponseDto(video);
  }

  @Get('/:id/comments')
  public async getComments(
    @Param(null, new CommentsParamPipe()) commentsParamDto: CommentsParamDto,
    @Query(null, new CommentsQueryPipe()) commentsQueryDto: CommentsQueryDto,
  ): Promise<CommentsResponseDto> {
    const { id } = commentsParamDto;
    const { page, sort } = commentsQueryDto;

    const video = await this.videoService.findVideo(id);

    if (!video) {
      throw new NotFoundException();
    }

    const [comments, count] = await this.commentService.findCommentsByVideo({
      videoId: id,
      page,
      sort,
    });

    return {
      count,
      data: comments.map(comment => new CommentResponseDto(comment)),
    };
  }

  @Get('/:id/comments/:commentId/replies')
  public async getReplies(
    @Param(null, new RepliesParamPipe()) repliesParamDto: RepliesParamDto,
    @Query(null, new RepliesQueryPipe()) repliesQueryDto: RepliesQueryDto,
  ): Promise<CommentsResponseDto> {
    const { id, commentId } = repliesParamDto;
    const { page } = repliesQueryDto;

    const video = await this.videoService.findVideo(id);

    if (!video) {
      throw new NotFoundException();
    }

    const comment = await this.commentService.findComment(commentId);

    if (!comment) {
      throw new NotFoundException();
    }

    const [comments, count] = await this.commentService.findReplies({
      id: commentId,
      videoId: id,
      page,
    });

    return {
      count,
      data: comments.map(item => new CommentResponseDto(item)),
    };
  }
}
