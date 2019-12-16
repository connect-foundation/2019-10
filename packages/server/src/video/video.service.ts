import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository, MoreThan, Like } from 'typeorm';

import { Video } from '../../entity/video.entity';
import { UploadedVideoTableService } from '../uploaded-video-table/uploaded-video-table.service';
import { VideoListQueryDto } from './dto/video-list-query.dto';
import {
  VIDEO_ITEMS_PER_PAGE,
  LATEST,
  PERIODS,
  POPULAR,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
  SEARCHED_ITEM_NUMBER,
} from '../common/constants';
import { getOffset } from '../libs/get-offset';
import { UploadedVideoInfoDto } from './dto/uploaded-video-info.dto';

import { UploadedVideoInfo } from '../uploaded-video-table/model/uploaded-video-info';
import {QueryOptionWhere} from './interface/QueryOptionWhere';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
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

  public async instructToSerializeVideoInfo(
    uploadedVideoInfoDto: UploadedVideoInfoDto,
  ): Promise<void> {
    await this.uploadedVideoTableService.insert(
      uploadedVideoInfoDto.id,
      new UploadedVideoInfo(uploadedVideoInfoDto),
    );
  }
}
