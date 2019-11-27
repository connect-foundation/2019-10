import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import { Video } from '../../../typeorm/src/entity/video.entity';

import {
  LATEST,
  POPULAR,
  ALL,
  VIDEOS,
  SEARCHED_VIDEO_NUMBER,
  VIDEO_ITEMS_PER_PAGE,
  PERIODS,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
} from './constants';
import { VideosQueryDto, VideoResponseDto } from './dto';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findVideos(videosQueryDto: VideosQueryDto): Promise<Video[]> {
    const { page, sort, period, keyword } = videosQueryDto;
  
    const qb = this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select([
        'Video.id',
        'Video.title',
        'Video.description',
        'Video.sourceUrl',
        'Video.thumbnail',
        'Video.playtime',
        'Video.likedUsersCount',
        'Video.commentsCount',
        'Video.views',
        'Video.popularity',
        'Video.createdAt',
        'Video.updatedAt',
      ])
      .addSelect(['User.id', 'User.username', 'User.avatar']);

    const offset = (page - 1) * VIDEO_ITEMS_PER_PAGE;

    if (keyword) {
      if (sort === VIDEOS) {
        return await qb
          .where(
            '(Video.title like :titleKeyword) or (Video.description like :descriptionKeyword)',
            {
              titleKeyword: '%' + keyword + '%',
              descriptionKeyword: '%' + keyword + '%',
            },
          )
          .limit(SEARCHED_VIDEO_NUMBER)
          .offset(0)
          .orderBy('Video_popularity', 'DESC')
          .getMany();
      }
      if (sort === ALL) {
        return await qb
          .where(
            '(title like :titleKeyword) or (description like :descriptionKeyword)',
            {
              titleKeyword: '%' + keyword + '%',
              descriptionKeyword: '%' + keyword + '%',
            },
          )
          .limit(VIDEO_ITEMS_PER_PAGE)
          .offset(offset)
          .orderBy('Video_popularity', 'DESC')
          .getMany();
      }
    } else {
      if (sort === LATEST) {
        return await qb
          .limit(VIDEO_ITEMS_PER_PAGE)
          .offset(offset)
          .orderBy('Video_createdAt', 'DESC')
          .getMany();
      }

      if (sort === POPULAR) {
        if (period !== PERIODS.all) {
          const startDatetime = moment()
            .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
            .format(MOMENT_DATETIME_FORMAT);

          qb.where('Video.createdAt > :startDatetime', { startDatetime });
        }

        return await qb
          .limit(VIDEO_ITEMS_PER_PAGE)
          .offset(offset)
          .orderBy('Video_popularity', 'DESC')
          .getMany();
      }
    }
  }
}
