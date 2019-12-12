import { TranscoderJobInputDto } from './job/input.dto';
import { TranscoderJobOutputDto } from './job/output.dto';
import { TranscoderJobPlaylistDto } from './job/playlist.dto';

export class TranscoderNotificationDto {
  public constructor(
    public readonly state: string,
    public readonly version: string,
    public readonly jobId: string,
    public readonly pipelineId: string,
    public readonly input: TranscoderJobInputDto,
    public readonly inputCount: number,
    public readonly outputKeyPrefix: string,
    public readonly outputs: TranscoderJobOutputDto[],
    public readonly playlists: TranscoderJobPlaylistDto[],
  ) {}
}
