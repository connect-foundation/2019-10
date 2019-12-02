import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { VideosRequestQueryDto } from '../dto/videos-request-query.dto';
import { VideosQueryDto } from '../dto/videos-query.dto';

@Injectable()
export class VideosQueryPipe implements PipeTransform {
  public async transform(
    value: VideosRequestQueryDto,
  ): Promise<VideosQueryDto> {
    const { page, sort } = value;

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
    return sort && (sort === 'popular' || sort === 'latest');
  }
}
