import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { GetQueryStringPipeDto } from './getDto';
import { QueryStringDto } from './requestDto';
import { LATEST, POPULAR, PERIODS } from '../../../constants';

const defaultValue: QueryStringDto = {
  page: 1,
  sort: POPULAR,
  limit: 5,
};

@Injectable()
export class GetQueryStringPipe implements PipeTransform {
  public async transform(getQueryStringPipeDto: GetQueryStringPipeDto) {
    const { page, sort, period, keyword, limit } = getQueryStringPipeDto;

    const value = defaultValue;

    if (!this.validateGetQueryStringPipeDto(getQueryStringPipeDto)) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.sort = sort;
    value.period = period;
    value.keyword = keyword;
    value.limit = parseInt(limit, 10);

    return value;
  }

  private validateGetQueryStringPipeDto({
    page,
    sort,
    period,
    keyword,
    limit,
  }: GetQueryStringPipeDto): boolean {
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
