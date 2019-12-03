import { CommentUserDto } from './comment-user.dto';

import { Comment } from '../../../../typeorm/src/entity/comment.entity';

export class CommentResponseDto {
  public constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.likedUsersCount = comment.likedUsersCount;
    this.childrenCount = comment.childrenCount;
    this.popularity = comment.popularity;
    this.createdAt = comment.getCreatedAt();
    this.updatedAt = comment.getUpdatedAt();
    this.user = comment.user;
  }

  public readonly id: number;
  public readonly content: string;
  public readonly likedUsersCount: number;
  public readonly childrenCount: number;
  public readonly popularity: number;
  public readonly createdAt: string;
  public readonly updatedAt: string;
  public readonly user: CommentUserDto;
}
