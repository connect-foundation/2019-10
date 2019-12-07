export class ReplyListParamDto {
  public constructor(
    public readonly id: number | string,
    public readonly commentId: number | string,
  ) {}
}
