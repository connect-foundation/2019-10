import {
  PipeTransform,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { GetVideosPipeDto } from './dto';
import { LATEST, POPULAR } from 'src/video/constants';

const defaultValue = {
  page: 1,
  sort: POPULAR,
};

@Injectable()
export class GetVideosPipe implements PipeTransform {
  public async transform(getVideosPipeDto: GetVideosPipeDto) {
    const { page, sort } = getVideosPipeDto;

    const value = defaultValue;

    if (!this.validateGetVideosPipeDto(getVideosPipeDto)) {
      throw new BadRequestException();
    }

    value.page = parseInt(page, 10);
    value.sort = sort;

    return value;
  }

  private validateGetVideosPipeDto({ page, sort }: GetVideosPipeDto) {
    return page && this.validatePage(page) && sort && this.validateSort(sort);
  }

  private validatePage(page: string) {
    const parsedPage = parseInt(page, 10);
    return !isNaN(parsedPage) && parsedPage > 0;
  }

  private validateSort(sort: string) {
    return sort === LATEST || sort === POPULAR;
  }
}
