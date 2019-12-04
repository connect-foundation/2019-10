import { User } from '../../../../typeorm/src/entity/user.entity';
import { UserInfo } from 'user/model/user-info';

export class UserListResponseDto {
  public constructor(userList: User[], count: number) {
    this.data = userList.map(user => new UserInfo(user));
    this.count = count;
  }

  public readonly data: UserInfo[];
  public readonly count: number;
}
