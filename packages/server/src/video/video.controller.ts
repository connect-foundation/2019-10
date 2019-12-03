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
import { VideoService } from 'video/video.service';
import { CommentService } from 'comment/comment.service';
import { UploadedVideoTableService } from 'uploaded-video-table/uploaded-video-table.service';
import { UploadedVideoInfoDto } from 'video/dto/uploaded-video-info.dto';
import { UploadedVideoInfo } from 'uploaded-video-table/model/uploaded-video-info';
import { VideosQueryPipe } from 'video/pipe/videos-query-pipe';
import { VideosQueryDto } from 'video/dto/videos-query.dto';
import { VideosResponseDto } from 'video/dto/videos-response.dto';
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

@Controller('videos')
export class VideoController {
  public constructor(
    private readonly videoService: VideoService,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
    private readonly commentService: CommentService,
  ) {}

  @Post('upload')
  public saveVideoInfo(@Body() uploadedVideoInfoDto: UploadedVideoInfoDto) {
    return this.uploadedVideoTableService.insert(
      uploadedVideoInfoDto.id,
      new UploadedVideoInfo(uploadedVideoInfoDto),
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
