import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../../typeorm/src/entity/user.entity';
import { UserSerializerModule } from 'src/serializer/user-serializer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserSerializerModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
