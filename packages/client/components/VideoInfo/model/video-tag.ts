import { Tag } from '../../TagItem/interface/tag';

export class VideoTag {
  public constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }

  public readonly id: number;
  public readonly name: string;
}
