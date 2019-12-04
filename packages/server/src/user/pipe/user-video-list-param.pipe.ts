import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserVideoListParamDto } from 'user/dto/user-video-list-param.dto';

@Injectable()
export class UserVideoListParamPipe implements PipeTransform {
  public async transform(
    value: UserVideoListParamDto,
  ): Promise<UserVideoListParamDto> {
    const id = value.id as string;

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
