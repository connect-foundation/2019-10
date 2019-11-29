import {
  Controller,
  Get,
  Param,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IdParserPipe } from '../common/pipes';
import { UserDetailDto } from './dto';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/:id')
  @UsePipes(IdParserPipe)
  public async getUserDetail(@Param('id') userId: number) {
    const user = await this.userService.findUser(userId);

    if (!user) {
      throw new BadRequestException('Invalid access');
    }

    return new UserDetailDto(user);
  }
}
