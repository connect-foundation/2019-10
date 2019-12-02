export class TagRequestQueryStringPipeDto {
  public constructor(
    public readonly page?: string,
    public readonly keyword?: string,
  ) {}
}
