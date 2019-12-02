export class RepliesParamDto {
  public constructor(
    public readonly id: number,
    public readonly commentId: number,
  ) {}
}
