import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { VideoListQueryDto } from '../dto/video-list-query.dto';
import { NATURAL_NUMBER_REGEX } from '../../common/regexes';
import { LATEST, POPULAR, PERIODS } from '../../common/constants';

@Injectable()
export class VideoListQueryPipe implements PipeTransform {
  public async transform(value: VideoListQueryDto): Promise<VideoListQueryDto> {
    const page = value.page as string;
    const { sort, period, keyword } = value;

    if (!this.validateGetVideosPipeDto({ page, sort, period, keyword })) {
      throw new BadRequestException('query string is not valid');
    }

    return {
      page: parseInt(page, 10),
      sort,
      period,
      keyword,
    };
  }

  private validateGetVideosPipeDto({ page, sort, period, keyword }): boolean {
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
    return NATURAL_NUMBER_REGEX.test(page);
  }

  private validateSort(sort: string): boolean {
    return sort && (sort === LATEST || sort === POPULAR);
  }

  private validatePeriod(period: string, sort: string): boolean {
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
