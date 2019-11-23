export class UserResponseDto {
  public constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly description: string,
    public readonly avatar: string,
    public readonly email: string,
    public readonly githubId: string,
  ) {}
}
