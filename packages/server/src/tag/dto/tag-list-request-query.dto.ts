export class TagListRequestQueryDto {
  public constructor(
    public readonly page: string,
    public readonly keyword?: string,
  ) {}
}
