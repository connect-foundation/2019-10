import { CommentInfo } from 'comment/model/comment-info';
import { Comment } from '../../../../typeorm/src/entity/comment.entity';

export class CommentListResponseDto {
  public constructor(commentList: Comment[], count: number, likes?) {
    this.data = commentList.map(comment => {
      if (!likes) {
        return new CommentInfo(comment);
      }

      let likedByUser = false;
      for (const [index, like] of likes.entries()) {
        if (like.commentId === comment.id) {
          likedByUser = true;
          likes.splice(index, 1);
          break;
        }
      }
      return new CommentInfo(comment, likedByUser);
    });
    this.count = count;
  }

  public readonly data: CommentInfo[];
  public readonly count: number;
}
