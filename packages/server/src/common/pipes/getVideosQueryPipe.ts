import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class GetVideosQueryPipe implements PipeTransform {
  public async transform(
    { page, sort }: { page: string; sort: string },
    metadata: ArgumentMetadata,
  ) {
    const value = {
      page: 1,
      sort: 'popular',
    };

    if (page) {
      if (this.validatePage(page)) {
        value.page = parseInt(page, 10);
      } else {
        throw new BadRequestException();
      }
    }

    if (sort) {
      if (this.validateSort(sort)) {
        value.sort = sort;
      } else {
        throw new BadRequestException();
      }
    }

    return value;
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string) {
    return sort === 'latest' || sort === 'popular';
  }
}
