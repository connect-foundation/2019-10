export class TranscoderJobInputDto {
  public constructor(
    public readonly key: string,
    public readonly frameRate: string,
    public readonly resolution: string,
    public readonly aspectRatio: string,
    public readonly interlaced: string,
    public readonly container: string,
  ) {}
}
