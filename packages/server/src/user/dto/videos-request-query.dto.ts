export class VideosRequestQueryDto {
  public constructor(
    public readonly page: string,
    public readonly sort: string,
  ) {}
}
