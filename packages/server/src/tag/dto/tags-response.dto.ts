import { Tag } from '../../../../typeorm/src/entity/tag.entity';

export class TagsResponseDto {
  public constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.status = tag.status;
    this.videosCount = tag.videosCount;
  }

  public readonly id: number;
  public readonly name: string;
  public readonly status: number;
  public readonly videosCount: number;
}
