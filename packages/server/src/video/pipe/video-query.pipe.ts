import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { VideoRequestQueryStringPipeDto } from './request-query-dto';
import { VideoQueryStringDto } from './query-dto';
import { LATEST, POPULAR, PERIODS } from '../../constants';

const defaultValue = new VideoQueryStringDto();
page: 1,
  sort; : POPULAR,
  limit; : 5,  ;
}

@Injectable()
export class VideoQueryStringPipe implements PipeTransform {
  public async transform(
    value: VideoRequestQueryStringPipeDto,
  ) {
    const {
      page,
      sort,
      period,
      keyword,
      limit,
    } = value;

    if (
      !this.validateVideoRequestQueryStringPipeDto(
        {
          page,
          sort,
          period,
          keyword,
          limit,
        },
      )
    ) {
      throw new BadRequestException();
    }

    return {
      page = parseInt(page, 10),
      sort = sort,
      period = period,
      keyword = keyword,
      limit = parseInt(limit, 10),
    };
  }

  private validateVideoRequestQueryStringPipeDto({
    page,
    sort,
    period,
    keyword,
    limit,
  }: VideoRequestQueryStringPipeDto): boolean {
    if (keyword) {
      if (limit) {
        return this.validateLimit(limit);
      }
      return this.validatePage(page);
    }
    return (
      this.validatePage(page) &&
      this.validateSort(sort) &&
      this.validatePeriod(period, sort)
    );
  }

  private validatePage(page: string): boolean {
    const regx = /^[0-9]+$/;
    if (!regx.test(page)) {
      return false;
    }

    const parsedPage = parseInt(page, 10);
    return page && !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string): boolean {
    return sort && (sort === LATEST || sort === POPULAR);
  }

  private validatePeriod(period: string, sort: string): boolean {
    let isValid = true;

    if (sort === POPULAR && !period) {
      isValid = false;
    }

    if (
      sort === POPULAR &&
      period !== PERIODS.week &&
      period !== PERIODS.month &&
      period !== PERIODS.year &&
      period !== PERIODS.all
    ) {
      isValid = false;
    }

    if (sort !== POPULAR && period) {
      isValid = false;
    }

    return isValid;
  }

  private validateLimit(limit: string): boolean {
    const parsedLimit = parseInt(limit, 10);
    return limit && !isNaN(parsedLimit) && parsedLimit === 5;
  }
}
