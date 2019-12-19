import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from '../../entity/tag.entity';
import { Video } from '../../entity/video.entity';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Video])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
