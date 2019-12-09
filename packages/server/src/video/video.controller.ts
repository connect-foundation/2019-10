import {
  Controller,
  Body,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
} from '@nestjs/common';

import { endpoint } from '../common/constants';
import { VideoService } from './video.service';
import { UploadedVideoInfoDto } from './dto/uploaded-video-info.dto';
import { CommentService } from '../comment/comment.service';
import { VideoListQueryDto } from './dto/video-list-query.dto';
import { VideoListQueryPipe } from './pipe/video-list-query-pipe';
import { VideoListResponseDto } from './dto/video-list-response.dto';
import { VideoParamDto } from './dto/video-param.dto';
import { VideoParamPipe } from './pipe/video-param-pipe';
import { VideoResponseDto } from './dto/video-response.dto';
import { CommentsParamPipe } from './pipe/comments-param-pipe';
import { CommentsQueryPipe } from './pipe/comments-query-pipe';
import { CommentsParamDto } from './dto/comments-param.dto';
import { CommentsQueryDto } from './dto/comments-query.dto';
import { CommentsResponseDto } from './dto/comments-response.dto';
import { CommentResponseDto } from './dto/comment-response.dto';
import { RepliesParamDto } from './dto/replies-param.dto';
import { RepliesQueryDto } from './dto/replies-query.dto';
import { RepliesParamPipe } from './pipe/replies-param-pipe';
import { RepliesQueryPipe } from './pipe/replies-query-pipe';

@Controller(endpoint.videos)
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly commentService: CommentService,
  ) {}

  @Post('/upload')
  public async saveVideoInfo(
    @Body() uploadedVideoInfoDto: UploadedVideoInfoDto,
  ): Promise<boolean> {
    await this.videoService.instructToSerializeVideoInfo(uploadedVideoInfoDto);

    return true;
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

  // @Get('/:id')
  // public async getVideo(
  //   @Param(null, new VideoParamPipe()) videoParamDto: VideoParamDto,
  // ): Promise<VideoResponseDto> {
  //   const { id } = videoParamDto;
  //   const video = await this.videoService.findVideo(id);

  //   if (!video) {
  //     throw new NotFoundException();
  //   }

  //   return new VideoResponseDto(video);
  // }

  // @Get('/:id/comments')
  // public async getComments(
  //   @Param(null, new CommentsParamPipe()) commentsParamDto: CommentsParamDto,
  //   @Query(null, new CommentsQueryPipe()) commentsQueryDto: CommentsQueryDto,
  // ): Promise<CommentsResponseDto> {
  //   const { id } = commentsParamDto;
  //   const { page, sort } = commentsQueryDto;

  //   const video = await this.videoService.findVideo(id);

  //   if (!video) {
  //     throw new NotFoundException();
  //   }

  //   const [comments, count] = await this.commentService.findCommentsByVideo({
  //     videoId: id,
  //     page,
  //     sort,
  //   });

  //   return {
  //     count,
  //     data: comments.map(comment => new CommentResponseDto(comment)),
  //   };
  // }

  // @Get('/:id/comments/:commentId/replies')
  // public async getReplies(
  //   @Param(null, new RepliesParamPipe()) repliesParamDto: RepliesParamDto,
  //   @Query(null, new RepliesQueryPipe()) repliesQueryDto: RepliesQueryDto,
  // ): Promise<CommentsResponseDto> {
  //   const { id, commentId } = repliesParamDto;
  //   const { page } = repliesQueryDto;

  //   const video = await this.videoService.findVideo(id);

  //   if (!video) {
  //     throw new NotFoundException();
  //   }

  //   const comment = await this.commentService.findComment(commentId);

  //   if (!comment) {
  //     throw new NotFoundException();
  //   }

  //   const [comments, count] = await this.commentService.findReplies({
  //     id: commentId,
  //     videoId: id,
  //     page,
  //   });

  //   return {
  //     count,
  //     data: comments.map(item => new CommentResponseDto(item)),
  //   };
  // }
}
