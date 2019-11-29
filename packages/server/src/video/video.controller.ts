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

import { GetVideosPipe } from '../common/pipes/get-videos.pipe';
import { UploadedVideoTableService } from '../uploaded-video/uploaded-video-table.service';
import { UploadedVideoInfo } from '../uploaded-video/dto/uploaded-video-info.dto';

import { VideosQueryDto, VideoResponseDto } from './dto';
import { CommentService } from '../comment/comment.service';
import { CommentResponseDto } from './dto/comment-response.dto';
import { CommentsResponseDto } from './dto/comments-response.dto';

import { CommentsParamPipe } from './pipe/comments-param-pipe';
import { CommentsQueryPipe } from './pipe/comments-query-pipe';
import { CommentsQueryDto } from './dto/comments-query.dto';
import { CommentsParamDto } from './dto/comments-param.dto';

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
  @UsePipes(GetVideosPipe)
  public async getVideos(
    @Query() videosQueryDto: VideosQueryDto,
  ): Promise<VideoResponseDto[]> {
    const videos = await this.videoService.findVideos(videosQueryDto);

    return videos.map(video => new VideoResponseDto(video));
  }

  @Get('/:id')
  public async getVideo(@Param('id') id: string): Promise<VideoResponseDto> {
    const video = await this.videoService.findVideo(parseInt(id, 10));

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
    @Param('id') id: string,
    @Param('commentId') commentId: string,
    @Query('page') page: string,
  ): Promise<CommentResponseDto[]> {
    const video = await this.videoService.findVideo(parseInt(id, 10));

    if (!video) {
      throw new NotFoundException();
    }

    const comment = await this.commentService.findComment(
      parseInt(commentId, 10),
    );

    if (!comment) {
      throw new NotFoundException();
    }

    const comments = await this.commentService.findReplies({
      id: parseInt(commentId, 10),
      videoId: parseInt(id, 10),
      page: parseInt(page, 10),
    });

    return comments.map(item => new CommentResponseDto(item));
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
