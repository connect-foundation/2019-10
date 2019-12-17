import { TagListQueryPipe } from './tag-list-query-pipe';
import { TagListQueryDto } from '../dto/tag-list-query.dto';

describe('TagListQueryPipe', () => {
  let pipe: TagListQueryPipe;

  beforeEach(() => {
    pipe = new TagListQueryPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('success calls', () => {
    it('should let the TagListQueryDto go on through', () => {
      const tagListQueryDto = new TagListQueryDto('1', 'javascript');
      const result: TagListQueryDto = { page: 1, keyword: 'javascript' };
      expect(pipe.transform(tagListQueryDto)).resolves.toBe(result);
    });
  });

  describe('unsuccess calls', () => {
    it('should throw an error if given a non-numberic page', () => {
      const tagListQueryDto = new TagListQueryDto('1가나다', 'javascript');
      try {
        pipe.transform(tagListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('page parameter should be a number.');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });
  });
});
