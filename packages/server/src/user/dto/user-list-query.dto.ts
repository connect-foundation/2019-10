export class UserListQueryDto {
  public constructor(
    public readonly page: number | string,
    public readonly keyword?: string,
  ) {}
}
