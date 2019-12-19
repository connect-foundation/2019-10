export class TagVideoListQueryDto {
  public constructor(
    public readonly page: number | string,
    public readonly sort: string,
  ) {}
}
