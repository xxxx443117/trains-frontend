import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const transTimestampDisplay = (date?: number | string | Date, format?: string) => {
  return dayjs(`${String(date).replace(/-/g, "/")} utc+0`).format(format || "YYYY-MM-DD HH:mm:ss");
};

export const transTimestamp = (date?: number | string | Date, format?: string) => {
  return dayjs(date)
    .utc()
    .format(format || "YYYY-MM-DD HH:mm:ss");
};
