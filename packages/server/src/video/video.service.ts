import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Video } from '../../../typeorm/src/entity/video.entity';
import { LATEST, POPULAR, VIDEO_ITEMS_PER_PAGE } from './constants';
import { VideosQueryDto } from './dto/videos-query.dto';

@Injectable()
export class VideoService {
  public constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  public async findVideos(videosQueryDto: VideosQueryDto): Promise<Video[]> {
    const { page, sort } = videosQueryDto;

    const offset = (page - 1) * VIDEO_ITEMS_PER_PAGE;

    const qb = this.videoRepository
      .createQueryBuilder()
      .limit(VIDEO_ITEMS_PER_PAGE)
      .offset(offset);

    if (sort === LATEST) {
      return await qb
        .leftJoin('Video.user', 'User')
        .select('Video')
        .addSelect(['User.id', 'User.username', 'User.avatar'])
        .orderBy('Video_createdAt', 'DESC')
        .getMany();
    }

    if (sort === POPULAR) {
      // TODO: 현재는 조회수 기준으로만 정렬하고 있습니다. 추후에 댓글 갯수, 좋아요 수, 조회 수를 종합하여 정렬합니다.
      return await qb
        .leftJoin('Video.user', 'User')
        .select('Video')
        .addSelect(['User.id', 'User.username', 'User.avatar'])
        .orderBy('Video_hit', 'DESC')
        .getMany();
    }
  }
}
