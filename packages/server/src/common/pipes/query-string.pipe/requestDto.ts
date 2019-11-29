export class QueryStringDto {
  public constructor(
    public page?: number,
    public sort?: string,
    public period?: string,
    public keyword?: string,
    public limit?: number,
  ) {}
}
