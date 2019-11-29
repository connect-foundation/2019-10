export class RepliesRequestParamDto {
  public constructor(
    public readonly id: string,
    public readonly commentId: string,
  ) {}
}
