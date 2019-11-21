import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Put,
} from '@nestjs/common';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserService } from './user.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UserDto, UserResponseDto } from './dto';

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

  @Post('')
  public async createUser(@Body() userDto: UserDto): Promise<UserResponseDto> {
    return await this.userService.insertUser(userDto);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: number): Promise<UserResponseDto> {
    return await this.userService.deleteUser(id);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id,
    @Body() userDto: UserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.putUser(id, userDto);
  }
}
