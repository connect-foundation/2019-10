import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagController } from 'Tag/tag.controller';
import { TagService } from 'Tag/tag.service';
import { Tag } from '../../../typeorm/src/entity/tag.entity';

import { TagListQueryDto } from 'tag/dto/tag-list-query.dto';
import { tagArray, tagArrayController } from 'tag/tag.test.dummy.data';

describe('-- Tag Controller --', () => {
  let tagController: TagController;
  let testingModule: TestingModule;
  let tagService: TagService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Tag])],
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    tagService = testingModule.get<TagService>(TagService);
    tagController = testingModule.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(tagController).toBeDefined();
  });

  describe('getTags', () => {
    it('should return an array of tags, not search results', async () => {
      const tagListQueryDto = new TagListQueryDto(1, undefined);

      jest.spyOn(tagService, 'findTags').mockResolvedValue(tagArray);

      expect(await tagController.getTags(tagListQueryDto)).toBe(
        tagArrayController,
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
