export class UserProfileState {
  public constructor(
    public readonly id: number,
    public readonly avatar: string,
    public readonly username: string,
    public readonly description: string,
  ) {}
}
