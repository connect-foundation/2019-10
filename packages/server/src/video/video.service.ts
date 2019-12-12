import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, MoreThan, Like, FindOperator } from 'typeorm';

import {
  LATEST,
  POPULAR,
  VIDEO_ITEMS_PER_PAGE,
  PERIODS,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
  SEARCHED_ITEM_NUMBER,
} from 'common/constants';

import { getOffset } from 'libs/get-offset';
import { VideoListQueryDto } from 'video/dto/video-list-query.dto';
import { Video } from '../../../typeorm/src/entity/video.entity';
import { QueryOptionWhere } from './interface/QueryOptionWhere';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findVideos(
    videoListQueryDto: VideoListQueryDto,
  ): Promise<[Video[], number]> {
    const { page, sort, period, keyword } = videoListQueryDto;

    const skip = page ? getOffset(page, VIDEO_ITEMS_PER_PAGE) : 0;
    const take = keyword && !page ? SEARCHED_ITEM_NUMBER : VIDEO_ITEMS_PER_PAGE;

    if (keyword) {
      return await this.videoRepository.findAndCount({
        relations: ['user'],
        where: [
          { title: Like(`%${keyword}%`) },
          { description: Like(`%${keyword}%`), status: 1 },
        ],
        order: {
          popularity: 'DESC',
          id: 'DESC',
        },
        skip,
        take,
      });
    }

    const where: QueryOptionWhere = {
      status: 1,
    };

    if (sort === LATEST) {
      return await this.videoRepository.findAndCount({
        relations: ['user'],
        where,
        order: {
          id: 'DESC',
        },
        skip,
        take,
      });
    }

    if (sort === POPULAR && period !== PERIODS.all) {
      const startDatetime = moment()
        .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
        .format(MOMENT_DATETIME_FORMAT);

      where.createdAt = MoreThan(startDatetime);
    }

    return await this.videoRepository.findAndCount({
      relations: ['user'],
      where,
      order: {
        popularity: 'DESC',
        id: 'DESC',
      },
      skip,
      take,
    });
  }

  public async findVideo(id: number): Promise<Video> {
    return await this.videoRepository.findOne({
      relations: ['user'],
      where: { id },
    });
  }
}
