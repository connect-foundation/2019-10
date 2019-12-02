export class VideoQueryStringDto {
  public constructor(
    public readonly page?: number,
    public readonly sort?: string,
    public readonly period?: string,
    public readonly keyword?: string,
    public readonly limit?: number,
  ) {}
}
