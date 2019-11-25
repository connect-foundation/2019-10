import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { IdParamPipeDto } from './dto';

@Injectable()
export class IdParamPipe implements PipeTransform {
  public async transform(validateIdPipeDto: IdParamPipeDto) {
    const { id } = validateIdPipeDto;

    if (!this.validateIdParamPipeDto(validateIdPipeDto)) {
      throw new BadRequestException();
    }

    return { id: parseInt(id, 10) };
  }

  private validateIdParamPipeDto({ id }: IdParamPipeDto) {
    return id && this.validateId(id);
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId) && parsedId > 0;
  }
}
