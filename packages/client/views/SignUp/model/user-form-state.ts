export class UserFormState {
  public constructor(username: string, description: string, isAgreed: boolean) {
    this.username = username;
    this.description = description;
    this.isAgreed = isAgreed;
  }

  public readonly username: string;
  public readonly description: string;
  public readonly isAgreed: boolean;
}
