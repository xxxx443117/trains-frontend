export const MINUTE_IN_SECONDS = 60;
export const HOUR_IN_SECONDS = 3600;
export const DAY_IN_SECONDS = 86400;
export const WEEK_IN_SECONDS = 604800;
export const MONTH_IN_SECONDS = 2629800;
export const YEAR_IN_SECONDS = 31557600;

/**
 * Format number of seconds into year, month, day, hour, minute, seconds
 *
 * @param seconds
 */
const getTimePeriods = (seconds: number, showDay?: boolean) => {
  let delta = Math.abs(seconds);
  const timeLeft = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (delta >= YEAR_IN_SECONDS && !showDay) {
    timeLeft.years = Math.floor(delta / YEAR_IN_SECONDS);
    delta -= timeLeft.years * YEAR_IN_SECONDS;
  }

  if (delta >= MONTH_IN_SECONDS && !showDay) {
    timeLeft.months = Math.floor(delta / MONTH_IN_SECONDS);
    delta -= timeLeft.months * MONTH_IN_SECONDS;
  }

  if (delta >= DAY_IN_SECONDS) {
    timeLeft.days = Math.floor(delta / DAY_IN_SECONDS);
    delta -= timeLeft.days * DAY_IN_SECONDS;
  }

  if (delta >= HOUR_IN_SECONDS) {
    timeLeft.hours = Math.floor(delta / HOUR_IN_SECONDS);
    delta -= timeLeft.hours * HOUR_IN_SECONDS;
  }

  if (delta >= MINUTE_IN_SECONDS) {
    timeLeft.minutes = Math.floor(delta / MINUTE_IN_SECONDS);
    delta -= timeLeft.minutes * MINUTE_IN_SECONDS;
  }

  timeLeft.seconds = delta;

  return timeLeft;
};

export default getTimePeriods;

export const padLeftZero = (num: number) => {
  return `00${num}`.slice(-2);
};
