import React from 'react';
import * as S from '../styles';

const SearchedUsers = ({ users }) => {
  return (
    <>
      <S.Subject> 사용자 </S.Subject>
      <S.Users>
        {users.map(user => {
          return (
            <S.User key={user.id}>
              <S.Avatar>
                <img src={user.avatar} />
              </S.Avatar>
              <S.Username>{user.username}</S.Username>
            </S.User>
          );
        })}
      </S.Users>
    </>
  );
};

export default SearchedUsers;
