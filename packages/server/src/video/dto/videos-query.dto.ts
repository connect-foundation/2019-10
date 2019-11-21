export class VideosQueryDto {
  public constructor(
    public readonly page: number,
    public readonly sort: string,
  ) {}
}
