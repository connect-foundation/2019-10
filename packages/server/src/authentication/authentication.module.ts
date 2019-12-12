import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { GithubApiModule } from '../third-party-api/github-api/github-api.module';
import { UserSerializerModule } from '../serializer/user-serializer.module';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GithubApiModule,
    UserSerializerModule,
    UserModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
