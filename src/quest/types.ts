// Store
import type { quests } from './store';

// Consts
import type {
  DIFFICULTY_VALUES,
  QUEST_TYPE_VALUES,
  DAY_VALUES,
  ALIGNMENT_VALUES,
  TIMEFRAME_VALUES
} from './consts';

type NounTriplet = [string, string, string]

export interface Template {
  style:  'Combat' | 'Trial' | 'Discovery'
  icon:   '⚔' | '🏛' | '🔮'
  color:  string
  bg:     string
  fn:     (nouns: NounTriplet) => string
}

export type Alignment = (typeof ALIGNMENT_VALUES)[number];
export type Day = (typeof DAY_VALUES)[number];
export type Difficulty = (typeof DIFFICULTY_VALUES)[number];
export type QuestType = (typeof QUEST_TYPE_VALUES)[number];
export type TimeFrame = (typeof TIMEFRAME_VALUES)[number];

export type CreateQuest = typeof quests.$inferInsert;
export type Quest = typeof quests.$inferSelect;

export interface ListQuest {
  type: QuestType;
  quests: Quest[];
}

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

export interface QuestAssessment {
  icon: string;
  color: string;
}
