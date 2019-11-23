import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ValidateIdParamPipeDto } from './dto';

@Injectable()
export class ValidateIdParamPipe implements PipeTransform {
  public async transform(validateIdPipeDto: ValidateIdParamPipeDto) {
    const { id } = validateIdPipeDto;

    if (!this.validateIdPipeDto(validateIdPipeDto)) {
      throw new BadRequestException();
    }

    return { id: parseInt(id, 10) };
  }

  private validateIdPipeDto({ id }: ValidateIdParamPipeDto) {
    return id && this.validateId(id);
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId) && parsedId > 0;
  }
}
