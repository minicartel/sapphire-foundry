import { CommonInterval, currentWorldTimeMS } from './time';

const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const getCurrentDateTime = (calendarStart: string) => {
  const date = new Date(Date.parse(calendarStart) + currentWorldTimeMS());
  const time = date.getTime() % CommonInterval.Day;
  return {
    label: `${dateFormat.format(date)} AD`,
    isoDate: date.toISOString().slice(0, 10),
    time,
  };
};
