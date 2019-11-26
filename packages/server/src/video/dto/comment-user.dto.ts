export class CommentUserDto {
  public constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly avatar: string,
  ) {}
}
