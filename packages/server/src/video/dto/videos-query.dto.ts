export class VideosQueryDto {
  public constructor(
    public page: number,
    public sort: string,
    public period?: string,
  ) {}
}
