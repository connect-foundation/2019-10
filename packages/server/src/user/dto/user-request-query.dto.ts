export class UserListRequestQueryDto {
  public constructor(
    public readonly page: string,
    public readonly keyword?: string,
  ) {}
}
