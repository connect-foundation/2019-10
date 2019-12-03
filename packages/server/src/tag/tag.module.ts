import { Module } from '@nestjs/common';
import { TagService } from 'tag/tag.service';
import { TagController } from 'tag/tag.controller';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
