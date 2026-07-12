// Consts
import { KEYWORD_MAP, STOP_WORDS } from './consts';

const capitalize = (s: string): string => {
  return s[0].toUpperCase() + s.slice(1);
};

export const questify = (name: string): string => {
  // Tokenize
  const tokens = name.toLowerCase().split(/\W+/).filter(t => t.length > 1);

  // Keyword scan
  let nouns = [] as string[];
  for (const token of tokens) {
    if (nouns.length > 0) {
      break;
    }

    for (const key in KEYWORD_MAP) {
      if (token.includes(key) || key.includes(token)) {
        nouns = KEYWORD_MAP[key];
        break;
      }
    }
  }

  // Nothing found??
  if (nouns.length === 0) {
    const words = tokens.filter(t => !STOP_WORDS.has(t));
    const base = words.map(capitalize).join(' ');
    nouns = [base + ' Golem', base + ' Dungeon', base + ' Relic'];
  }

  const names = [
    `Defeat the ${nouns[0]}`,
    `The ${nouns[1]} Trial`,
    `Claim the ${nouns[2]}`,
  ];

  const index = Math.floor(Math.random() * names.length);
  return names[index];
};
