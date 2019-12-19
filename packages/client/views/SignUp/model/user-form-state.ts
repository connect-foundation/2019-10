export class UserFormState {
  public constructor(
    public readonly username: string,
    public readonly description: string,
    public readonly isAgreed: boolean,
  ) {}
}
