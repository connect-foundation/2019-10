export class DuplicateCheckResult {
  public constructor(result: boolean) {
    this.isDuplicated = result;
  }

  public readonly isDuplicated: boolean;
}
