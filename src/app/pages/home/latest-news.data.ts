export interface LatestNewsCard {
  readonly title: string;
  readonly dateLabel: string;
  readonly cta: string;
}

export const latestNewsCards: readonly LatestNewsCard[] = [
  {
    title: 'The Feast of Transfiguration',
    dateLabel: 'August 19, 2026',
    cta: 'Join us in prayer as we celebrate the Feast of Transfiguration on Wednesday, August 19',
  },
  {
    title: 'Assumption of the Body of St. Mary',
    dateLabel: 'August 22, 2026',
    cta: 'Join us in prayer as we celebrate the Assumption of the Body of St. Mary on Saturday, August 22.',
  },
    title: '2026 Liturgy and Life Convention',
    dateLabel: 'November 6-8, 2026',
    cta: "Tickets go on sale: August 2 - September 27. Visit: events.ticketleap.com/tickets/liturgy-and-life-convention/2026-liturgy-and-life-convention",
  },
] as const;
