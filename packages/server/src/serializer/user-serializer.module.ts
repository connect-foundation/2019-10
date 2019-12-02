import { Module } from '@nestjs/common';
import { UserSerializerService } from './user-serializer.service';
import { UserSessionModule } from 'src/user-session/user-session.module';

@Module({
  imports: [UserSessionModule],
  providers: [UserSerializerService],
  exports: [UserSerializerService],
})
export class UserSerializerModule {}
