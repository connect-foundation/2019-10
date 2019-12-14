import { RESPONSE_STATUS } from '../../response';
import { ServerResponse } from 'http';
import { useRouter } from 'next/router';
import { useUser } from '../../components/UserProvider/hooks';
import { endpoint } from '../../constants';

/**
 * @description: Only use it in hooks
 */
export const onlyMember = () => {
  const router = useRouter();
  const user = useUser();

  if (checkLogInStatusClientSide(user)) {
    router.push(endpoint.hotlist);
  }
};

export const checkLogInStatusClientSide = user => {
  return !user;
};

export const checkLogInStatusServerSide = (isLoggedIn: boolean) => {
  return typeof window !== 'undefined' || isLoggedIn;
};

export const redirect = (res: ServerResponse, location: string) => {
  res.writeHead(RESPONSE_STATUS.FOUND, {
    Location: location,
  });
  res.end();
};
