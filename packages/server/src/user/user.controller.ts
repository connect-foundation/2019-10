import { Controller, Get, Param } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserService } from './user.service';
import { Video } from '../../../typeorm/src/entity/video.entity';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}
  @Get(':id')
  public async getUser(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userService.findUser(id);
  }

  @Get(':userId/videos')
  public async getVideos(@Param('userId') userId: number): Promise<Video[]> {
    return await this.userService.findVideos(userId);
  }
}
