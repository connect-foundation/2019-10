import { Module } from '@nestjs/common';
import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
