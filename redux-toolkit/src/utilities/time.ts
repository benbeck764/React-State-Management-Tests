import { SpotifyDatePrecision } from "../state/queries/models/spotify.models";

// "hh:mm:ss"
export const formatAsTrackDurationString = (milliseconds: number): string => {
  const date = new Date(milliseconds);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  if (hours) {
    formattedTime = `${padZero(hours)}:${formattedTime}`;
  }

  return formattedTime;
};

// 1 hr 5 min 32 sec
export const formatAsLongDurationString = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeComponents = [];

  if (hours > 0) timeComponents.push(`${hours} hr`);
  if (minutes > 0) timeComponents.push(`${minutes} min`);
  if (seconds > 0) timeComponents.push(`${seconds} sec`);

  return timeComponents.join(" ");
};

// May 14, 2007
export const formatWithPrecision = (
  dateString: string,
  precision: SpotifyDatePrecision
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {};

  switch (precision) {
    case "day":
      options.day = "numeric";
      options.month = "long";
      options.year = "numeric";
      break;
    case "month":
      options.month = "long";
      options.year = "numeric";
      break;
    case "year":
      options.year = "numeric";
      break;
    default:
      throw new Error(
        'Invalid precision. Please use "day", "month", or "year".'
      );
  }

  return date.toLocaleDateString(undefined, options);
};

const padZero = (number: number) => {
  return number < 10 ? "0" + number : number;
};
