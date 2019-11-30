import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PageParserPipe implements PipeTransform {
  public async transform(page: string) {
    if (!this.validate(page)) {
      throw new BadRequestException('Validation failed');
    }

    const transformedPage = Number(page);
    return transformedPage;
  }

  private validate(page: string) {
    const numberCheckRegex = /^[0-9]*$/gm;

    return page.match(numberCheckRegex);
  }
}
