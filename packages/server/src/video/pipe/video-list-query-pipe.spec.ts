import { VideoListQueryPipe } from './video-list-query.pipe';
import { VideoListQueryDto } from '../dto/video-list-query.dto';

describe('VideoListQueryPipe', () => {
  let pipe: VideoListQueryPipe;

  beforeEach(() => {
    pipe = new VideoListQueryPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('success calls', () => {
    it('should properly validate query string when page and keyword is provided', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1',
        undefined,
        undefined,
        '영상',
      );
      const result: VideoListQueryDto = {
        page: 1,
        sort: undefined,
        period: undefined,
        keyword: '영상',
      };
      expect(pipe.transform(videoListQueryDto)).resolves.toBe(result);
    });

    it('should properly validate query string when page, sort, period is provided', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1',
        'popular',
        'week',
        undefined,
      );
      const result: VideoListQueryDto = {
        page: 1,
        sort: 'popular',
        period: 'week',
        keyword: undefined,
      };
      expect(pipe.transform(videoListQueryDto)).resolves.toBe(result);
    });
  });

  describe('unsuccess calls', () => {
    it('should throw an error if given a non-numberic page', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1가나다',
        'popular',
        'week',
        undefined,
      );
      try {
        pipe.transform(videoListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('query string is not valid');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });

    it('should throw an error when sort receives invalid value', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1',
        'test',
        'week',
        undefined,
      );
      try {
        pipe.transform(videoListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('query string is not valid');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });

    it('should throw an error when period receives invalid value', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1',
        'popular',
        'test',
        undefined,
      );
      try {
        pipe.transform(videoListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('query string is not valid');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });

    it('should throw an error when sort value is latest but receives period value', () => {
      const videoListQueryDto = new VideoListQueryDto(
        '1',
        'latest',
        'week',
        undefined,
      );
      try {
        pipe.transform(videoListQueryDto);
      } catch (err) {
        expect(err.message.message).toBe('query string is not valid');
        expect(err.message.statusCode).toBe(400);
        expect(err.message.error).toBe('Bad Request');
      }
    });
  });
});
