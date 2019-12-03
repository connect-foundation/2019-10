export class VideoListQueryDto {
  public constructor(
    public readonly page: number | string,
    public readonly sort: string,
    public readonly period?: string,
    public readonly keyword?: string,
  ) {}
}
