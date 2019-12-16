export class UserUpdateBodyDto {
  public constructor(
    public readonly username?: string,
    public readonly description?: string,
    public readonly avatar?: string,
  ) {}
}
