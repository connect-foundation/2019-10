import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserService } from './user.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { GetUsersPipe } from '../common/pipes/get-users.pipe';
import { UsersQueryDto, UserResponseDto } from './dto';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}
  @Get(':userId')
  public async getUser(@Param('userId') userId: number): Promise<User> {
    return await this.userService.findUser(userId);
  }

  @Get(':userId/videos')
  public async getVideos(@Param('userId') userId: number): Promise<Video[]> {
    return await this.userService.findVideos(userId);
  }

  @Get('/')
  @UsePipes(GetUsersPipe)
  public async getUsers(
    @Query() usersQueryDto: UsersQueryDto,
  ): Promise<UserResponseDto[]> {
    const { page, keyword, limit } = usersQueryDto;

    const users = await this.userService.findUsers({
      page,
      keyword,
      limit,
    });

    return users.map(user => new UserResponseDto(user));
  }
}
