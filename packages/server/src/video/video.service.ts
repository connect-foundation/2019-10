import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import { Video } from '../../../typeorm/src/entity/video.entity';
import {
  LATEST,
  POPULAR,
  VIDEO_ITEMS_PER_PAGE,
  PERIODS,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
} from './constants';
import { VideosQueryDto } from './dto/videos-query.dto';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findVideos(videosQueryDto: VideosQueryDto): Promise<Video[]> {
    const { page, sort, period } = videosQueryDto;

    const offset = (page - 1) * VIDEO_ITEMS_PER_PAGE;

    const qb = this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select('Video')
      .addSelect(['User.id', 'User.username', 'User.avatar'])
      .limit(VIDEO_ITEMS_PER_PAGE)
      .offset(offset);

    if (sort === LATEST) {
      return await qb.orderBy('Video_createdAt', 'DESC').getMany();
    }

    if (sort === POPULAR) {
      if (period !== PERIODS.all) {
        const startDatetime = moment()
          .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
          .format(MOMENT_DATETIME_FORMAT);

        qb.where('Video.createdAt > :startDatetime', { startDatetime });
      }

      return await qb.orderBy('Video_popularity', 'DESC').getMany();
    }
  }
}
