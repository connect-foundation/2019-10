import { Tag } from '../../../../typeorm/src/entity/tag.entity';

export class TagInfo {
  public constructor(tagEntity: Tag) {
    this.id = tagEntity.id;
    this.name = tagEntity.name;
    this.videosCount = tagEntity.videosCount;
  }
  public readonly id: number;
  public readonly name: string;
  public readonly videosCount: number;
}
