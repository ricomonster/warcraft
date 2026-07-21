// Types
import type { Day, AssessDailyQuest, AssessHabitQuest, AssessTODOQuest } from './types';

// Consts
import {
  DAY_SHORT,
  INSTRUCTION_PROMPT,
  WEEKDAY_SET,
  WEEKEND_SET,
} from './consts';

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

export const buildDailyMessage = (input: AssessDailyQuest): string => {
  return `
Habit name: "${input.name}"
Type: daily (recurring foe — repeats on a schedule)
Strikes per day: ${input.strikes}
Days per week: ${input.days}

${INSTRUCTION_PROMPT.replace(':name', input.name)}
`;
};

export const buildHabitMessage = (input: AssessHabitQuest): string => {
  return `
Habit name: "${input.name}"
Type: habit (wielded power — tap anytime, no fixed schedule)
Direction: ${input.direction}
Daily target: ${input.target} taps

${INSTRUCTION_PROMPT.replace(':name', input.name)}
`;
};

export const buildTodoMessage = (input: AssessTODOQuest): string => {
  const urgencyHint = input.hasDue
    ? input.daysUntil === 0
      ? 'Due today — treat as hard.'
      : input.daysUntil === 1
        ? 'Due tomorrow — treat as medium or hard.'
        : `Due in ${input.daysUntil} days — weight the task name more.`
    : 'No due date — weight the task name only.';

  return `
Habit name: "${input.name}"
Type: todo (one-time quest — completed once and gone)
Has due date: ${input.hasDue}
${urgencyHint}

${INSTRUCTION_PROMPT.replace(':name', input.name)}
`;
};
