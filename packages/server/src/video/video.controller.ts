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
  ForbiddenException,
} from '@nestjs/common';
import { endpoint } from '../common/constants';
import { VideoService } from './video.service';
import { UploadedVideoInfoDto } from './dto/uploaded-video-info.dto';
import { CommentService } from '../comment/comment.service';
import { VideoListQueryDto } from './dto/video-list-query.dto';
import { VideoListResponseDto } from './dto/video-list-response.dto';
import { VideoParamDto } from './dto/video-param.dto';
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
import { VideoParamPipe } from './pipe/video-param.pipe';
import { VideoListQueryPipe } from './pipe/video-list-query.pipe';
import { CommentCreateBodyPipe } from '../comment/pipe/comment-create-body.pipe';
import { CommentBodyDto } from '../comment/dto/comment-body.dto';
import { CommentParamPipe } from '../comment/pipe/comment-param.pipe';
import { CommentParamDto } from '../comment/dto/comment-param.dto';
import { CommentUpdateBodyPipe } from '../comment/pipe/comment-update-body.pipe';

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

  @Get('/:id')
  public async getVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const id = videoParamDto.id as number;
    const video = await this.checkVideoExistence(id);

    if (!request.user) {
      return new VideoResponseDto(video);
    }

    const likes = await this.videoService.findVideoLikes(
      id,
      request.user.userId,
    );

    return new VideoResponseDto(video, likes);
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

  @Post('/:id/likes')
  @UseGuards(OnlyMemberGuard)
  public async likeVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const id = videoParamDto.id as number;
    const { userId } = request.user;

    await this.checkVideoExistence(id);

    const likedByUser = await this.videoService.checkLikedByUser(id, userId);
    if (likedByUser) {
      throw new ConflictException('Already liked the video');
    }

    const likedVideo = await this.videoService.likeVideo(id, userId);

    const likes = await this.videoService.findVideoLikes(id, userId);

    return new VideoResponseDto(likedVideo, likes);
  }

  @Delete('/:id/likes')
  @UseGuards(OnlyMemberGuard)
  public async unlikeVideo(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
  ): Promise<VideoResponseDto> {
    const id = videoParamDto.id as number;
    const { userId } = request.user;

    await this.checkVideoExistence(id);

    const likedByUser = await this.videoService.checkLikedByUser(id, userId);
    if (!likedByUser) {
      throw new NotFoundException('Video is not liked by the user');
    }

    const unlikedVideo = await this.videoService.unlikeVideo(id, userId);

    const likes = await this.videoService.findVideoLikes(id, userId);

    return new VideoResponseDto(unlikedVideo, likes);
  }

  @Post('/:id/comments')
  @UseGuards(OnlyMemberGuard)
  public async createComment(
    @Req() request: Request,
    @Param(new VideoParamPipe()) videoParamDto: VideoParamDto,
    @Body(new CommentCreateBodyPipe()) commentBodyDto: CommentBodyDto,
  ) {
    const id = videoParamDto.id as number;
    const { userId } = request.user;

    await this.checkVideoExistence(id);

    const comment = await this.commentService.createComment(
      id,
      userId,
      commentBodyDto,
    );
    return new CommentResponseDto(comment);
  }

  @Post('/:id/comments/:commentId')
  @UseGuards(OnlyMemberGuard)
  public async createReply(
    @Req() request: Request,
    @Param(new CommentParamPipe()) commentParamDto: CommentParamDto,
    @Body(new CommentCreateBodyPipe()) commentBodyDto: CommentBodyDto,
  ) {
    const id = commentParamDto.id as number;
    const commentId = commentParamDto.commentId as number;
    const { userId } = request.user;

    await this.checkVideoExistence(id);

    const reply = await this.commentService.createReply(
      id,
      commentId,
      userId,
      commentBodyDto,
    );
    return new CommentResponseDto(reply);
  }

  @Get('/:id/comments')
  public async getComments(
    @Req() request: Request,
    @Param(new CommentListParamPipe())
    commentListParamDto: CommentListParamDto,
    @Query(new CommentListQueryPipe())
    commentListQueryDto: CommentListQueryDto,
  ): Promise<CommentListResponseDto> {
    const id = commentListParamDto.id as number;
    const page = commentListQueryDto.page as number;
    const { sort } = commentListQueryDto;

    await this.checkVideoExistence(id);

    const [comments, count] = await this.commentService.findCommentsByVideo(
      id,
      page,
      sort,
    );

    if (!request.user) {
      return new CommentListResponseDto(comments, count);
    }

    const likes = await this.commentService.findCommentsLikes(
      comments,
      request.user.userId,
    );
    return new CommentListResponseDto(comments, count, likes);
  }

  @Get('/:id/comments/:commentId/replies')
  public async getReplies(
    @Req() request: Request,
    @Param(new ReplyListParamPipe()) repliesParamDto: ReplyListParamDto,
    @Query(new ReplyListQueryPipe()) repliesQueryDto: ReplyListQueryDto,
  ): Promise<CommentListResponseDto> {
    const id = repliesParamDto.id as number;
    const commentId = repliesParamDto.commentId as number;
    const page = repliesQueryDto.page as number;

    await this.checkVideoExistence(id);
    await this.checkCommentExistence(id, commentId);

    const comment = await this.commentService.findComment(commentId);

    if (!comment) {
      throw new NotFoundException();
    }

    const [comments, count] = await this.commentService.findReplies(
      id,
      commentId,
      page,
    );

    if (!request.user) {
      return new CommentListResponseDto(comments, count);
    }

    const likes = await this.commentService.findCommentsLikes(
      comments,
      request.user.userId,
    );

    return new CommentListResponseDto(comments, count, likes);
  }

  @Patch('/:id/comments/:commentId')
  @UseGuards(OnlyMemberGuard)
  public async updateComment(
    @Req() request: Request,
    @Param(new CommentParamPipe()) commentParamDto: CommentParamDto,
    @Body(new CommentUpdateBodyPipe()) commentBodyDto: CommentBodyDto,
  ) {
    const { userId } = request.user;
    const id = commentParamDto.id as number;
    const commentId = commentParamDto.commentId as number;

    await this.checkVideoExistence(id);
    await this.checkCommentExistence(id, commentId);

    const comment = await this.commentService.findComment(commentId);
    if (comment.user.id !== userId) {
      throw new ForbiddenException();
    }

    const updatedComment = await this.commentService.updateComment(
      commentBodyDto,
      comment,
    );

    return new CommentResponseDto(updatedComment);
  }

  @Delete('/:id/comments/:commentId')
  @UseGuards(OnlyMemberGuard)
  public async deleteComment(
    @Req() request: Request,
    @Param(new CommentParamPipe()) commentParamDto: CommentParamDto,
  ) {
    const { userId } = request.user;
    const id = commentParamDto.id as number;
    const commentId = commentParamDto.commentId as number;

    await this.checkVideoExistence(id);
    await this.checkCommentExistence(id, commentId);

    const comment = await this.commentService.findComment(commentId);
    if (comment.user.id !== userId) {
      throw new ForbiddenException();
    }

    const deletedComment = await this.commentService.deleteComment(comment);

    return new CommentResponseDto(deletedComment);
  }

  @Post('/:id/comments/:commentId/likes')
  @UseGuards(OnlyMemberGuard)
  public async likeComment(
    @Req() request: Request,
    @Param(new CommentParamPipe()) commentParamDto: CommentParamDto,
  ) {
    const { userId } = request.user;
    const id = commentParamDto.id as number;
    const commentId = commentParamDto.commentId as number;

    await this.checkVideoExistence(id);
    await this.checkCommentExistence(id, commentId);

    const likedByUser = await this.commentService.checkLikedByUser(
      commentId,
      userId,
    );
    if (likedByUser) {
      throw new ConflictException('Already liked the video');
    }

    const likedComment = await this.commentService.likeComment(
      commentId,
      userId,
    );

    return new CommentResponseDto(likedComment);
  }

  @Delete('/:id/comments/:commentId/likes')
  @UseGuards(OnlyMemberGuard)
  public async unlikeComment(
    @Req() request: Request,
    @Param(new CommentParamPipe()) commentParamDto: CommentParamDto,
  ) {
    const { userId } = request.user;
    const id = commentParamDto.id as number;
    const commentId = commentParamDto.commentId as number;

    await this.checkVideoExistence(id);
    await this.checkCommentExistence(id, commentId);

    const likedByUser = await this.commentService.checkLikedByUser(
      commentId,
      userId,
    );
    if (!likedByUser) {
      throw new NotFoundException('Video is not liked by the user');
    }

    const unlikedComment = await this.commentService.unlikeComment(
      commentId,
      userId,
    );

    return new CommentResponseDto(unlikedComment);
  }

  private async checkVideoExistence(id: number) {
    const video = await this.videoService.findVideo(id);
    if (!video) {
      throw new NotFoundException();
    }

    return video;
  }

  private async checkCommentExistence(videoId: number, commentId: number) {
    const comment = await this.commentService.findComment(commentId);
    if (!comment || comment.video.id !== videoId) {
      throw new NotFoundException();
    }

    return comment;
  }
}
