import { Tag } from '../../../entity/tag.entity';
import { TagInfo } from '../model/tag-info';

export class TagListResponseDto {
  public constructor(tagList: Tag[], count: number) {
    this.data = tagList.map(tag => new TagInfo(tag));
    this.count = count;
  }

  public readonly data: TagInfo[];
  public readonly count: number;
}
