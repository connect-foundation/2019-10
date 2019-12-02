import { Tag } from '../../../../typeorm/src/entity/tag.entity';
import { TagInfo } from '../model/tag-info';

export class TagListResponseDto {
  public constructor(tagList: Tag[], count: number) {
    this.tagList = tagList.map(tag => new TagInfo(tag));
    this.count = count;
  }

  public readonly tagList: TagInfo[];
  public readonly count: number;
}
