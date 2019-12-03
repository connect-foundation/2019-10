import { CommentResponseDto } from 'video/dto/comment-response.dto';

export class CommentsResponseDto {
  public constructor(
    public readonly count: number,
    public readonly data: CommentResponseDto[],
  ) {}
}
