import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../typeorm/src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
