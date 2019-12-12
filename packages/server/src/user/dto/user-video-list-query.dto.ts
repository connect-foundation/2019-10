export class UserVideoListQueryDto {
  public constructor(
    public readonly page: number | string,
    public readonly sort: string,
  ) {}
}
