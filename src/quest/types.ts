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

// {
//   "icon": "scroll",
//   "color": "purple",
//   "difficulty": "hard",
//   "difficulty_reason": "The task involves significant creative effort and structural revision of a complex narrative or conceptual foundation.",
//   "quest_names": {
//     "combat": "Defeat the Shattered Obelisk",
//     "trial": "The Ancient Cipher Trial",
//     "discovery": "Claim the Forbidden Manuscript"
//   },
//   "top_pick": "trial"
// }
