export class VideosRequestQueryDto {
  public constructor(
    public page: string,
    public sort: string,
    public period?: string,
  ) {}
}
