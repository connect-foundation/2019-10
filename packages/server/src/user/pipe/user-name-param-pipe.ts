import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { USER_NAME_REGEX } from '../../common/regexes';

@Injectable()
export class UserNameParamPipe implements PipeTransform {
  public async transform(username: string): Promise<string> {
    if (!this.isValidUserName(username)) {
      throw new BadRequestException();
    }
    return username;
  }

  private isValidUserName(username: string) {
    return USER_NAME_REGEX.test(username);
  }
}
