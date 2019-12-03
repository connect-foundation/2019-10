export class TagListQueryDto {
  public constructor(
    public readonly page: number,
    public readonly keyword?: string,
  ) {}
}
