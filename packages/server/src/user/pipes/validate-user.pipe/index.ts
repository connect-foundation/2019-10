import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ValidateUserPipeDto } from './dto';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  public async transform(updateUserPipeDto: ValidateUserPipeDto) {
    return updateUserPipeDto;
  }
}
