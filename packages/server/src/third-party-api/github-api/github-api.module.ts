import { Module, HttpModule } from '@nestjs/common';
import { GithubApiService } from 'third-party-api/github-api/github-api.service';

@Module({
  imports: [HttpModule],
  providers: [GithubApiService],
  exports: [GithubApiService],
})
export class GithubApiModule {}
