import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { UserRequestParamDto } from '../dto/user-request-param.dto';
import { UserParamDto } from '../dto/user-param.dto';

@Injectable()
export class UserParamPipe implements PipeTransform {
  public async transform(value: UserRequestParamDto): Promise<UserParamDto> {
    const { id } = value;

    if (!this.validateId(id)) {
      throw new BadRequestException();
    }

    return {
      id: parseInt(id, 10),
    };
  }

  private validateId(id: string) {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId);
  }
}
