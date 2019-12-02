/* tslint:disable: variable-name*/
export class AccessToken {
  public constructor(
    public readonly access_token: string = null,
    public readonly scope: string = null,
    public readonly token_type: string = null,
  ) {}
}
