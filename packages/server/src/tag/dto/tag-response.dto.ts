import { Tag } from '../../../../typeorm/src/entity/tag.entity';

export class TagResponseDto {
  public constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }
  public readonly id: number;
  public readonly name: string;
}
