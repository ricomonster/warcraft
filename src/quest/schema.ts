import { z } from 'zod';

// Consts
import {
  ALIGNMENT_VALUES,
  ALL_ICONS,
  COLORS,
  DAY_VALUES,
  DIFFICULTY_VALUES,
  TIMEFRAME_VALUES,
} from './consts';

// Enum form schema
// const types = TYPES.map((t) => t.value) as [string, ...string[]];
const icons = ALL_ICONS.map((a) => a.name) as [string, ...string[]];

const commonFields = z.object({
  quest: z.string()
    .min(1, 'Quest name is required')
    .max(50, 'Quest must be 50 characters or less'),
  name: z.string()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or less'),
  color: z.enum(COLORS, {
    error: () => ({ message: 'Please select a color' })
  }),
  icon: z.enum(icons as [string, ...string[]], {
    error: () => ({ message: 'Please select an icon' })
  }),
  difficulty: z.enum(DIFFICULTY_VALUES, {
    error: () => ({ message: 'Please select a difficulty' })
  }),
  dailyReminder: z.boolean().default(false),
  remindTimeAt: z.string().optional().refine(
    (v) => !v || /^([01]\d|2[0-3]):[0-5]\d$/.test(v),
    { message: 'Invalid time format (HH:MM)' }
  ),
  remindDaysAt: z.array(z.enum(DAY_VALUES)).optional(),
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
    days: z.array(z.enum(DAY_VALUES))
      .min(1, 'Select at least one day'),
    target: z.coerce.number()
      .int('Target must be a whole number')
      .min(1, 'Target must be at least 1')
      .max(99, 'Target must be 99 or less')
  }),
  z.object({
    type: z.literal('habit'),
    alignment: z.enum(ALIGNMENT_VALUES, {
      error: () => ({ message: 'Please select an alignment' })
    }),
    target: z.number()
      .int('Target must be a whole number')
      .min(1, 'Target must be at least 1')
      .max(99, 'Target must be 99 or less')
  }),
  z.object({
    type: z.literal('todo'),
    timeframe: z.preprocess(
      (v) => (v === '' ? undefined : v),
      z.enum(TIMEFRAME_VALUES).optional()
    ),
    dueDate: z.string().optional(),
  })
]);

export const createQuestFormSchema = commonFields.and(typeSpecific);
export type CreateQuestFormSchema = typeof createQuestFormSchema

