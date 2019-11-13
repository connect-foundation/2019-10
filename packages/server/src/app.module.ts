import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../../typeorm/src/entity/Test';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Test])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
