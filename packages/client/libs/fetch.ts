import isomorphicUnfetch from 'isomorphic-unfetch';

export const fetch = async (input: RequestInfo, init?: RequestInit) => {
  const res = await isomorphicUnfetch(input, init);

  if (!res.ok) {
    throw Error(res.statusText);
  }

  return await res.json();
};
