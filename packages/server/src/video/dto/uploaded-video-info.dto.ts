export class UploadedVideoInfoDto {
  public constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly userId: number,
    public readonly tags: number[],
  ) {}
}
