import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { User } from '../../entity/user.entity';
import { Video } from '../../entity/video.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSessionModule } from '../user-session/user-session.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video]), UserSessionModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
