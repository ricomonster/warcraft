// Types
import type { Template } from './types';

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
