import { CommentInfo } from 'comment/model/comment-info';
import { Comment } from '../../../../typeorm/src/entity/comment.entity';

export class CommentListResponseDto {
  public constructor(commentList: Comment[], count: number) {
    this.data = commentList.map(comment => new CommentInfo(comment));
    this.count = count;
  }

  public readonly data: CommentInfo[];
  public readonly count: number;
}
