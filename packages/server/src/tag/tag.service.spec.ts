import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Tag } from '../../../typeorm/src/entity/tag.entity';
import { TagService } from 'tag/tag.service';
import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { TAG_ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'common/constants';
import { TAG_LIST, TAG_LIST_BY_KEYWORD_JAVA } from 'tag/tag.test.dummy.data';

describe('-- TagService --', () => {
  let tagService: TagService;
  let testingModule: TestingModule;
  let tagRepository: Repository<Tag>;

  describe('findTags not search results', () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        providers: [
          TagService,
          {
            provide: getRepositoryToken(Tag),
            useValue: {
              findAndCount: jest.fn().mockResolvedValue(TAG_LIST),
            },
          },
        ],
      }).compile();

      tagService = testingModule.get<TagService>(TagService);
      tagRepository = testingModule.get<Repository<Tag>>(
        getRepositoryToken(Tag),
      );
    });

    it('should be defined', () => {
      expect(tagService).toBeDefined();
    });

    it('should return an array of tags', () => {
      const tagListQueryDto = new TagListQueryDto(1, undefined);
      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');
      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(TAG_LIST);
      expect(repoSpy).toBeCalledWith({
        where: { status: 1 },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: 24,
      });
    });
  });

  describe('findTags search result', () => {
    beforeEach(async () => {
      testingModule = await Test.createTestingModule({
        providers: [
          TagService,
          {
            provide: getRepositoryToken(Tag),
            useValue: {
              findAndCount: jest
                .fn()
                .mockResolvedValue(TAG_LIST_BY_KEYWORD_JAVA),
            },
          },
        ],
      }).compile();

      tagService = testingModule.get<TagService>(TagService);
      tagRepository = testingModule.get<Repository<Tag>>(
        getRepositoryToken(Tag),
      );
    });

    it('should be defined', () => {
      expect(tagService).toBeDefined();
    });

    it('should return an array with no pages', () => {
      const tagListQueryDto = new TagListQueryDto(NaN, 'java');

      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');

      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(
        TAG_LIST_BY_KEYWORD_JAVA,
      );
      expect(repoSpy).toBeCalledWith({
        where: { name: Like(`%java%`), status: 1 },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: SEARCHED_ITEM_NUMBER,
      });
    });

    it('should return an array with pages and keyword', () => {
      const tagListQueryDto = new TagListQueryDto(1, 'java');

      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');

      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(
        TAG_LIST_BY_KEYWORD_JAVA,
      );
      expect(repoSpy).toBeCalledWith({
        where: { name: Like(`%java%`), status: 1 },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: TAG_ITEMS_PER_PAGE,
      });
    });
  });
});
