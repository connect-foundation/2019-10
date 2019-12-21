import { Tag } from '../../../entity/tag.entity';

export class VideoTagResponse {
  public constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }
  public readonly id: number;
  public readonly name: string;
}
