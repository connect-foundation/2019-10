import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../../typeorm/src/entity/tag.entity';

import { TagService } from './tag.service';
import { TagListQueryDto } from './dto/tag-list-query.dto';

const tagArray = [
 [ 
  Tag {
    id: 756,
    createdAt: 2019-12-03,
    updatedAt: 2019-12-03,
    status: true,
    name: '가가가가가가가가가가가가가가가가가가가가가가가가가가가가가가',
    videosCount: 444444444 },
  Tag {
    id: 755,
    createdAt: 2019-12-03T20:02:09.000Z,
    updatedAt: 2019-12-03T20:02:09.000Z,
    status: true,
    name: '김동환',
    videosCount: 99999 },
  Tag {
    id: 762,
    createdAt: 2019 - 12 - 03T20:35:38.000Z,
    updatedAt: 2019 - 12 - 03T20:35:38.000Z,
    status: true,
    name: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
    videosCount: 1111 },
  Tag {
    id: 751,
    createdAt: 2019 - 12 - 02T23: 18: 24.000Z,
    updatedAt: 2019 - 12 - 02T23: 18: 24.000Z,
    status: true,
    name: 'javascript',
    videosCount: 10 },
 ],
4,
];

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

  describe('findTags - no search', () => {
    it('should return an array of tags, not search results', () => {
      const tagListQueryDto = new TagListQueryDto(1);
      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');
      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(tagArray);
      expect(repoSpy).toBeCalledWith({
        order: {
          videosCount: 'DESC',
        },

        skip: 0,
        take: 24,
      });
    });
    it('should return an array of search result tags with no pages', () => {
      const tagListQueryDto = new TagListQueryDto('java');
      const repoSpy = jest.spyOn(tagRepository, 'findAndCount');
      expect(tagService.findTags(tagListQueryDto)).resolves.toEqual(tagArray);
      expect(repoSpy).toBeCalledWith();
    });
  });
});
