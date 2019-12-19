import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Like, MoreThan } from 'typeorm';
import * as moment from 'moment';

import { Video } from '../../entity/video.entity';
import { Comment } from '../../entity/comment.entity';

import { VideoService } from './video.service';
import { UploadedVideoTableService } from '../uploaded-video-table/uploaded-video-table.service';
import { VideoListQueryDto } from './dto/video-list-query.dto';

import { VIDEO_LIST } from './video.test.dummy.data';

import {
  PERIODS,
  VIDEO_ITEMS_PER_PAGE,
  SEARCHED_ITEM_NUMBER,
  MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS,
  MOMENT_DATETIME_FORMAT,
} from '../common/constants';

describe('-- VideoService --', () => {
  let videoService: VideoService;
  let uploadedVideoTableService: UploadedVideoTableService;
  let testingModule: TestingModule;
  let videoRepository: Repository<Video>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [UploadedVideoTableService, Comment],
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(Video),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue(VIDEO_LIST),
          },
        },
        UploadedVideoTableService,
      ],
    }).compile();

    videoService = testingModule.get<VideoService>(VideoService);
    uploadedVideoTableService = testingModule.get<UploadedVideoTableService>(
      UploadedVideoTableService,
    );
    videoRepository = testingModule.get<Repository<Video>>(
      getRepositoryToken(Video),
    );
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  describe('findVideos', () => {
    it('should return an array of videos with sort is latest', () => {
      const videoListQueryDto = new VideoListQueryDto(1, 'latest');
      const repoSpy = jest.spyOn(videoRepository, 'findAndCount');
      expect(videoService.findVideos(videoListQueryDto)).resolves.toEqual(
        VIDEO_LIST,
      );
      expect(repoSpy).toBeCalledWith({
        relations: ['user'],
        order: {
          id: 'DESC',
        },
        skip: 0,
        take: VIDEO_ITEMS_PER_PAGE,
        where: { status: 1 },
      });
    });

    it('should return an array of videos when sort is popular and period is not all ', () => {
      const videoListQueryDto = new VideoListQueryDto(1, 'popular', 'month');

      const repoSpy = jest.spyOn(videoRepository, 'findAndCount');

      const startDatetime = moment()
        .subtract(...MOMENT_SUBTRACT_FROM_NOW_ARGUMENTS[PERIODS.month])
        .format(MOMENT_DATETIME_FORMAT);

      expect(videoService.findVideos(videoListQueryDto)).resolves.toEqual(
        VIDEO_LIST,
      );
      expect(repoSpy).toBeCalledWith({
        relations: ['user'],
        where: { createdAt: MoreThan(startDatetime), status: 1 },
        order: {
          popularity: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: VIDEO_ITEMS_PER_PAGE,
      });
    });

    it('should return an array of videos when sort is popular and period is all', () => {
      const videoListQueryDto = new VideoListQueryDto(1, 'popular', 'all');

      const repoSpy = jest.spyOn(videoRepository, 'findAndCount');

      expect(videoService.findVideos(videoListQueryDto)).resolves.toEqual(
        VIDEO_LIST,
      );
      expect(repoSpy).toBeCalledWith({
        relations: ['user'],
        where: { status: 1 },
        order: {
          popularity: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: VIDEO_ITEMS_PER_PAGE,
      });
    });

    it('should return an array of videos when keyword is 너무나', () => {
      const videoListQueryDto = new VideoListQueryDto(
        null,
        null,
        null,
        '너무나',
      );

      const repoSpy = jest.spyOn(videoRepository, 'findAndCount');

      expect(videoService.findVideos(videoListQueryDto)).resolves.toEqual(
        VIDEO_LIST,
      );
      expect(repoSpy).toBeCalledWith({
        relations: ['user'],
        where: [
          { title: Like(`%너무나%`) },
          { description: Like(`%너무나%`), status: 1 },
        ],
        order: {
          popularity: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: SEARCHED_ITEM_NUMBER,
      });
    });

    it('should return an array of videos when keyword is 너무나 and page', () => {
      const videoListQueryDto = new VideoListQueryDto(1, null, null, '너무나');

      const repoSpy = jest.spyOn(videoRepository, 'findAndCount');

      expect(videoService.findVideos(videoListQueryDto)).resolves.toEqual(
        VIDEO_LIST,
      );
      expect(repoSpy).toBeCalledWith({
        relations: ['user'],
        where: [
          { title: Like(`%너무나%`) },
          { description: Like(`%너무나%`), status: 1 },
        ],
        order: {
          popularity: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: VIDEO_ITEMS_PER_PAGE,
      });
    });
  });
});
