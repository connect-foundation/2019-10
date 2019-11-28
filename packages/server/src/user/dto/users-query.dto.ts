export class UsersQueryDto {
  public constructor(
    public page: number,
    public keyword?: string,
    public limit?: number,
  ) {}
}
