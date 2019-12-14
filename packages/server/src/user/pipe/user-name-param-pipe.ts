import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { USER_NAME_REGEX } from '../../common/regexes';

@Injectable()
export class UserNameParamPipe implements PipeTransform {
  public async transform(userName: string): Promise<string> {
    if (!USER_NAME_REGEX.test(userName)) {
      throw new BadRequestException();
    }
    return userName;
  }
}
