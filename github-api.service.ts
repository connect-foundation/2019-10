import { Injectable, HttpService } from '@nestjs/common';
import { AccessToken } from 'src/third-party-api/github-api/dto/github-oauth-access-token.dto';
import { GithubUserDetailDto } from './dto/github-user-detail-dto';
import { GithubUserDetail } from '../model/github-user-detail';

@Injectable()
export class GithubApiService {
  public constructor(private readonly http: HttpService) {}

  public async requestAccessToken(code: string) {
    const response = await this.http
      .post(process.env.GITHUB_REQUEST_ACCESS_TOKEN_URL, {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      })
      .toPromise();

    const acessToken = this.parseJsonData(response.data);
    return acessToken;
  }

  public async requestUserDetail(accessToken: string) {
    const response = await this.http
      .get(process.env.GITHUB_REQUEST_USER_DETAIL_URL, {
        headers: { Authorization: `token ${accessToken}` },
      })
      .toPromise();

    const userDetail = new GithubUserDetailDto(response.data);

    return new GithubUserDetail(userDetail);
  }

  private parseJsonData(textData: string) {
    const dataList = textData.split('&');
    const parsedData = dataList.reduce<AccessToken>((result, pair: string) => {
      const [key, value] = pair.split('=');
      return { ...result, [key]: value };
    }, new AccessToken());

    return parsedData.access_token;
  }
}
