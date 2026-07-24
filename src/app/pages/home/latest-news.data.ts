export interface LatestNewsCard {
  readonly title: string;
  readonly cta: string;
}

export const latestNewsCards: readonly LatestNewsCard[] = [
  {
    title: 'Two Liturgies Every Sunday',
    cta: 'We have two liturgies every Sunday. The Arabic Liturgy at 5:30am, and the English Liturgy at 8:30am.',
  },
  {
    title: 'Vespers and Midnight Praises Every Saturday',
    cta: 'Join us for Vespers and Midnight Praises every Saturday starting at 5:30pm.',
  },
  {
    title: 'Family Meeting and Elementary/Middle/High School Bible Study Every Friday',
    cta: 'Come to our Bible Study fellowships on Friday. All services begin at 6:30pm.',
  },
] as const;
