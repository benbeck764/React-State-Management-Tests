export const formatMilliseconds = (milliseconds: number): string => {
  const date = new Date(milliseconds);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  // Format the result as "hh:mm:ss"
  let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  if (hours) {
    formattedTime = `${padZero(hours)}:${formattedTime}`;
  }

  return formattedTime;
};

const padZero = (number: number) => {
  return number < 10 ? "0" + number : number;
};
