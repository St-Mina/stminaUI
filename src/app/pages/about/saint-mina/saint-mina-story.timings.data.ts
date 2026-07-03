export interface SaintMinaStoryParagraphTiming {
  readonly id: string;
  readonly start: number;
  readonly end: number;
}

/** Paragraph highlight windows derived from stMinaStoryText.json word alignment. */
export const saintMinaStoryParagraphTimings = [
  { id: 'son-promised-0', start: 2.04, end: 33.12 },
  { id: 'son-promised-1', start: 34.52, end: 72.4 },
  { id: 'son-promised-2', start: 72.82, end: 79.88 },
  { id: 'son-promised-3', start: 80.84, end: 101.7 },
  { id: 'raised-for-god-0', start: 104.18, end: 138.9 },
  { id: 'vision-desert-0', start: 141.62, end: 167.06 },
  { id: 'vision-desert-1', start: 167.52, end: 190.18 },
  { id: 'confession-crown-0', start: 193.38, end: 226.84 },
  { id: 'confession-crown-1', start: 227.1, end: 246.34 },
  { id: 'sister-sea-beasts-0', start: 250.26, end: 268.68 },
  { id: 'sister-sea-beasts-1', start: 269.6, end: 297.8 },
  { id: 'camel-place-0', start: 301.08, end: 315.78 },
  { id: 'camel-place-1', start: 316.64, end: 363.12 },
  { id: 'protector-battle-0', start: 367.36, end: 388.18 },
  { id: 'protector-battle-1', start: 388.18, end: 430.82 },
  { id: 'body-found-0', start: 433.44, end: 470.22 },
  { id: 'emperors-daughter-0', start: 471.82, end: 511.14 },
  { id: 'emperors-daughter-1', start: 511.64, end: 524.76 },
  { id: 'city-saint-mina-0', start: 529.36, end: 556.62 },
  { id: 'city-saint-mina-1', start: 557.38, end: 598.68 },
  { id: 'closing', start: 598.68, end: 605.16 },
] as const satisfies readonly SaintMinaStoryParagraphTiming[];
