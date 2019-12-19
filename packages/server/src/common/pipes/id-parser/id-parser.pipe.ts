import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IdParserDto } from './dto/id-parser.dto';
import { NATURAL_NUMBER_REGEX } from '../../../common/regexes';

@Injectable()
export class IdParserPipe implements PipeTransform {
  public transform(idParserDto: IdParserDto) {
    const { id } = idParserDto;

    if (!this.isNaturalNumber(id)) {
      throw new BadRequestException('Invalid Url');
    }

    const digitId = Number(id);
    return digitId;
  }

  private isNaturalNumber(id: string) {
    return id.match(NATURAL_NUMBER_REGEX);
  }
}
