import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Tag } from '../../../typeorm/src/entity/tag.entity';

import { TagService } from './tag.service';
import { TagListQueryDto } from './dto/tag-list-query.dto';

import { TAG_ITEMS_PER_PAGE, SEARCHED_ITEM_NUMBER } from 'common/constants';

import { tagArray, tagArrayByKeywordJava } from './tag.test.dummy.data';

describe('-- TagService --', () => {
  let tagService: TagService;
  let testingModule: TestingModule;
  let tagRepository: Repository<Tag>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: {
            findAndCount: jest.fn().mockResolvedValue(tagArray),
          },
        },
      ],
    }).compile();

    tagService = testingModule.get<TagService>(TagService);
    tagRepository = testingModule.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(tagService).toBeDefined();
  });

  describe('findTags', () => {
    it('should return an array of tags, not search results', () => {
      const tagListQueryDto = new TagListQueryDto(1, undefined);
      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');
      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(tagArray);
      expect(repoSpy).toBeCalledWith({
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        skip: 0,
        take: 24,
      });
    });

    it('should return an array of search result tags with no pages', () => {
      const tagListQueryDto = new TagListQueryDto(NaN, 'java');

      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');

      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(
        tagArrayByKeywordJava,
      );
      expect(repoSpy).toBeCalledWith({
        where: { name: Like(`%java%`) },
        order: {
          videosCount: 'DESC',
          id: 'DESC',
        },
        take: SEARCHED_ITEM_NUMBER,
      });
    });

    it('should return an array of search result tags with pages and keyword', () => {
      const tagListQueryDto = new TagListQueryDto(1, 'java');

      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');

      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(
        tagArrayByKeywordJava,
      );
      expect(repoSpy).toBeCalledWith({
        where: { name: Like(`%java%`) },
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
