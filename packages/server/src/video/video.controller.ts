import {
  Controller,
  Body,
  Get,
  Query,
  Param,
  NotFoundException,
  Post,
  Patch,
  UseGuards,
  Req,
  Delete,
  ConflictException,
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
import { OnlyMemberGuard } from '../common/guards/only-member.guard';
import { CommentListParamPipe } from '../comment/pipe/comment-list-param.pipe';
import { CommentListParamDto } from '../comment/dto/comment-list-param.dto';
import { CommentListQueryPipe } from '../comment/pipe/comment-list-query.pipe';
import { CommentListQueryDto } from '../comment/dto/comment-list-query.dto';
import { CommentListResponseDto } from '../comment/dto/comment-list-response.dto';
import { ReplyListParamPipe } from '../comment/pipe/reply-list-param.pipe';
import { ReplyListQueryPipe } from '../comment/pipe/reply-list-query.pipe';
import { ReplyListParamDto } from '../comment/dto/reply-list-param.dto';
import { ReplyListQueryDto } from '../comment/dto/reply-list-query.dto';
import { CommentResponseDto } from '../comment/dto/comment-response.dto';

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
    @Query(new VideoListQueryPipe()) videoListQueryDto: VideoListQueryDto,
  ): Promise<VideoListResponseDto> {
    const [videos, count] = await this.videoService.findVideos(
      videoListQueryDto,
    );

    return new VideoListResponseDto(videos, count);
  }

  // 동영상 좋아요
  @Post('/:id/likes')
  @UseGuards(OnlyMemberGuard)
  public async likeVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const { id } = videoParamDto;
    const { userId } = request.user;

    const video = await this.videoService.findVideo(id);
    if (!video) {
      throw new NotFoundException();
    }

    const likedByUser = await this.videoService.checkLikedByUser(id, userId);
    if (likedByUser) {
      throw new ConflictException('Already liked the video');
    }

    const likedVideo = await this.videoService.likeVideo(id, userId);

    const likes = await this.videoService.findVideoLikes(id, userId);

    return new VideoResponseDto(likedVideo, likes);
  }

  // 동영상 좋아요 취소
  @Delete('/:id/likes')
  @UseGuards(OnlyMemberGuard)
  public async unlikeVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const { id } = videoParamDto;
    const { userId } = request.user;

    const video = await this.videoService.findVideo(id);
    if (!video) {
      throw new NotFoundException();
    }

    const likedByUser = await this.videoService.checkLikedByUser(id, userId);
    if (!likedByUser) {
      throw new NotFoundException('Video is not liked by the user');
    }

    const unlikedVideo = await this.videoService.unlikeVideo(id, userId);

    const likes = await this.videoService.findVideoLikes(id, userId);

    return new VideoResponseDto(unlikedVideo, likes);
  }

  // 동영상 가져오기
  @Get('/:id')
  public async getVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const { id } = videoParamDto;
    const video = await this.videoService.findVideo(id);

    if (!video) {
      throw new NotFoundException();
    }

    if (!request.user) {
      return new VideoResponseDto(video, []);
    }

    const likes = await this.videoService.findVideoLikes(
      id,
      request.user.userId,
    );

    return new VideoResponseDto(video, likes);
  }

  // 댓글 작성하기
  @Post('/:id/comments')
  @UseGuards(OnlyMemberGuard)
  public async createComment(
    @Req() request: Request,
    @Param() videoParamDto,
    @Body() commentBodyDto,
  ) {
    const { userId } = request.user;
    const comment = await this.commentService.createComment(
      videoParamDto,
      commentBodyDto,
      userId,
    );
    return new CommentResponseDto(comment);
  }

  // 답글 작성하기
  @Post('/:id/comments/:commentId')
  @UseGuards(OnlyMemberGuard)
  public async createReply(
    @Req() request: Request,
    @Param() commentParamDto,
    @Body() commentBodyDto,
  ) {
    const { userId } = request.user;
    const reply = await this.commentService.createReply(
      commentParamDto,
      commentBodyDto,
      userId,
    );
    return new CommentResponseDto(reply);
  }

  // 댓글 리스트 가져오기
  @Get('/:id/comments')
  public async getComments(
    @Param(new CommentListParamPipe())
    commentListParamDto: CommentListParamDto,
    @Query(new CommentListQueryPipe())
    commentListQueryDto: CommentListQueryDto,
  ): Promise<CommentListResponseDto> {
    const id = commentListParamDto.id as number;
    const { page, sort } = commentListQueryDto;

    const video = await this.videoService.findVideo(id);

    if (!video) {
      throw new NotFoundException();
    }

    const [comments, count] = await this.commentService.findCommentsByVideo({
      videoId: id,
      page,
      sort,
    });

    return new CommentListResponseDto(comments, count);
  }

  // 댓글의 답글 리스트 가져오기
  @Get('/:id/comments/:commentId/replies')
  public async getReplies(
    @Param(new ReplyListParamPipe()) repliesParamDto: ReplyListParamDto,
    @Query(new ReplyListQueryPipe()) repliesQueryDto: ReplyListQueryDto,
  ): Promise<CommentListResponseDto> {
    const id = repliesParamDto.id as number;
    const commentId = repliesParamDto.commentId as number;
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

    return new CommentListResponseDto(comments, count);
  }
}
