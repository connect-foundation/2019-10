import { useRouter } from 'next/router';

import * as S from './styles';

import { SearchSVG } from '../../svgs';

export const NoSearchResults = () => {
  const router = useRouter();
  return (
    <>
      <S.Image>
        <img
          src={
            'https://www.sunstar.com.ph/uploads/images/2019/09/28/179229.jpg'
          }
        />
      </S.Image>

      <S.Content>
        <SearchSVG />
        <span>"{router.query.query}"에 대한 검색결과가 없습니다.</span>
      </S.Content>
    </>
  );
};

export default NoSearchResults;
