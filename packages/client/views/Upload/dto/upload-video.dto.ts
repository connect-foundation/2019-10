export class UploadedVideoInfo {
  public constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly userId: number,
    readonly tags: string[],
  ) {}
}
