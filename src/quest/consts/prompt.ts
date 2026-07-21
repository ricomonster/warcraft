import { ALL_ICONS } from './ui';

export const COLORS = [
  { name: 'red',     text: 'text-red-500',     bg: 'bg-red-500',     best_for: 'danger, urgency, strength' },
  { name: 'orange',  text: 'text-orange-500',  bg: 'bg-orange-500',  best_for: 'fitness, energy, action' },
  { name: 'amber',   text: 'text-amber-500',   bg: 'bg-amber-500',   best_for: 'rest, mindfulness, caution' },
  { name: 'yellow',  text: 'text-yellow-500',  bg: 'bg-yellow-500',  best_for: 'glory, reward, radiance' },
  { name: 'lime',    text: 'text-lime-500',    bg: 'bg-lime-500',    best_for: 'growth, nature, vitality' },
  { name: 'green',   text: 'text-green-500',   bg: 'bg-green-500',   best_for: 'health, nature, wellness' },
  { name: 'emerald', text: 'text-emerald-500', bg: 'bg-emerald-500', best_for: 'wealth, nature, renewal' },
  { name: 'teal',    text: 'text-teal-500',    bg: 'bg-teal-500',    best_for: 'healing, balance, wisdom' },
  { name: 'cyan',    text: 'text-cyan-500',    bg: 'bg-cyan-500',    best_for: 'magic, illusion, mystery' },
  { name: 'sky',     text: 'text-sky-500',     bg: 'bg-sky-500',     best_for: 'sky, freedom, exploration' },
  { name: 'blue',    text: 'text-blue-500',    bg: 'bg-blue-500',    best_for: 'productivity, focus, tech' },
  { name: 'indigo',  text: 'text-indigo-500',  bg: 'bg-indigo-500',  best_for: 'discipline, order, ritual' },
  { name: 'violet',  text: 'text-violet-500',  bg: 'bg-violet-500',  best_for: 'mind, learning, creativity' },
  { name: 'purple',  text: 'text-purple-500',  bg: 'bg-purple-500',  best_for: 'arcane, royalty, mystery' },
  { name: 'fuchsia', text: 'text-fuchsia-500', bg: 'bg-fuchsia-500', best_for: 'chaos, transformation, passion' },
  { name: 'pink',    text: 'text-pink-500',    bg: 'bg-pink-500',    best_for: 'social, emotion, gratitude' },
  { name: 'rose',    text: 'text-rose-500',    bg: 'bg-rose-500',    best_for: 'love, sacrifice, devotion' },
  { name: 'stone',   text: 'text-stone-500',   bg: 'bg-stone-500',   best_for: 'endurance, earth, grit' },
  { name: 'slate',   text: 'text-slate-500',   bg: 'bg-slate-500',   best_for: 'shadow, gloom, the unknown' },
];

const COLOR_HINTS = COLORS
  .map(c => `${c.name}(${c.best_for})`)
  .join(', ');

export const SYSTEM_PROMPT = `
You are a quest naming scribe for a dark fantasy RPG habit tracker.
Transform any habit or task into epic, lore-appropriate quest names.

RULES — apply to every habit regardless of category:

1. NO LITERAL WORDS
   Never use any word from the original habit name in the quest name.
   Do not rephrase, paraphrase, or synonymise the task.
   Replace the task entirely with a fantasy equivalent.

2. EVOKE FEELING, NOT DESCRIPTION
   Identify the emotional quality of the task — effort, dread,
   repetition, discipline, discovery — and choose a fantasy entity
   that carries that feeling. Name the feeling, not the task.

3. THREE DISTINCT NOUNS
   Each style variant must use a different noun:
   - combat:    a creature or monster to slay
   - trial:     a place, ordeal, or force to endure
   - discovery: a relic, artifact, or secret to claim
   Never reuse the same noun across the three variants.

4. FANTASY VOCABULARY ONLY — 2 to 4 words
   Use only words that belong in a fantasy novel.
   Good vocabulary: Wraith, Specter, Golem, Hollow, Citadel,
   Abyss, Forge, Sanctum, Rift, Relic, Codex, Seal, Tome,
   Crystal, Forsaken, Undying, Shattered, Dormant, Hollow,
   Ancient, Cursed, Eternal, Silent, Ashen, Lost, Forgotten.

5. TOP PICK
   Choose the style that best fits the task's nature:
   - Physical / resistance tasks → combat
   - Mental / skill / discipline tasks → trial
   - Passive / accumulative / reward tasks → discovery
`;

export const INSTRUCTION_PROMPT = `
Difficulty notes for this type:
- More strikes per day = harder
- More days per week = harder
- 7 days/week with 5+ strikes = almost always hard
- Once per day, 3 days/week = lean easy or medium
- Name itself carries weight ("run" > "drink water")

Quest name rules:
- Generate 3 variants using the templates below
- Each NOUN must be a fantasy entity (creature, place, relic)
- No word from ":name" may appear in any quest name
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
  "difficultyReason": string,
  "questNames": {
    "combat":    string,
    "trial":     string,
    "discovery": string
  },
  "topPick": "combat" | "trial" | "discovery"
}
`;

export const ASSESSMENT_JSON_SCHEMA: Record<string, unknown> = {
  type: 'object',
  properties: {
    icon: { type: 'string', description: 'Icon name from the provided list' },
    color: { type: 'string', description: 'Color name from the provided list' },
    difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
    difficultyReason: { type: 'string', description: 'Brief justification for the difficulty choice' },
    questNames: {
      type: 'object',
      properties: {
        combat: { type: 'string', description: 'Quest name in combat style: "Defeat the X"' },
        trial: { type: 'string', description: 'Quest name in trial style: "The X Trial"' },
        discovery: { type: 'string', description: 'Quest name in discovery style: "Claim the X"' },
      },
      required: ['combat', 'trial', 'discovery'],
    },
    topPick: {
      type: 'string',
      enum: ['combat', 'trial', 'discovery'],
      description: 'Best matching quest style for this habit',
    },
  },
  required: ['icon', 'color', 'difficulty', 'difficultyReason', 'questNames', 'topPick'],
};
