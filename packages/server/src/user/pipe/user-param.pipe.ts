import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { UserParamDto } from '../dto/user-param.dto';
import { NATURAL_NUMBER_REGEX } from '../../common/regexes';

@Injectable()
export class UserParamPipe implements PipeTransform {
  public async transform(value: UserParamDto): Promise<UserParamDto> {
    const id = value.id as string;

    if (!this.validateId(id)) {
      throw new BadRequestException();
    }

    return {
      id: parseInt(id, 10),
    };
  }

  private validateId(id: string): boolean {
    return NATURAL_NUMBER_REGEX.test(id);
  }
}
