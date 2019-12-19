import { Module } from '@nestjs/common';
import { MyselfController } from './myself.controller';
import { UserSessionModule } from '../user-session/user-session.module';
import { MyselfService } from './myself.service';

@Module({
  imports: [UserSessionModule],
  providers: [MyselfService],
  controllers: [MyselfController],
})
export class MyselfModule {}
