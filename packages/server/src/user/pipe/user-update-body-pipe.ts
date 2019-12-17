import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import validator from 'validator';

import { UserUpdateBodyDto } from '../dto/user-update-body.dto';
import { USER_NAME_REGEX } from '../../common/regexes';
import { DESCRIPTION_MAX_LENGTH } from '../constants';

@Injectable()
export class UserUpdateBodyPipe implements PipeTransform {
  public async transform(user: UserUpdateBodyDto): Promise<UserUpdateBodyDto> {
    if (!this.validateUpdateUserBodyDto(user)) {
      throw new BadRequestException('invalid User Body');
    }

    return user;
  }

  private validateUpdateUserBodyDto(user: UserUpdateBodyDto) {
    if (this.isEmpty(user)) {
      return false;
    }

    return (
      this.validateUserName(user.username) &&
      this.validateAvatar(user.avatar) &&
      this.validateDescription(user.description)
    );
  }

  private validateUserName(username: string) {
    return !username || USER_NAME_REGEX.test(username);
  }

  private validateDescription(description: string) {
    return !description || description.length < DESCRIPTION_MAX_LENGTH;
  }

  private validateAvatar(avatar: string) {
    return !avatar || validator.isURL(avatar);
  }

  private isEmpty(user: UserUpdateBodyDto) {
    return !Object.keys(user).length;
  }
}
