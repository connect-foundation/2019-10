export class SearchedResultsResponseDto {
  public constructor(
    public readonly page: number,
    public readonly sort: string,
  ) {}
}
