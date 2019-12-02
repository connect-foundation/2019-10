export class UserQueryStringDto {
  public constructor(
    public page?: number,
    public keyword?: string,
    public limit?: number,
  ) {}
}
