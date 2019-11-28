export class GetUsersPipeDto {
  public constructor(
    public readonly page?: string,
    public readonly keyword?: string,
    public readonly limit?: string,
  ) {}
}
