import { useQuery } from 'react-query';
import { fetch } from '../../libs/fetch';

export const useHotlistVideos = (page: number, period: string) => {
  return useQuery(['hotlistVideos', { page, period }], () =>
    fetch(
      `${process.env.API_URL_HOST}/videos?page=${page}&sort=popular&period=${period}`,
    ),
  );
};
