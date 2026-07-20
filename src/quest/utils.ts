// Types
import type { Day, AssessDailyQuest, AssessHabitQuest, AssessTODOQuest } from './types';

// Consts
import {
  ALL_ICONS,
  COLORS,
  DAY_SHORT,
  WEEKDAY_SET,
  WEEKEND_SET
} from './consts';

const COLOR_HINTS = COLORS
  .map(c => `${c.name}(${c.best_for})`)
  .join(', ');

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

Difficulty notes for this type:
- More strikes per day = harder
- More days per week = harder
- 7 days/week with 5+ strikes = almost always hard
- Once per day, 3 days/week = lean easy or medium
- Name itself carries weight ("run" > "drink water")

Quest name rules:
- Generate 3 variants using the templates below
- Each NOUN must be a fantasy entity (creature, place, relic)
- No word from "${input.name}" may appear in any quest name
- Evoke the emotional quality of the task, not its literal meaning
- Each variant must use a completely different NOUN
- Fantasy vocabulary only — 2 to 4 words per NOUN phrase

Icons (pick one): ${ALL_ICONS.map((a) => a.name).join(', ')}
Colors (pick one): ${COLOR_HINTS}

Return ONLY this JSON:
{
  "icon":              string,
  "color":             string,
  "difficulty":        "easy" | "medium" | "hard",
  "difficulty_reason": string,
  "quest_names": {
    "combat":    string,
    "trial":     string,
    "discovery": string
  },
  "top_pick": "combat" | "trial" | "discovery"
}
`;
};

export const buildHabitMessage = (input: AssessHabitQuest): string => {
  return `
Habit name: "${input.name}"
Type: habit (wielded power — tap anytime, no fixed schedule)
Direction: ${input.direction}
Daily target: ${input.target} taps

Difficulty notes for this type:
- Direction "negative" (resisting urges) = typically harder
- Direction "both" = medium baseline
- Higher daily target = harder
- No schedule means self-directed — lean medium unless name is clearly hard/easy
- "No phone" or "no sugar" negative habits are usually hard

Quest name rules:
- Generate 3 variants using the templates below
- Each NOUN must be a fantasy entity (creature, place, relic)
- No word from "${input.name}" may appear in any quest name
- Evoke the emotional quality of the task, not its literal meaning
- Each variant must use a completely different NOUN
- Fantasy vocabulary only — 2 to 4 words per NOUN phrase

Icons (pick one): ${ALL_ICONS.map((a) => a.name).join(', ')}
Colors (pick one): ${COLOR_HINTS}

Return ONLY this JSON:
{
  "icon":              string,
  "color":             string,
  "difficulty":        "easy" | "medium" | "hard",
  "difficulty_reason": string,
  "quest_names": {
    "combat":    string,
    "trial":     string,
    "discovery": string
  },
  "top_pick": "combat" | "trial" | "discovery"
}
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

Difficulty notes for this type:
- Difficulty = effort to complete the task, not urgency
- Use easy/medium/hard based on the task name alone
- "Clean the house" = hard, "Reply to email" = easy
- "Do taxes" = hard, "Buy groceries" = easy/medium
- Due date affects framing but not the difficulty score

Quest name rules:
- Generate 3 variants using the templates below
- Each NOUN must be a fantasy entity (creature, place, relic)
- No word from "${input.name}" may appear in any quest name
- Evoke the emotional quality of the task, not its literal meaning
- Each variant must use a completely different NOUN
- Fantasy vocabulary only — 2 to 4 words per NOUN phrase

Icons (pick one): ${ALL_ICONS.join(', ')}
Colors (pick one): ${COLOR_HINTS}

Return ONLY this JSON:
{
  "icon":              string,
  "color":             string,
  "difficulty":        "easy" | "medium" | "hard",
  "difficulty_reason": string,
  "quest_names": {
    "combat":    string,
    "trial":     string,
    "discovery": string
  },
  "top_pick": "combat" | "trial" | "discovery"
}
`;
};
