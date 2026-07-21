// Types
import type { Component } from 'svelte';
import type { quests } from './store';

// Consts
import type {
  DIFFICULTY_VALUES,
  QUEST_TYPE_VALUES,
  DAY_VALUES,
  ALIGNMENT_VALUES,
  TIMEFRAME_VALUES,
  ICON_NAMES
} from './consts';

// START: Data
export type CreateQuest = typeof quests.$inferInsert;
export type Quest = typeof quests.$inferSelect;

export interface ListQuest {
  type: QuestType;
  quests: Quest[];
}
// END: Data

// START: Consts -> Type
export type Alignment = (typeof ALIGNMENT_VALUES)[number];
export type Day = (typeof DAY_VALUES)[number];
export type Difficulty = (typeof DIFFICULTY_VALUES)[number];
export type QuestType = (typeof QUEST_TYPE_VALUES)[number];
export type TimeFrame = (typeof TIMEFRAME_VALUES)[number];
export type Icon = (typeof ICON_NAMES)[number];
// END: Consts -> Type

// START: UI Consts Types
export interface IconSetting {
  name: Icon
  icon: Component
}
// END: UI Consts Types

// START: API
interface AssessBaseQuest {
  name: string;
  type: QuestType;
}

export interface AssessDailyQuest extends AssessBaseQuest {
  strikes: number;
  days: number;
}

export interface AssessHabitQuest extends AssessBaseQuest {
  direction: Alignment;
  target: number;
}

export interface AssessTODOQuest extends AssessBaseQuest {
  hasDue: boolean;
  daysUntil: number | null;
}

export type AssessQuest = AssessDailyQuest | AssessHabitQuest | AssessTODOQuest

export type QuestStyle = 'combat' | 'trial' | 'discovery'
export type QuestNamesAssessment = Record<QuestStyle, string>;

export interface QuestAssessment {
  icon: string;
  color: string;
  difficulty: Difficulty;
  difficultyReason: string;
  questNames: QuestNamesAssessment;
  topPick: QuestStyle;
}
// END: API

