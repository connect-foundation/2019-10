import { Module } from '@nestjs/common';

import { UserSessionModule } from '../user-session/user-session.module';
import { UserSerializerService } from './user-serializer.service';

@Module({
  imports: [UserSessionModule],
  providers: [UserSerializerService],
  exports: [UserSerializerService],
})
export class UserSerializerModule {}