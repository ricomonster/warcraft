import { integer, pgTable, serial, text, timestamp, pgEnum, boolean, varchar, time, date } from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const typeEnum = pgEnum('type', ['daily', 'habit', 'todo']);
export const dayEnum = pgEnum('days', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
export const alignmentEnum = pgEnum('alignment', ['buff', 'nerf', 'none']);
export const dueDateTypeEnum = pgEnum('due_date_type', ['today', 'tomorrow', '3days', 'next_week', 'custom']);

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
  dueDateType: dueDateTypeEnum('due_date_type'),
  dueDate: date('due_date'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertQuest = typeof quests.$inferInsert;
export type SelectQuest = typeof quests.$inferSelect;
