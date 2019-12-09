import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { IdParserDto } from './dto/id-parser.dto';

@Injectable()
export class IdParserPipe implements PipeTransform {
  public transform(idParserDto: IdParserDto) {
    const { id } = idParserDto;

    if (!this.isOnlyDigit(id)) {
      throw new BadRequestException('Invalid Url');
    }

    const digitId = Number(id);
    return digitId;
  }

  private isOnlyDigit(id: string) {
    const onlyDigitRegex = RegExp(/^[0-9]*$/gm);
    return id.match(onlyDigitRegex);
  }
}
