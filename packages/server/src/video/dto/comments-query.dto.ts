export class CommentsQueryDto {
  public constructor(
    public readonly page: number,
    public readonly sort: string,
  ) {}
}
