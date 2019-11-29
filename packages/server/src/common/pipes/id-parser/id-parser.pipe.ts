import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdParserPipe implements PipeTransform {
  public async transform(id: string) {
    if (!this.validate(id)) {
      throw new BadRequestException('Validation failed');
    }

    const transformedId = Number(id);
    return transformedId;
  }

  private validate(id: string) {
    const numberCheckRegex = /^[0-9]*$/gm;

    return id.match(numberCheckRegex);
  }
}
