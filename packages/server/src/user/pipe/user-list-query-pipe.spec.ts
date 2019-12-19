import { UserListQueryPipe } from './user-list-query-pipe';
import { UserListQueryDto } from '../dto/user-list-query.dto';

describe('UserListQueryPipe', () => {
  let pipe: UserListQueryPipe;

  beforeEach(() => {
    pipe = new UserListQueryPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('success calls', () => {
    it('should let UserListQueryDto to go through', () => {
      const userListQueryDto = new UserListQueryDto('1', '권');
      const result: UserListQueryDto = { page: 1, keyword: '권' };
      expect(pipe.transform(userListQueryDto)).resolves.toBe(result);
    });
  });

  describe('unsuccess calls', () => {
    it('should throw an error if non-numeric page is given', () => {
      const userListQueryDto = new UserListQueryDto('1가나다', '권');
      try {
        pipe.transform(userListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('page parameter should be a number.');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });
  });
});
