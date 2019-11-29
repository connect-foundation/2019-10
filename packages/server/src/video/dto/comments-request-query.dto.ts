export class CommentsRequestQueryDto {
  public constructor(
    public readonly page: string,
    public readonly sort: string,
  ) {}
}
