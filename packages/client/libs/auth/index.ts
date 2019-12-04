import { responseStatus } from '../../response';
import { ServerResponse } from 'http';

export const checkLogInStatusClientSide = user => {
  return !user;
};

export const checkLogInStatusServerSide = (isLoggedIn: boolean) => {
  return typeof window !== 'undefined' || isLoggedIn;
};

export const redirect = (res: ServerResponse, location: string) => {
  res.writeHead(responseStatus.found, {
    Location: location,
  });
  res.end();
};
