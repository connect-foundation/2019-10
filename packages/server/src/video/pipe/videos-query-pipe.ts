import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { LATEST, POPULAR, PERIODS } from '../constants';

import { VideosRequestQueryDto } from '../dto/videos-request-query.dto';
import { VideosQueryDto } from '../dto/videos-query.dto';

@Injectable()
export class VideosQueryPipe implements PipeTransform {
  public async transform(
    value: VideosRequestQueryDto,
  ): Promise<VideosQueryDto> {
    const { page, sort, period } = value;

    if (!this.validateGetVideosPipeDto({ page, sort, period })) {
      throw new BadRequestException();
    }

    return {
      page: parseInt(page, 10),
      sort,
      period,
    };
  }

  private validateGetVideosPipeDto({ page, sort, period }) {
    return (
      this.validatePage(page) &&
      this.validateSort(sort) &&
      this.validatePeriod(period, sort)
    );
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return page && !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string) {
    return sort && (sort === LATEST || sort === POPULAR);
  }

  private validatePeriod(period: string, sort: string) {
    let isValid = true;

    if (
      (sort === POPULAR && !period) ||
      (sort === POPULAR &&
        period !== PERIODS.week &&
        period !== PERIODS.month &&
        period !== PERIODS.year &&
        period !== PERIODS.all) ||
      (sort !== POPULAR && period)
    ) {
      isValid = false;
    }

    return isValid;
  }
}
