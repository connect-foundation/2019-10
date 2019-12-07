import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../../typeorm/src/entity/tag.entity';

import { TagService } from './tag.service';
import { TagListQueryDto } from './dto/tag-list-query.dto';

const tagArray = [
  { id: 1, name: 'java', videosCount: 10 },
  { id: 2, name: 'javascript', videosCount: 3 },
  { id: 3, name: 'ruby', videosCount: 5 },
];

const tagListQueryDto = new TagListQueryDto(1, 'java');

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<Tag>> = jest.fn(
  () => ({
    findTags: jest.fn(),
  }),
);

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

describe('-- TagService --', () => {
  let tagService: TagService;
  let testingModule: TestingModule;
  let tagRepository: MockType<Repository<Tag>>;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        TagService,
        // {
        //   provide: getRepositoryToken(Tag),
        //   useFactory: repositoryMockFactory,
        // },
      ],
    }).compile();

    tagService = testingModule.get<TagService>(TagService);
    tagRepository = testingModule.get(getRepositoryToken(Tag));
  });

  it('findTags - page', async () => {
    // const mockRepository = jest.fn(() => ({
    //   createQueryBuilder: jest.fn(() => ({
    //     order: jest.fn().mockReturnThis(),
    //     offset: jest.fn().mockReturnThis(),
    //     take: jest.fn().mockReturnThis(),
    //     getManyAndCount: jest.fn().mockReturnValueOnce(tagArray),
    //   })),
    // }))();
    tagRepository.findAndCount.mockReturnValue(tagArray);
    expect(await tagService.findTags(tagListQueryDto)).toEqual(true);

    // const findTags = jest.spyOn(tagService, 'findTags');
    // tagService.findTags(tagListQueryDto);
    // expect(findTags).toHaveBeenCalledWith(tagListQueryDto);
  });
});
