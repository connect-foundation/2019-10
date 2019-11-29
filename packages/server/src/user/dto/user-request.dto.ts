export class UserRequestDto {
  public constructor(
    public readonly username: string,
    public readonly description: string,
    public readonly avatar: string,
    public readonly email: string,
    public readonly githubId: string,
  ) {}
}
