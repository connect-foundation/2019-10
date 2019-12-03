export class VideoListRequestQueryDto {
  public constructor(
    public readonly page: string,
    public readonly sort: string,
    public readonly period?: string,
    public readonly keyword?: string,
  ) {}
}
