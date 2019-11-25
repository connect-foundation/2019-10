export class TranscoderJobOutputDto {
  public constructor(
    public readonly id: string,
    public readonly presetId: string,
    public readonly key: string,
    public readonly segmentDuration: number,
    public readonly status: string,
    public readonly duration: number,
  ) {}
}
