// https://stackoverflow.com/a/34841026/12490946
export const parsePlaytime = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = sec % 60;

  return [hours, minutes, seconds]
    .map(value => (value < 10 ? '0' + value : value))
    .filter((value, index) => value !== '00' || index > 0)
    .join(':');
};
