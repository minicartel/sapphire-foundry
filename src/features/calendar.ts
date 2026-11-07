const dateFormat = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export const getCurrentDateTime = () => {
  const calendar = game.time.calendar;
  const parts = calendar.timeToComponents(game.time.worldTime);
  const year = parts.year + calendar.years.yearZero;
  const date = new Date(Date.UTC(year, parts.month, parts.dayOfMonth + 1));
  return {
    label: `${dateFormat.format(date)} AD`,
    isoDate: date.toISOString().slice(0, 10),
    time: ((parts.hour * 60 + parts.minute) * 60 + parts.second) * 1000,
  };
};
