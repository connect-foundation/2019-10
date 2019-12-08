import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, MoreThan, Like } from 'typeorm';

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

    const offset = getOffset(page, VIDEO_ITEMS_PER_PAGE);

    if (!keyword) {
      if (sort === LATEST) {
        return await this.videoRepository.findAndCount({
          relations: ['user'],
          order: {
            popularity: 'DESC',
            id: 'DESC',
          },
          skip: offset,
          take: VIDEO_ITEMS_PER_PAGE,
        });
      }

      if (sort === POPULAR) {
        if (period !== PERIODS.all) {
          const startDatetime = moment()
            .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
            .format(MOMENT_DATETIME_FORMAT);

          return await this.videoRepository.findAndCount({
            relations: ['user'],
            where: { createdAt: MoreThan(startDatetime), status: 1 },
            order: {
              popularity: 'DESC',
              id: 'DESC',
            },
            skip: offset,
            take: VIDEO_ITEMS_PER_PAGE,
          });
        }
        return await this.videoRepository.findAndCount({
          relations: ['user'],
          order: {
            popularity: 'DESC',
            id: 'DESC',
          },
          skip: offset,
          take: VIDEO_ITEMS_PER_PAGE,
        });
      }
    }

    if (page) {
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
        skip: offset,
        take: VIDEO_ITEMS_PER_PAGE,
      });
    }

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
      skip: offset,
      take: SEARCHED_ITEM_NUMBER,
    });
  }

  public async findVideo(id: number): Promise<Video> {
    return await this.videoRepository.findOne({
      relations: ['user'],
      where: { id },
    });
  }
}
