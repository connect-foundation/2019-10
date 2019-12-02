import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { VideoRequestQueryStringPipeDto } from './request-query-dto';
import { VideoQueryStringDto } from './query-dto';
import { LATEST, POPULAR, PERIODS } from '../../constants';

@Injectable()
export class VideoQueryStringPipe implements PipeTransform {
  public async transform(
    value: VideoRequestQueryStringPipeDto,
  ): Promise<VideoQueryStringDto> {
    const { page, sort, period, keyword } = value;

    if (
      !this.validateVideoRequestQueryStringPipeDto({
        page,
        sort,
        period,
        keyword,
      })
    ) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      sort,
      period,
      keyword,
    };
  }

  private validateVideoRequestQueryStringPipeDto({
    page,
    sort,
    period,
    keyword,
  }: VideoRequestQueryStringPipeDto): boolean {
    if (keyword) {
      if (page) {
        return this.validatePage(page);
      }
      return true;
    }
    return (
      this.validatePage(page) &&
      this.validateSort(sort) &&
      this.validatePeriod(period, sort)
    );
  }

  private validatePage(page: string): boolean {
    const onlyNaturalNumberRegex = /^[1-9]\d*$/;
    return onlyNaturalNumberRegex.test(page);
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
}
