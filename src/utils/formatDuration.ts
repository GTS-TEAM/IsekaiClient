export const formatDuration = (value: number) => {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.floor(value) - minute * 60;
  return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
};
