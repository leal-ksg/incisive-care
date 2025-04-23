export const formatToDatetime = (date: string) => {
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  const localISOTime = new Date(d.getTime() - offset)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
};
