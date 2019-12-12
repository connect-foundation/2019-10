import * as S from './styles';

import UserProfileSkeleton from './skeleton';

const UserProfile = ({ skeleton, avatar, username, description }) => {
  return skeleton ? (
    <UserProfileSkeleton />
  ) : (
    <S.UserProfile>
      <S.Content>
        <S.Avatar>
          <img src={avatar} />
        </S.Avatar>
        <S.Info>
          <h1>{username}</h1>
          <div>{description}</div>
        </S.Info>
      </S.Content>
    </S.UserProfile>
  );
};

export default UserProfile;
