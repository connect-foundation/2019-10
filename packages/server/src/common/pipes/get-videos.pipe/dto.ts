export class GetVideosPipeDto {
  public constructor(
    public readonly page: string,
    public readonly sort: string,
  ) {}
}
