export class UserListQueryDto {
  public constructor(
    public readonly page: number,
    public readonly keyword?: string,
  ) {}
}
