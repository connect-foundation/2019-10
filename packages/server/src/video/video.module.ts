import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { UploadedVideoTableModule } from 'src/uploaded-video/uploaded-video-table.module';
import { Tag } from '../../../typeorm/src/entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Tag]), UploadedVideoTableModule],
  providers: [VideoService],
  controllers: [VideoController],
})
export class VideoModule {}
