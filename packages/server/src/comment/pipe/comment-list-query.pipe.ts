import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CommentListQueryDto } from '../dto/comment-list-query.dto';
import { POPULAR, LATEST } from '../../common/constants';

@Injectable()
export class CommentListQueryPipe implements PipeTransform {
  public async transform(
    value: CommentListQueryDto,
  ): Promise<CommentListQueryDto> {
    const page = value.page as string;
    const { sort } = value;

    if (!this.validateQuery({ page, sort })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      sort,
    };
  }

  private validateQuery({ page, sort }) {
    return this.validatePage(page) && this.validateSort(sort);
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string) {
    return sort && (sort === POPULAR || sort === LATEST);
  }
}
