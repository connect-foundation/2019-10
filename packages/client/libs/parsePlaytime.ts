const parseHours = (hours: number) => {
  if (hours === 0) {
    return '';
  }

  return `${hours}:`;
};

const parseMinutes = (minutes: number, hours: number) => {
  if (minutes < 10 && hours !== 0) {
    return `0${minutes}:`;
  }

  return `${minutes}:`;
};

const parseSeconds = (seconds: number) => {
  if (seconds < 10) {
    return `0${seconds}`;
  }

  return `${seconds}`;
};

export const parsePlaytime = (playtime: string) => {
  const [hourSegment, minuteSegment, secondSegment] = playtime.split(':');

  const parsedHours = parseInt(hourSegment, 10);
  const parsedMinute = parseInt(minuteSegment, 10);
  const parsedSecond = parseInt(secondSegment, 10);

  const hours = parseHours(parsedHours);
  const minutes = parseMinutes(parsedMinute, parsedHours);
  const seconds = parseSeconds(parsedSecond);

  return `${hours}${minutes}${seconds}`;
};
