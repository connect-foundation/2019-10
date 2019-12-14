export class TagListQueryDto {
  public constructor(
    public readonly page?: number | string,
    public readonly keyword?: string,
  ) {}
}
