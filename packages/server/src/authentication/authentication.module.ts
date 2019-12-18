import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../../entity/user.entity';
import { GithubApiModule } from '../third-party-api/github-api/github-api.module';
import { UserModule } from '../user/user.module';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserSessionModule } from '../user-session/user-session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GithubApiModule,
    UserSessionModule,
    UserModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
