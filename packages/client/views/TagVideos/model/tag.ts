export class Tag {
  public constructor(id: number, name: string, videosCount: number) {
    this.id = id;
    this.name = name;
    this.videosCount = videosCount;
  }

  public readonly id: number;
  public readonly name: string;
  public readonly videosCount: number;
}
