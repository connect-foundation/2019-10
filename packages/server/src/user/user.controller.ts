import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserService } from './user.service';
import { Video } from '../../../typeorm/src/entity/video.entity';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}
  @Get(':userId')
  public async findOne(@Param('userId') userId): Promise<User> {
    return await this.userService.findOneById({
      userId,
    });
  }

  @Get(':userId/videos')
  public async findVideosByUser(@Param('userId') userId): Promise<Video[]> {
    return await this.userService.findVideosByUser({ userId });
  }
}
