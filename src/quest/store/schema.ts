import { integer, pgTable, serial, text, timestamp, pgEnum, boolean, varchar, time, date } from 'drizzle-orm/pg-core';

// Consts
import { DIFFICULTY_VALUES, QUEST_TYPE_VALUES, DAY_VALUES, ALIGNMENT_VALUES, TIMEFRAME_VALUES } from '../consts/enum';

// Enums
export const difficultyEnum = pgEnum('difficulty', DIFFICULTY_VALUES);
export const typeEnum = pgEnum('type', QUEST_TYPE_VALUES);
export const dayEnum = pgEnum('days', DAY_VALUES);
export const alignmentEnum = pgEnum('alignment', ALIGNMENT_VALUES);
export const timeframeEnum = pgEnum('timeframe', TIMEFRAME_VALUES);

export const quests = pgTable('quests', {
  id: serial('id').primaryKey(),
  quest: varchar('quest', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  color: varchar('color', { length: 20 }).notNull(),
  icon: varchar('icon', { length: 20 }).notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  dailyReminder: boolean('daily_reminder').default(false),
  remindTimeAt: time('remind_time_at', { precision: 0 }),
  remindDaysAt: varchar('remind_days_at').array(),
  notes: text('notes'),
  type: typeEnum('type').notNull(),
  days: dayEnum('days').array(),
  target: integer('target').default(0),
  alignment: alignmentEnum('alignment'),
  timeframe: timeframeEnum('timeframe'),
  dueDate: date('due_date'),
  completed: boolean('completed').default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
