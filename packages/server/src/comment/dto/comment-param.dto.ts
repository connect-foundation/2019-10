export class CommentParamDto {
  public constructor(
    public readonly id: string | number,
    public readonly commentId: string | number,
  ) {}
}
