// Types
import type { Day } from './types';

// Consts
import { DAY_SHORT, WEEKDAY_SET, WEEKEND_SET } from './consts';

/**
 * Determines if the days passed were weekend, weekdays, or
 * shows shorten format of days.
 *
 * @param {Day[]} days
 * @returns {string}
 */
export const formatDayLabel = (days?: Day[]): string => {
  if (!days || days.length === 0) {
    return '';
  }

  if (days.length === 1) {
    return DAY_SHORT[days[0]] ?? days[0];
  }

  if (days.every(d => WEEKDAY_SET.has(d))) {
    return 'Weekdays';
  }

  if (days.every(d => WEEKEND_SET.has(d))) {
    return 'Weekends';
  }

  return days.map(d => DAY_SHORT[d] ?? d).join(', ');
};
