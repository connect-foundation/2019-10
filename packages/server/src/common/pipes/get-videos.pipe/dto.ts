export class GetVideosPipeDto {
  public constructor(
    public readonly page?: string,
    public readonly sort?: string,
    public readonly period?: string,
    public readonly keyword?: string,
    public readonly limit?: string,
  ) {}
}
