import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GithubApiModule } from 'src/third-party-api/github-api/github-api.module';
import { UserSessionModule } from 'src/user-session/user-session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../typeorm/src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    GithubApiModule,
    UserSessionModule,
  ],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
