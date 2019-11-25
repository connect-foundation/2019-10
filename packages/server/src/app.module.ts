import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';

@Module({
  imports: [TypeOrmModule.forRoot(), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
