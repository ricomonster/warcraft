import { z } from 'zod';

// Consts
import { COLORS, ALL_ICONS, DEADLINE_OPTIONS, DIFFICULTY, DAYS, DUEDATE_OPTIONS } from './consts';

// Enum form schema
// const types = TYPES.map((t) => t.value) as [string, ...string[]];
const icons = ALL_ICONS.map((a) => a.name) as [string, ...string[]];
const alignments = DEADLINE_OPTIONS.map((d) => d.value) as [string, ...string[]];
const difficulties = DIFFICULTY.map((d) => d.value) as [string, ...string[]];
const days  = DAYS.map((d) => d.value) as [string, ...string[]];
const duedates = DUEDATE_OPTIONS.map((d) => d.value) as [string, ...string[]];

const commonFields = z.object({
  quest: z.string().min(1, 'Quest name is required').max(50, 'Quest must be 50 characters or less'),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  color: z.enum(COLORS as [string, ...string[]], {
    error: () => ({ message: 'Please select a color' })
  }),
  icon: z.enum(icons as [string, ...string[]], {
    error: () => ({ message: 'Please select an icon' })
  }),
  alignment: z.enum(alignments, {
    error: () => ({ message: 'Please select a deadline' })
  }),
  difficulty: z.enum(difficulties, {
    error: () => ({ message: 'Please select a difficulty' })
  }),
  dailyReminder: z.boolean().default(false),
  remindTimeAt: z.string()
    .transform((v) => (v === '' || v === undefined ? undefined : v))
    .pipe(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional()),
  remindDaysAt: z.array(z.enum(days)).optional(),
  notes: z
    .string()
    .max(500, 'Notes must be 500 characters or less')
    .optional()
}).refine(
  (data) => !data.dailyReminder || (data.remindDaysAt !== undefined && data.remindDaysAt.length > 0),
  { message: 'Select at least one day for your daily reminder', path: ['remindDaysAt'] }
).refine(
  (data) => !data.dailyReminder || !!data.remindTimeAt,
  { message: 'Set a time for your daily reminder', path: ['remindTimeAt'] }
);

// Type specific fields
const typeSpecific = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('daily'),
    target: z.coerce.number()
      .int('Target must be a whole number')
      .min(1, 'Target must be at least 1')
      .max(99, 'Target must be 99 or less')
  }),
  z.object({
    type: z.literal('habit'),
    days: z.array(z.enum(days))
      .min(1, 'Select at least one day'),
    target: z.number()
      .int('Target must be a whole number')
      .min(1, 'Target must be at least 1')
      .max(99, 'Target must be 99 or less')
  }),
  z.object({
    type: z.literal('todo'),
    dueDateType: z.enum(duedates as [string, ...string[]]),
    dueDate: z.string('8'),
  })
]);

export const createHabitFormSchema = commonFields.and(typeSpecific);
export type CreateHabitFormSchema = typeof createHabitFormSchema

