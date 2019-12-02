import { Module } from '@nestjs/common';
import { UserSessionService } from './user-session.service';

@Module({
  providers: [UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
