import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';

import { Video } from '../../entity/video.entity';
import { User } from '../../entity/user.entity';
import { UploadedVideoTableService } from '../uploaded-video-table/uploaded-video-table.service';
import { VideoListQueryDto } from './dto/video-list-query.dto';
import {
  VIDEO_ITEMS_PER_PAGE,
  VIDEO_QUERY_SELECT_COLUMNS,
  USER_QUERY_SELECT_COLUMNS,
  LATEST,
  PERIODS,
  POPULAR,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
  VIDEO_SEARCH_QUERY,
  SEARCHED_ITEM_NUMBER,
} from '../common/constants';
import { getOffset } from '../libs/get-offset';
import { UploadedVideoInfoDto } from './dto/uploaded-video-info.dto';
import { UploadedVideoInfo } from '../uploaded-video-table/model/uploaded-video-info';
import { LikedVideo } from './model/liked-video';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly uploadedVideoTableService: UploadedVideoTableService,
  ) {}

  private async popularityQuery(qb): Promise<[Video[], number]> {
    return await qb
      .orderBy('Video_popularity', 'DESC')
      .addOrderBy('Video_createdAt', 'DESC')
      .addOrderBy('Video_id', 'DESC')
      .getManyAndCount();
  }

  public async findVideo(id: number): Promise<Video> {
    return await this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS)
      .where({
        id,
      })
      .getOne();
  }

  public async findVideos(
    videoListQueryDto: VideoListQueryDto,
  ): Promise<[Video[], number]> {
    const { page, sort, period, keyword } = videoListQueryDto;

    const offset = getOffset(page, VIDEO_ITEMS_PER_PAGE);

    const qb = this.videoRepository
      .createQueryBuilder()
      .leftJoin('Video.user', 'User')
      .select(VIDEO_QUERY_SELECT_COLUMNS)
      .addSelect(USER_QUERY_SELECT_COLUMNS);

    if (!keyword) {
      if (sort === LATEST) {
        return await qb
          .limit(VIDEO_ITEMS_PER_PAGE)
          .offset(offset)
          .orderBy('Video_createdAt', 'DESC')
          .addOrderBy('Video_popularity', 'DESC')
          .addOrderBy('Video_id', 'DESC')
          .getManyAndCount();
      }

      if (sort === POPULAR) {
        if (period !== PERIODS.all) {
          const startDatetime = moment()
            .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[period])
            .format(MOMENT_DATETIME_FORMAT);

          qb.where('Video.createdAt > :startDatetime', { startDatetime });
        }
        return await this.popularityQuery(
          qb.limit(VIDEO_ITEMS_PER_PAGE).offset(offset),
        );
      }
    }

    const search = await qb.where(VIDEO_SEARCH_QUERY, {
      titleKeyword: '%' + keyword + '%',
      descriptionKeyword: '%' + keyword + '%',
    });

    if (page) {
      return await this.popularityQuery(
        search.limit(VIDEO_ITEMS_PER_PAGE).offset(offset),
      );
    }

    return await this.popularityQuery(search.limit(SEARCHED_ITEM_NUMBER));
  }

  public async instructToSerializeVideoInfo(
    uploadedVideoInfoDto: UploadedVideoInfoDto,
  ): Promise<void> {
    await this.uploadedVideoTableService.insert(
      uploadedVideoInfoDto.id,
      new UploadedVideoInfo(uploadedVideoInfoDto),
    );
  }

  public async findVideoLikes(
    id: number,
    userId: number,
  ): Promise<LikedVideo[]> {
    const rows = await this.videoRepository.query(
      `select * from liked_videos
      where liked_videos.videoId = ? and liked_videos.userId = ?`,
      [id, userId],
    );

    return rows.map(row => new LikedVideo(row.videoId, row.userId));
  }

  public async likeVideo(id: number, userId: number): Promise<Video> {
    await this.videoRepository
      .createQueryBuilder()
      .relation(Video, 'likedUsers')
      .of(userId)
      .add(id);

    const video = await this.findVideo(id);
    video.likedUsersCount = video.likedUsersCount + 1;
    return await this.videoRepository.save(video);
  }

  public async unlikeVideo(id: number, userId: number): Promise<Video> {
    await this.videoRepository
      .createQueryBuilder()
      .relation(Video, 'likedUsers')
      .of(userId)
      .remove(id);

    const video = await this.findVideo(id);
    video.likedUsersCount = video.likedUsersCount - 1;
    return await this.videoRepository.save(video);
  }

  public async checkLikedByUser(id: number, userId: number): Promise<boolean> {
    const likedVideo = await this.userRepository
      .createQueryBuilder()
      .where({
        id: userId,
      })
      .relation(User, 'likedVideos')
      .of(id)
      .loadOne();

    return Boolean(likedVideo);
  }
}
