export class TranscoderJobPlaylistDto {
  public constructor(
    public readonly name: string,
    public readonly format: string,
    public readonly outputKeys: string[],
    public readonly status: string,
  ) {}
}
