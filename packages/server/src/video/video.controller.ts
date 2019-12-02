import {
  Controller,
  Body,
  Get,
  Query,
  UsePipes,
  Param,
  NotFoundException,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VideoService } from './video.service';

import { UploadedVideoTableService } from '../uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from '../uploaded-video/dto/uploaded-video-info.dto';

import { VideoResponseDto } from './dto/video-response.dto';
import { VideosQueryDto } from './dto/videos-query.dto';
import { CommentService } from '../comment/comment.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { VideosResponseDto } from './dto/videos-response.dto';
import { CommentsResponseDto } from './dto/comments-response.dto';
import { CommentsQueryDto } from './dto/comments-query.dto';
import { CommentsParamDto } from './dto/comments-param.dto';
import { RepliesParamDto } from './dto/replies-param.dto';
import { RepliesQueryDto } from './dto/replies-query.dto';
import { CommentsParamPipe } from './pipe/comments-param-pipe';
import { CommentsQueryPipe } from './pipe/comments-query-pipe';
import { RepliesParamPipe } from './pipe/replies-param-pipe';
import { RepliesQueryPipe } from './pipe/replies-query-pipe';
import { VideosQueryPipe } from './pipe/videos-query-pipe';
import { VideoParamPipe } from './pipe/video-param-pipe';
import { VideoParamDto } from './dto/video-param.dto';

@Controller('videos')
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
    private readonly commentService: CommentService,
  ) {}

  @Post('upload')
  public saveVideoInfo(@Body() uploadedVideoInfo: UploadedVideoInfo) {
    return this.uploadedVideoTableService.insert(
      uploadedVideoInfo.id,
      uploadedVideoInfo,
    );
  }

  @Get('/')
  public async getVideos(
    @Query(null, new VideosQueryPipe()) videosQueryDto: VideosQueryDto,
  ): Promise<VideosResponseDto> {
    const [videos, count] = await this.videoService.findVideos(videosQueryDto);

    return {
      count,
      data: videos.map(video => new VideoResponseDto(video)),
    };
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

  // @Post('/:id/comments')
  // public async createComment() {
  //   return {};
  // }

  // @Put('/:id/comments/:commentId')
  // public async updateComment() {
  //   return {};
  // }

  // @Delete('/:id/comments/:commentId')
  // public async deleteComment() {
  //   return {};
  // }
}
