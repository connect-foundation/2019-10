import { Controller, Get, Param, UsePipes, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { IdParserPipe } from 'src/common/pipes/id-parser/id-parser.pipe';

@Controller('users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public getUserDetail(@Param(IdParserPipe) userId: number) {
    // console.log(userId);
  }
}
