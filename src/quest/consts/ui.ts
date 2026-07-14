import {
  RefreshCw,
  Zap,
  CircleCheck,

  SportShoe,
  Dumbbell,
  Footprints,
  Bike,
  WavesHorizontal,

  Brain,
  Book,
  PencilLine,
  Music,
  Headphones,
  Notebook,
  ChessKing,
  Lightbulb,

  Apple,
  Droplet,
  Coffee,
  Pill,
  Salad,
  Beef,
  Broccoli,
  Egg,

  House,
  Shirt,
  ChefHat,
  Sprout,
  ShoppingCart,
  Wrench,
  BrushCleaning,
  Trash2,

  Goal,
  Clock,
  CalendarCheck,
  ListChecks,
  ChartNoAxesCombined,
  Flag,
  Rocket,
  CodeXml,

  Moon,
  Sun,
  Heart,
  Leaf,
  Star,
  Flame,
  Shield,
} from '@lucide/svelte';

// Types
import type { Component } from 'svelte';
import type { LucideProps } from '@lucide/svelte';
import type {
  Alignment,
  Day,
  Difficulty,
  QuestType,
  Template,
  TimeFrame,
} from './../types';

export const ALL_ICONS = [
  // Fitness
  { name: 'sport_shoe',       icon: SportShoe },
  { name: 'dumbbell',         icon: Dumbbell },
  { name: 'footprints',       icon: Footprints },
  { name: 'bike',             icon: Bike },
  { name: 'waves_horizontal', icon: WavesHorizontal },

  // Mind
  { name: 'brain',       icon: Brain },
  { name: 'book',        icon: Book },
  { name: 'pencil_line', icon: PencilLine },
  { name: 'music',       icon: Music },
  { name: 'headphones',  icon: Headphones },
  { name: 'notebook',    icon: Notebook },
  { name: 'chess_king',  icon: ChessKing },
  { name: 'lightbulb',   icon: Lightbulb },

  // Food
  { name: 'apple',     icon: Apple },
  { name: 'droplet',   icon: Droplet },
  { name: 'coffee',    icon: Coffee },
  { name: 'pill',      icon: Pill },
  { name: 'salad',     icon: Salad },
  { name: 'beef',      icon: Beef },
  { name: 'broccoli',  icon: Broccoli },
  { name: 'egg',       icon: Egg },

  // Home
  { name: 'house',         icon: House },
  { name: 'shirt',         icon: Shirt },
  { name: 'chef_hat',      icon: ChefHat },
  { name: 'sprout',        icon: Sprout },
  { name: 'shopping_cart', icon: ShoppingCart },
  { name: 'wrench',        icon: Wrench },
  { name: 'brush_cleaning',icon: BrushCleaning },
  { name: 'trash2',        icon: Trash2 },

  // Goals
  { name: 'goal',                 icon: Goal },
  { name: 'clock',                icon: Clock },
  { name: 'calendar_check',       icon: CalendarCheck },
  { name: 'list_checks',          icon: ListChecks },
  { name: 'chart_no_axes_combined', icon: ChartNoAxesCombined },
  { name: 'flag',                 icon: Flag },
  { name: 'rocket',               icon: Rocket },
  { name: 'code_xml',             icon: CodeXml },

  // Misc
  { name: 'moon',   icon: Moon },
  { name: 'sun',    icon: Sun },
  { name: 'heart',  icon: Heart },
  { name: 'leaf',   icon: Leaf },
  { name: 'star',   icon: Star },
  { name: 'flame',  icon: Flame },
  { name: 'shield', icon: Shield },
];

export const ICONS = [
  { name: 'sport_shoe',       icon: SportShoe },
  { name: 'dumbbell',         icon: Dumbbell },
  { name: 'footprints',       icon: Footprints },

  { name: 'brain',       icon: Brain },
  { name: 'book',        icon: Book },
  { name: 'pencil_line', icon: PencilLine },

  { name: 'apple',     icon: Apple },
  { name: 'droplet',   icon: Droplet },
  { name: 'coffee',    icon: Coffee },

  { name: 'house',         icon: House },
  { name: 'shirt',         icon: Shirt },
  { name: 'chef_hat',      icon: ChefHat },

  { name: 'goal',                 icon: Goal },
  { name: 'clock',                icon: Clock },
  { name: 'calendar_check',       icon: CalendarCheck },

  { name: 'moon',   icon: Moon },
  { name: 'sun',    icon: Sun },
  { name: 'heart',  icon: Heart },
];

export const TYPE_OPTIONS: { value: QuestType; label: string; desc: string; icon: Component; bg: string; fg: string }[] = [
  { value: 'daily',  label: 'Recurring Foe',   desc: 'Returns on a schedule.',       icon: RefreshCw, bg: 'bg-green-50',  fg: 'text-green-700' },
  { value: 'habit',  label: 'Wielded Power',   desc: 'Strike whenever you choose.',   icon: Zap,     bg: 'bg-blue-50',   fg: 'text-blue-700'  },
  { value: 'todo',   label: 'One-Time Quest', desc: 'Win it once and it\'s gone.',  icon: CircleCheck,  bg: 'bg-red-50',    fg: 'text-red-700'   },
];

export const ALIGNMENT_OPTIONS: { label: string; value: Alignment }[] = [
  {label: '(+) Strength gain (eg. drink water)', value: 'buff'},
  {label: '(-) Curse/debuff (eg. smoking)', value: 'nerf'},
  {label: '(+-) Dual nature (eg. snacking)', value: 'none'},
];

export const TIMEFRAME_OPTIONS: { label: string; value: TimeFrame; date: number }[] = [
  {label: 'Today', value: 'today', date: 0 },
  {label: 'Tomorrow', value: 'tomorrow', date: 1 },
  {label: 'In 3 days', value: '3days', date: 3 },
  {label: 'Next week', value: 'next_week', date: 7 },
  {label: 'Custom', value: 'custom', date: -1 },
];

export const DIFFICULTY_OPTIONS:  { label: string; value: Difficulty }[] = [
  {label: 'Easy', value: 'easy'},
  {label: 'Medium', value: 'medium'},
  {label: 'Hard', value: 'hard'},
];


export const KEYWORD_MAP: Record<string, [string, string, string]> = {
  // ── Fitness ─────────────────────────────────────────────
  'run':        ['Sprint Trial',        'Dawn Race',           'Swift Path'],
  'walk':       ['Ancient Path',        'Long Road',           'Wanderer Quest'],
  'gym':        ['Iron Citadel',        'Strength Forge',      'Warrior Hall'],
  'workout':    ['Iron Trial',          'Strength Forge',      'Battle Training'],
  'exercise':   ['Iron Trial',          'Fitness Dungeon',     'Power Forge'],
  'swim':       ['Depth Trial',         'Aqua Gauntlet',       'Tide Quest'],
  'bike':       ['Road Gauntlet',       'Wheel Trial',         'Iron Ride'],
  'yoga':       ['Ancient Forms',       'Body Mastery',        'Flexion Arts'],
  'stretch':    ['Body Vault',          'Flex Trial',          'Movement Quest'],
  'climb':      ['Summit Trial',        'Peak Gauntlet',       'Ascent Quest'],

  // ── Mind & Learning ─────────────────────────────────────
  'read':       ['Ancient Scroll',      'Sacred Tome',         'Forbidden Pages'],
  'book':       ['Sacred Tome',         'Ancient Text',        'Lore Vault'],
  'study':      ['Forbidden Arts',      'Knowledge Vault',     'Arcane Library'],
  'learn':      ['Arcane Library',      'Skill Forge',         'Wisdom Vault'],
  'write':      ['Lore Chronicle',      'Scribe Trial',        'Ink Gauntlet'],
  'journal':    ['Hero\'s Chronicle',    'Lore Tome',           'Tale Vault'],
  'meditat':    ['Inner Oracle',        'Astral Plane',        'Mind Sanctuary'],
  'brain':      ['Mind Fortress',       'Thought Citadel',     'Arcane Mind'],
  'music':      ['Bard Trial',          'Melody Gauntlet',     'Harmony Quest'],
  'code':       ['Arcane Script',       'Logic Dungeon',       'Cipher Forge'],
  'language':   ['Tongue Trial',        'Dialect Gauntlet',    'Word Fortress'],

  // ── Food & Health ────────────────────────────────────────
  'water':      ['Kingdom Reserves',    'Life Spring',         'Hydration Realm'],
  'drink':      ['Life Potion',         'Elixir Vault',        'Health Brew'],
  'eat':        ['Feast Ritual',        'Sustenance Forge',    'Nourish Quest'],
  'cook':       ['Life Potion',         'Feast Ritual',        'Sustenance Forge'],
  'diet':       ['Sustenance Pact',     'Nourish Trial',       'Body Covenant'],
  'fast':       ['Hunger Gauntlet',     'Void Trial',          'Abstain Quest'],
  'vitamin':    ['Power Orb',           'Health Elixir',       'Strength Capsule'],
  'pill':       ['Healing Draught',     'Recovery Potion',     'Cure Brew'],
  'sleep':      ['Restoration Chamber', 'Dream Realm',         'Night Keep'],
  'bed':        ['Rest Sanctum',        'Dream Realm',         'Night Fortress'],
  'floss':      ['Battle Teeth',        'Dental Armor',        'Oral Citadel'],

  // ── Home & Chores ────────────────────────────────────────
  'laundry':    ['Laundry Golem',       'Pile Wraith',         'Dirty Heap'],
  'dishes':     ['Dish Golem',          'Sink Beast',          'Crockery Wraith'],
  'clean':      ['Chaos Dungeon',       'Disorder Realm',      'Clutter Lair'],
  'trash':      ['Refuse Golem',        'Waste Wraith',        'Rubbish Beast'],
  'vacuum':     ['Dust Wraith',         'Floor Gauntlet',      'Grime Beast'],
  'garden':     ['Flora Dungeon',       'Garden Realm',        'Plant Lair'],
  'plant':      ['Flora Dungeon',       'Garden Realm',        'Bloom Quest'],

  // ── Productivity ─────────────────────────────────────────
  'email':      ['Inbox Dungeon',       'Message Backlog',     'Letter Beast'],
  'meeting':    ['Council of Elders',  'War Room Trial',      'Guild Assembly'],
  'budget':     ['Gold Ledger',         'Treasury Reckoning',  'Coin Fortress'],
  'save':       ['Treasury Quest',      'Gold Hoard',          'Coin Vault'],
  'plan':       ['War Council',         'Strategy Forge',      'Tactics Trial'],
  'focus':      ['Mind Fortress',       'Distraction Dungeon', 'Clarity Quest'],

  // ── Wellbeing ────────────────────────────────────────────
  'phone':      ['Digital Phantom',     'Void Mirror',         'Glowing Slab'],
  'social':     ['Void Mirror',         'Digital Void',        'Phantom Screen'],
  'screen':     ['Glowing Slab',        'Phantom Screen',      'Digital Void'],
  'breath':     ['Wind Trial',          'Breath Sanctum',      'Lung Gauntlet'],
  'gratitude':  ['Gratitude Tome',      'Blessing Vault',      'Grace Chronicle'],
  'sunlight':   ['Dawn Ritual',         'Solar Quest',         'Light Trial'],
};

export const STOP_WORDS: Set<string> = new Set([
  // articles & prepositions
  'a', 'an', 'the', 'of', 'to', 'at', 'in', 'on',
  'for', 'and', 'or', 'with', 'by', 'from', 'into',

  // common verbs (too generic to be useful as nouns)
  'do', 'get', 'go', 'be', 'is', 'am', 'are', 'was',
  'have', 'has', 'make', 'take', 'try', 'keep', 'stop',

  // pronouns
  'i', 'my', 'me', 'it', 'its', 'your', 'you', 'we',

  // negations & modifiers
  'no', 'not', 'less', 'more', 'some', 'any',

  // time & frequency words
  'day', 'week', 'month', 'per', 'times', 'every',
  'daily', 'min', 'hour', 'morning', 'night', 'evening',

  // numbers & units
  'x', '1', '2', '3', '4', '5',
  'glasses', 'cups', 'minutes', 'hours', 'steps',

]);

export const TEMPLATES: Template[] = [
  {
    style: 'Combat',
    icon:  '⚔',
    color: '#D85A30',
    bg:    'rgba(216,90,48,.12)',
    fn:    (n) => `Defeat the ${n[0]}`,
  },
  {
    style: 'Trial',
    icon:  '🏛',
    color: '#7F77DD',
    bg:    'rgba(127,119,221,.12)',
    fn:    (n) => `The ${n[1] ?? n[0]} Trial`,
  },
  {
    style: 'Discovery',
    icon:  '🔮',
    color: '#1D9E75',
    bg:    'rgba(29,158,117,.12)',
    fn:    (n) => `Claim the ${n[2] ?? n[0]}`,
  },
];

export const COLORS = ['#1D9E75', '#7F77DD', '#D85A30', '#BA7517', '#378ADD', '#D4537E'] as const;

export const DAYS = [
  {name: 'M', value: 'monday'},
  {name: 'T', value: 'tuesday'},
  {name: 'W', value: 'wednesday'},
  {name: 'Th', value: 'thursday'},
  {name: 'F', value: 'friday'},
  {name: 'S', value: 'saturday'},
  {name: 'Su', value: 'sunday'},
];

export const WEEKDAYS: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
export const WEEKENDS: Day[] = ['saturday', 'sunday'];

export const WEEKDAY_SET = new Set(WEEKDAYS);
export const WEEKEND_SET = new Set(WEEKENDS);

export const DAY_SHORT: Record<Day, string> = Object.fromEntries(DAYS.map(d => [d.value, d.name])) as Record<string, string>;
